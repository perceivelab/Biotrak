import React, { useState } from 'react';

const useSelectionType = () => {
    const [text, setText] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const selection = (type: string) => {
        switch(type) {
            case 'transporter':    
                setText('Accetta una materia Biotrak');
                setTitle('Accettazione');
                break;
            case 'productionStart':
                setText('Avvia una produzione biotrak cliccando il tasto qui in basso');
                setTitle('Avvio Produzione');
                break;
            case 'productionEnd':
                setText('Termina una produzione biotrak cliccando il tasto qui in basso');
                setTitle('Termina Produzione');
                break;
            default:
                setText('Default');
                setTitle('Default');
                break;
        }
    }

    return {selection, text, title}
}

export default useSelectionType