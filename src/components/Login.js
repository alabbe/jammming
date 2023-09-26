import React from "react";

function Login(props) {

  console.log("is expired: ", props.isExpired);
  console.log("is authorized: ", props.isAuthorized);

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