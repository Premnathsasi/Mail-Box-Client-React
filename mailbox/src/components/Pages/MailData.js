import React from 'react';

import classes from './MailData.module.css';

const MailData = (props) => {
  return (
    <div className={classes.main}>
        <i className='ri-user-shared-fill'></i>
        <div className={classes.mailId}>{props.mailId}</div>
     
      <span className={classes.title}>{props.mail.subject}</span>
      <span className={classes.body}>{props.mail.composedMail}</span>
    </div>
  );
};

export default MailData;