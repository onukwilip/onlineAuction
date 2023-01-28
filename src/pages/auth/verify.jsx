import Glassmorphism from "@/components/Glassmorphism";
import React from "react";
import { HeadComponent } from "..";
import PreHeader from "@/components/PreHeader";
import Header from "@/components/Header";
import css from "@/styles/auth/Auth.module.scss";
import useAjaxHook from "use-ajax-request";
import axios from "axios";

const Verify = (props) => {
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
            <h1>{props.message}</h1>
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

export const getServerSideProps = async ({ req, res }) => {
  const { query } = req;
  const response = await axios.get(
    `${process.env.API_DOMAIN}/api/auth?id=${query.id}&code=${query.code}`
  );

  if (response) {
    return {
      props: {
        message: "Congratulations, your email address has been confirmed",
      },
    };
  }

  return {
    props: {
      message: "Sorry, your link is either invalid or expired",
    },
  };
};
