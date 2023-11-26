"use client";

type Props = {
  title: string;
  onClick: (event: any) => void;
  disabled?: boolean;
  selected?: boolean;
};

export default function Button({ title, onClick, disabled = false, selected }: Props) {
  return (
    <button
      type='button'
      disabled={disabled}
      className={`inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-lightest text-sm font-medium text-gray-700 hover:shadow-card active:shadow-bar disabled:bg-gray-200 disabled:cursor-not-allowed ${
        selected ? "border-highlight" : ""
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
