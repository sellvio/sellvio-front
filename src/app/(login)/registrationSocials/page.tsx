'use client';
import React, { useState, useCallback } from 'react';

// Constants for better maintainability
const INPUT_IDS = [1, 2, 3] as const;
const MINIMUM_VISIBLE_INPUTS = 1;

type InputId = (typeof INPUT_IDS)[number];

const ToggleInputs: React.FC = () => {
  const [visibleInputs, setVisibleInputs] = useState<Set<InputId>>(
    new Set([1])
  );

  const toggleInput = useCallback((id: InputId) => {
    setVisibleInputs((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(id)) {
        // Don't allow removing the last input
        if (newSet.size <= MINIMUM_VISIBLE_INPUTS) {
          return prev;
        }
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      return newSet;
    });
  }, []);

  const isInputVisible = useCallback(
    (id: InputId) => visibleInputs.has(id),
    [visibleInputs]
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Toggle Buttons */}
      <div
        className="flex gap-2"
        role="group"
        aria-label="Toggle input visibility"
      >
        {INPUT_IDS.map((id) => (
          <button
            key={id}
            onClick={() => toggleInput(id)}
            className={`
              px-4 py-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300
              ${
                isInputVisible(id)
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
            aria-pressed={isInputVisible(id)}
            aria-label={`Toggle input ${id}`}
          >
            {id}
          </button>
        ))}
      </div>

      {/* Dynamic Inputs */}
      <div className="flex flex-col gap-2">
        {INPUT_IDS.map(
          (id) =>
            isInputVisible(id) && (
              <input
                key={id}
                type="text"
                placeholder={`Input ${id}`}
                className="p-2 border border-gray-300 focus:border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label={`Input field ${id}`}
              />
            )
        )}
      </div>
    </div>
  );
};

export default ToggleInputs;
