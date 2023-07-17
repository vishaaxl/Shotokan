// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
const sdk = require("api")("@phonepe-docs/v1#3dxznuf1gljiezluv");

type Data = {
  name: string;
};

const url = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const requestData = {
    merchantId: "WMSKFINDIAONLINE",
    merchantTransactionId: "MT7850590068188104",
    merchantUserId: "MUID123",
    amount: 10000,
    redirectUrl: "http://localhost:3000/success",
    redirectMode: "POST",
    callbackUrl: "https://localhost:3000/callback",
    mobileNumber: "8318218163",
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };
  await axios
    .post(url, requestData, {
      headers: { "Content-Type": "application/json", "X-VERIFY": "" },
    })
    .then((res: any) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  res.status(200).json({ name: "John Doe" });
}
