/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";

import moment from "moment";

import { HiLocationMarker } from "react-icons/hi";
import { Button } from "components/registration/StudentRegister";
import { DocumentData } from "firebase/firestore";

interface Props {
  data: DocumentData;
}

const Section = styled.section`
  text-transform: capitalize;
  height: 100%;
  width: 100%;
  border-radius: 5px;

  padding: 1rem;
  background: ${({ theme }) => theme.primary};
  box-shadow: ${({ theme }) => theme.shadowPrimary};

  span {
    display: block;
  }

  .top-section {
    display: grid;
    margin-bottom: 2rem;

    @media (min-width: 767px) {
      grid-template-columns: repeat(3, 1fr);
      .last {
        text-align: right;
      }
    }

    .front {
      img {
        object-fit: cover;
        width: 134px;
        height: 145px;
      }
    }

    .middle,
    .last {
      margin-top: 1rem;
      span:first-child {
        opacity: 0.8;
        font-size: 0.95rem;
        margin-bottom: 0.5rem;
      }
    }
  }

  .bottom-section {
    @media (min-width: 425px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .front {
      margin-bottom: 1rem;
      h1 {
        font-size: 1.25rem;
        font-weight: 500;
      }

      span {
        font-size: 0.9rem;
        opacity: 0.8;
        margin-top: 0.75rem;
      }

      .address {
        display: flex;
        align-items: center;

        & > * {
          margin-right: 0.75rem;
        }
      }
    }
  }
`;

const PersonalInfo: React.FC<Props> = ({ data }) => {
  console.log(data.profileUrl);
  return (
    <Section>
      <div className="top-section">
        <div className="front">
          <img src={data.profileUrl} alt="user image" />
        </div>
        <div className="middle">
          <span>Registered on </span>
          <span>
            {moment(data.createdAt.seconds * 1000).format("MMM Do YY")}
          </span>
        </div>
        <div className="last">
          <span>Registration Expires on</span>
          {moment(data.createdAt.seconds * 1000)
            .add(5, "y")
            .format("MMM Do YY")}
        </div>
      </div>
      <div className="bottom-section">
        <div className="front">
          <h1>
            {data.firstname} {data.lastname}
          </h1>
          <span>{data.belt}</span>
          <span className="address">
            <HiLocationMarker />
            {data.city}, {data.state}
          </span>
        </div>
        <div className="last">
          <Button>Edit Profile</Button>
        </div>
      </div>
    </Section>
  );
};

export default PersonalInfo;
