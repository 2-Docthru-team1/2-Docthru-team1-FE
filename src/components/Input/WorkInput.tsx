import Image from 'next/image';
// import { useRouter } from 'next/router';
import { type ChangeEvent, useState } from 'react';
import activeSubmit from '@/../public/assets/btn_feedback_active.png';
import inactiveSubmit from '@/../public/assets/btn_feedback_inactive.png';

export default function WorkInput() {
  const [content, setContent] = useState<string>('');
  // const router = useRouter();
  // const workId = router.query['id'] as string;

  const isInputEmpty = (): boolean => {
    return content.trim() !== '';
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(e.target.value);
  };
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!isInputEmpty()) {
      return;
    }
    // 추후 api 연결해서 작업물의 content를 post는 과정

    window.location.reload();
  };

  return (
    <div className="w-[120rem]">
      <form onSubmit={handleSubmit} className="flex justify-between relative">
        <textarea
          id="content"
          value={content}
          onChange={handleChange}
          placeholder="Please write your comment"
          className="resize-none w-[113.2rem] h-[8.9rem] rounded-[1rem] border border-gray-200 text-gray-700 text-[1.6rem] font-medium placeholder-gray-400 p-5 focus:outline-none"
        />
        <button type="submit" disabled={!isInputEmpty()} className="absolute top-0 right-0">
          {isInputEmpty() ? (
            <Image src={activeSubmit} alt="active 제출 이미지" width={40} height={40} />
          ) : (
            <Image src={inactiveSubmit} alt="inactive 제출 이미지" width={40} height={40} />
          )}
        </button>
      </form>
    </div>
  );
}
