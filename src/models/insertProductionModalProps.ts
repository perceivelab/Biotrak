export interface insertProductionModalProps {
  showModal: boolean;
  closeModal: () => void;
  childToParent: (word: string) => void;
  childToParentLot: (word: string) => void;
}
