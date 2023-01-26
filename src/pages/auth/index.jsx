import React from "react";
import css from "@/styles/auth/Auth.module.scss";
import Glassmorphism from "@/components/Glassmorphism";
import { Divider } from "semantic-ui-react";
import PreHeader from "@/components/PreHeader";
import Header from "@/components/Header";
import { HeadComponent } from "..";

const Auth = () => {
  return (
    <>
      <HeadComponent></HeadComponent>
      <div className={css.auth}>
        <div className={css["pre-header"]}>
          <PreHeader />
        </div>
        <Header />
        <div className={css.body}>
          <Glassmorphism className={css.trans}>
            <h1>Verify your email</h1>
            <Divider />
            <p>
              A link has been sent to your email address, please click the link
              to verify your email
            </p>
            <p>
              Didin't recieve the link? <a>Resend</a>
            </p>
          </Glassmorphism>
        </div>
      </div>
    </>
  );
};

export default Auth;
