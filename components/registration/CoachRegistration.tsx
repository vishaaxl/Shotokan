import Image from "next/image";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Input, { Error } from "../Input";
import {
  Button,
  Container,
  TwoColumn,
  TwoColumnGrid,
} from "components/registration/StudentRegister";
import { useRouter } from "next/router";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "firebase.config";
import { doc, setDoc } from "firebase/firestore";

interface Props {}
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const CoachRegistration: React.FC<Props> = () => {
  const [formState, setFormState] = useState({
    error: "",
    loading: false,
  });
  const router = useRouter();
  return (
    <Container>
      <Image
        src="/images/logo.png"
        alt="Image of guys practicing karate"
        width={155}
        height={147}
      />
      <h1>
        <span>Coach</span> Registration
      </h1>

      <span className="fade">
        Fill all the details accurately, Adminstrator has the right to reject
        the registration if deatils are found wrong or unrelatable.
      </span>
      <Formik
        enableReinitialize
        initialValues={{
          firstname: "",
          lastname: "",
          designation: "",
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
          designation: Yup.string().required("Required"),
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
                role: "coach",
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                designation: values.designation,
                phoneNumber: values.phoneNumber,
                payment: false,
              })
                .then(() => {
                  router.push({
                    pathname: "/complete-registration/coach",
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
        {({ touched, errors }) => (
          <Form>
            <TwoColumn>
              <Input placeholder="First Name" name="firstname" />
              <Input placeholder="Last Name" name="lastname" />
            </TwoColumn>
            <Input
              placeholder="Select Designation"
              name="designation"
              component="select"
            >
              <option value="Chief Instructor">Chief Instructor</option>
              <option value="Instructor">Instructor</option>
              <option value="Assistant Instructor">Assistant Instructor</option>
            </Input>
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
                name="confirmpassword"
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

export default CoachRegistration;
