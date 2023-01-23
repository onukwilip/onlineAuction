import React, { useState } from "react";
import css from "@/styles/preHeader/PreHeader.module.scss";
import { Button, Icon } from "semantic-ui-react";
import Modal from "./Modal";
import LoginSignup from "./LoginSignup";

const PreHeader = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [toogleLoginSIgnup, setToogleLoginSIgnup] = useState("");
  return (
    <>
      <div className={`${css["pre-header"]} ${props.className}`}>
        <div className={css.contact}>
          <Icon name="phone volume" size="big" color="yellow" />
          <em>Freephone:</em> <em>+234 9071589571</em>
        </div>
        <div className={css.opening}>
          Opening Hours: 8am-8pm PST M-Th; 6am-3pm PST Fri
        </div>
        <div className={css.actions}>
          <Button
            animated="vertical"
            className={css["sign-in"]}
            onClick={() => {
              setShowModal((prev) => !prev);
              setToogleLoginSIgnup("login");
            }}
          >
            <Button.Content hidden>Sign in</Button.Content>
            <Button.Content visible>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
          <Button
            animated="vertical"
            className={css["sign-up"]}
            onClick={() => {
              setShowModal((prev) => !prev);
              setToogleLoginSIgnup("signup");
            }}
          >
            <Button.Content hidden>Sign up</Button.Content>
            <Button.Content visible>
              <Icon name="user plus" />
            </Button.Content>
          </Button>
        </div>
      </div>
      {showModal && (
        <Modal show={setShowModal}>
          <LoginSignup active={toogleLoginSIgnup} />
        </Modal>
      )}
    </>
  );
};

export default PreHeader;
