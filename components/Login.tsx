import Image from "next/image";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";

import Input from "./Input";

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
`;

const Forgot = styled.span`
  color: ${({ theme }) => theme.blue};
`;

const Login: React.FC<Props> = () => {
  return (
    <Container>
      <h1>
        <span>Log in</span> to your account
      </h1>

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
          alert("**Invalid Credentials, Please try again");
        }}
      >
        <Form>
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

          <Button>Log in</Button>
        </Form>
      </Formik>
    </Container>
  );
};

export default Login;
