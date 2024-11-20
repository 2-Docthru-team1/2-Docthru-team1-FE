export interface StylesState {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  alignment: 'left' | 'center' | 'right';
  currentListType: 'bullet' | 'numbering' | null;
  isColoring: boolean;
}
