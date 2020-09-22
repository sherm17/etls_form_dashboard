import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

// pages
import HomePage from './pages/home-page/home-page.component';
import EditEtlPage from './pages/edit-etl/edit-etl.component';
import AddEtlPage from './pages/add-etl/add-etl.component';


// components
import Header from './components/header/header.component';

import './App.css';

function App() {
  return (
    <div>
      <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/edit-etl' component={EditEtlPage} />
          <Route path='/add-etl' component={AddEtlPage} />
        </Switch>
    </div>
  );
}

export default App;


/*
  COMPONENTs
    - card component to hold ETL detail in
    - header
      - with edit ETL and create new ETL link
    - sidebar component to filter ETLs by run time

  PAGES
    - main page (GET request)
      - display all run status for each ETL
      - side filter to filter out by run date
      - bar graph at top 
      - display cards of each ETL and their run status
        - maybe have a drop down?

    - edit ETL page (PUT request)
      - choose ETL from drop down and then have form appear to update ETL status (main ETL table)
        - can edit ETL run time, end time, description, run freq, etc
            - basically do a whole record overwrite
    - create new ETL (POST request)
      - add new ETL to database for tracking using a form

  REDUX
    - will hold data from database for etl run statues
    - edit etl
      - use a variable to hold currently selected etl
      

*/
