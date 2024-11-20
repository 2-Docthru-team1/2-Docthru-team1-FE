import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
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

  const [content, setContent] = useState<string>('Please write your challenge...');
  const [isPlaceholder, setIsPlaceholder] = useState(true);
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  // 현재 선택된 텍스트의 스타일 상태를 확인하는 함수
  const checkCurrentStyles = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const parentElement = range.commonAncestorContainer.parentElement;

    if (!parentElement) return;

    setStyles(prev => ({
      ...prev,
      isBold: document.queryCommandState('bold'),
      isItalic: document.queryCommandState('italic'),
      isUnderline: document.queryCommandState('underline')
    }));
  };

  const toggleStyle = (style: keyof StylesState) => {
    const commandMap = {
      isBold: 'bold',
      isItalic: 'italic',
      isUnderline: 'underline'
    };

    const command = commandMap[style as keyof typeof commandMap];
    if (command) {
      document.execCommand(command, false);
      checkCurrentStyles(); // 스타일 적용 후 현재 상태 확인
    } else {
      setStyles(prev => ({
        ...prev,
        [style]: !prev[style]
      }));
    }
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

  useEffect(() => {
    if (isInitialMount.current && contentEditableRef.current) {
      contentEditableRef.current.innerHTML = content;
      isInitialMount.current = false;
    }
  }, [content]);

  useEffect(() => {
    const contentEditable = contentEditableRef.current;

    const handleFocus = () => {
      if (isPlaceholder) {
        setContent('');
        setIsPlaceholder(false);
        if (contentEditableRef.current) {
          contentEditableRef.current.innerHTML = '';
        }
      }
    };

    const handleBlur = () => {
      if (contentEditableRef.current?.innerHTML.trim() === '') {
        setContent('Please write your challenge...');
        setIsPlaceholder(true);
        if (contentEditableRef.current) {
          contentEditableRef.current.innerHTML = 'Please write your challenge...';
        }
      }
    };

    // 텍스트 선택 시 스타일 상태 확인
    const handleSelectionChange = () => {
      checkCurrentStyles();
    };

    if (contentEditable) {
      contentEditable.addEventListener('focus', handleFocus);
      contentEditable.addEventListener('blur', handleBlur);
      document.addEventListener('selectionchange', handleSelectionChange);
    }

    return () => {
      if (contentEditable) {
        contentEditable.removeEventListener('focus', handleFocus);
        contentEditable.removeEventListener('blur', handleBlur);
        document.removeEventListener('selectionchange', handleSelectionChange);
      }
    };
  }, [isPlaceholder]);

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
      <div
        ref={contentEditableRef}
        contentEditable
        suppressContentEditableWarning
        className={`w-[118.9rem] h-[26rem] text-[1.6rem] mt-[2.4rem] leading-[2.56rem] focus:outline-none p-4
          ${isPlaceholder ? 'text-gray-200' : 'text-gray-800'}
          ${styles.alignment === 'left' ? 'text-left' : ''} 
          ${styles.alignment === 'center' ? 'text-center' : ''} 
          ${styles.alignment === 'right' ? 'text-right' : ''}`}
        onInput={e => {
          const newContent = e.currentTarget.innerHTML;
          if (newContent !== content) {
            setContent(newContent);
            setIsPlaceholder(false);
          }
        }}
      />
    </div>
  );
}
