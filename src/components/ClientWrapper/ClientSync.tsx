'use client';

import { useClientSyncStore } from '../../../hooks/useClientSyncStore';

const ClientSyncWrapper = () => {
  useClientSyncStore();

  return null;
};

export default ClientSyncWrapper;
