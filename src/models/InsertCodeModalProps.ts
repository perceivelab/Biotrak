import { StackNavigationProp } from "@react-navigation/stack";
import RootStackParams from "./RootStackParams";

export type InsertCodeModalProps = {
  showModal: boolean;
  closeModal: () => void;
  textButton: string;
};
