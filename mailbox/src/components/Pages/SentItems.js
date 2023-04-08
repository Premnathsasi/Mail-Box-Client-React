import React, { useEffect, useState } from "react";
import MailData from "./MailData";
import { Container } from "react-bootstrap";
import SentView from "./SentView";

const SentItems = () => {
  const [emailData, setEmailData] = useState([]);
  const [viewsent, setViewsent] = useState(true)
  const [viewMail, setViewMail] = useState("");
  const mailId = JSON.parse(localStorage.getItem("email"));
  const cleanMail = mailId.replace(/[@.]/g, "");

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await fetch(
          `https://mail-box-8b0df-default-rtdb.firebaseio.com/${cleanMail}sentItems.json`
        );
        const data = await res.json();
        // const arr = [];
        // for (const key in data) {
        //   arr.push({id: key, ...data[key]});
        // }
        setEmailData(data);
        console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getItems();
  }, [cleanMail]);

  const mailViewHandler = (event) => {
    setViewMail({item:emailData[event.currentTarget.id], id: event.currentTarget.id});
    setViewsent(false);
  };

  const onSingleMailCloseHandler = () => {
    setViewMail('');
    setViewsent(true)
  };


  const dataList = emailData ? (
    <ul>
      {Object.keys(emailData).map((item) => (
        <li style={{
            border:'1px solid black',
            marginBottom: '5px',
            borderRadius: '5px',
        }} className="list-group-item" onClick={mailViewHandler} id={item} key={item}>
          {" "}
          <MailData mail={emailData[item]} mailId={emailData[item].to} />
        </li>
      ))}
    </ul>
  ) : (
    <p>No data Found</p>
  );

  return (
   
      <Container>
        <h1 className="text-center fw-bold">Sent Mails</h1>
        {viewsent && dataList}
        {viewMail && <SentView onClose={onSingleMailCloseHandler} data={viewMail} />}
      </Container>
  );
};

export default SentItems;
