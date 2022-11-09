import Image from "next/image";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

const Wrapper = styled.main`
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .content {
    height: 100vh;
    overflow: scroll;
  }

  .cool-image {
    overflow: hidden;
    position: relative;
    min-width: 100%;
    min-height: 100vh;

    display: none;
    @media (min-width: 1024px) {
      display: block;
    }

    .screen {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
    }
  }
`;

const OverlayContent = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    font-size: 2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.primary};
    margin-top: 1rem;
  }

  span {
    display: block;
    height: 5px;
    width: 174px;
    border-radius: 1px;
    background: ${({ theme }) => theme.accent};
    margin-top: 1rem;
  }

  & > * {
    position: relative;
    top: 4rem;
  }
`;

const ColumnLayout: React.FC<Props> = ({ children }) => {
  return (
    <Wrapper>
      <div className="content">{children}</div>
      <div className="cool-image">
        <Image
          src="/images/form-image.jpg"
          alt="Image of guys practicing karate"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        <div className="screen" />

        <OverlayContent>
          <Image
            src="/images/logo.png"
            alt="Image of guys practicing karate"
            width={217}
            height={215}
          />
          <h1>World Modern Shotokan</h1>
          <span className="line" />
          <h1>Karate Federation</h1>
        </OverlayContent>
      </div>
    </Wrapper>
  );
};

export default ColumnLayout;
