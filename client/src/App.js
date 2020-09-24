import React from 'react';

import { Switch, Route } from 'react-router-dom';

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
