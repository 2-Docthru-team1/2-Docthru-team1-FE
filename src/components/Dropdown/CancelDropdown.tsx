import type { CancelDropdownProps } from '@/interfaces/dropdownInterface';

export default function CancelDropdown({ onCancel, children }: CancelDropdownProps) {
  return (
    <div className="w-[13.5rem] h-[4.3rem] rounded-[0.8rem] border-gray-200 border flex items-center justify-center bg-primary-white cursor-pointer">
      <div className="text-[1.6rem] font-normal" onClick={onCancel}>
        {children}
      </div>
    </div>
  );
}
