import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { useState, useEffect } from 'react';

const useNetworkStatus = (): boolean | undefined | null => {

  const [networkStatus, setNetworkStatus] = useState<boolean | undefined | null>(true);

  const netInfo = useNetInfo();

  useEffect(() => {
    const sub = NetInfo.addEventListener((state: any) => {
      setNetworkStatus(state.isConnected);
    });
    return () => sub();

  }, [netInfo, networkStatus]);

  return networkStatus;
};

export default useNetworkStatus;