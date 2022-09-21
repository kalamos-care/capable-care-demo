import api from "../capableApi/index";

// Generic fetcher for SWR that is used to request data from the Capable API.
// SWR docs: https://swr.vercel.app/docs/data-fetching
// This fetcher only returns the response body.

// Example usage:
// const { data, error } = useSWR(
//   ['CarePlan', 'list', {page: 1, size: 1, sortBy: ['-created_at']}],
//   fetcher
// );

const fetcher = (
  resource: string,
  action: string,
  args: {
    page?: number,
    size?: number,
    sortBy?: string[],
  },
) => {
  if (args) {
    return api.client[resource][action](args).then((res: Response) => res.body);
  } else {
    return api.client[resource][action]().then((res: Response) => res.body);
  }
};

export default fetcher;
