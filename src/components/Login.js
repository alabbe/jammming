import React from "react";

function Login(props) {


  let button = "";
  if (props.isExpired === null || !props.isAuthorized) {
    button = <button onClick={props.onClick}>Authorize spotify</button>
  }

  return (
    <>
      {button}
    </>
  );

}

export default Login;