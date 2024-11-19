import type { ChipTypeProps } from '@/interfaces/chipInterface';

export default function ChipType({ type }: ChipTypeProps) {
  const text =
    type === 'traditional'
      ? 'Traditional'
      : type === 'schoolfood'
        ? 'School Food'
        : type === 'noodle'
          ? 'Noodle'
          : type === 'banchan'
            ? 'BanChan'
            : 'Dessert';
  const backgroundColor =
    type === 'traditional'
      ? 'bg-[#F0C9D8]'
      : type === 'schoolfood'
        ? 'bg-[#F4BAA1]'
        : type === 'noodle'
          ? 'bg-[#B8D5F7]'
          : type === 'banchan'
            ? 'bg-[#BDDCC6]'
            : 'bg-[#EFEAAD]';

  return (
    <div className="flex items-center">
      <div
        className={`w-auto py-[0.3rem] px-[1.2rem] items-center flex inline-block flex-shrink-0 gap-[1rem] rounded-[0.8rem] ${backgroundColor}`}
      >
        <p className="font-normal text-[1.4rem] leading-[1.855rem] text-gray-600 w-auto">{text}</p>
      </div>
    </div>
  );
}
