import { createForm } from "effector-forms";
import { EEventType, TEvent } from "../types";
import { createEvent, restore, sample } from "effector";
import { listModel } from "./listModel";

const createEventForm = createForm({
  fields: {
    type: {
      init: null as unknown as EEventType,
      rules: [],
    },
    eventName: {
      init: "",
      rules: [
        {
          name: "required",
          validator: (value) => Boolean(value),
          errorText: "Название мероприятия обязательно",
        },
      ],
    },
    budget: {
      init: "",
      rules: [
        {
          name: "required",
          validator: (value, { type }) => {
            console.log(
              type,
              value,
              type === EEventType.Holiday && Boolean(value)
            );
            return type === EEventType.Holiday && Boolean(value);
          },
          errorText: "Обозначьте бюджет мероприятия",
        },
      ],
    },
    note: {
      init: "",
      rules: [
        {
          name: "required",
          validator: (value, { type }) =>
            type === EEventType.Chores && Boolean(value),
          errorText: "Важно не забыть!",
        },
      ],
    },
    address: {
      init: "",
      rules: [
        {
          name: "required",
          validator: (value, { type }) =>
            type === EEventType.DayEvent && Boolean(value),
          errorText: "Обязательно нужен адрес",
        },
      ],
    },
    time: {
      init: "",
      rules: [
        {
          name: "required",
          validator: (value, { type }) =>
            type === EEventType.DayEvent && Boolean(value),
          errorText: "Важно не ошибиться по времени",
        },
      ],
    },
  },
  validateOn: ["change", "blur"],
});

const openCreateEvent = createEvent<boolean>();
const createClick = createEvent();

const $isOpenCreateEvent = restore(openCreateEvent, false);

sample({
  clock: listModel.$chosenDate,
  target: $isOpenCreateEvent.reinit,
});

sample({
  clock: createClick,
  source: {
    values: createEventForm.$values,
    events: listModel.$events,
    chosenDate: listModel.$chosenDate,
  },
  fn: ({
    values: { address, budget, eventName, note, time, type },
    events,
    chosenDate,
  }): TEvent[] => {
    return [
      ...events,
      {
        id: `${eventName + chosenDate}`,
        date: chosenDate.toString(),
        eventType: type,
        name: eventName,
        address,
        budget,
        note,
        time,
      },
    ];
  },
  target: listModel.$events,
});

export const createEventModel = {
  createEventForm,
  $isOpenCreateEvent,
  openCreateEvent,
  createClick,
};
