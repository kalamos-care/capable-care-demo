import { Container, Tab, Tabs } from "@mui/material";
import titlecase from "../utils/titlecase";

// Renders the tabs and their corresponding goals.
export default function ControlledTabs({ tabs, tab, handleTabChange }) {
  const tabTitles = tabs.map(tab => tab.title);
  return (
    <>
      <Tabs
        value={tab.title}
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
      <div role="tabpanel" aria-labelledby={`tab-${tab.title}`}>
        <Container>
          {tab.content}
        </Container>
      </div>
    </>
  );
}
