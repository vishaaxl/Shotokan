/* eslint-disable @next/next/no-img-element */

import { Button } from "components/registration/StudentRegister";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import styled from "styled-components";
import moment from "moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { generateUid } from "utils/main";
import { useRef } from "react";

interface Props {
  data: DocumentData;
}

const CardWrapper = styled.div`
  background: ${({ theme }) => theme.primary};
  box-shadow: ${({ theme }) => theme.shadowPrimary};

  max-width: 375px;
  width: 100%;
  margin: 0 auto;
  border-radius: 5px;
  overflow: hidden;

  .logos {
    width: 100%;
    object-fit: contain;
  }

  .heading {
    text-align: center;
    line-height: 1.4;
    font-weight: 600;
    font-size: 1.325rem;
    text-transform: uppercase;
  }
`;

const TopSection = styled.div`
  font-size: 0.45rem;
  text-align: center;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.blue};

  padding: 0.75rem;

  span {
    border-radius: 20px;
    margin: 0 auto;
    height: 20px;
    width: 75px;
    display: block;
    background-color: ${({ theme }) => theme.primary};
  }

  p {
    line-height: 1.5;
    padding-top: 0.75rem;
    font-weight: 500;
  }
`;

const BottomSection = styled.div`
  border-radius: 0 10px 0 0;
  padding: 0.75rem 0.75rem;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.blue};

  h2 {
    font-weight: 600;
    padding-bottom: 0.125rem;
    font-size: 0.8rem;
    margin-bottom: 0.125rem;
  }

  span {
    margin-top: 0.35rem;
    display: block;
    font-size: 0.475rem;
    text-transform: uppercase;
  }
`;

const MainSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  padding: 0.75rem 0.75rem 1rem 0.75rem;

  span {
    display: block;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .line {
    margin-bottom: 0.75rem;
    h2 {
      color: ${({ theme }) => theme.blue};
      font-weight: 700;
      padding: 0.125rem 0;
      text-transform: uppercase;
    }
  }

  .photo-id {
    border: 2px solid ${({ theme }) => theme.accent};
    margin-bottom: 0.5rem;
    object-fit: cover;
    width: 134px;
    height: 145px;
  }
`;

const MainWrapper = styled.div`
  display: grid;
  justify-content: center;

  gap: 1rem;

  .button {
    display: flex;
    justify-content: center;
  }
`;

const IdCard: React.FC<Props> = ({ data }) => {
  const idCardRef = useRef(null);
  const generatePdf = () => {
    // @ts-ignore
    html2canvas(idCardRef.current).then((canvas) => {
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a3");
      pdf.addImage(img, "JPEG", 0, 0, 595, 842);
      pdf.save(generateUid(data.createdAt?.seconds * 1000, data.id));
    });
  };

  return (
    <MainWrapper>
      <CardWrapper ref={idCardRef}>
        <TopSection>
          <span></span>
          <p>
            MEMBER: WORLD MODERN SHOTOKAN KARATE FEDERATION UP MEMBER: KARATE
            ASSOCIATION OF LKO, KARATE ASSOCIATION OF UP, KARATE INDIA
            ORGANISATION MEMBER: ASIAN KARATE FEDERATION, WORLD KARATE
            FEDERATION AFFILIATED WITH: UP OLYMPIC ASSOCIATION, RECOGNIZED BY:
            GOVT. OF UP
          </p>
        </TopSection>
        <Image
          className="logos"
          src="/images/logos.png"
          alt=""
          width={375}
          height={87}
        />

        <h2 className="heading">
          World Modern Shotokan
          <br /> Karate Federation
        </h2>
        <MainSection>
          <div className="column-one">
            <div className="line">
              <img src={data.profileUrl} alt="" className="photo-id" />
              <span>Age</span>
              <h2>{moment().diff(moment(data.dob), "years")} years</h2>
            </div>
          </div>
          <div className="column-Two">
            <div className="line">
              <span>Name</span>
              <h2>
                {data.firstname} {data.lastname}
              </h2>
            </div>
            <div className="line">
              <span>Belt</span>
              <h2>{data.belt} </h2>
            </div>
            <div className="line">
              <span>Date Of Birth</span>
              <h2>{moment(data.dob).format("L")}</h2>
            </div>
            <div className="line">
              <span>Address</span>
              <h2>
                {data.city}
                <br />
                {data.state}
              </h2>
            </div>
          </div>
        </MainSection>
        <BottomSection>
          <h2>
            WMSKF ID No. {generateUid(data.createdAt.seconds * 1000, data.id)}
          </h2>
          <span>
            Date of expriry:{" "}
            {moment(data.createdAt.seconds * 1000).format("MMM Do YY")}
          </span>
          <span>
            Date of registration:{" "}
            {moment(data.createdAt.seconds * 1000)
              .add(5, "y")
              .format("MMM Do YY")}
          </span>
        </BottomSection>
      </CardWrapper>
      <div className="button">
        <Button onClick={generatePdf}>Download ID Card</Button>
      </div>
    </MainWrapper>
  );
};

export default IdCard;
