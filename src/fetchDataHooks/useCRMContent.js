import * as Sentry from "@sentry/react";
import { createClient } from "contentful";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryKeys } from "../constants/keys";

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_DELIVERY_TOKEN,
});

// Generic fetcher that is used to request data from the Contentful API.
const fetcher = (entry_id) => client.getEntry(entry_id);

const fetchCRMContent = async (capableObject) => {
  try {
    if (capableObject.cms_entry_id === "") {
      return capableObject
    }

    const data = await fetcher(capableObject.cms_entry_id)

    if (data && data.fields) {
      capableObject.name = data.fields.title;
      capableObject.imageUrl = `https:${data.fields.headerImage?.fields?.file.url}`;
      capableObject.description = data.fields.description;
    }

    return capableObject
  } catch (error) {
    Sentry.captureException(error);
    console.error(error);
    return capableObject
  }
}

// Fetch the content from the CMS and merge it into the argument object.
// The argument object should have a `cms_entry_id` attribute.
// Example: const goal = useCRMContent(props.goal);
// Example: const currentPlan = useCRMContent(props.currentCarePlan);
export default function useCRMContent(capableObject) {
  const cms_entry_id = capableObject.cms_entry_id
  return useQuery(
    [ReactQueryKeys.CMS_ENTRY, cms_entry_id],
    () => fetchCRMContent(capableObject)
  )
}