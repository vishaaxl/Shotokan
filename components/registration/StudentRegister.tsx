import Image from "next/image";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";

import Input from "../Input";
import { useRouter } from "next/router";

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
    margin-bottom: 1.5rem;
    opacity: 0.7;
    display: block;
    line-height: 1.4;
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
`;

export const TwoColumn = styled.div`
  @media (min-width: 767px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;

const StudentRegister: React.FC<Props> = () => {
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
        <span>Student</span> Registration
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

export default StudentRegister;
