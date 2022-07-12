import useSWR from "swr";
import * as Sentry from "@sentry/react";
import { createClient } from "contentful";

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_DELIVERY_TOKEN,
});

// Generic fetcher for SWR that is used to request data from the Contentful API.
const fetcher = (entry_id) => client.getEntry(entry_id);

// Fetch the content from the CMS and merge it into the argument object.
// The argument object should have a `cms_entry_id` attribute.
// Example: const goal = useCRMContent(props.goal);
// Example: const currentPlan = useCRMContent(props.currentCarePlan);
export default function useCRMContent(capableObject) {
  const { data, error } = useSWR(capableObject.cms_entry_id, fetcher);

  if (error) {
    Sentry.captureException(error);
  }

  // Merge any data we want from Contentful.
  // NOTE: We are doing this to make it easier to demo to clients.
  //       If you have forked this app, you should not need to update the data
  //       coming from Capable.
  if (data && data.fields) {
    capableObject.name = data.fields.title;
    capableObject.imageUrl = `https:${data.fields.headerImage.fields.file.url}`;
    capableObject.description = data.fields.description;
  }

  return {
    data: capableObject,
    isLoading: !error && !data,
    isError: error,
  };
}
