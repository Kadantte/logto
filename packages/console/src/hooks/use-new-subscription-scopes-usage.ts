import useSWR from 'swr';

import { useCloudApi } from '@/cloud/hooks/use-cloud-api';
import { type NewSubscriptionScopeUsage } from '@/cloud/types/router';
import { isCloud, isDevFeaturesEnabled } from '@/consts/env';

const useNewSubscriptionScopeUsage = (tenantId: string) => {
  // TODO: Console sometimes toast 401 unauthorized error, but can not be reproduced in local environment easily, we temporarily hide the error toast for prod env.
  const cloudApi = useCloudApi({ hideErrorToast: !isDevFeaturesEnabled });

  const resourceEntityName = 'resources';
  const roleEntityName = 'roles';

  return {
    scopeResourceUsage: useSWR<NewSubscriptionScopeUsage, Error>(
      isCloud &&
        isDevFeaturesEnabled &&
        tenantId &&
        `/api/tenants/${tenantId}/subscription/usage/${resourceEntityName}/scopes`,
      async () =>
        cloudApi.get('/api/tenants/:tenantId/subscription/usage/:entityName/scopes', {
          params: { tenantId, entityName: resourceEntityName },
          search: {},
        })
    ),
    scopeRoleUsage: useSWR<NewSubscriptionScopeUsage, Error>(
      isCloud &&
        isDevFeaturesEnabled &&
        tenantId &&
        `/api/tenants/${tenantId}/subscription/usage/${roleEntityName}/scopes`,
      async () =>
        cloudApi.get('/api/tenants/:tenantId/subscription/usage/:entityName/scopes', {
          params: { tenantId, entityName: roleEntityName },
          search: {},
        })
    ),
  };
};

export default useNewSubscriptionScopeUsage;
