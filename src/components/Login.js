import React from "react";
import commonStyles from "../css/Common.module.css";
import styles from "../css/Login.module.css";

function Login(props) {


  let button = "";
  if (props.isExpired === null || !props.isAuthorized) {
    button = <button onClick={props.onClick} className={commonStyles.secondaryButton}>Authorize spotify</button>
  }

  return (
    <div className={styles.Login}>
      {button}
    </div>
  );

}

export default Login;