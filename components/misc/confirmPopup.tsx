import { useState } from "react";
import Button from "@components/general/button";
import Input from "@components/general/input";

type Props = {
  title: string;
  message: string;
  expectedValue: string;
  confirm: () => void;
  cancel: () => void;
};

export default function ConfirmPopup({
  title,
  message,
  expectedValue,
  confirm,
  cancel
}: Props) {
  const [value, setValue] = useState("");

  const confirmAction = () => {
    if (value === expectedValue) {
      confirm();
    } else {
      setValue("");
    }
  };

  return (
    <div className='absolute top-0 left-0 h-screen w-screen flex items-center justify-center bg-dark bg-opacity-30'>
      <section className='shadow-card rounded-md p-10 border border-gray-300 bg-lightest flex flex-col w-1/2 gap-2'>
        <h1 className='text-center text-5xl'>{title}</h1>
        <hr />
        <p>{message}</p>
        <Input
          type='text'
          placeholder={`Enter "${expectedValue}" to confirm`}
          value={value}
          updateValue={setValue}
        />
        <div className='flex gap-2'>
          <Button title='Confirm' onClick={confirmAction} />
          <Button title='Cancel' onClick={cancel} />
        </div>
      </section>
    </div>
  );
}
