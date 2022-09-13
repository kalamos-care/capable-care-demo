import { useQuery } from "@tanstack/react-query";

import { ReactQueryKeys } from "constants/keys";
import { API_Type } from "utils/apiTypes";
import { User } from "models/users/User.types";
import api from "capableApi";
import { getParticipantsByAuthor } from "./useConversationsParticipants.utils";

//TODO: move this to a util file if we like it?
const getAllPagesBody = async <T>(type: API_Type, PAGE_SIZE = 500) => {
  const firstPage = await api.client?.[type].list({
    page: 1,
    size: PAGE_SIZE,
  });
  const totalPage = firstPage.headers["total-pages"];

  const otherPages = await Promise.all(
    //totalPage - 1 to remove the first page as we already have it
    Array.from(Array(totalPage - 1), (_, i) => {
      return api.client?.[API_Type.Practitioner].list({
        // start at page 2 as we have the first page
        page: i + 2,
        size: PAGE_SIZE,
      });
    })
  );

  const allPagesBody = [firstPage, ...otherPages].flatMap((page) => {
    return page.body;
  });

  return allPagesBody as T[];
};

const getPractitionersAndTenantAdminsData = async () => {
  const practitioners = await getAllPagesBody<User>(API_Type.Practitioner);
  const tenantAdmin = await getAllPagesBody<User>(API_Type.TenantAdmin);

  return getParticipantsByAuthor([...practitioners, ...tenantAdmin]);
};

export const usePractitionerAndTenantAdminsData = () => {
  const query = useQuery([ReactQueryKeys.PRACTITIONERS_AND_TENANT_ADMINS_DATA], () =>
    getPractitionersAndTenantAdminsData()
  );

  return {
    ...query,
  };
};
