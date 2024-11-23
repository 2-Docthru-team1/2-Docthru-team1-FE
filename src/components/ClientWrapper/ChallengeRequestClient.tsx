'use client';

import Image from 'next/image';
import { useState } from 'react';
import calendar from '@/../public/assets/icon_calendar.png';

export default function ChallengeRequestClient() {
  const [value, setValue] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleBlur = () => {
    if (!value.trim()) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setHasError(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-[59rem]">
        <h2 className="mt-[2rem] mb-[2.4rem]">Request a challenge</h2>
        <div>
          <div>
            <p className="text-gray-700 font-medium mb-[0.8rem] text-[1.4rem] leading-[1.7rem]">*Title</p>
            <input
              type="text"
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder=""
              className={`w-full bg-primary-white border ${
                hasError ? 'border-red-500' : 'border-gray-200'
              } rounded-[1.2rem] focus:outline-none focus:border-primary-beige py-[1.1rem] px-[2rem] text-[1.6rem] text-left placeholder-gray-400 text-gray-700`}
            />
            {hasError && <p className="text-red-500 text-[1.2rem] mt-[0.5rem]">This field is required.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
