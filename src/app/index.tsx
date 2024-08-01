import React from "react";
import "./styles.scss";
import {
  FormCalendar,
  EventsList,
  CreateEventForm,
  ChangeEventForm,
} from "../ui";

export const App: React.FC = () => {
  return (
    <div className="mainWrapper">
      <FormCalendar />
      <div className="overflow-hidden max-h-[330px]">
        <ChangeEventForm />
        <EventsList />
        <CreateEventForm />
      </div>
    </div>
  );
};
