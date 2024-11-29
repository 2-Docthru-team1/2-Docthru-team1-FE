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

export interface ChallengeApplicationDetailHeader {
  data: ChallengeApplicationDetailHeaderData[];
  totalCount: number;
}

export interface ChallengeApplicationDetailHeaderData {
  id: string;
  number: string;
  title: string;
  mediaType: 'recipeWeb' | 'socialMedia' | 'youtube' | 'blog';
}
