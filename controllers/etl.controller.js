const ETL = require('../models/etl.model');

function escapeSingleQuotes(reqBodyObj) {
  let reqBodyCopy = Object.assign({}, reqBodyObj);
  for (const property in reqBodyCopy) {
    let value = reqBodyCopy[property];
    if (value !== null && typeof value !== "boolean") {
      if (value.indexOf("'") != -1) {
        reqBodyCopy[property] = value.replace("'", "''");
      }
    }
  }
  return reqBodyCopy;
}


exports.createEtl = (req, res) => {
  const apiResponse = {
    success: true,
    message: ""
  }

  const {
    name, description, data_affected,
    comments, run_frequency, start_time, end_time, 
    etl_path, days_ran
  } = req.body;

  const newEtl = new ETL(
    name, description, data_affected,
    comments, run_frequency, start_time, end_time, etl_path, days_ran
  );

  newEtl.addToDatabase()
    .then(databaseResponse => {
      console.log(databaseResponse);
      console.log('--------- SUCCESS --------')
      apiResponse.message = 'successfully added new ETL';
      res.send(apiResponse);
    })
    .catch(e => {
      console.log("-------- wtf --------");
      apiResponse.success = false;
      apiResponse.message = "Failed to create new ETL"
      res.send(apiResponse)
    });
}

exports.updateETLInfo = (req, res) => {
  const apiResponse = {
    success: true,
    message: ""
  }
  let updatedReqBody

  const reqBody = req.body;

  try {
    updatedReqBody = escapeSingleQuotes(reqBody);
  } catch (e) {
    apiResponse.success = false,
    apiResponse.message = "ETL info update was not successful";
    res.send(apiResponse);
  }


  ETL.updateETLDetail(updatedReqBody)
    .then(updateSuccess => {
      apiResponse.message = "successfully updated ETL info";
      res.send(apiResponse);
    })
    .catch(e => {
      apiResponse.success = false;
      apiResponse.message = "ETL info update unsucessful";
      res.send(apiResponse);
    });
}

exports.deleteETL = (req, res) => {
  const { etl_name } = req.params;
  const apiResponse = {
    success: true,
    message: ''
  }

  ETL.deleteETL(etl_name)
    .then(databaseResponse => {
      apiResponse.message = `successfuly removed ETL: ${etl_name}`;
      res.send(apiResponse);
    })
    .catch(e => {
      apiResponse.message = e.detail;
      res.send(apiResponse);
    });
}

exports.getETLRunStatus = (req, res) => {
  const dateFromQueryParams = req.params.date;
  const apiResponse = {
    success: true,
    message: ''
  }

  let month, day, year;

  if (dateFromQueryParams) {
    const dateArr = dateFromQueryParams.split('-')
    month = dateArr[0], day = dateArr[1], year = dateArr[2];
  } else {
    const todaysDate = new Date();
    month = String(todaysDate.getMonth() + 1).padStart(2, '0'); 
    day  = String(todaysDate.getDate()).padStart(2, '0');
    year = todaysDate.getFullYear();

  }

  const dateString = `${month}-${day}-${year}`;
  ETL.getRunStatues(dateString)
    .then(databaseResponse => {
      apiResponse.message = `successfully got data for ${dateString}`;
      apiResponse.data = databaseResponse.rows;
      res.send(apiResponse);
    })
    .catch(e => {
      apiResponse.success = false;
      apiResponse.message = e;
      res.send(apiResponse);
    });
}

exports.getDistinctRunTimes = (req, res) => {
  const apiResponse = {
    success: true,
    message: ''
  }

  ETL.getDistinctRunTimes()
    .then(databaseResponse => {
      apiResponse.message = 'successfully got distinct run times for ETL';
      apiResponse.data = databaseResponse.rows;
      res.send(apiResponse);
    })
    .catch(e => {
      apiResponse.success = false;
      apiResponse.message = e;
      res.send(apiResponse);
    });
}

exports.getEtlNames = (req, res) => {
  const apiResponse = {
    success: true,
    message: ''
  }

  ETL.getEtlNames()
    .then(databaseResponse => {
      apiResponse.message = 'successfully got etl names';
      apiResponse.data = databaseResponse.rows;
      res.send(apiResponse);
    })
    .catch(e => {
      apiResponse.success = false,
      apiResponse.message = e;
      res.send(apiResponse);
    })
}

exports.getEtlInfo = (req, res) => {
  const apiResponse = {
    success: true,
    message: ''
  }

  ETL.getEtlTableInfo()
    .then(databaseResponse => {
      apiResponse.message = 'successfully got etl info';
      apiResponse.data = databaseResponse.rows;
      res.send(apiResponse);
    })
    .catch(e => {
      apiResponse.success = false,
      apiResponse.message = e;
      res.send(apiResponse);
    })
}


