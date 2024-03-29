import fixDateTimeFormat from "@/utils/fixDateTimeFormat";
import Button from "@components/general/button";
import Input from "@components/general/input";
import { useState, useEffect } from "react";

type SaveScorePopupProps = {
  updateSavingPopup: (value: boolean) => void;
  continueSaving: ({
    title,
    date,
    time,
    note
  }: {
    title: string;
    date: string;
    time: string;
    note: string;
  }) => void;
  updateNotification: (value: boolean) => void;
  updateNotificationType: (value: "error" | "success") => void;
  updateNotificationTitle: (value: string) => void;
  updateNotificationMessage: (value: string) => void;
};

export default function SaveScorePopup({
  updateSavingPopup,
  continueSaving,
  updateNotification,
  updateNotificationType,
  updateNotificationTitle,
  updateNotificationMessage
}: SaveScorePopupProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const time = today.getHours() + ":" + today.getMinutes();

    const data = fixDateTimeFormat(date, time);

    setDate(data.date);
    setTime(data.time);
  }, []);

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  const handleSave = () => {
    if (title === "") {
      updateNotification(true);
      updateNotificationType("error");
      updateNotificationTitle("Error");
      updateNotificationMessage("Please add a title");
      return;
    }

    continueSaving({ title, date, time, note });
  };

  return (
    <div className='absolute top-0 left-0 h-screen w-screen flex items-center justify-center bg-dark bg-opacity-30'>
      <section className='shadow-card rounded-md p-10 border border-gray-300 bg-lightest flex flex-col w-1/2 gap-2'>
        <h1 className='text-center text-5xl'>Save Details</h1>
        <hr />
        <Input
          value={title}
          placeholder='Name this session'
          type='text'
          updateValue={setTitle}
        />
        <Input
          value={date}
          placeholder={date}
          type='date'
          updateValue={setDate}
        />
        <Input
          value={time}
          placeholder={time}
          type='time'
          updateValue={setTime}
        />
        <textarea
          cols={30}
          rows={10}
          placeholder='Add a note'
          value={note}
          className='bg-lightest border border-gray-300 rounded-md outline-none resize-none focus:border-highlight px-2'
          onChange={handleNoteChange}
        ></textarea>{" "}
        <div className='flex gap-2'>
          <Button title='Save' onClick={handleSave} />
          <Button title='Cancel' onClick={() => updateSavingPopup(false)} />
        </div>
      </section>
    </div>
  );
}
