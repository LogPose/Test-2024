import React from "react";
import { useUnit } from "effector-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { changeEventModel, createEventModel, listModel } from "../../model";
import dayjs from "dayjs";
import "./styles.scss";

export const FormCalendar: React.FC = () => {
  const [chosenDate, isOpenCreate, isOpenChange, events] = useUnit([
    listModel.$chosenDate,
    createEventModel.$isOpenCreateEvent,
    changeEventModel.$isOpenChangeEvent,
    listModel.$events,
  ]);

  const handleDateClick = (date: Date) => {
    listModel.changeDate(date);
  };

  const handleClick = () => {
    if (isOpenCreate) {
      createEventModel.openCreateEvent(false);
      return;
    }

    createEventModel.openCreateEvent(true);
  };

  return (
    <div className="flex flex-col gap-2">
      <Calendar
        tileClassName={({ date }) => {
          if (events.find((value) => dayjs(value.date).isSame(date, "day")))
            return `withEvent date`;

          return "date";
        }}
        onClickDay={handleDateClick}
        defaultValue={chosenDate}
      />
      <button
        disabled={isOpenChange}
        data-is-create-mode={isOpenCreate}
        onClick={handleClick}
        className="rounded-2xl p-2 hover:bg-green-200 transition button disabled:bg-gray-400"
      >
        {isOpenCreate ? "Отмена" : "Запланировать мероприятие"}
      </button>
    </div>
  );
};
