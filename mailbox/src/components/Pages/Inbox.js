import React, { useEffect, useState } from "react";
import MailData from "./MailData";
import { Container } from "react-bootstrap";
import MailView from "./MailView";


const Inbox = () => {
  const [emailData, setEmailData] = useState([]);
  const [viewInbox, setViewInbox] = useState(true);
  const [viewMail, setViewMail] = useState("");
  const mailId = JSON.parse(localStorage.getItem("email"));
  const cleanMail = mailId.replace(/[@.]/g, "");

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await fetch(
          `https://mail-box-8b0df-default-rtdb.firebaseio.com/${cleanMail}.json`
        );
        const data = await res.json();
        // const arr = [];
        // for (const key in data) {
        //   arr.push({id: key, ...data[key]});
        // }
        setEmailData(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getItems();
  }, [cleanMail, viewInbox]);

  const mailViewHandler = (event) => {
    setViewMail({
      item: emailData[event.currentTarget.id],
      id: event.currentTarget.id,
    });
    setViewInbox(false);
  };

  const onSingleMailCloseHandler = () => {
    setViewMail("");
    setViewInbox(true);
  };

  const dataList = emailData ? (
    <ul>
      {Object.keys(emailData).map((item) => (
        <li
          style={{
            fontWeight: emailData[item].read ? "" : "bold",
            border: emailData[item].read ? '1px solid black': '2px solid black',
            borderRadius: '5px',
            marginBottom: "5px",
            listStyle: emailData[item].read ? "none" : "",
          }}
          onClick={mailViewHandler}
          id={item}
          key={item}
        >
          {" "}
          <MailData mail={emailData[item]} mailId={emailData[item].from} />
        </li>
      ))}
    </ul>
  ) : (
    <p>No Mails Found</p>
  );

  return (
    <Container>
      <h1 className="text-center fw-bold">Inbox</h1>
      {viewInbox && dataList}
      {viewMail && (
        <MailView onClose={onSingleMailCloseHandler} data={viewMail} />
      )}
    </Container>
  );
};

export default Inbox;
