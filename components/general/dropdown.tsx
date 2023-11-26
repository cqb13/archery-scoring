"use client";

import { useEffect, useState } from "react";

type Props = {
  title: string;
  items: string[];
  customClass?: string; // meant for width changes only
  selectedItem?: string;
  newSelectedItem?: string;
  setSelected: (value: string) => void;
  onNewSelection?: (value: string) => void;
};

export default function Dropdown({
  title,
  items,
  customClass,
  newSelectedItem,
  setSelected,
  onNewSelection,
}: Props) {
  const [opened, setOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const toggle = () => setOpened(!opened);

  useEffect(() => {
    if (newSelectedItem) {
      setSelectedItem(newSelectedItem);
    }
  }, [newSelectedItem]);

  return (
    <section>
      <div
        className={`relative inline-block w-60 text-left ${
          customClass ? customClass : ""
        }`}
      >
        <div>
          <button
            type='button'
            className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-lightest text-sm font-medium text-gray-700 hover:shadow-card focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lighter'
            onClick={toggle}
          >
            {selectedItem != "" ? selectedItem : title}
            <svg
              className='-mr-1 ml-2 h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path d='M7 7l3-3 3 3m0 6l-3 3-3-3' />
            </svg>
          </button>
        </div>
        <div
          className={`${
            opened ? " absolute" : "hidden"
          } mt-2 w-60 rounded-md shadow-lg bg-lightest ring-1 ring-black ring-opacity-5 z-10 ${
            customClass ? customClass : ""
          }`}
        >
          <div
            className='py-1'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu'
          >
            {items.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setSelectedItem(item);
                  setSelected(item);
                  setOpened(false);
                  onNewSelection && onNewSelection(item);
                }}
                className='block px-4 py-2 text-sm text-gray-700 w-full hover:shadow-card transition-none'
                role='menuitem'
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
