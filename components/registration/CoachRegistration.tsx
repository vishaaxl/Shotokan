import Image from "next/image";
import { Formik, Form, Field } from "formik";

import Input from "../Input";
import {
  Button,
  Container,
  TwoColumn,
} from "components/registration/StudentRegister";
import { useRouter } from "next/router";

interface Props {}

const CoachRegistration: React.FC<Props> = () => {
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
          email: "",
          phoneNumber: "",
          password: "",
          confirmpassword: "",
        }}
        onSubmit={(values) => {
          router.push("/complete-registration/coach");
        }}
      >
        <Form>
          <TwoColumn>
            <Input placeholder="First Name" name="firstname" />
            <Input placeholder="Last Name" name="lastname" />
          </TwoColumn>
          <Input
            placeholder="Select Designation"
            name="email"
            component="select"
          >
            <option value="Chief Instructor">Chief Instructor</option>
            <option value="Instructor">Instructor</option>
            <option value="Assistant Instructor">Assistant Instructor</option>
          </Input>
          <Input placeholder="E-mail Address" type="email" name="email" />
          <Input
            placeholder="Phone Number"
            type="tel"
            name="phoneNumber"
            value="+91"
          />
          <TwoColumn>
            <Input placeholder="Password" type="password" name="password" />
            <Input
              placeholder="Confirm Password"
              type="password"
              name="confirmpassword"
            />
          </TwoColumn>
          <label htmlFor="privacy-consent" className="privacy-consent">
            <Field id="privacy-consent" name="privacyConsent" type="checkbox" />
            I agree to all the <span>Term of conditions</span> &{" "}
            <span>Privacy Policy</span>
          </label>

          <Button>Next</Button>
          <div className="register">
            Already have an account?
            <span>Log In</span>
          </div>
        </Form>
      </Formik>
    </Container>
  );
};

export default CoachRegistration;
