'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { type ChangeEvent, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import kebab from '@/../public/assets/icon_kebab_cancel.png';
import more from '@/../public/assets/icon_more.png';
import userImg from '@/../public/assets/img_profile_member.png';
import { patchFeedback } from '@/api/feedbackService';
import type { FeedbackCardProps } from '@/interfaces/feedbackInterface';
import { Formatter, useFormatter } from '../../../hooks/useFormatter';
import CancelDropdown from '../Dropdown/CancelDropdown';

export default function FeedbackCard({
  comments,
  user,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
}: FeedbackCardProps & {
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}) {
  if (!comments || comments.length === 0) return null;
  const [editingCommentId, setEditingCommentId] = useState<string>('');
  const [editingContent, setEditingContent] = useState<string>('');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const formattedDate: string = useFormatter(Formatter.Date, comments[0].createdAt);
  const { ref, inView } = useInView();
  const queryClient = useQueryClient();

  const handleMenuClick = (commentId: string) => {
    setOpenDropdownId(prev => (prev === commentId ? null : commentId));
  };

  const handleEditClick = (comment: { id: string; content: string }) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
    setOpenDropdownId(null);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setEditingContent(e.target.value);
  };

  const mutation = useMutation({
    mutationFn: (newFeedback: string) => patchFeedback(comments[0].id, newFeedback),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback'] });
    },
    onError: () => {
      alert('Failed to patch your feedback. Please try again.');
    }
  });

  const handleEdit = () => {
    mutation.mutate(editingContent);
    setEditingCommentId('');
    setEditingContent('');
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  return (
    <div className="pb-[2rem]">
      <div>
        <ul className="flex-col">
          {comments.map(comment => (
            <li key={comment.id} className="flex-col p-[1.2rem]">
              <div
                className={`w-[120rem] p-[1rem] rounded-[0.8rem] bg-primary-white ${
                  editingCommentId === comment.id ? 'border border-gray-200' : 'bg-gray-50 border-none'
                }`}
              >
                <div className="flex justify-between items-center gap-[3rem] mb-[1.2rem]">
                  <div className="flex gap-[1rem] items-center">
                    <div className="w-[3.2rem] h-[3.2rem] relative">
                      <Image src={userImg} alt="유저 이미지" layout="fill" />
                    </div>
                    <div>
                      <p className="text-[1.4rem] font-medium text-gray-800">{comment.owner.name}</p>
                      <p className="text-[1.2rem] font-medium text-gray-400">{formattedDate}</p>
                    </div>
                  </div>
                  {editingCommentId === comment.id && (
                    <div className="flex gap-[0.5rem]">
                      <button
                        className="w-[8.9rem] h-[3.2rem] rounded-[0.8rem] border border-gray-200 text-[1.4rem] font-semibold text-gray-700"
                        onClick={() => setEditingCommentId('')}
                      >
                        Cancel
                      </button>
                      <button
                        className="w-[8.9rem] h-[3.2rem] rounded-[0.8rem] border bg-primary-blue border-gray-200 text-[1.4rem] font-semibold text-primary-white"
                        onClick={handleEdit}
                      >
                        Complete
                      </button>
                    </div>
                  )}
                  {user.id === comment.ownerId && editingCommentId !== comment.id && (
                    <div className="flex-col relative">
                      <Image
                        src={kebab}
                        alt="드롭다운 이미지"
                        onClick={() => handleMenuClick(comment.id)}
                        className="cursor-pointer"
                        width={24}
                        height={24}
                      />
                      <div className="absolute right-0" onClick={() => handleEditClick(comment)}>
                        {openDropdownId === comment.id && (
                          <CancelDropdown onCancel={() => handleEditClick(comment)}>Edit</CancelDropdown>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {editingCommentId === comment.id ? (
                  <div>
                    <textarea
                      id="content"
                      value={editingContent}
                      onChange={handleChange}
                      className="border-none w-[117rem] h-[4rem] text-[1.6rem] font-normal text-gray-700 focus: outline-none resize-none"
                    />
                  </div>
                ) : (
                  <div>
                    <p className="text-[1.6rem] font-normal text-gray-700">{comment.content}</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {hasNextPage && (
        <div ref={ref}>
          <Image src={more} alt="더보기 이미지" width={40} height={40} />
        </div>
      )}
    </div>
  );
}
