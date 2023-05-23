import { navigationRef } from "../navigation/RootNavigation";

const setID = (type: string): string => {
    if (type === 'productionStart') {
        return 'ProductionStart';
    } else if (type === 'productionEnd') {
        return 'ProductionComplete';
    } else {
        return 'Acceptation';
    }
}

export const goToScanner = (type: string)=>{
    if (navigationRef) {
        navigationRef.navigate('Scanner' as never, { id: setID(type)} as never);
    }
}