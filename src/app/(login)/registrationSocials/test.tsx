'use client';
import React, { useState } from 'react';

const INPUT_IDS = [1, 2, 3];
const MIN_VISIBLE = 1;

const ToggleInputs: React.FC = () => {
  const [visible, setVisible] = useState<number[]>([1]);

  const toggleInput = (id: number) => {
    setVisible((prev) => {
      if (prev.includes(id)) {
        return prev.length > MIN_VISIBLE ? prev.filter((x) => x !== id) : prev;
      }
      return [...prev, id];
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {INPUT_IDS.map((id) => (
          <button
            key={id}
            onClick={() => toggleInput(id)}
            className={`px-4 py-2 rounded ${
              visible.includes(id)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {id}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {visible.map((id) => (
          <input
            key={id}
            type="text"
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        ))}
      </div>
    </div>
  );
};

export default ToggleInputs;
