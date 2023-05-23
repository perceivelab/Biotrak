import { StackNavigationProp } from "@react-navigation/stack";
import { ActionType } from "../helpers/ActionType";
import RootStackParams from "./RootStackParams";

export type FabButtonProps = {
    opacity: () => void;
    navigate?: StackNavigationProp<RootStackParams>;
    type: keyof typeof ActionType;
}
