import Head from "next/head";
import styled from "styled-components";
import { GiFinishLine } from "react-icons/gi";
import ColumnLayout from "components/ColumnLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Wrapper = styled.main`
  min-width: 100%;
  min-height: 100vh;

  display: grid;
  place-content: center;
  text-align: center;

  .finish {
    font-size: 8rem;
    color: ${({ theme }) => theme.blue};
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    line-height: 1.2;
  }

  span {
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

export default function Coach() {
  const router = useRouter();
  const [countdown, setcountdown] = useState(10);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (countdown <= 0) {
        router.push("/");
      } else {
        setcountdown((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [countdown, router]);

  return (
    <>
      <Head>
        <title>World Modern Shotokan Karate Federation</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ColumnLayout>
        <Wrapper>
          <div>
            <GiFinishLine className="finish" />
          </div>
          <h1>Thankyou, your registration is complete</h1>
          <span>Redirecting to login Page in {countdown} seconds</span>
        </Wrapper>
      </ColumnLayout>
    </>
  );
}
