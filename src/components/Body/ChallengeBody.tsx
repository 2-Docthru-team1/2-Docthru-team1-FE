'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import plus from '@/../public/assets/icon_add_photo_plus.png';
import close from '@/../public/assets/icon_out_circle_small.png';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function ChallengeBody() {
  const [content, setContent] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
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
        setImages(prevImages => [...prevImages, ...newFiles]);
      } else {
        alert('최대 2개의 이미지만 업로드할 수 있습니다.');
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
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
    <div className="border-none w-[87.1rem]">
      <div className="border-none bg-white rounded-lg shadow-sm">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleContentChange}
          modules={modules}
          placeholder="Please write your challenge"
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
              <Image
                src={URL.createObjectURL(file)}
                alt={`업로드된 이미지 ${index + 1}`}
                width={170}
                height={170}
                className="w-full h-full object-cover"
              />
              <Image
                src={close}
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
              <Image src={plus} alt="더하기" width={40} height={40} />
            </div>
          )}
        </div>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
      </div>
    </div>
  );
}
