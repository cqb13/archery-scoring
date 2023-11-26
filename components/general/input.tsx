type Props = {
  value: string;
  placeholder: string;
  type: "text" | "number" | "date" | "time";
  disabled?: boolean;
  updateValue: (value: any) => void;
};

export default function Input({
  value,
  placeholder,
  type,
  disabled = false,
  updateValue
}: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      className='bg-lightest border border-gray-300 rounded-md outline-none focus:border-highlight px-2 disabled:bg-gray-200 disabled:cursor-not-allowed'
      disabled={disabled}
      onChange={(event) => updateValue(event.target.value)}
    />
  );
}
