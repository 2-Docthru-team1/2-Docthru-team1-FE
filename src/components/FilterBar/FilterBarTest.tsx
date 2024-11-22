import { useState } from 'react';

const SortBar = () => {
  const [singleSelect, setSingleSelect] = useState<string>('');
  const [multiSelect, setMultiSelect] = useState<string[]>([]);
  const [dualSelect, setDualSelect] = useState<string>('');

  const handleSingleSelect = (value: string) => {
    setSingleSelect(value);
  };

  const handleMultiSelect = (value: string) => {
    setMultiSelect(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
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
    </div>
  );
};

export default SortBar;
