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
  currentListType: 'bullet' | 'numbering' | null;
  isColoring: boolean;
}

export default function ChallengeBody() {
  const [styles, setStyles] = useState({
    isBold: false,
    isItalic: false,
    isUnderline: false,
    alignment: 'left' as const,
    currentListType: null as null | 'bullet' | 'numbering',
    currentColor: '#000000'
  });

  const [content, setContent] = useState('Please write your challenge...');
  const [isPlaceholder, setIsPlaceholder] = useState(true);
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  const colorInputRef = useRef<HTMLInputElement>(null);

  const applyFormatting = () => {
    if (!contentEditableRef.current) return;
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const savedSelection = {
      startContainer: range.startContainer,
      startOffset: range.startOffset,
      endContainer: range.endContainer,
      endOffset: range.endOffset
    };

    if (styles.currentColor) {
      document.execCommand('foreColor', false, styles.currentColor);
    }

    document.execCommand(`justify${styles.alignment.charAt(0).toUpperCase() + styles.alignment.slice(1)}`, false);

    const newRange = document.createRange();
    newRange.setStart(savedSelection.startContainer, savedSelection.startOffset);
    newRange.setEnd(savedSelection.endContainer, savedSelection.endOffset);
    selection.removeAllRanges();
    selection.addRange(newRange);
  };

  const checkCurrentStyles = () => {
    if (document && contentEditableRef.current) {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      const parentElement = range.commonAncestorContainer.parentElement;

      let currentListType = null;
      let currentElement = parentElement;
      while (currentElement) {
        if (currentElement.tagName === 'UL') {
          currentListType = 'bullet';
          break;
        } else if (currentElement.tagName === 'OL') {
          currentListType = 'numbering';
          break;
        }
        currentElement = currentElement.parentElement;
      }

      let alignment = 'left';
      if (parentElement) {
        const style = window.getComputedStyle(parentElement);
        const textAlign = style.textAlign;
        if (textAlign === 'center' || textAlign === 'right') {
          alignment = textAlign;
        }
      }

      const color = document.queryCommandValue('foreColor');

      setStyles(prev => ({
        ...prev,
        isBold: document.queryCommandState('bold'),
        isItalic: document.queryCommandState('italic'),
        isUnderline: document.queryCommandState('underline'),
        currentListType,
        alignment: alignment as 'left' | 'center' | 'right',
        currentColor: color || prev.currentColor
      }));
    }
  };

  const toggleStyle = (style: 'isBold' | 'isItalic' | 'isUnderline') => {
    const commandMap = {
      isBold: 'bold',
      isItalic: 'italic',
      isUnderline: 'underline'
    };

    if (document) {
      document.execCommand(commandMap[style], false);
      checkCurrentStyles();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;
      
      const range = selection.getRangeAt(0);
      let currentLine = range.commonAncestorContainer;
      
      let listItem = currentLine.nodeType === Node.TEXT_NODE ? currentLine.parentElement : currentLine as HTMLElement;
      while (listItem && listItem.tagName !== 'LI') {
        listItem = listItem.parentElement;
      }
      
      if (listItem && (!listItem.textContent || listItem.textContent.trim() === '')) {
        e.preventDefault();
        const list = listItem.parentElement;
        if (list) {
          if (list.tagName === 'UL') {
            document.execCommand('insertUnorderedList', false);
          } else if (list.tagName === 'OL') {
            document.execCommand('insertOrderedList', false);
          }
          document.execCommand('insertHTML', false, '<br>');
          setStyles(prev => ({ ...prev, currentListType: null }));
        }
      } else {
        if (styles.currentListType) {
          document.execCommand('insertHTML', false, '<br>');
          const command = styles.currentListType === 'bullet' ? 'insertUnorderedList' : 'insertOrderedList';
          setTimeout(() => {
            document.execCommand(command, false);
            applyCurrentFormatting();
          }, 0);
        } else {
          document.execCommand('insertHTML', false, '<br>');
        }
      }
    }
  };

  const applyCurrentFormatting = () => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    let currentElement = range.commonAncestorContainer;
    if (currentElement.nodeType === Node.TEXT_NODE) {
      currentElement = currentElement.parentElement;
    }

    let listItem = currentElement as HTMLElement;
    while (listItem && listItem.tagName !== 'LI') {
      listItem = listItem.parentElement;
    }

    if (listItem) {
      const list = listItem.parentElement as HTMLElement;
      if (list) {
        list.style.textAlign = styles.alignment;
      }
    }
  };

  const handleAlignment = (alignment: 'left' | 'center' | 'right') => {
    if (!contentEditableRef.current) return;

    setStyles(prev => ({ ...prev, alignment }));
    
    const lists = contentEditableRef.current.querySelectorAll('ul, ol');
    lists.forEach(list => {
      (list as HTMLElement).style.textAlign = alignment;
    });

    document.execCommand(`justify${alignment.charAt(0).toUpperCase() + alignment.slice(1)}`, false);
  };

  const handleListTypeChange = (type: 'bullet' | 'numbering') => {
    if (!contentEditableRef.current) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      const command = type === 'bullet' ? 'insertUnorderedList' : 'insertOrderedList';
      document.execCommand(command, false);
      setStyles(prev => ({ ...prev, currentListType: type }));
      
      const lists = contentEditableRef.current.querySelectorAll(type === 'bullet' ? 'ul' : 'ol');
      lists.forEach(list => {
        (list as HTMLElement).style.listStyleType = type === 'bullet' ? 'disc' : 'decimal';
        (list as HTMLElement).style.paddingLeft = '20px';
        (list as HTMLElement).style.textAlign = styles.alignment;
      });
      return;
    }

    let currentElement = selection.getRangeAt(0).commonAncestorContainer;
    while (currentElement && currentElement.nodeType === Node.TEXT_NODE) {
      currentElement = currentElement.parentNode;
    }

    let currentList = currentElement;
    while (currentList && !['UL', 'OL'].includes((currentList as Element).tagName)) {
      currentList = currentList.parentElement;
    }

    if (currentList) {
      if ((currentList as Element).tagName === (type === 'bullet' ? 'UL' : 'OL')) {
        document.execCommand('outdent', false);
        setStyles(prev => ({ ...prev, currentListType: null }));
        return;
      }
    }

    const command = type === 'bullet' ? 'insertUnorderedList' : 'insertOrderedList';
    document.execCommand(command, false);
    setStyles(prev => ({ ...prev, currentListType: type }));

    const lists = contentEditableRef.current.querySelectorAll(type === 'bullet' ? 'ul' : 'ol');
    lists.forEach(list => {
      (list as HTMLElement).style.listStyleType = type === 'bullet' ? 'disc' : 'decimal';
      (list as HTMLElement).style.paddingLeft = '20px';
      (list as HTMLElement).style.textAlign = styles.alignment;
    });
  };

  const handleFocus = () => {
    if (isPlaceholder && contentEditableRef.current) {
      contentEditableRef.current.innerHTML = '';
      setContent('');
      setIsPlaceholder(false);
    }
    checkCurrentStyles();
  };

  const handleBlur = () => {
    if (contentEditableRef.current && contentEditableRef.current.innerHTML.trim() === '') {
      contentEditableRef.current.innerHTML = 'Please write your challenge...';
      setContent('Please write your challenge...');
      setIsPlaceholder(true);
    }
    checkCurrentStyles();
  };

  useEffect(() => {
    const contentEditable = contentEditableRef.current;
    if (!contentEditable) return;

    contentEditable.addEventListener('focus', handleFocus);
    contentEditable.addEventListener('blur', handleBlur);
    
    checkCurrentStyles();

    return () => {
      contentEditable.removeEventListener('focus', handleFocus);
      contentEditable.removeEventListener('blur', handleBlur);
    };
  }, []);

  const handleBgColorChange = (color: string) => {
    if (document && contentEditableRef.current) {
      document.execCommand('foreColor', false, color);
      setStyles(prev => ({ ...prev, currentColor: color }));

      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const span = range.commonAncestorContainer.parentElement;
        if (span) {
          span.style.color = color;
        }
      }
    }
  };

  const openColorPicker = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      let currentLine = range.commonAncestorContainer;

      let listItem = currentLine.nodeType === Node.TEXT_NODE ? currentLine.parentElement : (currentLine as HTMLElement);
      while (listItem && listItem.tagName !== 'LI') {
        listItem = listItem.parentElement;
      }

      if (listItem && (!listItem.textContent || listItem.textContent.trim() === '')) {
        e.preventDefault();
        const list = listItem.parentElement;
        if (list) {
          if (list.tagName === 'UL') {
            document.execCommand('insertUnorderedList', false);
          } else if (list.tagName === 'OL') {
            document.execCommand('insertOrderedList', false);
          }
          document.execCommand('insertHTML', false, '<br>');
          setStyles(prev => ({ ...prev, currentListType: null }));
        }
      } else {
        if (styles.currentListType) {
          document.execCommand('insertHTML', false, '<br>');
          const command = styles.currentListType === 'bullet' ? 'insertUnorderedList' : 'insertOrderedList';
          setTimeout(() => {
            document.execCommand(command, false);
            applyCurrentFormatting();
          }, 0);
        } else {
          document.execCommand('insertHTML', false, '<br>');
        }
      }
    }
  };

  const applyCurrentFormatting = () => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    let currentElement = range.commonAncestorContainer;
    if (currentElement.nodeType === Node.TEXT_NODE) {
      currentElement = currentElement.parentElement;
    }

    let listItem = currentElement as HTMLElement;
    while (listItem && listItem.tagName !== 'LI') {
      listItem = listItem.parentElement;
    }

    if (listItem) {
      const list = listItem.parentElement as HTMLElement;
      if (list) {
        list.style.textAlign = styles.alignment;
      }
    }
  };

  const handleAlignment = (alignment: 'left' | 'center' | 'right') => {
    if (!contentEditableRef.current) return;

    setStyles(prev => ({ ...prev, alignment }));

    const lists = contentEditableRef.current.querySelectorAll('ul, ol');
    lists.forEach(list => {
      (list as HTMLElement).style.textAlign = alignment;
    });

    document.execCommand(`justify${alignment.charAt(0).toUpperCase() + alignment.slice(1)}`, false);
  };

  const handleSelectionChange = () => {
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
  }, []);

  useEffect(() => {
    const contentEditable = contentEditableRef.current;
    if (!contentEditable) return;

    const handleFocus = () => {
      if (isPlaceholder && contentEditableRef.current) {
        contentEditableRef.current.innerHTML = '';
        setContent('');
        setIsPlaceholder(false);
      }
      checkCurrentStyles();
    };

    const handleBlur = () => {
      if (contentEditable && contentEditable.innerHTML.trim() === '') {
        contentEditable.innerHTML = 'Please write your challenge...';
        setContent('Please write your challenge...');
        setIsPlaceholder(true);
      }
    };

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
          <button
            onClick={() => handleListTypeChange('bullet')}
            className={`cursor-pointer p-2 rounded ${styles.currentListType === 'bullet' ? 'bg-gray-200' : ''}`}
            type="button"
          >
            <Image src={bullet} alt="bullet" />
          </button>
          <button
            onClick={() => handleListTypeChange('numbering')}
            className={`cursor-pointer p-2 rounded ${styles.currentListType === 'numbering' ? 'bg-gray-200' : ''}`}
            type="button"
          >
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
            onChange={e => handleBgColorChange(e.target.value)}
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
