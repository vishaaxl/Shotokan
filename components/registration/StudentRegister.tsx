import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Input from "../Input";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "firebase.config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { Error } from "components/Input";

interface Props {}

export const Container = styled.main`
  h1 {
    font-weight: 600;
    margin: 1rem 0 1.5rem 0;
    font-size: 2rem;

    span {
      color: ${({ theme }) => theme.blue};
    }
  }

  .fade {
    margin-bottom: 1rem;
    opacity: 0.7;
    display: block;
    line-height: 1.4;
  }

  .error {
    margin-bottom: 0.75rem;
    color: ${({ theme }) => theme.red};
    font-size: 0.9rem;
  }

  width: 90%;
  max-width: 32rem;
  margin: 2rem auto;

  display: flex;
  justify-content: center;
  flex-direction: column;

  @media (min-width: 425px) {
    margin: 2rem auto 2rem 3rem;
  }

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
    margin-bottom: 1rem;

    span {
      cursor: pointer;

      display: inline-block;
      color: ${({ theme }) => theme.blue};
      margin-bottom: 0.75rem;
    }
  }
`;

export const Button = styled.button`
  width: 12.5em;
  height: 3em;

  background: ${({ theme }) => theme.blue};
  color: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 5px;

  &:disabled {
    opacity: 0.5;
  }
`;

export const TwoColumn = styled.div`
  @media (min-width: 767px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;

export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 7fr;
  gap: 1rem;
  align-items: end;
`;

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const StudentRegister: React.FC<Props> = () => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    error: "",
    loading: false,
  });

  return (
    <Container>
      <Image
        src="/images/logo.png"
        alt="Image of guys practicing karate"
        width={155}
        height={147}
      />
      <h1>
        <span>Student</span> Registration
      </h1>

      <span className="fade">
        Fill all the details accurately, Adminstrator has the right to reject
        the registration if deatils are found wrong or unrelatable.
      </span>
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          privacyConsent: false,
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Required"),
          lastname: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Required"),
          email: Yup.string().email("Invalid email").required("Required"),
          phoneNumber: Yup.string().matches(
            phoneRegExp,
            "Phone number is not valid"
          ),
          password: Yup.string().required("Password is required"),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Passwords must match"
          ),
          privacyConsent: Yup.boolean().oneOf(
            [true],
            "*You must accept the terms and conditions"
          ),
        })}
        onSubmit={async (values, { resetForm }) => {
          setFormState((prev) => ({ ...prev, loading: true }));

          await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
          )
            .then(async ({ user }) => {
              const dbRef = doc(db, "users", user.uid);
              await setDoc(dbRef, {
                user: user.uid,
                role: "student",
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                phoneNumber: values.phoneNumber,
                payment: false,
              })
                .then(() => {
                  router.push({
                    pathname: "/complete-registration/student",
                    query: { uid: user.uid },
                  });
                  resetForm();
                  setFormState((prev) => ({ ...prev, loading: false }));
                })
                .catch((err) => {
                  console.log(err);
                  setFormState((prev) => ({
                    error: "Something went wrong, try again later",
                    loading: false,
                  }));
                });
            })
            .catch((err) => {
              window.scrollTo(0, 0);
              setFormState((prev) => ({
                error: "User with this email alreay exists, Login to continue",
                loading: false,
              }));
            });
        }}
      >
        {({ isValid, errors, touched }) => (
          <Form>
            {formState.error && (
              <div className="error">**{formState.error}</div>
            )}
            <TwoColumn>
              <Input placeholder="First Name" name="firstname" />
              <Input placeholder="Last Name" name="lastname" />
            </TwoColumn>
            <Input placeholder="E-mail Address" type="email" name="email" />
            <TwoColumnGrid>
              <Input
                placeholder="Country Code"
                type="tel"
                name="countryCode"
                value="+91"
              />
              <Input placeholder="Phone Number" type="tel" name="phoneNumber" />
            </TwoColumnGrid>
            <TwoColumn>
              <Input placeholder="Password" type="password" name="password" />
              <Input
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
              />
            </TwoColumn>
            <label htmlFor="privacy-consent" className="privacy-consent">
              <Field
                id="privacy-consent"
                name="privacyConsent"
                type="checkbox"
              />
              I agree to all the <span>Term of conditions</span> &{" "}
              <span>Privacy Policy</span>
              {touched.privacyConsent && errors.privacyConsent ? (
                <Error className="error">{errors.privacyConsent}</Error>
              ) : null}
            </label>

            <Button disabled={formState.loading}>Next</Button>
            <div className="register">
              Already have an account?
              <span>Log In</span>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default StudentRegister;
