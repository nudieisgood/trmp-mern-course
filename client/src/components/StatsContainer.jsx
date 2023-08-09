import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";
const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: "peding applications",
      count: defaultStats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#f59e0b",
      bcg: "#fef3c7",
    },
    {
      title: "interview applications",
      count: defaultStats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "declined applications",
      count: defaultStats?.declined || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {stats.map((stat) => {
        return <StatItem key={stat.title} {...stat} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
