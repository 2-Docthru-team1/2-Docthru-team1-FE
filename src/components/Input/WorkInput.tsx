import Image from 'next/image';
import { type ChangeEvent, useState } from 'react';
import activeSubmit from '@/../public/assets/btn_feedback_active.png';
import inactiveSubmit from '@/../public/assets/btn_feedback_inactive.png';
import { postFeedback } from '@/api/feedbackService';
import type { WorkInputProps } from '@/interfaces/workInterface';

export default function WorkInput({ data }: WorkInputProps) {
  if (!data) return null;
  const [content, setContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const isInputEmpty = (): boolean => {
    return content.trim() !== '';
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(e.target.value);
  };
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!isInputEmpty()) {
      return;
    }
    setIsSubmitting(true);
    try {
      await postFeedback(data.id, content);
      setContent('');
    } catch (error) {
      alert('Failed to submit your feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-[120rem]">
      <form onSubmit={handleSubmit} className="flex justify-between relative">
        <textarea
          id="content"
          value={content}
          onChange={handleChange}
          placeholder="Please write your comment"
          disabled={isSubmitting}
          className="resize-none w-[113.2rem] h-[8.9rem] rounded-[1rem] border border-gray-200 text-gray-700 text-[1.6rem] font-medium placeholder-gray-400 p-5 focus:outline-none"
        />
        <button type="submit" disabled={!isInputEmpty() || isSubmitting} className="absolute top-0 right-0">
          {isInputEmpty() || !isSubmitting ? (
            <Image src={activeSubmit} alt="active 제출 이미지" width={40} height={40} />
          ) : (
            <Image src={inactiveSubmit} alt="inactive 제출 이미지" width={40} height={40} />
          )}
        </button>
      </form>
    </div>
  );
}
