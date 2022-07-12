import { useState } from "react";
import { Container, Tab, Tabs } from "@mui/material";
import GoalCards from "./GoalCards";
import TaskCards from "./TaskCards";
import useGoalsByWeek from "../fetchDataHooks/useGoalsByWeek";
import Skeleton from "@mui/material/Skeleton";
import titlecase from "../utils/titlecase";

// Renders the content panel for the tab.
const TabPanel = ({ goalList, tabTitle, isLoading }) => {
  return (
    <div role="tabpanel" aria-labelledby={`tab-${tabTitle}`}>
      <Container>
        {isLoading ? (
          <Skeleton variant="rectangular" height={250} />
        ) : (
          <GoalCards goals={goalList} />
        )}
        {isLoading ? (
          <Skeleton variant="rectangular" height={250} />
        ) : (
          <TaskCards tabTitle={tabTitle} />
        )}
      </Container>
    </div>
  );
};

// Renders the tabs and their corresponding goals.
export default function TabsWithContent() {
  const { goals, isLoading } = useGoalsByWeek();
  const tabTitles = Object.keys(goals);
  const [tab, setTab] = useState(tabTitles[0]);
  const handleTabChange = (_, newTab) => setTab(newTab);
  const currentTabGoals = goals[tab];

  return (
    <>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        sx={{
          backgroundColor: "common.white",
          padding: "0 1rem",
          boxShadow: ["rgb(2 2 40 / 8%) 0px 4px 6px"],
        }}
      >
        {tabTitles.map((tabTitle) => (
          <Tab
            key={tabTitle}
            label={titlecase(tabTitle)}
            value={tabTitle}
            sx={{
              textTransform: "none",
              fontWeight: 500,
              fontSize: "0.85rem",
              padding: 0,
              minWidth: "4rem",
            }}
          />
        ))}
      </Tabs>
      <TabPanel
        goalList={currentTabGoals}
        tabTitle={tab}
        isLoading={isLoading}
      />
    </>
  );
}
