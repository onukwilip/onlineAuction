import Glassmorphism from "@/components/Glassmorphism";
import React from "react";
import { HeadComponent } from "..";
import PreHeader from "@/components/PreHeader";
import Header from "@/components/Header";
import css from "@/styles/auth/Auth.module.scss";

const Verify = () => {
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
            <h1>Congratulations, your email address has been confirmed</h1>
            <p>
              <a> Go to home page </a>
            </p>
          </Glassmorphism>
        </div>
      </div>
    </>
  );
};

export default Verify;
