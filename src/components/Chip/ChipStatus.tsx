import type { ChipStatusProps } from '@/interfaces/chipInterface';

export default function ChipStatus({ type }: ChipStatusProps) {
  enum ChipType {
    Pending = 'pend',
    Denied = 'deny',
    Approved = 'approve',
    Canceled = 'cancel'
  }

  let backgroundColor: string;
  let textColor: string;
  let text: string;

  switch (type) {
    case ChipType.Pending:
      backgroundColor = 'bg-[#FFFDE7]';
      textColor = 'text-[#F2BC00]';
      text = 'Pending';
      break;
    case ChipType.Denied:
      backgroundColor = 'bg-[#FFF0F0]';
      textColor = 'text-[#E54946]';
      text = 'Denied';
      break;
    case ChipType.Approved:
      backgroundColor = 'bg-[#DFF0FF]';
      textColor = 'text-[#4095DE]';
      text = 'Approved';
      break;
    default:
      backgroundColor = 'bg-[#E5E5E5]';
      textColor = 'text-[#737373]';
      text = 'Canceled';
  }

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
