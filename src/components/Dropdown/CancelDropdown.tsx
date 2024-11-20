import type { CancelDropdownProps } from '@/interfaces/dropdownInterface';

export default function CancelDropdown({ onCancel }: CancelDropdownProps) {
  return (
    <div className="w-[13.5rem] h-[4.3rem] rounded-[0.8rem] border-gray-200 border flex items-center justify-center bg-primary-white">
      <div className="text-[1.6rem] font-noramlr cursor-pointer" onClick={onCancel}>
        Cancel
      </div>
    </div>
  );
}
