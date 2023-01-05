import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState, FormEvent, SyntheticEvent } from "react";
import { login } from "../services/login";
import { validateToken } from "../services/validateToken";

import styles from "../styles/main.module.scss";

const LoginPage = () => {
  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    error && setError(false);
    setCreds({
      ...creds,
      [name]: value,
    });
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = await login(creds);

    if (!data.status) {
      setError(true);
    }

    router.push("/dashboard");
  };

  return (
    <div className={styles.Login}>
      <form onSubmit={handleSubmit} className={styles.formLogin}>
        <h1>Login</h1>
        {error && (
          <p className={styles.errorMessage}>
            Invalid Credentials, try again...
          </p>
        )}
        <input
          type='email'
          name='email'
          placeholder='email'
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='password'
          onChange={handleChange}
          required
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (req.headers.cookie) {
    const token = req.headers.cookie?.replace("token=", "");
    const data = await validateToken(token);
    if (data) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  }
  return {
    props: {},
  };
};

export default LoginPage;
