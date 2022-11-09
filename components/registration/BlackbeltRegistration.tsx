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

const BlackbeltRegistration: React.FC<Props> = () => {
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
        }}
        onSubmit={(values) => {
          router.push("/complete-registration/student");
        }}
      >
        <Form>
          <TwoColumn>
            <Input placeholder="First Name" name="firstname" />
            <Input placeholder="Last Name" name="lastname" />
          </TwoColumn>
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

export default BlackbeltRegistration;
