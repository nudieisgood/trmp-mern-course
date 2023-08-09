import { useState } from "react";
import Wrapper from "../assets/wrappers/ChartsContainer";
import AreaChart from "./AreaChart";
import BarChart from "./BarChart";

const ChartsContainer = ({ data }) => {
  const [showBarChart, setShowBarChart] = useState(true);
  return (
    <Wrapper>
      <h4>monthly applications</h4>

      <button type="button" onClick={() => setShowBarChart(!showBarChart)}>
        {showBarChart ? "Area Chart" : "Bar Chart"}
      </button>

      {showBarChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;
