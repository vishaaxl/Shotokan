import ColumnLayout from "components/ColumnLayout";
import CoachRegistration from "components/registration/CoachRegistration";
import Head from "next/head";

export default function Coach() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ColumnLayout>
        <CoachRegistration />
      </ColumnLayout>
    </>
  );
}
