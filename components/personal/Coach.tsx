import Image from "next/image";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Input, { Error } from "../Input";
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

const CoachPersonalForm: React.FC<Props> = ({ uid }) => {
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

    const storageRef = ref(storage, `/coaches/${file.name}`);
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
        <span>Coach</span> Registration
      </h1>

      <span className="fade">
        Fill all the details accurately, Adminstrator has the right to reject
        the registration if deatils are found wrong or unrelatable.
      </span>
      <Formik
        enableReinitialize
        initialValues={{
          belt: "",
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
          belt: Yup.string().required("Required"),
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
        {({ values, errors, touched }) => (
          <Form>
            <TwoColumn>
              <Input placeholder="Select Belt" name="belt" component="select">
                <option value="White">White</option>
                <option value="Yellow">Yellow</option>
                <option value="Orange">Orange</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Purple 1">Purple 1</option>
                <option value="Purple 2">Purple 2</option>
                <option value="Brown 1">Brown 1</option>
                <option value="Brown 2">Brown 2</option>
                <option value="Brown 3">Brown 3</option>
                <option value="Black 1st Dan">Black 1st Dan</option>
                <option value="Black 2nd Dan">Black 2nd Dan</option>
                <option value="Black 3rd Dan">Black 3rd Dan</option>
                <option value="Black 4th Dan">Black 4th Dan</option>
                <option value="Black 5th Dan">Black 5th Dan</option>
                <option value="Black 6th Dan">Black 6th Dan</option>
                <option value="Black 7th Dan">Black 7th Dan</option>
              </Input>
              <Input placeholder="Date of Birth" name="dob" type="date" />
            </TwoColumn>

            <Input placeholder="Coach Name" name="coach" />
            <Input
              placeholder="Complete Address (House no, Locality, street)"
              name="address"
            />

            <TwoColumn>
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
            </TwoColumn>
            <Input placeholder="Area Pin Code" name="pincode" />
            <Input placeholder="Upload Photo id" name="photoId" type="file" />

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

export default CoachPersonalForm;
