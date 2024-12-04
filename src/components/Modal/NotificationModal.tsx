import { format } from 'date-fns';
import Image from 'next/image';
import closeImg from '@/../public/assets/icon_close.png';
import type { NotificationModalProps } from '@/interfaces/modalInterface';
import useStore from '@/store/store';

export default function ProfileModal({ notifications, onClose }: NotificationModalProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }
    return format(date, 'yyyy-MM-dd HH:mm:ss');
  };

  return (
    <div className="w-full h-full">
      <div className="md:w-[34.3rem] sm:w-[27rem] md:h-[51.9rem] sm:h-[35rem] bg-primary-white rounded-[0.8rem] border-2 border-gray-200 flex flex-col">
        <div className="flex justify-between p-[1.6rem] ">
          <p className="text-gray-700 font-semibold text-[1.6rem]">Notification</p>
          <Image src={closeImg} alt="close" width={24} height={24} className="cursor-pointer" onClick={onClose} />
        </div>
        <div className="flex flex-col overflow-y-auto md:h-[45.5rem] sm:h-[23.6rem]">
          {notifications.map((data, index) => (
            <div key={index}>
              <div className="flex flex-col gap-[1rem] px-[1.6rem] py-[1.2rem]">
                <div className="text-[1.4rem] leading-[1.671rem] text-gray-700">{data.content}</div>
                <div className="text-[1.4rem] leading-[1.671rem] text-gray-400">{formatDate(data.time)}</div>
              </div>
              {index < notifications.length - 1 && <hr className="border-gray-200" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}