'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { type ChangeEvent, useState } from 'react';
import activeSubmit from '@/../public/assets/btn_feedback_active.png';
import inactiveSubmit from '@/../public/assets/btn_feedback_inactive.png';
import { postFeedback } from '@/api/workService';
import type { WorkInputProps } from '@/interfaces/workInterface';

export default function WorkInput({ data }: WorkInputProps) {
  if (!data) return null;
  const [content, setContent] = useState<string>('');
  const isInputEmpty = (): boolean => content.trim() !== '';

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newFeedback: string) => postFeedback(data.id, newFeedback),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback'] });
      setContent('');
    },
    onError: () => {
      alert('Failed to submit your feedback. Please try again.');
    }
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isInputEmpty()) {
      return;
    }
    mutation.mutate(content);
  };

  return (
    <div
      className=" mt-[2rem]
    lg:w-[120rem] lg:px-0
    md:w-full md:px-[2.4rem]
    sm:w-full sm:px-[1.5rem]"
    >
      <form
        onSubmit={handleSubmit}
        className="flex justify-between relative
      lg:gap-[2.8rem]
      md:gap-[2.4rem]
      sm:gap-[1.6rem]"
      >
        <textarea
          id="content"
          value={content}
          onChange={handleChange}
          placeholder="Please write your comment"
          className="resize-none h-[8.9rem] rounded-[1rem] border border-gray-200 text-gray-700 text-[1.6rem] font-medium placeholder-gray-400 p-5 focus:outline-none
          lg:w-[113.2rem]
          md:w-full
          sm:w-full"
        />
        <button
          type="submit"
          disabled={!isInputEmpty()}
          className=" lg:absolute lg:top-0 lg:right-0
        md:self-start
        sm:self-start"
        >
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
