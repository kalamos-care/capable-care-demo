import { useState } from "react";
import { Container, Tab, Tabs } from "@mui/material";
import GoalCardsByStatus from "./GoalCards";
import TaskCardsByStatus from "./TaskCards";
import titlecase from "../utils/titlecase";

// Renders the content panel for the tab.
const TabPanel = ({ tabTitle }) => {
  return (
    <div role="tabpanel" aria-labelledby={`tab-${tabTitle}`}>
      <Container>
        {tabTitle.toLowerCase() === "goals" ? (
          <GoalCardsByStatus />
        ) : (
          <TaskCardsByStatus />
        )}
      </Container>
    </div>
  );
};

// Renders the tabs and their corresponding goals.
export default function TabsWithContent() {
  const tabTitles = ["Tasks", "Goals"];
  const [tab, setTab] = useState(tabTitles[0]);
  const handleTabChange = (_, newTab) => setTab(newTab);

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
      <TabPanel tabTitle={tab} />
    </>
  );
}
