import { StackNavigationProp } from "@react-navigation/stack";
import { Track } from "./TrackModel";
import RootStackParams from "./RootStackParams";

export interface EndFlowDetailsProps {
    textType?: string,
    track?: Track,
    startProduction: boolean,
    qr?: string,
    error?: boolean,
    buttonText?: string,
    navigation?: StackNavigationProp<RootStackParams>
}