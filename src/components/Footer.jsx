import React from "react";
import css from "@/styles/footer/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={css.footer}>
      &copy;Copyright {new Date().getFullYear()} GOIT
    </footer>
  );
};

export default Footer;
