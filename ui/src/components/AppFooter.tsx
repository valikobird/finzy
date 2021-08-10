import React, {Fragment} from "react";
import './AppFooter.css';

export default function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <Fragment>
      <hr/>
      <p className="footer">Copyright &copy; {currentYear} Valentyn Zozulia</p>
    </Fragment>
  );
};
