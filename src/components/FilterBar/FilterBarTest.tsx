import { useState } from 'react';

const SortBar = () => {
  const [singleSelect, setSingleSelect] = useState<string>(''); // 6개 중 1개 선택
  const [multiSelect, setMultiSelect] = useState<string[]>([]); // 4개 중 다중 선택
  const [dualSelect, setDualSelect] = useState<string>(''); // 2개 중 1개 선택

  const handleSingleSelect = (value: string) => {
    setSingleSelect(value);
  };

  const handleMultiSelect = (value: string) => {
    setMultiSelect(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value); // 이미 선택된 경우 제거
      } else {
        return [...prev, value]; // 선택되지 않은 경우 추가
      }
    });
  };

  const handleDualSelect = (value: string) => {
    setDualSelect(value);
  };

  return (
    <div className="sort-bar">
      <div>
        <h3>6개 중 1개 선택</h3>
        {['옵션1', '옵션2', '옵션3', '옵션4', '옵션5', '옵션6'].map(option => (
          <label key={option}>
            <input
              type="radio"
              name="singleSelect"
              value={option}
              checked={singleSelect === option}
              onChange={() => handleSingleSelect(option)}
            />
            {option}
          </label>
        ))}
      </div>

      <div>
        <h3>4개 중 다중 선택</h3>
        {['옵션A', '옵션B', '옵션C', '옵션D'].map(option => (
          <label key={option}>
            <input
              type="checkbox"
              value={option}
              checked={multiSelect.includes(option)}
              onChange={() => handleMultiSelect(option)}
            />
            {option}
          </label>
        ))}
      </div>

      <div>
        <h3>2개 중 1개 선택</h3>
        {['옵션X', '옵션Y'].map(option => (
          <label key={option}>
            <input
              type="radio"
              name="dualSelect"
              value={option}
              checked={dualSelect === option}
              onChange={() => handleDualSelect(option)}
            />
            {option}
          </label>
        ))}
      </div>

      <div>
        <h4>선택된 값들:</h4>
        <p>6개 중 1개: {singleSelect}</p>
        <p>4개 중 다중 선택: {multiSelect.join(', ')}</p>
        <p>2개 중 1개: {dualSelect}</p>
      </div>
    </div>
  );
};

export default SortBar;
