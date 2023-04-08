import React, { useCallback, useEffect, useState } from "react";
import MailData from "./MailData";
import { Container, CloseButton } from "react-bootstrap";
import SentView from "./SentView";

const SentItems = () => {
  const [emailData, setEmailData] = useState({});
  const [viewsent, setViewsent] = useState(true);
  const [viewMail, setViewMail] = useState("");
  const mailId = JSON.parse(localStorage.getItem("email"));
  const cleanMail = mailId.replace(/[@.]/g, "");

  const deleteHandler = useCallback(async (event) => {
    const result = window.confirm("Are you sure you want to delete?");
    if (result === true) {
      try {
        const res = await fetch(
          `https://mail-box-8b0df-default-rtdb.firebaseio.com/${cleanMail}sentItems/${event.currentTarget.id}.json`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();
        if (res.ok) {
          console.log("Deleted Successfully");
          setEmailData(data);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  });

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
      } catch (err) {
        console.log(err.message);
      }
    };
    getItems();
  }, [cleanMail, deleteHandler]);

  const mailViewHandler = (event) => {
    setViewMail({
      item: emailData[event.currentTarget.id],
      id: event.currentTarget.id,
    });
    setViewsent(false);
  };

  const onSingleMailCloseHandler = () => {
    setViewMail("");
    setViewsent(true);
  };

  const dataList = emailData ? (
    <ul>
      {Object.keys(emailData).map((item) => (
        <div
          className="d-flex justify-content-evenly align-items-center row"
          key={item}
        >
          <li
            style={{
              border: "1px solid black",
              marginBottom: "5px",
              borderRadius: "5px",
            }}
            className="list-group-item col-10"
            onClick={mailViewHandler}
            id={item}
          >
            {" "}
            <MailData mail={emailData[item]} mailId={emailData[item].to} />
          </li>
          <CloseButton className="col-2" id={item} onClick={deleteHandler} />
        </div>
      ))}
    </ul>
  ) : (
    <p>No data Found</p>
  );

  return (
    <Container>
      <h1 className="text-center fw-bold">Sent Mails</h1>
      {viewsent && dataList}
      {viewMail && (
        <SentView onClose={onSingleMailCloseHandler} data={viewMail} />
      )}
    </Container>
  );
};

export default SentItems;
