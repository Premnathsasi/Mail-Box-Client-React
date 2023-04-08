import React, {useState, useEffect} from "react";
import ComposeMail from "./ComposeMail";
import Inbox from "./Inbox";
import SentItems from "./SentItems";
import { Button } from "react-bootstrap";

const SideBar = () => {

    const [inbox, setInbox] = useState(true);
    const [counter, setCounter] = useState(0);
    const [sentItem, setSentItems] = useState(false);
    const [composedMail, setComposeMail] = useState(false);
    const mailId = JSON.parse(localStorage.getItem("email"));
    const cleanMail = mailId.replace(/[@.]/g, "");

    const composeMailHandler = () => {
        setComposeMail(true);
        setInbox(false);
        setSentItems(false);
    };

    const inboxHandler = () => {
        setComposeMail(false);
        setInbox(true);
        setSentItems(false);
    };

    const sentItemsHandler = () => {
        setComposeMail(false);
        setInbox(false);
        setSentItems(true);
    };

    
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await fetch(
          `https://mail-box-8b0df-default-rtdb.firebaseio.com/${cleanMail}.json`
        );
        const data = await res.json();
        let count = 0
        for (const key in data) {
          if (data[key].read === false) {
            count++;
        }
        }
        setCounter(count)
        console.log(counter);
      } catch (err) {
        console.log(err.message);
      }
    };
    getItems();
  });
    return (
        <React.Fragment>
            <div className="container-fluid">
    <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
               
                <ul className=" nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <hr/>
                <li className="nav-item ">
                        <Button onClick={composeMailHandler}>Compose Mail</Button>
                    </li>
                    <hr/>
                    <li className="nav-item ">
                        <Button variant="link" className="text-white text-decoration-none" onClick={inboxHandler}>Inbox  <span className="badge text-bg-secondary">{counter > 0 ? counter : ''}</span></Button>
                    </li>
                    <hr/>
                    <li className="nav-item">
                        <Button variant="link" className="text-white text-decoration-none" onClick={sentItemsHandler}>Sent Items</Button>
                    </li>
                </ul>
                <hr/>
            </div>
        </div>
        <div className="col py-3">
            {composedMail && <ComposeMail />}
            {inbox && <Inbox />}
            {sentItem && <SentItems />}
        </div>
    </div>
</div>
        </React.Fragment>
    )
};

export default SideBar;