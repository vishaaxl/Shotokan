import styled from "styled-components";
import { MdEmail, MdLink, MdLocationPin, MdPhone } from "react-icons/md";
import { DocumentData } from "firebase/firestore";

interface Props {
  data: DocumentData;
}

const Section = styled.section`
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

const Gap = styled.div`
  padding: 1rem 0 0 0;

  @media (min-width: 768px) {
    padding: 0;
  }
`;

const Events: React.FC<Props> = ({ data }) => {
  return (
    <Gap>
      <Section>
        <h2>Upcoming Events</h2>
      </Section>
    </Gap>
  );
};

export default Events;
