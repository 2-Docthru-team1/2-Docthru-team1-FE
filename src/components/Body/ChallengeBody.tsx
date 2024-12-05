'use client';

import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { getWorkDetail } from '@/api/workService';
import type { ChallengeBodyProps } from '@/interfaces/challengeInterface';
import 'react-quill-new/dist/quill.snow.css';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function ChallengeBody({
  title,
  setTitle,
  content,
  setContent,
  images,
  setImages,
  isCardClicked,
  workId
}: ChallengeBodyProps) {
  const { data: work } = useQuery({
    queryKey: ['work', workId],
    queryFn: () => getWorkDetail(workId),
    enabled: !!workId
  });

  useEffect(() => {
    if (work) {
      setTitle(work.title.replace(/<\/?[^>]+(>|$)/g, ''));
      setContent(work.content.replace(/<\/?[^>]+(>|$)/g, ''));
    }
  }, [work, setTitle, setContent]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      if (images.length + newFiles.length <= 2) {
        setImages((prevImages: File[]) => [...prevImages, ...newFiles]);
      } else {
        alert('최대 2개의 이미지만 업로드할 수 있습니다.');
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages: File[]) => prevImages.filter((_, i) => i !== index));
  };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ size: [] }],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }]
    ]
  };

  return (
    <div
      className={`border-none lg:w-[87.1rem] lg:px-0 ${isCardClicked ? 'md:w-[38.8rem]' : 'md:w-full'} md:max-w-[87.1rem] md:px-0 sm:w-full sm:max-w-[69.6rem] sm:pl-0`}
    >
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder={'Title goes here'}
        className="mt-[2.4rem] w-full placeholder:gray-400 placeholder:font-semibold font-bold text-[2rem] placeholder:leading-[2.387rem] text-gray-700 focus:outline-none leading-[2.6rem] bg-gray-50"
      />
      <div className="border border-gray-200 w-full my-[2.4rem]" />
      <div className="bg-primary-white p-[1.5rem] rounded-[2rem]">
        <div className="border-none bg-white rounded-lg shadow-sm">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleContentChange}
            modules={modules}
            placeholder={'Please write your challenge'}
          />
        </div>
        <div className="mt-[10rem] flex flex-col gap-[0.8rem] font-semibold text-[2rem] leading-[2.6rem]">
          <p>Photo (*required)</p>
          <div className="flex gap-[0.8rem]">
            {images.map((file, index) => (
              <div
                key={index}
                className="relative w-[17.1rem] h-[17.1rem] border border-[#E3E0DC] flex items-center justify-center"
              >
                {work ? (
                  <Image
                    src={work.images[0].imageUrl}
                    alt={`업로드된 이미지 ${index + 1}`}
                    width={170}
                    height={170}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`업로드된 이미지 ${index + 1}`}
                    width={170}
                    height={170}
                    className="w-full h-full object-cover"
                  />
                )}
                <Image
                  src={`${S3_BASE_URL}/icon_out_circle_small.svg`}
                  alt="엑스"
                  onClick={() => handleRemoveImage(index)}
                  className="mt-[0.7rem] mr-[0.7rem] absolute top-0 right-0 cursor-pointer"
                />
              </div>
            ))}
            {images.length < 2 && (
              <div
                className="w-[17.1rem] h-[17.1rem] border border-[#E3E0DC] flex items-center justify-center cursor-pointer bg-primary-white rounded-[0.5rem]"
                onClick={handleImageClick}
              >
                <Image src={`${S3_BASE_URL}/icon_add_photo_plus.svg`} alt="더하기" width={40} height={40} />
              </div>
            )}
          </div>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
        </div>
      </div>
    </div>
  );
}
