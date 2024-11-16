import type { DropdownProps } from '@/interfaces/dropdownInterface';

export default function Dropdown({ isOpen, items, onSelect, type }: DropdownProps) {
  const getDropdownType = () => {
    switch (type) {
      case 'language':
        return 'w-[44.8rem]';
      case 'recipe':
        return 'w-[13.9rem]';
      case 'admin':
        return 'w-[16.3rem]';
    }
  };

  return (
    <div className={`absolute ${getDropdownType()} mt-[0.8rem]`}>
      {isOpen && (
        <div className="flex items-center justify-center flex-col rounded-[0.8rem] bg-[#ffffff] border border-gray-300">
          {items.map((item, index) => (
            <p
              key={item.value}
              onClick={() => onSelect(item.value)}
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
