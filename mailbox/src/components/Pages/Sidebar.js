import React, {useState} from "react";
import ComposeMail from "./ComposeMail";
import Inbox from "./Inbox";
import SentItems from "./SentItems";
import { Button } from "react-bootstrap";

const SideBar = () => {

    const [inbox, setInbox] = useState(true);
    const [sentItem, setSentItems] = useState(false);
    const [composedMail, setComposeMail] = useState(false);

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
    return (
        <React.Fragment>
            <div className="container-fluid">
    <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
               
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <hr/>
                <li className="nav-item">
                        <Button onClick={composeMailHandler}>Compose Mail</Button>
                    </li>
                    <hr/>
                    <li className="nav-item">
                        <Button variant="link" className="text-white text-decoration-none" onClick={inboxHandler}>Inbox</Button>
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