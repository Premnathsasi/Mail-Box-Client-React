import React from "react";
import { Container, Button, Card } from "react-bootstrap";

const SentView = (props) => {
    return (
        <Container>
        <Button onClick={props.onClose}>Close</Button>
        <hr/>
      <Card>
        <Card.Header>To: {props.data.item.to}</Card.Header>
        <Card.Subtitle className="my-2 mx-3">Subject: {props.data.item.subject}</Card.Subtitle>
        <hr/>
        <Card.Text className="my-5 mx-3"> {props.data.item.composedMail} </Card.Text>
      </Card>
    </Container>
    )
};

export default SentView;