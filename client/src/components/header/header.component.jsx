import React from 'react';
import './header.style.scss';
import { withRouter } from "react-router";


import { Link } from 'react-router-dom';

const Header = (props) => {
  const currPath = props.location.pathname;

  let linkComponents;

  if (currPath === "/") {
    linkComponents = (
      <div>
        <Link className="link" to="/edit-etl">
          Edit ETL
       </Link>
        <Link className="link" to="/add-etl">
          Add ETL
        </Link>
      </div>
    )
  } else if (currPath === "/edit-etl") {
    linkComponents = (
      <div>
        <Link className="link" to="/">
          Home
       </Link>
        <Link className="link" to="/add-etl">
          Add ETL
        </Link>
      </div>
    )
  } else if (currPath === "/add-etl") {
    linkComponents = (
      <div>
        <Link className="link" to="/">
          Home
       </Link>
        <Link className="link" to="/edit-etl">
          Edit ETL
        </Link>
      </div>
    )
  }


  return (
    <div className="header">
      <ul className="link-list">
        <li className="link">
          {
            linkComponents
          }
        </li>
      </ul>
    </div>
  )
};

export default withRouter(Header);