export type CardProps = {
    text: string;
    imgSource: string;
    customFlex?: 'row' | 'column';
    customPadding?: number;
    goTo?: () => void;
};