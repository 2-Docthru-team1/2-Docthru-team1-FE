'use client';

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { fetchRegisterWork } from '@/api/challengeService';
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
      const { images } = res;

      const uploadResults = await Promise.all(
        uploadImages.map(async (image: any, index: number) => {
          const uploadUrl = images[index]?.uploadUrl;
          if (!uploadUrl) {
            return {
              success: false,
              error: 'Upload URL not provided',
              index
            };
          }

          try {
            const response = await axios.put(uploadUrl, image, {
              headers: {
                'Content-Type': image.type || 'application/octet-stream'
              }
            });

            if (response.status < 200 || response.status >= 300) {
              return {
                success: false,
                error: `HTTP ${response.status}: ${response.statusText}`,
                index
              };
            }

            return {
              success: true,
              index
            };
          } catch (error) {
            console.error('Upload Error:', error);
            return {
              success: false,
              error,
              index
            };
          }
        })
      );

      const failedUploads = uploadResults.filter(result => !result.success);
      if (failedUploads?.length) {
        alert('Some images failed to upload. Please try again.');
        return;
      }

      alert('Request a Challenge Successfully!');
      router.push(`/challengeList/${id}`);
    } catch (error) {
      console.error('Submission Error:', error);
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
