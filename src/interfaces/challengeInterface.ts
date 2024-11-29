export interface StylesState {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  alignment: 'left' | 'center' | 'right';
  currentColor: string;
  isBulletList: boolean;
  isNumberList: boolean;
}

export interface SavedSelection {
  startContainer: Node;
  startOffset: number;
  endContainer: Node;
  endOffset: number;
}

export interface ChallengeApplicationDetailBody {
  data: ChallengeApplicationDetailBodyData;
}

export interface ChallengeApplicationDetailBodyData {
  id: string;
  embedUrl: string;
}
