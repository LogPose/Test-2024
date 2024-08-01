import React from "react";
import { EVENTS_MOCK } from "../../config";
import { ListElement } from "../ListElement";
import { useUnit } from "effector-react";
import { changeEventModel, createEventModel, listModel } from "../../model";
import dayjs from "dayjs";
import { EyeInvisibleOutlined } from "@ant-design/icons";
import "./styles.scss";

export const EventsList: React.FC = () => {
  const [chosenDate, isOpenCreate, isOpenChange, events] = useUnit([
    listModel.$chosenDate,
    createEventModel.$isOpenCreateEvent,
    changeEventModel.$isOpenChangeEvent,
    listModel.$events,
  ]);

  const eventsToRender = events.filter((event) =>
    dayjs(event.date).isSame(chosenDate, "day")
  );

  return (
    <div
      data-is-change-mode={isOpenChange}
      data-is-create-mode={isOpenCreate}
      className="p-1 border border-cyan-500 rounded-xl min-w-[330px] min-h-[330px] overflow-y-auto container"
    >
      {eventsToRender.map((event) => (
        <ListElement data={event} key={event.name} />
      ))}
      {!eventsToRender.length && (
        <div className="flex h-full items-center justify-around">
          <div className="flex flex-col items-center">
            <EyeInvisibleOutlined style={{ fontSize: "40px", opacity: 0.2 }} />
            <p className="opacity-40">No events on this day</p>
          </div>
        </div>
      )}
    </div>
  );
};
