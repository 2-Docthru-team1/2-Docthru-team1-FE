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
  isBulletList: boolean;
  isNumberList: boolean;
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
    currentColor: '#000000',
    isBulletList: false,
    isNumberList: false
  });

  const [content, setContent] = useState<string>('Please write your challenge...');
  const [isPlaceholder, setIsPlaceholder] = useState<boolean>(true);
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef<boolean>(true);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const savedSelectionRef = useRef<SavedSelection | null>(null);
  const [listCounter, setListCounter] = useState<number>(1);

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

    saveSelection();

    if (styles.currentColor) {
      document.execCommand('foreColor', false, styles.currentColor);
    }

    document.execCommand(`justify${styles.alignment.charAt(0).toUpperCase() + styles.alignment.slice(1)}`, false);

    restoreSelection();
  };

  const createListItem = (type: 'bullet' | 'number'): void => {
    if (!contentEditableRef.current) return;

    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer as HTMLElement;

    const listItem = document.createElement('div');
    listItem.className = 'list-item text-[1.6rem] leading-[2.56rem]';
    listItem.style.textAlign = styles.alignment;

    if (type === 'bullet') {
      listItem.setAttribute('data-list-type', 'bullet');
      listItem.innerHTML = '• ';
    } else {
      listItem.setAttribute('data-list-type', 'number');
      listItem.innerHTML = `${listCounter}. `;
      setListCounter(prev => prev + 1);
    }

    if (container.textContent?.trim() === '') {
      container.parentElement?.replaceChild(listItem, container);
    } else {
      const currentBlock = container.closest('div') || container;
      currentBlock.parentElement?.insertBefore(listItem, currentBlock.nextSibling);
    }

    const textNode = document.createTextNode('');
    listItem.appendChild(textNode);
    range.setStart(textNode, 0);
    range.setEnd(textNode, 0);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handleListCommand = (type: 'bullet' | 'number') => {
    if (!contentEditableRef.current) return;

    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    let container = range.commonAncestorContainer as HTMLElement;

    if (container.nodeType === Node.TEXT_NODE) {
      container = container.parentElement as HTMLElement;
    }

    const existingList = container.closest('ul, ol') as HTMLElement;

    if (existingList) {
      const fragment = document.createDocumentFragment();
      Array.from(existingList.children).forEach(li => {
        const div = document.createElement('div');
        div.innerHTML = li.innerHTML;
        fragment.appendChild(div);
      });
      existingList.parentNode?.replaceChild(fragment, existingList);

      setStyles(prev => ({
        ...prev,
        isBulletList: false,
        isNumberList: false
      }));
    } else {
      const list = document.createElement(type === 'bullet' ? 'ul' : 'ol') as HTMLElement;
      list.style.listStyleType = type === 'bullet' ? 'disc' : 'decimal';
      list.style.marginLeft = '20px';

      const listItem = document.createElement('li');

      let currentBlock = container;
      while (currentBlock && currentBlock !== contentEditableRef.current && !['DIV', 'P'].includes(currentBlock.tagName)) {
        currentBlock = currentBlock.parentElement as HTMLElement;
      }

      if (!currentBlock || currentBlock === contentEditableRef.current || !currentBlock.textContent?.trim()) {
        listItem.appendChild(document.createElement('br'));
      } else {
        listItem.innerHTML = currentBlock.innerHTML;
        currentBlock.parentNode?.replaceChild(list, currentBlock);
      }

      list.appendChild(listItem);

      if (!currentBlock || currentBlock === contentEditableRef.current) {
        contentEditableRef.current.appendChild(list);
      }

      range.selectNodeContents(listItem);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);

      setStyles(prev => ({
        ...prev,
        isBulletList: type === 'bullet',
        isNumberList: type === 'number'
      }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter') {
      if (isPlaceholder) {
        e.preventDefault();
        return;
      }

      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer as HTMLElement;
      const listItem = container.closest('li');
      const list = container.closest('ul, ol') as HTMLElement;

      if (listItem) {
        if (!listItem.textContent?.trim()) {
          e.preventDefault();

          if (list) {
            if (listItem === list.lastElementChild) {
              const newDiv = document.createElement('div');
              newDiv.appendChild(document.createElement('br'));
              list.parentNode?.insertBefore(newDiv, list.nextSibling);
              listItem.remove();

              if (!list.hasChildNodes()) {
                list.remove();
              }

              range.selectNodeContents(newDiv);
              range.collapse(true);
              selection.removeAllRanges();
              selection.addRange(range);

              setStyles(prev => ({
                ...prev,
                isBulletList: false,
                isNumberList: false
              }));
            } else {
              const newList = document.createElement(list.tagName.toLowerCase()) as HTMLElement;
              newList.style.listStyleType = list.style.listStyleType;
              newList.style.marginLeft = list.style.marginLeft;

              let next = listItem.nextElementSibling;
              while (next) {
                const current = next;
                next = next.nextElementSibling;
                newList.appendChild(current);
              }

              list.parentNode?.insertBefore(newList, list.nextSibling);
              listItem.remove();
            }
          }
        }
      }
    }
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
      currentColor: document.queryCommandValue('foreColor') || prev.currentColor,
      isBulletList: document.queryCommandState('insertUnorderedList'),
      isNumberList: document.queryCommandState('insertOrderedList')
    }));
  };

  const toggleStyle = (style: keyof Pick<StylesState, 'isBold' | 'isItalic' | 'isUnderline'>): void => {
    const commandMap: Record<typeof style, string> = {
      isBold: 'bold',
      isItalic: 'italic',
      isUnderline: 'underline'
    };

    saveSelection();

    document.execCommand(commandMap[style], false);
    checkCurrentStyles();

    restoreSelection();
  };

  const handleAlignment = (alignment: 'left' | 'center' | 'right'): void => {
    if (!contentEditableRef.current) return;

    setStyles(prev => ({ ...prev, alignment }));

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

    restoreSelection();
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

    restoreSelection();

    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    document.execCommand('foreColor', false, color);
    setStyles(prev => ({ ...prev, currentColor: color }));

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
          <button
            onClick={() => handleListCommand('bullet')}
            className={`cursor-pointer p-2 rounded ${styles.isBulletList ? 'bg-gray-200' : ''}`}
            type="button"
          >
            <Image src={bullet} alt="bullet" />
          </button>
          <button
            onClick={() => handleListCommand('number')}
            className={`cursor-pointer p-2 rounded ${styles.isNumberList ? 'bg-gray-200' : ''}`}
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
