'use client';

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

interface StylesState {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  alignment: 'left' | 'center' | 'right';
  currentColor: string;
}

interface SavedSelection {
  startContainer: Node;
  startOffset: number;
  endContainer: Node;
  endOffset: number;
}

export default function ChallengeBody() {
  const [styles, setStyles] = useState<StylesState>({
    isBold: false,
    isItalic: false,
    isUnderline: false,
    alignment: 'left',
    currentColor: '#000000'
  });

  const [content, setContent] = useState<string>('Please write your challenge...');
  const [isPlaceholder, setIsPlaceholder] = useState<boolean>(true);
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef<boolean>(true);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const savedSelectionRef = useRef<SavedSelection | null>(null);

  const saveSelection = (): void => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    savedSelectionRef.current = {
      startContainer: range.startContainer,
      startOffset: range.startOffset,
      endContainer: range.endContainer,
      endOffset: range.endOffset
    };
  };

  const restoreSelection = (): void => {
    const savedSelection = savedSelectionRef.current;
    if (!savedSelection) return;

    const selection = window.getSelection();
    if (!selection) return;

    const range = document.createRange();
    range.setStart(savedSelection.startContainer, savedSelection.startOffset);
    range.setEnd(savedSelection.endContainer, savedSelection.endOffset);

    selection.removeAllRanges();
    selection.addRange(range);
  };

  const applyFormatting = (): void => {
    if (!contentEditableRef.current) return;

    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    // Save the current selection before applying formatting
    saveSelection();

    if (styles.currentColor) {
      document.execCommand('foreColor', false, styles.currentColor);
    }

    document.execCommand(`justify${styles.alignment.charAt(0).toUpperCase() + styles.alignment.slice(1)}`, false);

    // Restore the selection after applying formatting
    restoreSelection();
  };

  const checkCurrentStyles = (): void => {
    if (!contentEditableRef.current) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const parentElement = range.commonAncestorContainer.parentElement;
    if (!parentElement) return;

    let alignment: 'left' | 'center' | 'right' = 'left';
    const style = window.getComputedStyle(parentElement);
    const textAlign = style.textAlign;
    if (textAlign === 'center' || textAlign === 'right') {
      alignment = textAlign;
    }

    setStyles(prev => ({
      ...prev,
      isBold: document.queryCommandState('bold'),
      isItalic: document.queryCommandState('italic'),
      isUnderline: document.queryCommandState('underline'),
      alignment,
      currentColor: document.queryCommandValue('foreColor') || prev.currentColor
    }));
  };

  const toggleStyle = (style: keyof Pick<StylesState, 'isBold' | 'isItalic' | 'isUnderline'>): void => {
    const commandMap: Record<typeof style, string> = {
      isBold: 'bold',
      isItalic: 'italic',
      isUnderline: 'underline'
    };

    // Save selection before toggling style
    saveSelection();

    document.execCommand(commandMap[style], false);
    checkCurrentStyles();

    // Restore selection after toggling style
    restoreSelection();
  };

  const handleAlignment = (alignment: 'left' | 'center' | 'right'): void => {
    if (!contentEditableRef.current) return;

    setStyles(prev => ({ ...prev, alignment }));

    // Save selection before changing alignment
    saveSelection();

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      let container = range.commonAncestorContainer as HTMLElement;

      if (container.nodeType === Node.TEXT_NODE) {
        container = container.parentElement as HTMLElement;
      }

      let blockContainer = container;
      while (blockContainer && !['DIV', 'P'].includes(blockContainer.tagName) && blockContainer !== contentEditableRef.current) {
        blockContainer = blockContainer.parentElement as HTMLElement;
      }

      const targetElement = blockContainer || contentEditableRef.current;
      if (targetElement) {
        targetElement.style.textAlign = alignment;
      }
    } else {
      contentEditableRef.current.style.textAlign = alignment;
    }

    // Restore selection after changing alignment
    restoreSelection();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (isPlaceholder) return;

      document.execCommand('insertParagraph', false);
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      const newParagraph = range.startContainer.parentElement;
      if (newParagraph) {
        newParagraph.style.textAlign = styles.alignment;
        newParagraph.className = 'text-[1.6rem] leading-[2.56rem]';
      }
    }
  };

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>): void => {
    const target = e.currentTarget;
    if (target.innerHTML !== content) {
      setContent(target.innerHTML);
      if (target.innerHTML !== 'Please write your challenge...') {
        setIsPlaceholder(false);
      }
    }
    checkCurrentStyles();
    applyFormatting();
  };

  const handleBgColorChange = (color: string): void => {
    if (!contentEditableRef.current) return;

    // Restore the saved selection before applying the color
    restoreSelection();

    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    // Apply color only to the selected range
    document.execCommand('foreColor', false, color);
    setStyles(prev => ({ ...prev, currentColor: color }));

    // Save the selection again after applying the color
    saveSelection();
  };

  const openColorPicker = (): void => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  const handleSelectionChange = (): void => {
    saveSelection();
    checkCurrentStyles();
  };

  useEffect(() => {
    if (isInitialMount.current && contentEditableRef.current) {
      contentEditableRef.current.innerHTML = content;
      isInitialMount.current = false;
    }

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [content]);

  useEffect(() => {
    if (isInitialMount.current && contentEditableRef.current) {
      contentEditableRef.current.innerHTML = content;
      isInitialMount.current = false;
    }

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [content]);

  const handleFocus = () => {
    if (isPlaceholder && contentEditableRef.current) {
      contentEditableRef.current.innerHTML = '';
      setContent('');
      setIsPlaceholder(false);
    }
    checkCurrentStyles();
  };

  const handleBlur = () => {
    const contentEditable = contentEditableRef.current;
    if (contentEditable && contentEditable.innerHTML.trim() === '') {
      contentEditable.innerHTML = 'Please write your challenge...';
      setContent('Please write your challenge...');
      setIsPlaceholder(true);
    }
  };

  useEffect(() => {
    const contentEditable = contentEditableRef.current;
    if (!contentEditable) return;

    contentEditable.addEventListener('focus', handleFocus);
    contentEditable.addEventListener('blur', handleBlur);

    return () => {
      contentEditable.removeEventListener('focus', handleFocus);
      contentEditable.removeEventListener('blur', handleBlur);
    };
  }, [isPlaceholder]);

  return (
    <div>
      <div className="flex gap-[1.5rem] mb-4">
        <div className="flex gap-[0.2rem]">
          <button
            onClick={() => toggleStyle('isBold')}
            className={`cursor-pointer p-2 rounded ${styles.isBold ? 'bg-gray-200' : ''}`}
            type="button"
          >
            <Image src={bold} alt="bold" />
          </button>
          <button
            onClick={() => toggleStyle('isItalic')}
            className={`cursor-pointer p-2 rounded ${styles.isItalic ? 'bg-gray-200' : ''}`}
            type="button"
          >
            <Image src={italic} alt="italic" />
          </button>
          <button
            onClick={() => toggleStyle('isUnderline')}
            className={`cursor-pointer p-2 rounded ${styles.isUnderline ? 'bg-gray-200' : ''}`}
            type="button"
          >
            <Image src={underline} alt="underline" />
          </button>
        </div>
        <div className="flex gap-[0.2rem]">
          <button
            onClick={() => handleAlignment('left')}
            className={`cursor-pointer p-2 rounded ${styles.alignment === 'left' ? 'bg-gray-200' : ''}`}
            type="button"
          >
            <Image src={alignLeft} alt="left" />
          </button>
          <button
            onClick={() => handleAlignment('center')}
            className={`cursor-pointer p-2 rounded ${styles.alignment === 'center' ? 'bg-gray-200' : ''}`}
            type="button"
          >
            <Image src={alignCenter} alt="center" />
          </button>
          <button
            onClick={() => handleAlignment('right')}
            className={`cursor-pointer p-2 rounded ${styles.alignment === 'right' ? 'bg-gray-200' : ''}`}
            type="button"
          >
            <Image src={alignRight} alt="right" />
          </button>
        </div>
        <div className="flex gap-[0.2rem]">
          <button onClick={() => {}} className="cursor-pointer p-2 rounded" type="button">
            <Image src={bullet} alt="bullet" />
          </button>
          <button onClick={() => {}} className="cursor-pointer p-2 rounded" type="button">
            <Image src={numbering} alt="numbering" />
          </button>
        </div>
        <div className="flex gap-[0.2rem]">
          <button
            onClick={openColorPicker}
            className={`cursor-pointer p-2 rounded`}
            style={{
              backgroundColor: styles.currentColor,
              filter: styles.currentColor === '#000000' ? 'none' : 'none'
            }}
            type="button"
          >
            <Image
              src={coloring}
              alt="coloring"
              style={{
                filter: styles.currentColor === '#000000' ? 'none' : 'brightness(0) invert(1)'
              }}
            />
          </button>
          <input
            ref={colorInputRef}
            type="color"
            value={styles.currentColor}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBgColorChange(e.target.value)}
            className="hidden"
            title="Choose text color"
          />
        </div>
      </div>
      <div
        ref={contentEditableRef}
        contentEditable
        suppressContentEditableWarning
        className={`w-[118.9rem] h-[26rem] text-[1.6rem] mt-[2.4rem] leading-[2.56rem] focus:outline-none p-4
          ${isPlaceholder ? 'text-gray-200' : 'text-gray-800'}`}
        onInput={handleContentChange}
        onKeyDown={handleKeyDown}
        style={{
          textAlign: styles.alignment,
          display: 'block'
        }}
      />
    </div>
  );
}
