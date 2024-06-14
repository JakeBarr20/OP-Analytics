import { useState, useEffect } from "react";
import CompareGraph from "../../components/compare/CompareGraph";
import CompareOptions from "../../components/compare/CompareOptions";
import SingleOption from "../../components/compare/SingleOption";
import GroupOption from "../../components/compare/GroupOption";
import CompareBackButton from "../../components/compare/CompareBackButton";
import Layout from "../../components/layout/Layout";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

function ComparePage() {
  const [isSingleCompare, setIsSingleCompare] = useState(false);
  const [hasChosen, setHasChosen] = useState(false);
  const [isGraph, setIsGraph] = useState(false);
  const [previous, setPrevious] = useState("choice");
  const user: any = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user.user == null) router.push("/landing");
  }, [user]);

  const firstChoiceHandler = (isSingle: boolean) => {
    setHasChosen(true);
    setIsSingleCompare(isSingle);
  };

  const secondChoiceHandler = () => {
    setIsGraph(true);
    setHasChosen(false);
    if (isSingleCompare) setPrevious("single");
    if (!isSingleCompare) setPrevious("group");
  };

  const backHandler = () => {
    if (previous === "choice") {
      setHasChosen(false);
      setIsGraph(false);
    }

    if (previous === "single") {
      setHasChosen(true);
      setIsSingleCompare(true);
      setIsGraph(false);
      setPrevious("choice");
    }

    if (previous === "group") {
      setHasChosen(true);
      setIsSingleCompare(false);
      setIsGraph(false);
      setPrevious("choice");
    }
  };

  return (
    <Layout>
      <div className="compare-page">
        {(hasChosen || isGraph) && (
          <CompareBackButton backHandler={backHandler} />
        )}
        {!hasChosen && !isGraph && (
          <CompareOptions choiceHandler={firstChoiceHandler} />
        )}
        {hasChosen && isSingleCompare && (
          <SingleOption choiceHandler={secondChoiceHandler} />
        )}
        {hasChosen && !isSingleCompare && (
          <GroupOption choiceHandler={secondChoiceHandler} />
        )}
        {isGraph && <CompareGraph />}
      </div>
    </Layout>
  );
}

export default ComparePage;
