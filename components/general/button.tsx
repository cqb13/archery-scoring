"use client";

type Props = {
  title: string;
  onClick: (event: any) => void;
  selected?: boolean;
};

export default function Button({ title, onClick, selected }: Props) {
  return (
    <button
      type="button"
      className={`inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-lightest text-sm font-medium text-gray-700 hover:shadow-card active:shadow-bar ${selected ? "border-highlight" : ""}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
