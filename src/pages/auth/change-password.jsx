import Glassmorphism from "@/components/Glassmorphism";
import React, { useEffect } from "react";
import { HeadComponent } from "..";
import PreHeader from "@/components/PreHeader";
import Header from "@/components/Header";
import css from "@/styles/auth/Auth.module.scss";
import useAjaxHook from "use-ajax-request";
import axios from "axios";
import Link from "next/link";
import { Button, Divider, Form } from "semantic-ui-react";
import { useForm, useInput } from "use-manage-form";

const ChangePassword = (props) => {
  const {
    value: verifyOTP,
    isValid: verifyOTPIsValid,
    inputIsInValid: verifyOTPInputIsInValid,
    onChange: onVerifyOTPChange,
    onBlur: onVerifyOTPBlur,
  } = useInput((value) => value?.trim() !== "");

  const {
    value: password,
    isValid: passwordIsValid,
    inputIsInValid: passwordInputIsInValid,
    onChange: onPasswordChange,
    onBlur: onPasswordBlur,
  } = useInput((value) => value?.length >= 8);

  const {
    value: confirmPassword,
    isValid: confirmPasswordIsValid,
    inputIsInValid: confirmPasswordInputIsInValid,
    onChange: onConfirmPasswordChange,
    onBlur: onConfirmPasswordBlur,
  } = useInput((value) => value?.trim() !== "" && value === password);

  const { executeBlurHandlers, formIsValid } = useForm({
    blurHandlers: [onVerifyOTPBlur, onPasswordBlur, onConfirmPasswordBlur],
    validateOptions: () =>
      verifyOTPIsValid && passwordIsValid && confirmPasswordIsValid,
  });

  const onSubmit = () => {
    if (!formIsValid) return executeBlurHandlers();
  };

  return (
    <>
      <HeadComponent></HeadComponent>
      <div className={css.auth}>
        <div className={css["pre-header"]}>
          <PreHeader />
        </div>
        <Header />
        <div className={css.body}>
          <Glassmorphism className={css["change-password"]}>
            <h2>Change password</h2>
            <Divider />
            <Form onSubmit={onSubmit}>
              <Form.Input
                icon="unlock"
                iconPosition="left"
                placeholder="Enter OTP..."
                className={css.input}
                value={verifyOTP}
                onChange={(e) => onVerifyOTPChange(e.target.value)}
                onBlur={onVerifyOTPBlur}
                error={
                  verifyOTPInputIsInValid && {
                    content: "Input must not be empty",
                    pointing: "above",
                  }
                }
              />
              <Form.Input
                icon="key"
                iconPosition="left"
                placeholder="Enter new password..."
                className={css.input}
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                onBlur={onPasswordBlur}
                error={
                  passwordInputIsInValid && {
                    content: "Input must equal 8 characters or more",
                    pointing: "above",
                  }
                }
              />

              <Form.Input
                icon="key"
                iconPosition="left"
                placeholder="Confirm new password..."
                className={css.input}
                value={confirmPassword}
                onChange={(e) => onConfirmPasswordChange(e.target.value)}
                onBlur={onConfirmPasswordBlur}
                error={
                  confirmPasswordInputIsInValid && {
                    content: "Input must equal password input",
                    pointing: "above",
                  }
                }
              />

              <div className={css.actions}>
                <Button className={css.send}>Change password</Button>
              </div>
            </Form>
          </Glassmorphism>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
