import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const navigate = (name: string, params: {}) =>
  navigationRef.isReady() &&
  navigationRef.navigate(name as never, params as never);

export const goBack = () => navigationRef.isReady() && navigationRef.goBack();

/* export const reset = (props: IReset) =>
  navigationRef.isReady() && navigationRef.reset(props); */