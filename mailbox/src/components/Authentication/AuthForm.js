import React, { useState, useRef } from "react";
import Spinner from "../Ui/Spinner";
import { Col, Button, Row, Card, Form } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { authActions } from "../store/AuthSlice";
import classes from "./AuthForm.module.css";

function AuthForm() {

     const navigate = useNavigate();
     const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const [isLogin, setLogin] = useState(true);

  const emailInput = useRef();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;
    setisLoading(true);
    if (isLogin) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyASHKaq4NlTpzxGNdPos9sAms1-QX54hzs",
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
        if (!response.ok) {
          throw new Error("Authentication Failed");
        }
        const data = await response.json();
        dispatch(authActions.login({
            email: data.email,
            idToken: data.idToken
        }));
        navigate('/sidebar');
        console.log(data.email, data.idToken);


      } catch (err) {
        alert(err.message);
      }
    } else {
        const enteredConfirmPassword = confirmPasswordInput.current.value;
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
          setLogin(true);
        } catch (err) {
          alert(err.message);
        }
      }
    }
    emailInput.current.value = "";
    passwordInput.current.value = "";
  };

  const toggleHandler = () => {
    setLogin((prev) => !prev);
  };

  return (
    <div className={classes.container}>
      <Row className="vh-100 d-flex justify-content-center align-items-center ">
        <Col md={8} lg={3} xs={11}>
          <Card className="px-2">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-2 text-center">
                  {isLogin ? "Login" : "Sign Up"}
                </h2>
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

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        ref={passwordInput}
                        required
                      />
                    </Form.Group>
                    {!isLogin && (
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
                    )}
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicCheckbox"
                    ></Form.Group>
                    <div className="d-grid justify-content-center">
                      {!isLoading && (
                        <Button variant="primary" type="submit">
                          {isLogin ? "Sign in" : "Create Account"}
                        </Button>
                      )}
                      {isLoading && <Spinner />}
                    </div>
                  </Form>
                  <div className="mt-3 border border-info">
                    <p className="mb-0  text-center">
                      {isLogin
                        ? "Don't have an account?"
                        : "Already have an account??"}{" "}
                      <Button
                        onClick={toggleHandler}
                        variant="link"
                        className=" fw-bold"
                      >
                        {isLogin ? "Sign up" : "Sign in"}
                      </Button>
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AuthForm;
