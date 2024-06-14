import styled from "styled-components";

interface ArcStatProps {
  arcPercentage: string;
  rating: string;
}

const ArcStat: React.FC<ArcStatProps> = ({ arcPercentage, rating }) => {
  const ArcStat = styled.div`
    position: relative;
    display: flex;
    border-top-left-radius: 200px;
    border-top-right-radius: 200px;
    width: 400px;
    height: 200px;
    border-bottom: 0;
    background-color: #facfcf;
    box-sizing: border-box;
    overflow: hidden;
    align-items: flex-end;
    justify-content: center;

    &:before {
      content: "";
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      width: 100%;
      height: 200%;
      border-radius: 50%;
      background-image: conic-gradient(#ef303d, #ef303d 0, #ef30 0);
      transition: transform 0.5s ease-in-out;
      z-index: 1;
      transform: rotate(0deg);
      animation: prog 2s linear forwards;
    }

    &:after {
      content: "";
      position: absolute;
      display: block;
      width: calc(100% - 100px);
      height: calc(200% - 64px);
      background: #ffffff;
      z-index: 2;
      border-radius: 50%;
      top: 50px;
      left: 50px;
    }
    span {
      z-index: 3;
      text-align: center;
    }

    @keyframes prog {
      100% {
        background-image: conic-gradient(
          #ef303d,
          #ef303d calc(${arcPercentage}% / 2),
          #ef30 0
        );

        transform: rotate(270deg);
      }
    }
  `;
  return (
    <ArcStat>
      <span className="bebas-neue red">{rating}</span>
    </ArcStat>
  );
};

export default ArcStat;
