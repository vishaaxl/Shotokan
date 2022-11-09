import Head from "next/head";

import ColumnLayout from "components/ColumnLayout";
import StudentPersonalForm from "components/personal/Student";

export default function Student() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ColumnLayout>
        <StudentPersonalForm />
      </ColumnLayout>
    </>
  );
}