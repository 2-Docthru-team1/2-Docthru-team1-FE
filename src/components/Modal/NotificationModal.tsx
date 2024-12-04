import Image from 'next/image';
import { useRouter } from 'next/navigation';
import closeImg from '@/../public/assets/ic_out.png';
import type { NotificationModalProps } from '@/interfaces/modalInterface';
import useStore from '@/store/store';

export default function ProfileModal({}: NotificationModalProps) {
  const router = useRouter();

  const notifications = [
    { content: '새로운 알림입니다.', time: '2024-12-04 10:30:00' },
    { content: '업데이트가 완료되었습니다.', time: '2024-12-04 09:45:00' }
  ];

  return (
    <div className="w-full h-full">
      <div className="w-[34.3rem] h-[51.9rem] bg-primary-white rounded-[0.8rem] border-2 border-gray-200 flex flex-col">
        <div className="flex justify-between p-[1.6rem]">
          <p className="text-gray-700 font-semibold text-[1.6rem]">Notification</p>
          <Image src={closeImg} alt="close" width={24} height={24} />
        </div>
        <div className="flex flex-col">
          {notifications.map((notification, index) => (
            <div key={index}>
              <div className="flex flex-col gap-[1rem] px-[1.6rem] py-[1.2rem]">
                <div className="text-[1.4rem] leading-[1.671rem] text-gray-700">{notification.content}</div>
                <div className="text-[1.4rem] leading-[1.671rem] text-gray-400">{notification.time}</div>
              </div>
              {index < notifications.length - 1 && <hr className="border-gray-200" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
