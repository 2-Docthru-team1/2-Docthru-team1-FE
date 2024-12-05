'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { fetchChallenge_detail, fetchRegisterWork } from '@/api/challengeService';
import { uploadImageToEC2 } from '@/api/uploadService';
import 'react-toastify/dist/ReactToastify.css';
import ChallengeBody from '../Body/ChallengeBody';
import ChallengeRefPageCard from '../Card/ChallengeRefPageCard';
import ChallengeHeader from '../Header/ChallengeHeader';

export default function ChallengeTryClient() {
  const { id } = useParams();
  const router = useRouter();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const savedData = localStorage.getItem(`challengeTrySaveData-${userId}-${id}`);
    if (savedData) {
      toast.info('저장된 데이터가 있습니다. 복원하시겠습니까?', {
        position: 'bottom-center',
        autoClose: false,
        closeOnClick: true,
        onClick: () => restoreData(savedData)
      });
    }
  }, []);

  const restoreData = (savedData: string) => {
    const { title, content } = JSON.parse(savedData);
    setTitle(title);
    setContent(content);
    toast.success('데이터를 복원했습니다.', { position: 'top-right', autoClose: 2000 });
  };

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState(false);
  const [uploadImages, setUploadImages] = useState<File[]>([]);
  const [isCardClicked, setIsCardClicked] = useState(false);

  const handleCardClick = () => {
    setIsCardClicked(prev => !prev);
  };

  const [embedUrl, setEmbedUrl] = useState<string>('');

  useEffect(() => {
    const fetchEmbedUrl = async () => {
      try {
        if (!id) return;
        const detail = await fetchChallenge_detail(String(id));
        setEmbedUrl(detail.embedUrl || '');
      } catch (error) {
        setEmbedUrl('');
      }
    };

    fetchEmbedUrl();
  }, [id]);

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

      if (typeof window !== 'undefined') {
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith(`challengeTrySaveData-${work.challengeId}-${userId}-`)) {
            localStorage.removeItem(key);
          }
        });
      }
    } catch (error) {
      alert('Error submitting the form. Please try again.');
    }
  };

  const handleSave = () => {
    const challengeData = {
      id,
      title,
      content
    };

    localStorage.setItem(`challengeTrySaveData-${userId}-${id}`, JSON.stringify(challengeData));
    alert('Saved to local storage!');
    router.push(`/challengeList/${id}`);
  };

  return (
    <div
      className={`flex justify-center w-full lg:flex-row lg:items-start md:flex-row md:items-start ${!isCardClicked ? 'sm:flex-row sm:items-start' : 'sm:flex-col sm:items-center'}`}
    >
      <div
        className={`flex-1 flex-col items-center justify-center flex lg:mr-[3.8rem] md:mr-0 sm:mr-0 lg:px-0 md:pl-[1.5rem] md:pr-[0] sm:px-[3.4rem] lg:w-[120rem] sm:w-full lg:order-1 md:order-1
      ${isCardClicked ? 'md:w-[38.8rem] sm:order-2' : 'md:w-full sm:order-1'}`}
      >
        <div className="w-full flex justify-center">
          <ChallengeHeader onSubmit={handleSubmit} isCardClicked={isCardClicked} onSave={handleSave} />
        </div>
        <div className="mt-[2.4rem] mb-[5rem] w-full flex justify-center lg:px-0 md:pl-[0.2rem] md:pr-0 sm:px-[0.6rem]">
          <ChallengeBody
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            images={uploadImages}
            setImages={setUploadImages}
            isCardClicked={isCardClicked}
          />
        </div>
        <ToastContainer />
      </div>
      <div onClick={handleCardClick} className={`${!isCardClicked ? 'sm:order-2' : 'sm:order-1'} lg:order-2 md:order-2`}>
        <ChallengeRefPageCard embedUrl={embedUrl} />
      </div>
    </div>
  );
}
