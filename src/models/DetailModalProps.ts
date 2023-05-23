import { StackNavigationProp } from "@react-navigation/stack";
import RootStackParams from "./RootStackParams";

export interface DetailModalProps {
  showModal: boolean;
  title: string;
  closeModal: () => void;
  id: string | unknown;
  expirationeDate: string;
  createDate: string;
  lot: string;
  type: string;
  navigate?: () => void;
}