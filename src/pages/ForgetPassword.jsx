import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { auth } from "../firebase-config";

function ForgetPassword() {
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value)
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
        await sendPasswordResetEmail(auth,email)
        toast.success('Email was sent')
    } catch (err) {
        toast.error('Could not send an email to reset')
    }
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forget Password</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <Link className="forgotPasswordLink" to="/sign-in">
            Sign In
          </Link>

          <div className="signInBar">
            <div className="signInText">Send Reset Link </div>
            <button className="signInButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgetPassword;
