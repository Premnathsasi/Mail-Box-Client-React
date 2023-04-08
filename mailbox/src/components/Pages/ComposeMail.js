import React, { useState, useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import { Col, Form, Row, Card, Button } from "react-bootstrap";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import classes from "./ComposeMail.module.css";

const ComposeMail = () => {
  const toRef = useRef();
  const subjectRef = useRef();
  const emailID = JSON.parse(localStorage.getItem("email"));
  const senderMail = emailID.replace(/[@.]/g, "");

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredToMail = toRef.current.value;
    const enteredSubject = subjectRef.current.value;
    const receiverMail = enteredToMail.replace(/[@.]/g, "");
    const mailData = {
      to: enteredToMail,
      from: emailID,
      subject: enteredSubject,
      composedMail: editorState.getCurrentContent().getPlainText(),
      read: false,
    };
    try {
      const res = await fetch(
        `https://mail-box-8b0df-default-rtdb.firebaseio.com/${senderMail}sentItems.json`,
        {
          method: "POST",
          body: JSON.stringify(mailData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      await fetch(`https://mail-box-8b0df-default-rtdb.firebaseio.com/${receiverMail}.json`,{
        method: "POST",
        body: JSON.stringify(mailData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.ok) {
        console.log(data);
      } else {
        throw new Error("Sending Failed");
      }
    } catch (err) {
      console.log(err.message);
    }
    toRef.current.value = "";
    subjectRef.current.value = "";
    setEditorState(EditorState.createEmpty());
  };

  return (
    <React.Fragment>
      <Row className="vh-100 d-flex justify-content-center align-items-center ">
        <Col md={8} lg={8} xs={12}>
          <Card className="px-4">
            <h3 className="text-center my-4">Compose Mail</h3>
            <Form onSubmit={submitHandler}>
              <Form.Group className=" d-flex mb-5" controlId="email">
                <Form.Label className="me-3 fw-bold text-secondary">
                  To:
                </Form.Label>
                <Form.Control
                  type="email"
                  className="border-top-0 border-start-0 border-end-0"
                  ref={toRef}
                  required
                />
              </Form.Group>
              <Form.Group className=" d-flex mb-3" controlId="subject">
                <Form.Label className="me-3 fw-bolder text-secondary">
                  Subject:
                </Form.Label>
                <Form.Control
                  type="text"
                  className="border-top-0 border-start-0 border-end-0"
                  ref={subjectRef}
                  required
                />
              </Form.Group>
              <hr />
              <Form.Group>
                <Form.Label className="me-3 fw-bolder text-secondary">
                  compose mail
                </Form.Label>
                <Editor
                  editorState={editorState}
                  onEditorStateChange={setEditorState}
                  wrapperClassName={classes.wrapperclass}
                  editorClassName={classes.editorclass}
                  toolbarClassName={classes.toolbarclass}
                />
              </Form.Group>
              <div className="d-flex justify-content-center mb-3">
                <Button variant="success" type="submit">
                  Send Mail
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ComposeMail;
