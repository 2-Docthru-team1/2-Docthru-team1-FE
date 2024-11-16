import type { DropdownProps } from '@/interfaces/dropdownInterface';

const dropdownWidths = {
  language: 'w-[44.8rem]',
  recipe: 'w-[15.1rem]',
  admin: 'w-[16.3rem]'
};

export default function Dropdown({ isOpen, items, onSelect, type }: DropdownProps) {
  const dropdownType = dropdownWidths[type] || '';

  const handleSelect = (value: string) => {
    onSelect(value);
  };

  return (
    <div className={`absolute ${dropdownType} mt-[0.8rem]`}>
      {isOpen && (
        <div className="flex items-center justify-center flex-col rounded-[0.8rem] bg-[#ffffff] border border-gray-300">
          {items.map((item, index) => (
            <p
              key={item.value}
              onClick={() => handleSelect(item.value)}
              className={`w-full py-[1.2rem] font-normal	text-[1.6rem] leading-[1.909rem] text-gray-700 items-center flex justify-center
              ${index < items.length - 1 ? 'border-b border-gray-300' : ''}`}
            >
              {item.label}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
