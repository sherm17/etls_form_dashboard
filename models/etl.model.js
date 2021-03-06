const pgClient = require('../config/db.config')
const async = require('async');

class ETL {
  constructor(
    name, description, data_affected,
    comments, run_frequency, start_time, end_time, etl_path, days_ran
  ) {
    this.name = this.processInputData(name);
    this.description = this.processInputData(description);
    this.data_affected = this.processInputData(data_affected);
    this.comments = this.processInputData(comments);
    this.run_frequency = this.processInputData(run_frequency);
    this.start_time = this.processInputData(start_time);
    this.end_time = this.processInputData(end_time);
    this.etl_path = this.processInputData(etl_path);
    this.days_ran = days_ran;
  }

  // Return null if empty string, otherwise add single quote to work with postgres
  processInputData(val) {
    if (val == '') {
      return null;
    }
    return val;
  }

  // Add new ETL to database
  async addToDatabase() {

    const newEtlInfoInsertQuery = `
    insert into etls
    (name, description, data_affected, comments, start_time, end_time, etl_path)
    values
    ($1, $2, $3, $4, $5, $6, $7)`;

    const newEtlRunTimeInsertQuery = `
    insert into etl_run_times 
    (etl_name, run_frequency)
    values ($1, $2)
        `
    try {
      await pgClient.query("BEGIN");

      await pgClient
        .query(newEtlInfoInsertQuery, [this.name, this.description, this.data_affected, this.comments, this.start_time, this.end_time, this.etl_path])
        .then(() => pgClient.query("COMMIT"))
        .catch(e => {
          console.log("error on adding etl info");
          throw e
        });

      if (this.run_frequency === "Daily") {
         await pgClient.query(newEtlRunTimeInsertQuery, [this.name, "Daily"]);
         return "success";
      } else if (this.run_frequency === "Multiple-Days") {
        for (const day of this.days_ran) {
          await pgClient.query(newEtlRunTimeInsertQuery, [this.name, day]);
          await pgClient.query("COMMIT");
        }
        return "success";
      }
    } catch (e) {
      throw e;
    }
  }

  static async updateETLDetail(reqBody) {
    let {
      name, description, data_affected, days_ran,
      comments, run_frequency, start_time, end_time, etl_path
    } = reqBody;
    
    try {
      await pgClient.query("BEGIN");

      const deleteRunFreqQuery = `
        DELETE FROM etl_run_times
        WHERE etl_name = '${name}'
      `;
      
      if (end_time !== null && end_time !== "") {
        end_time = `'${end_time}'`
      } else if (end_time === "") {
        end_time = null;
      }

      const updateQuery = `
        UPDATE etls SET
          description = '${description}',
          data_affected = '${data_affected}',
          comments = '${comments}',
          start_time = '${start_time}',
          end_time = ${end_time},
          etl_path = '${etl_path}'
          WHERE name = '${name}'
        `
      const insertQuery = `
        insert into etl_run_times
        (etl_name, run_frequency)
        values
        ($1, $2)
        `

      await pgClient
        .query(updateQuery)
        .then(() => {
          pgClient.query("COMMIT");
        })
        .catch(e => {
          console.log(e);
          throw e
        });

      await pgClient
        .query(deleteRunFreqQuery)
        .then(() => {
          pgClient.query("COMMIT");
        })
        .catch(e => {
          console.log("error deleteing etl run freq old data")
          throw e
        });

      if (run_frequency === "Daily") {
        pgClient.query(insertQuery, [name, 'Daily'])
          .then(() => "updated daily")
          .catch(e => {
            throw e
          });

      } else {
          for (const day of days_ran) {

            await pgClient.query(insertQuery, [name, day])
            await pgClient.query("COMMIT");
          }
          return "success";
      }
    } catch (e) {
      console.log("trying to roll back");
      console.log(e);
      await pgClient.query("ROLLBACK");
      throw e
    }
  }

  static deleteETL(etlName) {
    const deleteQuery = `
      DELETE FROM etls WHERE name = '${etlName}'
    `
    return pgClient.query(deleteQuery);
  }

  static getRunStatues(dateStr) {

    const getRunStatusQuery = `
      SELECT * FROM etls left join
      (
        SELECT distinct on (etl_name) * from etls_run_status
        order by etl_name, date_ran desc
      ) s
      on
      etls.name= s.etl_name
    `
    return pgClient.query(getRunStatusQuery);
  }

  static getDistinctRunTimes() {
    const getDistinctRunFreqQuery = `
      SELECT distinct(run_frequency) from etl_run_times;
    `
    return pgClient.query(getDistinctRunFreqQuery);
  }

  static getEtlNames() {
    const getEtlNamesQuery = `
      SELECT name FROM etls
    `;
    return pgClient.query(getEtlNamesQuery);
  }

  static getEtlTableInfo() {
    const getEtlInfoQuery = `
    SELECT * from etls INNER JOIN etl_run_times
    ON name = etl_name;
  `;
    return pgClient.query(getEtlInfoQuery);
  }

  static async test() {
    const arr = ["Funday", "Junday", "Lunday", "yoyoyoyoyo"];
    try {
      for (const day of arr) {
        const insertQuery = `
        insert into etl_run_times
        (etl_name, run_frequency)
        values
        ('test', '${day}')
        `
        await pgClient
          .query(insertQuery)
      }
      return "success";
    } catch (e) {
      await pgClient.query("ROLLBACK");
      return "error";
    }
  }
}

module.exports = ETL;