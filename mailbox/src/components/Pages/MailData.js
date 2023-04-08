import React from "react";

import classes from "./MailData.module.css";
import { Container } from "react-bootstrap";

const MailData = (props) => {
  return (
    <Container className="row" onClick={props.onClick}>
      <div className={classes.main}>
        <div className={classes.mailId}>{props.mailId}</div>
        <span className={classes.title}>{props.mail.subject}</span>
      </div>  
    </Container>
  );
};

export default MailData;
