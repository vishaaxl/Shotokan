import Head from "next/head";

import ColumnLayout from "components/ColumnLayout";
import BlackbeltPersonalForm from "components/personal/Blackbelt";
import { useRouter } from "next/router";

export default function Coach() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>World Modern Shotokan Karate Federation</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ColumnLayout>
        <BlackbeltPersonalForm uid={router.query.uid} />
      </ColumnLayout>
    </>
  );
}
