import type { RecipeDropdownProps } from '@/interfaces/dropdownInterface';

export default function Dropdown({ items, onApply }: RecipeDropdownProps) {
  return (
    <div className={`absolute w-[15.1rem] mt-[0.8rem]`}>
      <div className="flex items-center justify-center flex-col rounded-[0.8rem] bg-[#ffffff] border border-gray-300 cursor-pointer">
        {items.map((item, index) => (
          <p
            key={item.value}
            onClick={() => onApply(item)}
            className={`w-full py-[1.2rem] font-normal text-[1.6rem] leading-[1.909rem] text-gray-700 items-center flex justify-center
          ${index < items.length - 1 ? 'border-b border-gray-300' : ''}`}
          >
            {item.label}
          </p>
        ))}
      </div>
    </div>
  );
}
