import * as Yup from "yup";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";

import Input from "./Input";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "firebase.config";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

interface Props {}

const Container = styled.div`
  h1 {
    font-weight: 600;
    margin: 0rem 0 1.5rem 0;
    font-size: 2rem;

    span {
      color: ${({ theme }) => theme.blue};
    }
  }

  .error {
    margin-bottom: 0.75rem;
    color: ${({ theme }) => theme.red};
    font-size: 0.9rem;
  }

  .fade {
    margin-bottom: 1.5rem;
    opacity: 0.7;
    display: block;
    line-height: 1.4;
  }

  width: 100%;

  display: flex;
  justify-content: center;
  flex-direction: column;

  .register {
    margin: 2rem 0;

    span {
      cursor: pointer;
      margin-left: 0.25rem;
      color: ${({ theme }) => theme.blue};
    }
  }

  .privacy-consent {
    display: block;
    cursor: pointer;
    margin-bottom: 1.25rem;

    span {
      cursor: pointer;

      display: inline-block;
      color: ${({ theme }) => theme.blue};
      margin-bottom: 0.75rem;
    }
  }
`;

const Button = styled.button`
  width: 12.5em;
  height: 3em;
  margin-bottom: 2.5rem;

  background: ${({ theme }) => theme.blue};
  color: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 5px;

  &: disabled {
    opacity: 0.5;
  } ;
`;

const Forgot = styled.span`
  color: ${({ theme }) => theme.blue};
`;

const Login: React.FC<Props> = () => {
  const [formState, setFormState] = useState({
    error: "",
    loading: false,
  });

  const router = useRouter();

  const checkUser = async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    return docSnap.data();
  };

  return (
    <Container>
      <h1>
        <span>Log in</span> to your account
      </h1>

      <Formik
        enableReinitialize
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required("Required"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={async (values) => {
          setFormState((prev) => ({
            ...prev,
            loading: true,
          }));

          // sign in user
          signInWithEmailAndPassword(auth, values.email, values.password)
            .then(async ({ user }) => {
              if (!user) {
                setFormState((prev) => ({
                  error: "No user found",
                  loading: false,
                }));
                return;
              }

              const userData = await checkUser(user.uid);

              // check payment status
              if (!userData?.payment) {
                signOut(auth).then(() => {
                  router.push({
                    pathname: `/complete-registration/${userData?.role}`,
                    query: { uid: user.uid },
                  });
                });
                return;
              }

              // user is present and payement is verified
              router.push(`/dashboard/${user.uid}`);

              setFormState((prev) => ({
                ...prev,
                loading: false,
              }));
            })
            .catch((err) => {
              console.log(err);
              setFormState((prev) => ({
                error: err.message,
                loading: false,
              }));
            });
        }}
      >
        <Form>
          {formState.error && <div className="error">**{formState.error}</div>}
          <Input placeholder="E-mail Address" type="email" name="email" />

          <Input placeholder="Password" type="password" name="password" />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <label htmlFor="privacy-consent" className="privacy-consent">
              <Field
                id="privacy-consent"
                name="privacyConsent"
                type="checkbox"
              />
              Remember me
            </label>
            <Forgot>Forgot Password?</Forgot>
          </div>

          <Button disabled={formState.loading}>
            {formState.loading ? "Logging in" : "Log in"}
          </Button>
        </Form>
      </Formik>
    </Container>
  );
};

export default Login;
