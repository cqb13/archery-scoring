type Props = {
  value: string;
  placeholder: string;
  type: "text" | "number" | "date" | "time";
  updateValue: (value: any) => void;
};

export default function Input({
  value,
  placeholder,
  type,
  updateValue
}: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      className='bg-lightest border border-gray-300 rounded-md outline-none focus:border-highlight px-2'
      onChange={(event) => updateValue(event.target.value)}
    />
  );
}
