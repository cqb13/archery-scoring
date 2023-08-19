"use client";

import { useState } from "react";

type Props = {
  title: string;
  jump: number;
  defaultValue: number;
  min: number;
  max: number;
  update: (value: number) => void;
};

export default function Slider({
  title,
  jump,
  defaultValue,
  min,
  max,
  update
}: Props) {
  const [value, setValue] = useState(defaultValue);
  const updateValue = (value: number) => {
    if (value < min) value = min;
    if (value > max) value = max;

    setValue(value);
    update(value);
  };

  return (
    <section className="bg-lightest px-4 py-2 rounded-md border w-60 border-gray-300 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1>
            {title}
          </h1>
        </div>
        <div className="flex items-center">
          <input
            type="number"
            value={value}
            onChange={e => updateValue(parseInt(e.target.value))}
            className="w-16 text-center bg-transparent border-none focus:outline-none"
          />
        </div>
      </div>
      <div className="mt-4">
        <input
          type="range"
          min={min}
          max={max}
          step={jump}
          value={value}
          onChange={e => updateValue(parseInt(e.target.value))}
          className="w-full h-2 bg-lightest rounded-md appearance-none outline-gray-300 focus:outline-none ring-1 focus:ring-light"
        />
      </div>
    </section>
  );
}
