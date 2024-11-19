export interface ChipTypeProps {
  type: 'traditional' | 'schoolfood' | 'noodle' | 'banchan' | 'dessert';
}

export interface ChipCardProps {
  type: 'ongoing' | 'finished';
}

export interface ChipStatusProps {
  type: 'pend' | 'deny' | 'approve' | 'cancel';
}
