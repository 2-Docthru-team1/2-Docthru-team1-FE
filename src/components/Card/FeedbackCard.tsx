import { format } from 'date-fns';
import Image from 'next/image';
import { useState } from 'react';
import kebab from '@/../public/assets/icon_kebab_cancel.png';
import userImg from '@/../public/assets/img_profile_member.png';
import type { FeedbackCardProps } from '@/interfaces/feedbackInterface';

export default function FeedbackCard({ comments, user }: FeedbackCardProps) {
  if (!comments || comments.length === 0) {
    return <div>No comment available</div>;
  }

  const [editingCommentId, setEditingCommentId] = useState<string>('');
  const [editingContent, setEditingContent] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const formattedDate = format(new Date(comments[0].createdAt), 'yy/MM/dd HH:mm');

  const handleMenuClick = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleEditClick = (comment: { id: string; content: string }) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
    setIsDropdownOpen(false);
  };

  const handleEdit = (commentId: string) => {
    try {
      // TODO: 추후 댓글 수정 api 연결
      setEditingCommentId('');
      setEditingContent('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <ul className="flex-col">
        {comments.map(comment => (
          <li key={comment.id} className="flex-col p-[1.2rem] ">
            <div className="w-[120rem] bg-gray-50 p-[1rem]">
              <div className="flex justify-between items-center gap-[3rem] mb-[1.2rem]">
                <div className="flex gap-[1rem] items-center">
                  <div className="w-[3.2rem] h-[3.2rem] relative">
                    <Image src={userImg} alt="유저 이미지" layout="fill" />
                  </div>
                  <div>
                    <p className="text-[1.4rem] font-medium text-gray-800">{comment.userName}</p>
                    <p className="text-[1.2rem] font-medium text-gray-400">{formattedDate}</p>
                  </div>
                </div>
                {editingCommentId === comment.id && (
                  <div>
                    <button onClick={() => setEditingCommentId('')}>Cancel</button>
                    <button onClick={() => handleEdit(comment.id)}>Complete</button>
                  </div>
                )}
                {user.id === comment.ownerId && (
                  <div>
                    <Image src={kebab} alt="드롭다운 이미지" onClick={() => handleMenuClick} className="cursor-pointer" />
                    {isDropdownOpen && <button onClick={() => handleEditClick(comment)}>드롭다운</button>}
                  </div>
                )}
              </div>
              {editingCommentId === comment.id ? (
                <div>
                  <textarea id="content" value={editingContent} />
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
  );
}
