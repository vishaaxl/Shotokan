import Image from "next/image";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Input, { Error, InputBlock } from "../Input";
import {
  Button,
  Container,
  TwoColumn,
} from "components/registration/StudentRegister";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { states } from "data/states";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "firebase.config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

interface Props {
  uid: string | string[] | undefined;
}

const StudentPersonalForm: React.FC<Props> = ({ uid }) => {
  const [formState, setFormState] = useState({
    error: "",
    loading: false,
  });

  const [statesData, setStatesData] = useState<any>({});
  const [profileUrl, setProfileUrl] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    setStatesData(states);
  }, []);

  const uploadFile = (
    file: any,
    setData: any,
    callbackfunction: (url: string) => void
  ) => {
    if (!file) return;

    const storageRef = ref(storage, `/students/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setData(url);
          callbackfunction(url);
        });
      }
    );
  };

  return (
    <Container>
      <Image
        src="/images/logo.png"
        alt="Image of guys practicing karate"
        width={155}
        height={147}
      />
      <h1>
        <span>Black Belt</span> Registration
      </h1>

      <span className="fade">
        Fill all the details accurately, Adminstrator has the right to reject
        the registration if deatils are found wrong or unrelatable.
      </span>
      <Formik
        enableReinitialize
        initialValues={{
          dob: "",
          coach: "",
          address: "",
          state: "",
          city: "",
          pincode: "",
          photoId: "",
          privacyConsent: false,
        }}
        validationSchema={Yup.object().shape({
          dob: Yup.string().required("Required"),
          coach: Yup.string().required("Required"),
          address: Yup.string()
            .min(10, "Please provide complete address")
            .required("Required"),
          state: Yup.string().required("Required"),
          city: Yup.string().required("Required"),
          pincode: Yup.number()
            .typeError("Invalid pin code")
            .min(100000, "Invalid pin code")
            .max(999999, "Invalid pin code")
            .required("Required"),
          privacyConsent: Yup.boolean().oneOf(
            [true],
            "*You must accept the terms and conditions"
          ),
        })}
        onSubmit={(values) => {
          setFormState((prev) => ({ ...prev, loading: true }));

          uploadFile(values.photoId, setProfileUrl, (url) => {
            const docRef = doc(db, "users", uid as string);
            const { photoId, ...data } = values;

            setDoc(
              docRef,
              {
                ...data,
                profileUrl: url,

                createdAt: serverTimestamp(),
              },
              { merge: true }
            )
              .then(() => {
                setFormState((prev) => ({ ...prev, loading: false }));
                router.push("/complete-registration/finished");
                console.log("Registered Successfully");
              })
              .catch((err) => {
                setFormState((prev) => ({
                  error: "Something went wrong, Please try again later",
                  loading: false,
                }));
                console.log(err);
              });
          });
        }}
      >
        {({ values, touched, errors, setFieldValue }) => (
          <Form>
            <TwoColumn>
              <Input placeholder="Date of Birth" name="dob" type="date" />
            </TwoColumn>

            <Input placeholder="Coach Name" name="coach" />
            <Input
              placeholder="Complete Address (House no, Locality, street)"
              name="address"
            />

            <TwoColumn>
              <Input placeholder="State" name="state" component="select">
                <option disabled>Select State</option>
                {Object.keys(statesData).map((state) => (
                  <option value={state} key={state}>
                    {state}
                  </option>
                ))}
              </Input>
              <Input placeholder="City" name="city" component="select">
                {values.state == "" ? (
                  <option disabled>Select State to continue</option>
                ) : (
                  statesData[values.state as keyof typeof statesData].map(
                    (city: string) => (
                      <option value={city} key={city}>
                        {city}
                      </option>
                    )
                  )
                )}
              </Input>
            </TwoColumn>
            <Input placeholder="Area Pin Code" name="pincode" />
            <InputBlock>
              <label>Upload Photo Id</label>
              <Field
                name="productImage"
                type="file"
                value={undefined}
                onChange={(event: any) => {
                  setFieldValue("photoId", event.currentTarget.files[0]);
                }}
              />
            </InputBlock>

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

            <Button disabled={formState.loading}>Pay Fees</Button>
            <div className="register">
              Already have an account?
              <span>Log in</span>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default StudentPersonalForm;
