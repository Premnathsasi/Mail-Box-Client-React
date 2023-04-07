import React, { useEffect, useState } from "react";
import MailData from "./MailData";
import { Container } from "react-bootstrap";

const Inbox = () => {
  const [emailData, setEmailData] = useState([]);
  const mailId = JSON.parse(localStorage.getItem("email"));
  const cleanMail = mailId.replace(/[@.]/g, "");

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await fetch(
          `https://mail-box-8b0df-default-rtdb.firebaseio.com/${cleanMail}.json`
        );
        const data = await res.json();
        const arr = [];
        for (const key in data) {
          arr.push(data[key]);
        }
        setEmailData(arr);
        console.log(arr);
      } catch (err) {
        console.log(err.message);
      }
    };
    getItems();
  }, [cleanMail]);

  const dataList = emailData ? emailData.map((item) => (
    <MailData mail={item} key={Math.random()} mailId={item.from} />
  )) : <p>No data Found</p>

  return (
   
      <Container>
        <h1 className="text-center fw-bold">Inbox</h1>
        {dataList}
      </Container>
  );
};

export default Inbox;
