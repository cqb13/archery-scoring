"use client";

type Props = {
  title: string;
  onClick: () => void;
};

export default function Button({ title, onClick }: Props) {
  return (
    <button
      type="button"
      className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-lightest text-sm font-medium text-gray-700 hover:shadow-card active:shadow-bar"
      onClick={onClick}
    >
      {title}
    </button>
  );
}
