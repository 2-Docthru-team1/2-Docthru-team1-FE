import Image from 'next/image';
import { useState } from 'react';
import plus from '@/../public/assets/icon_add_photo_plus.png';
import alignCenter from '@/../public/assets/icon_writing_alignment_center.png';
import alignLeft from '@/../public/assets/icon_writing_alignment_left.png';
import alignRight from '@/../public/assets/icon_writing_alignment_right.png';
import bold from '@/../public/assets/icon_writing_bold.png';
import bullet from '@/../public/assets/icon_writing_bullet.png';
import coloring from '@/../public/assets/icon_writing_coloring.png';
import italic from '@/../public/assets/icon_writing_italic.png';
import numbering from '@/../public/assets/icon_writing_numbering.png';
import underline from '@/../public/assets/icon_writing_underline.png';
import type { StylesState } from '@/interfaces/challengeInterface';

export default function ChallengeBody() {
  const [styles, setStyles] = useState<StylesState>({
    isBold: false,
    isItalic: false,
    isUnderline: false,
    alignment: 'left',
    currentListType: null,
    isColoring: false
  });

  const toggleStyle = (style: keyof StylesState) => {
    setStyles(prev => ({
      ...prev,
      [style]: !prev[style]
    }));
  };

  const handleAlignment = (alignment: 'left' | 'center' | 'right') => {
    setStyles(prev => ({
      ...prev,
      alignment
    }));
  };

  const handleListTypeChange = (type: 'bullet' | 'numbering') => {
    setStyles(prev => ({
      ...prev,
      currentListType: prev.currentListType === type ? null : type
    }));
  };

  return (
    <div>
      <div className="flex gap-[1.5rem] mb-4">
        <div className="flex gap-[0.2rem]">
          <div onClick={() => toggleStyle('isBold')} className={`cursor-pointer ${styles.isBold ? 'bg-gray-100' : ''}`}>
            <Image src={bold} alt="bold" />
          </div>
          <div onClick={() => toggleStyle('isItalic')} className={`cursor-pointer ${styles.isItalic ? 'bg-gray-100' : ''}`}>
            <Image src={italic} alt="italic" />
          </div>
          <div onClick={() => toggleStyle('isUnderline')} className={`cursor-pointer ${styles.isUnderline ? 'bg-gray-100' : ''}`}>
            <Image src={underline} alt="underline" />
          </div>
        </div>
        <div className="flex gap-[0.2rem]">
          <div
            onClick={() => handleAlignment('left')}
            className={`cursor-pointer ${styles.alignment === 'left' ? 'bg-gray-100' : ''}`}
          >
            <Image src={alignLeft} alt="left" />
          </div>
          <div
            onClick={() => handleAlignment('center')}
            className={`cursor-pointer ${styles.alignment === 'center' ? 'bg-gray-100' : ''}`}
          >
            <Image src={alignCenter} alt="center" />
          </div>
          <div
            onClick={() => handleAlignment('right')}
            className={`cursor-pointer ${styles.alignment === 'right' ? 'bg-gray-100' : ''}`}
          >
            <Image src={alignRight} alt="right" />
          </div>
        </div>
        <div className="flex gap-[0.2rem]">
          <div
            onClick={() => handleListTypeChange('bullet')}
            className={`cursor-pointer ${styles.currentListType === 'bullet' ? 'bg-gray-100' : ''}`}
          >
            <Image src={bullet} alt="bullet" />
          </div>
          <div
            onClick={() => handleListTypeChange('numbering')}
            className={`cursor-pointer ${styles.currentListType === 'numbering' ? 'bg-gray-100' : ''}`}
          >
            <Image src={numbering} alt="numbering" />
          </div>
        </div>
        <div className="flex gap-[0.2rem]">
          <div onClick={() => toggleStyle('isColoring')} className={`cursor-pointer ${styles.isColoring ? 'bg-gray-100' : ''}`}>
            <Image src={coloring} alt="coloring" />
          </div>
        </div>
      </div>
      <textarea
        placeholder="Please write your challenge"
        className={`w-[118.9rem] h-[26rem] text-[1.6rem] resize-none leading-[2.56rem] text-gray-800 placeholder:text-gray-400 focus:outline-none mt-[2.4rem] 
          ${styles.isBold ? 'font-bold' : 'font-normal'} 
          ${styles.isItalic ? 'italic' : ''} 
          ${styles.isUnderline ? 'underline' : ''} 
          ${styles.alignment === 'left' ? 'text-left' : ''} 
          ${styles.alignment === 'center' ? 'text-center' : ''} 
          ${styles.alignment === 'right' ? 'text-right' : ''}`}
        style={{
          fontWeight: styles.isBold ? 700 : 400
        }}
      />
      <div className="flex flex-col mt-[10rem] gap-[0.8rem]">
        <p className="">Photo(*required)</p>
        <div className="border border-[#E3E0DC] w-[17.1rem] h-[17.1rem] rounded-[0.5rem] flex items-center justify-center">
          <Image src={plus} alt="plus" />
        </div>
      </div>
    </div>
  );
}
