import React, { useState } from "react";
import css from "@/styles/loginSignup/LoginSignup.module.scss";
import { Button, Checkbox, Form, Input } from "semantic-ui-react";
import Link from "next/link";
import { useInput, useForm } from "use-manage-form";

const Login = (props) => {
  const {
    value: email,
    isValid: emailIsValid,
    inputIsInValid: emailInputIsInValid,
    onChange: onEmailChange,
    onBlur: onEmailBlur,
    reset: resetEmail,
  } = useInput(
    (/**@type String */ value) => value.trim() !== "" && value.includes("@")
  );

  const {
    value: password,
    isValid: passwordlIsValid,
    inputIsInValid: passwordInputIsInValid,
    onChange: onPasswordChange,
    onBlur: onPasswordBlur,
    reset: resetPassword,
  } = useInput((/**@type String */ value) => value.trim() !== "");

  const { executeBlurHandlers, formIsValid, reset } = useForm({
    blurHandlers: [onEmailBlur, onPasswordBlur],
    validateOptions: () => emailIsValid && passwordlIsValid,
    resetHandlers: [resetEmail, resetPassword],
  });

  const submitHandler = (/**@type Event */ e) => {
    e?.preventDefault();
    if (!formIsValid) {
      executeBlurHandlers();
      return false;
    }

    console.log("SUBMITTED", { email, password });
    reset();
  };
  return (
    <div className={css.login}>
      <div className={css.title}>
        <h1>Login</h1>
      </div>
      <Form onSubmit={submitHandler}>
        <Form.Field>
          <Form.Input
            icon="mail"
            iconPosition="left"
            placeholder="Enter email..."
            className={css.input}
            value={email}
            onChange={(e) => onEmailChange(e?.target?.value)}
            onBlur={onEmailBlur}
            error={
              emailInputIsInValid && {
                content: "Input must contain valid email address",
                pointing: "above",
              }
            }
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            type="password"
            icon="key"
            iconPosition="left"
            placeholder="Enter password..."
            className={css.input}
            value={password}
            onChange={(e) => onPasswordChange(e?.target?.value)}
            onBlur={onPasswordBlur}
            error={
              passwordInputIsInValid && {
                content: "Password must NOT be empty",
                pointing: "above",
              }
            }
          />
        </Form.Field>
        <Form.Field className={css.check}>
          <Checkbox label="Remember me" />
          <Link href="">Forgotten password?</Link>
        </Form.Field>
        <Button type="submit" className={css.submit}>
          Submit
        </Button>
      </Form>
      <div className={css["sign-up-link"]}>
        Don't have an acount?{" "}
        <em
          onClick={() => {
            props.setToogle("signup");
          }}
        >
          Sign Up
        </em>
      </div>
    </div>
  );
};

const Signup = (props) => {
  const {
    value: email,
    isValid: emailIsValid,
    inputIsInValid: emailInputIsInValid,
    onChange: onEmailChange,
    onBlur: onEmailBlur,
    reset: resetEmail,
  } = useInput(
    (/**@type String */ value) => value.trim() !== "" && value.includes("@")
  );

  const {
    value: password,
    isValid: passwordlIsValid,
    inputIsInValid: passwordInputIsInValid,
    onChange: onPasswordChange,
    onBlur: onPasswordBlur,
    reset: resetPassword,
  } = useInput(
    (/**@type String */ value) => value.trim() !== "" && value?.length >= 8
  );

  const {
    value: name,
    isValid: namelIsValid,
    inputIsInValid: nameInputIsInValid,
    onChange: onNameChange,
    onBlur: onNameBlur,
    reset: resetName,
  } = useInput((/**@type String */ value) => value.trim() !== "");

  const {
    value: confirmPassword,
    isValid: confirmPasswordlIsValid,
    inputIsInValid: confirmPasswordInputIsInValid,
    onChange: onConfirmPasswordChange,
    onBlur: onConfirmPasswordBlur,
    reset: resetConfirmPassword,
  } = useInput(
    (/**@type String */ value) => value?.trim() !== "" && value === password
  );

  const { executeBlurHandlers, formIsValid, reset } = useForm({
    blurHandlers: [
      onEmailBlur,
      onPasswordBlur,
      onNameBlur,
      onConfirmPasswordBlur,
    ],
    validateOptions: () =>
      emailIsValid &&
      passwordlIsValid &&
      namelIsValid &&
      confirmPasswordlIsValid,
    resetHandlers: [resetEmail, resetPassword, resetName, resetConfirmPassword],
  });

  const submitHandler = (/**@type Event */ e) => {
    e?.preventDefault();
    if (!formIsValid) {
      executeBlurHandlers();
      return false;
    }

    console.log("SUBMITTED", { email, password });
    reset();
  };
  return (
    <div className={css["sign-up"]}>
      <div className={css.title}>
        <h1>Sign up</h1>
      </div>
      <Form onSubmit={submitHandler}>
        <Form.Field>
          <Form.Input
            icon="user"
            iconPosition="left"
            placeholder="Enter name..."
            className={css.input}
            value={name}
            onChange={(e) => onNameChange(e?.target?.value)}
            onBlur={onNameBlur}
            error={
              nameInputIsInValid && {
                content: "Input must not be empty",
                pointing: "above",
              }
            }
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            icon="mail"
            iconPosition="left"
            placeholder="Enter email..."
            className={css.input}
            value={email}
            onChange={(e) => onEmailChange(e?.target?.value)}
            onBlur={onEmailBlur}
            error={
              emailInputIsInValid && {
                content: "Input must contain valid email address",
                pointing: "above",
              }
            }
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            type="password"
            icon="key"
            iconPosition="left"
            placeholder="Enter password..."
            className={css.input}
            value={password}
            onChange={(e) => onPasswordChange(e?.target?.value)}
            onBlur={onPasswordBlur}
            error={
              passwordInputIsInValid && {
                content: "Password must be greater than 8 characters",
                pointing: "above",
              }
            }
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            icon="key"
            iconPosition="left"
            placeholder="Confirm password..."
            className={css.input}
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e?.target?.value)}
            onBlur={onConfirmPasswordBlur}
            error={
              confirmPasswordInputIsInValid && {
                content: "Input must not be empty and must be same as password",
                pointing: "above",
              }
            }
          />
        </Form.Field>
        <Form.Field className={css.check}>
          <Checkbox label="I agree with the terms & conditions" />
        </Form.Field>
        <Button type="submit" className={css.submit}>
          Submit
        </Button>
      </Form>
      <div className={css["sign-up-link"]}>
        Already have an acount?{" "}
        <em
          onClick={() => {
            props.setToogle("login");
          }}
        >
          Sign In
        </em>
      </div>
    </div>
  );
};

const LoginSignup = (props) => {
  const [toogle, setToogle] = useState(props.active ? props.active : "login");
  return (
    <div className={css["login-signup"]}>
      {toogle === "login" ? (
        <Login setToogle={setToogle} />
      ) : (
        <Signup setToogle={setToogle} />
      )}
    </div>
  );
};

export default LoginSignup;
