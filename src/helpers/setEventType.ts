export const setEventType = (type: string): string =>
  type === 'productionEnd' ? 'PRODUCTION_COMPLETE' : 'INBOUND_LOGISTICS';
