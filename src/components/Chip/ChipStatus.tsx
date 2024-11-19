import type { ChipStatusProps } from '@/interfaces/chipInterface';

export default function ChipStatus({ type }: ChipStatusProps) {
  const backgroundColor =
    type === 'pend' ? 'bg-[#FFFDE7]' : type === 'deny' ? 'bg-[#FFF0F0]' : type === 'approve' ? 'bg-[#DFF0FF]' : 'bg-[#E5E5E5]';

  const textColor =
    type === 'pend'
      ? 'text-[#F2BC00]'
      : type === 'deny'
        ? 'text-[#E54946]'
        : type === 'approve'
          ? 'text-[#4095DE]'
          : 'text-[#737373]';

  const text = type === 'pend' ? 'Pending' : type === 'deny' ? 'Denied' : type === 'approve' ? 'Approved' : 'Canceled';

  return (
    <div className="flex">
      <div
        className={`flex items-center justify-center rounded-[0.4rem] py-[0.4rem] px-[0.8rem] gap-[1rem] ${backgroundColor} flex-shrink-0`}
      >
        <p className={`font-semibold text-[1.3rem] leading-[1.551rem] ${textColor}`}>{text}</p>
      </div>
    </div>
  );
}
