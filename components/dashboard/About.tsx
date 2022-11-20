import styled from "styled-components";
import { MdEmail, MdLink, MdLocationPin, MdPhone } from "react-icons/md";
import { DocumentData } from "firebase/firestore";

interface Props {
  data: DocumentData;
}

const Section = styled.section`
  margin-top: 1rem;

  height: 100%;
  width: 100%;
  border-radius: 5px;

  padding: 1rem;
  background-color: #fff;
  box-shadow: ${({ theme }) => theme.shadowPrimary};

  @media (min-width: 767px) {
    margin-top: 0;
  }

  h2 {
    font-weight: 500;
    font-size: 1.25rem;
  }

  .line {
    display: flex;
    align-items: center;
    margin-top: 0.75rem;

    .icon {
      background: rgba(9, 68, 204, 0.1);
      padding: 1rem 1.075rem;
      border-radius: 50%;
      font-size: 1.125rem;

      margin-right: 1.175rem;

      color: ${({ theme }) => theme.blue};
    }
  }
`;

const About: React.FC<Props> = ({ data }) => {
  return (
    <Section>
      <h2>About</h2>
      <div className="line">
        <div className="icon">
          <MdEmail />
        </div>
        <span>{data.email}</span>
      </div>
      <div className="line">
        <div className="icon">
          <MdPhone />
        </div>
        <span>+91 {data.phoneNumber}</span>
      </div>
      <div className="line">
        <div className="icon">
          <MdLocationPin />
        </div>
        <span>{data.address}</span>
      </div>
      <div className="line">
        <div className="icon">
          <MdLink />
        </div>
        <span>Role: {data.role}</span>
      </div>
    </Section>
  );
};

export default About;
