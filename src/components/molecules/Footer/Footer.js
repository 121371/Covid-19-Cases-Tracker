import React from "react";

import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <footer className="bd-footer text-muted">
        <div className="p-3 p-md-5 description">
         
          <p className="m-0">
            Designed and built by{" "}
              @AmitPathak
          </p>
         
          <ul className="d-flex d-flex ml-0 pl-0 mb-0">
            <li>
              <a href="https://github.com/121371">GitHub</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/amit-pathak-bb627bba/">LinkedIn</a>
            </li>
          </ul>
          <p className="p-0 mb-0">
            Currently v2.0.0  
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;