import { format } from 'date-fns';
import Image from 'next/image';
import { patchIsReadTrue } from '@/api/userService';
import type { NotificationModalProps } from '@/interfaces/modalInterface';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export default function NotificationModal({ notifications, onClose, onNotificationClick }: NotificationModalProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }
    return format(date, 'yyyy-MM-dd HH:mm:ss');
  };

  const handleNotificationClick = async (challengeId: string, id: string, isRead: boolean, workId: string) => {
    if (!isRead) {
      await patchIsReadTrue(id);
    }
    onNotificationClick(challengeId, workId);
  };

  return (
    <div className="w-full h-full">
      <div className="md:w-[34.3rem] sm:w-[27rem] md:h-[51.9rem] sm:h-[35rem] bg-primary-white rounded-[0.8rem] border-2 border-gray-200 flex flex-col">
        <div className="flex justify-between p-[1.6rem] ">
          <p className="text-gray-700 font-semibold text-[1.6rem]">Notification</p>
          <Image
            src={`${S3_BASE_URL}/icon_close.svg`}
            alt="close"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="flex flex-col overflow-y-auto md:h-[45.5rem] sm:h-[23.6rem]">
          {notifications.length === 0 ? (
            <p className="text-center text-gray-400 text-[1.5rem] pt-[10rem]">No notifications here yet.</p>
          ) : (
            notifications.map((data, index) => (
              <div key={index}>
                <div
                  className={`flex flex-col gap-[1rem] px-[1.6rem] py-[1.2rem] cursor-pointer hover:bg-gray-100 hover:shadow-lg transition-all duration-300 ${
                    data.isRead ? 'opacity-50' : ''
                  }`}
                  onClick={() => handleNotificationClick(data.challengeId, data.id, data.isRead, data.workId ? data.workId : '')}
                >
                  <div className="text-[1.4rem] leading-[1.671rem] text-gray-700">{data.message}</div>
                  <div className="text-[1.4rem] leading-[1.671rem] text-gray-400">{formatDate(data.createdAt)}</div>
                </div>
                {index < notifications.length - 1 && <hr className="border-gray-200" />}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
