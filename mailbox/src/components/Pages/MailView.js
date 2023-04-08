import React, { useEffect } from "react";
import { Button, Card, Container } from "react-bootstrap";

const MailView = (props) => {
  const mailId = JSON.parse(localStorage.getItem("email"));
  const cleanMail = mailId.replace(/[@.]/g, "");

  const endpoint = props.data.id;
  useEffect(() => {
    const viewMail = async () => {
      const res = await fetch(
        `https://mail-box-8b0df-default-rtdb.firebaseio.com/${cleanMail}/${endpoint}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            read: true,
          }),
        }
      );

      if (res.ok) {
        console.log("fetched");
      } else {
        console.log("failed");
      }
    };
    viewMail();
  }, [cleanMail, endpoint]);

  return (
    <Container>
        <Button onClick={props.onClose}>Close</Button>
        <hr/>
      <Card>
        <Card.Header>from: {props.data.item.from}</Card.Header>
        <Card.Subtitle className="my-2 mx-3">Subject: {props.data.item.subject}</Card.Subtitle>
        <hr/>
        <Card.Text className="my-5 mx-3"> {props.data.item.composedMail} </Card.Text>
      </Card>
    </Container>
  );
};

export default MailView;
