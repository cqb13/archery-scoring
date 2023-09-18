import { useState } from "react";
import Button from "@components/general/button";
import Input from "@components/general/input";

type Props = {
  title: string;
  message: string;
  expectedValue: string;
  confirm: () => void;
  cancel: () => void;
  setNotification?: (active: boolean) => void;
  setNotificationType?: (value: "success" | "error") => void;
  setNotificationTitle?: (title: string) => void;
  setNotificationMessage?: (message: string) => void;
};

export default function ConfirmPopup({
  title,
  message,
  expectedValue,
  confirm,
  cancel,
  setNotification,
  setNotificationType,
  setNotificationTitle,
  setNotificationMessage
}: Props) {
  const [value, setValue] = useState("");

  const confirmAction = () => {
    if (value === expectedValue) {
      confirm();
    } else {
      setValue("");
      if (setNotification) setNotification(true);
      if (setNotificationType) setNotificationType("error");
      if (setNotificationTitle) setNotificationTitle("Error");
      if (setNotificationMessage)
        setNotificationMessage(
          `Expected value: "${expectedValue}", received: "${value}"`
        );
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
