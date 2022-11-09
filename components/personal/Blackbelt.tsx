import Image from "next/image";
import { Formik, Form, Field } from "formik";

import Input from "../Input";
import {
  Button,
  Container,
  TwoColumn,
} from "components/registration/StudentRegister";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { states } from "data/states";

interface Props {}

const BlackbeltPersonalForm: React.FC<Props> = () => {
  const [statesData, setStatesData] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    setStatesData(states);
  }, []);

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
          firstname: "",
          lastname: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmpassword: "",
          state: "",
        }}
        onSubmit={(values) => {
          router.push("/complete-registration/finished");
        }}
      >
        {({ values }) => (
          <Form>
            <TwoColumn>
              <Input placeholder="Select Belt" name="email" component="select">
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
              <Input
                placeholder="Date of Birth"
                name="dateOfBirth"
                type="date"
              />
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
            <Input placeholder="Area Pin Code" name="AreaPinCode" />
            <Input placeholder="Upload Photo id" name="photoId" type="file" />

            <label htmlFor="privacy-consent" className="privacy-consent">
              <Field
                id="privacy-consent"
                name="privacyConsent"
                type="checkbox"
              />
              I agree to all the <span>Term of conditions</span> &{" "}
              <span>Privacy Policy</span>
            </label>

            <Button>Pay Fees</Button>
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

export default BlackbeltPersonalForm;
