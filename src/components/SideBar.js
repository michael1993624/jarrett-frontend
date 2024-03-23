import { Link } from "react-router-dom";
import {FaIdBadge, FaTachometerAlt, FaUserAlt} from "react-icons/fa";
import {SiSpeedtest}  from 'react-icons/si';
import "./SideBar.scss";
import { useEffect } from "react";
import $ from 'jquery';

const SideBar = () => {
  useEffect(() => {  
    $(".nav-main-item").on("click", function() {
      $(".nav-main-item").removeClass("active");
      $(this).addClass("active");
    });
  }, []);
  return (
    <>
      <div className="sidebar">
        <div className="content-header">
          <div className="logo">
            <Link className="nav-main-link" to="/">
              <span className="nav-main-link-name">Revity</span>
            </Link>
          </div>
        </div>
        <div className="content-side">
          <ul className="nav-main">
            <li className="nav-main-item"
              id="nav-account">
              <Link className="nav-main-link" to="/account">
                <FaUserAlt style={{ marginRight: '10px' }}/>
                <span className="nav-main-link-name">Account</span>
              </Link>
            </li>
            <li className="nav-main-item" id="nav-dashboard">
              <Link className="nav-main-link" to="/dashboard">
                <SiSpeedtest style={{ marginRight: '10px' }}/>
                <span className="nav-main-link-name">DashBoard</span>
              </Link>
            </li>
            <li className="nav-main-item" id="nav-integrations">
              <Link className="nav-main-link" to="/integrations">
                <FaTachometerAlt style={{ marginRight: '10px' }}/>
                <span className="nav-main-link-name">Integrations</span>
              </Link>
            </li>
            <li className="nav-main-item" id="nav-profile">
              <Link className="nav-main-link" to="/profile">
                <FaIdBadge style={{ marginRight: '10px' }}/>
                <span className="nav-main-link-name">Profile</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideBar;