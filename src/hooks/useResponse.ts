const useResponse = () => {
  const errorHandlerLogin = (error: number, customError?: string) => {
    if (customError) {
      return customError;
    } else {
      switch (error) {
        case 400:
          return 'Dati non validi';
        case 401:
          return 'Non autorizzato'
        case 403:
          return 'Accesso alla risorsa vietato';
        case 404:
          return 'Risorsa non trovata';
        case 500:
          return 'Interval Server Error';
        case 502:
          return 'Bad gateway';
        case 504:
          return 'Timeout';
        default:
          return 'Errore sconosciuto. Contatta l\'amministratore';
      }
    }
  };

  return { errorHandlerLogin };
};

export default useResponse;
