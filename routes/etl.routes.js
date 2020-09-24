const etlController = require('../controllers/etl.controller');

/*
  ROUTES
    - add new ETL to database
      - POST: /etl/:name
    - delete existing ETL from database
      - DELETE: /etl/:name
    - get etl run status based on todays date
      - GET: /etl/run_frequency
        - get run frequency data based on today's date
      - GET: /etl/run_frequency/:date
        - get run frequency data based on date query params
*/


module.exports = app => {
  app.post("/etl", etlController.createEtl);
  app.put("/etl", etlController.updateETLInfo);
  app.delete("/etl/:etl_name", etlController.deleteETL);
  app.get("/etl/run_statuses/", etlController.getETLRunStatus);
  app.get("/etl/run_statuses/:date", etlController.getETLRunStatus);
  app.get("/etl/run_freqency", etlController.getDistinctRunTimes);
  app.get("/etl/etl_names", etlController.getEtlNames);
  app.get("/etl/etl_info", etlController.getEtlInfo);
}