'use client';

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { fetchRegisterWork } from '@/api/challengeService';
import { uploadImageToEC2 } from '@/api/uploadService';
import ChallengeBody from '../Body/ChallengeBody';
import ChallengeRefPageCard from '../Card/ChallengeRefPageCard';
import ChallengeHeader from '../Header/ChallengeHeader';

export default function ChallengeTryClient() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState(false);
  const [uploadImages, setUploadImages] = useState<File[]>([]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || uploadImages.length === 0) {
      if (!title.trim()) setTitleError(true);
      if (!content.trim()) setContentError(true);
      return;
    }

    try {
      const res = await fetchRegisterWork(String(id), title, content, uploadImages.length);
      const { work, uploadUrls } = res;

      await Promise.all(
        uploadImages.map(async (image, index) => {
          const uploadUrl = uploadUrls[index]?.uploadUrl;
          return uploadImageToEC2(uploadUrl, image);
        })
      );

      alert('Submit Successfully!');
      router.push(`/challengeList/${work.challengeId}`);
    } catch (error) {
      alert('Error submitting the form. Please try again.');
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="flex-1 flex-col w-[120rem] items-center flex mr-[3.8rem]">
        <div>
          <ChallengeHeader onSubmit={handleSubmit} />
        </div>
        <div className="mt-[2.4rem] mb-[5rem]">
          <ChallengeBody
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            images={uploadImages}
            setImages={setUploadImages}
          />
        </div>
      </div>
      <div>
        <ChallengeRefPageCard embedUrl="https://www.example.com" />
      </div>
    </div>
  );
}
