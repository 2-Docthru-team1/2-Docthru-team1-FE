export interface ChipTypeProps {
  type: 'traditional' | 'schoolfood' | 'noodle' | 'banchan' | 'dessert';
}

export interface ChipCardProps {
  type: 'ongoing' | 'finished';
}

export interface ChipCategoryProps {
  mediaType: 'Youtube' | 'Blog' | 'Recipe Web' | 'Social Media';
}

export interface ChipStatusProps {
  type: 'pend' | 'deny' | 'approve' | 'cancel';
}
