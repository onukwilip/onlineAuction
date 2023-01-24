import React, { useState } from "react";
import css from "@/styles/header/Header.module.scss";
import { Button, Icon } from "semantic-ui-react";
import logo from "@/assets/img/icons8-auction-96.png";
import Link from "next/link";
import PreHeader from "./PreHeader";
import Modal from "./Modal";
import LoginSignup from "./LoginSignup";

const MobilePreHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const [toogleLoginSIgnup, setToogleLoginSIgnup] = useState("");

  return (
    <>
      <div className={css["mobile-pre-header"]}>
        <div className={css.phone}>
          <Icon name="phone volume" />
          <div>
            <em>Freephone:</em>
            <em>+234 9071589571</em>
          </div>
        </div>
        <div className={css.text}>
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
              <Icon name="arrow right " size="small" />
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

const Header = () => {
  const [showMobile, setShowMobile] = useState(false);
  const [showContactMenu, setShowContactMenu] = useState(false);
  return (
    <header className={css.header}>
      {!showMobile && (
        <div
          className={css.hamburger}
          onClick={() => {
            setShowMobile((prev) => !prev);
          }}
        >
          <Icon name={!showMobile ? "bars" : "arrow left"} />
        </div>
      )}
      <div className={css.title}>
        <img src={logo.src} alt="logo" />
        <em>
          online<b>Aunction</b>
        </em>
      </div>
      <div className={css.elipsis}>
        <Icon
          name="fa-solid fa-ellipsis-vertical"
          onClick={() => {
            setShowContactMenu((prev) => !prev);
          }}
        />
        {showContactMenu && (
          <div className={`${css["contact-menu"]}`}>
            <MobilePreHeader />
          </div>
        )}
      </div>
      <nav className={`${showMobile ? css.mobile : ""} ${css.menu}`}>
        <ul>
          <li>
            <Link href="/">
              <Icon name="home" /> Home
            </Link>
          </li>

          <li>
            <Link href="/shop">
              <Icon name="cart" /> Shop
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              <Icon name="user" /> Dashboard
            </Link>
          </li>
        </ul>
        <div
          className={css.hamburger}
          onClick={() => {
            setShowMobile((prev) => !prev);
          }}
        >
          <Icon name={"arrow left"} color="white" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
