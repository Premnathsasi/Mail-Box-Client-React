import React, { useState, useRef } from "react";
import Spinner from "../Ui/Spinner";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

function AuthForm() {
  const [isLoading, setisLoading] = useState(false);

  const emailInput = useRef();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;
    const enteredConfirmPassword = confirmPasswordInput.current.value;
    setisLoading(true);
    if (enteredPassword !== enteredConfirmPassword) {
      alert("Password does not match with confirm password");
      setisLoading(false);
    } else {
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyASHKaq4NlTpzxGNdPos9sAms1-QX54hzs",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setisLoading(false);

        if (!res.ok) {
          throw new Error("SignUp failed, Please try again...");
        }

        const data = await res.json();
        console.log("User has successfully signed up");
        console.log(data.email);
        alert("Account Created successfully");
      } catch (err) {
        alert(err.message);
      }
    };
    emailInput.current.value = '';
    passwordInput.current.value= '';
    confirmPasswordInput.current.value= '';
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center ">
          <Col md={8} lg={4} xs={12}>
            <Card className="px-2">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center">Sign Up</h2>
                  <div className="mb-3">
                    <Form onSubmit={submitHandler}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          ref={emailInput}
                          required
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          ref={passwordInput}
                          required
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPasswords"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          ref={confirmPasswordInput}
                          required
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        {!isLoading && (
                          <Button variant="primary" type="submit">
                            Create Account
                          </Button>
                        )}
                        {isLoading && <Spinner />}
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account??{" "}
                        <Button  variant="link" className=" fw-bold">Sign In</Button>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AuthForm;
