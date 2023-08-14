import Link from "next/link";
import styles from "./Login.module.scss";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "@/state";
import Head from "next/head";
import api from "@/api";

export default function Login() {
  const [usernameValue, setUsernameValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const inputUsername = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const changeHandler = () => {
    setUsernameValue(inputUsername.current?.value!);
    setPasswordValue(inputPassword.current?.value!);
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formURL = `${api}/auth/login`
    const data = {
      username: usernameValue,
      password: passwordValue,
    };

    // POST the data to the URL of the form
    const loggedInRes = await fetch(formURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const loggedIn = await loggedInRes.json();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      localStorage.setItem("user", loggedIn.user);
      localStorage.setItem("token", loggedIn.token);
    }
  };

  return (
    <>
    <Head>
          <title>Log In</title>
        </Head>
      <div className={styles.wrapper}>
        <h1>Login</h1>
        <form onSubmit={submitForm}>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              ref={inputUsername}
              className={styles.inputgiday}
              onChange={changeHandler}
              value={usernameValue}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              ref={inputPassword}
              className={styles.inputgiday}
              onChange={changeHandler}
              value={passwordValue}
            />
          </div>

          <button type="submit" 
              className={styles.loginBtn}
              >Login</button>
        </form>

        <Link href="/signup">Sign Up</Link>
      </div>
    </>
  );
}
