export const setTitleDetails = (type: string): string => {
  if (type === 'productionStart') {
    return "Dettagli Avvio produzione";
  } else if (type === 'productionEnd') {
    return 'Dettagli Termina produzione';
  } else {
    return 'Dettagli Accettazione';
  }
};
