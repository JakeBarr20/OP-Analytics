import styled from "styled-components";

interface GraphIndividualProps {
  title: string;
  lifterRating: number;
  compareRating: number;
  lifterStat: string;
  isSingle: boolean;
  isMobile: boolean;
}

const GraphIndividual: React.FC<GraphIndividualProps> = ({
  title,
  lifterRating,
  compareRating,
  lifterStat,
  isSingle,
  isMobile,
}) => {
  const IndividualCompareMobile = styled.div`
    .graph-individual-mobile {
      display: flex;
      flex-direction: column;

      .graph-top-mobile {
        display: flex;

        .graph-left-score-mobile {
          height: 300px;
          width: 40px;
          background-color: #facfcf;
          border-radius: 50px 50px 0 0;
        }

        .graph-right-score-mobile {
          height: 300px;
          width: 40px;
          background-color: #ef303d;
          border-radius: 50px 50px 0 0;
        }
      }

      .graph-title-mobile {
        display: flex;
        justify-content: center;
        border: 1px solid #ccd2e3;
      }
    }
  `

  const IndvidualCompareGraph = styled.div`
    .graph-individual {
      display: flex;
      width: 100%;
      margin-top: 35px;
      height: 40px;

      .graph-left {
        display: flex;
        justify-content: flex-end;
        border-radius: 25px 0 0 25px;
        border: 1px solid #ccd2e3;
        width: 100%;

        .graph-left-score {
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          background-color: #ef303d;
          width: ${lifterRating}%;
          height: 100%;
          border-radius: 25px 0 0 25px;

          .span-left {
            margin-right: 330px;
            font-size: 20px;
          }
        }
      }

      .graph-center {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 240px;
        border-top: 1px solid #ccd2e3;
        border-bottom: 1px solid #ccd2e3;

        p {
          font-size: 26px;
        }
      }

      .graph-right {
        border-radius: 0 25px 25px 0;
        border: 1px solid #ccd2e3;
        width: 100%;

        .graph-right-score {
          display: flex;
          align-items: center;
          background-color: #ef303d;
          width: ${isSingle ? compareRating : 50}%;
          height: 100%;
          border-radius: 0 25px 25px 0;

          .span-right {
            margin-left: 320px;
            font-size: 20px;
          }
        }
      }
    }

    @keyframes prog {
      100% {
        width: 0%;
      }
    }

    @keyframes prog2 {
      100% {
        width: 70%;
      }
    }
  `;

  return (
    <>
      {isMobile ? (
        <IndividualCompareMobile>
        <div className="graph-individual-mobile">
          <div className="graph-top-mobile">
            <div className="graph-left-score-mobile"></div>
            <div className="graph-right-score-mobile"></div>
          </div>
          <div className="graph-title-mobile">
            <span className="bebas-neue">{title}</span>
          </div>
        </div>
        </IndividualCompareMobile>
      ) : (
        <IndvidualCompareGraph>
          <div className="graph-individual">
            <div className="graph-left">
              <div className="graph-left-score">
                <span className="bebas-neue dark span-left">
                  {!isSingle && lifterStat + "KG"}
                </span>
              </div>
            </div>
            <div className="graph-center">
              <p className="bebas-neue dark">{title}</p>
            </div>
            <div className="graph-right">
              <div className="graph-right-score">
                <span className="bebas-neue red span-right">
                  {!isSingle && Math.round(compareRating) + "KG"}
                </span>
              </div>
            </div>
          </div>
        </IndvidualCompareGraph>
      )}
    </>
  );
};

export default GraphIndividual;
