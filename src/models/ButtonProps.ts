export type ButtonProps = Record<'title' | 'color' | 'variant', string> &
  Record<'onPress', () => void> &
  Record<'size', number | string> &
  Record<'iconLeft', JSX.Element | JSX.Element[] | undefined> &
  Record<'iconRight', JSX.Element | JSX.Element[] | undefined> &
  Record<'disabled', boolean> &
  Record<'opacity', number>;
