const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors())
const PORT = 3001

// client
//   .connect()
//   .then(() => console.log("successfully connected"))
//   .catch(err => console.error("connection err", err.stack))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "client/build")));

/*
  ROUTES
    - add new ETL to database
      - POST: /etl/:name
    - delete existing ETL from database
      - DELETE: /etl/:name
    - get etl run status based on todays date
      - GET: /etl/runstatus
*/

// add nenw ETL route
require("./routes/etl.routes")(app);


app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`)
});