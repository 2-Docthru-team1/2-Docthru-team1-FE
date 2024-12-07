export interface ChipTypeProps {
  type: 'traditional' | 'schoolfood' | 'noodle' | 'banchan' | 'dessert';
}

export interface ChipCardProps {
  type: 'onGoing' | 'finished';
}

export interface ChipCategoryProps {
  mediaType: 'recipeWeb' | 'socialMedia' | 'youtube' | 'blog';
}

export interface ChipStatusProps {
  type: 'pend' | 'deny' | 'approve' | 'cancel';
}
