import React from "react";
import "./styles.scss";
import {
  FormCalendar,
  EventsList,
  CreateEventForm,
  ChangeEventForm,
} from "../ui";

import { listModel } from "../model";
import { persist } from "effector-storage/local";

persist({
  key: "events-list",
  source: listModel.$events,
  target: listModel.$events,
});

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
