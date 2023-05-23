export const setTextButton = (type: string): string => {
  if (type === 'productionStart') {
    return "Avvia un'altra produzione";
  } else if (type === 'productionEnd') {
    return "Termina un'altra produzione";
  } else {
    return "Accetta un'altra materia";
  }
};
