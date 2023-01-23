import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import css from "@/styles/modal/Modal.module.scss";

const ModalComponent = (props) => {
  return (
    <section className={css.modal}>
      <div className={css.background}></div>
      {props.children}
    </section>
  );
};

const Modal = ({ children }) => {
  const portal = useRef();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    portal.current = document.getElementById("modal");
    setMounted(true);
  }, []);

  return (
    portal.current && (
      <>
        {mounted &&
          createPortal(
            <ModalComponent>{children}</ModalComponent>,
            portal.current
          )}
      </>
    )
  );
};

export default Modal;
