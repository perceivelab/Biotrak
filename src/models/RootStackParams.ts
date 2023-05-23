type RootStackParams = {
  Home: undefined;
  Login: undefined;
  Anonymous: undefined;
  Loading: undefined;
  Onboarding: undefined;
  Guide: undefined;
  Driver: undefined;
  Scanner: { id: string | undefined };
  Production: { id: string | undefined } | undefined;
  SingleTrack: { id: string | undefined };
  pageAcceptation: { id: string | undefined };
  pageProducer: { id: string | undefined };
  genericScreen: { id: string | undefined };
  info: undefined;
  termsAndConditions: undefined;
};

export default RootStackParams;
