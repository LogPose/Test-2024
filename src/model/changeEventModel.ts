import { createEvent, restore, sample } from "effector";
import { listModel } from "./listModel";
import { createForm } from "effector-forms";
import { EEventType, TEvent } from "../types";

const openChangeEvent = createEvent<boolean>();
const chooseEventToChange = createEvent<TEvent>();
const saveChangedEvent = createEvent();

const $isOpenChangeEvent = restore(openChangeEvent, false);

const changeEventForm = createForm({
  fields: {
    id: {
      init: "",
    },
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

sample({
  clock: listModel.$chosenDate,
  target: $isOpenChangeEvent.reinit,
});

sample({
  clock: chooseEventToChange,
  fn: (data) => ({
    eventName: data.name,
    type: data.eventType,
    address: data.address ?? "",
    budget: data.budget ?? "",
    note: data.note ?? "",
    time: data.time ?? "",
    id: data.id,
  }),
  target: changeEventForm.setForm,
});

sample({
  clock: changeEventForm.fields.type.onChange,
  target: [
    changeEventForm.fields.address.reset,
    changeEventForm.fields.budget.reset,
    changeEventForm.fields.note.reset,
    changeEventForm.fields.time.reset,
  ],
});

sample({
  clock: saveChangedEvent,
  source: {
    events: listModel.$events,
    values: changeEventForm.$values,
    chosenDate: listModel.$chosenDate,
  },
  fn: ({ events, values, chosenDate }) => {
    const newEventsList = events.filter((event) => event.id !== values.id);
    newEventsList.push({
      date: chosenDate.toString(),
      eventType: values.type,
      id: values.id,
      name: values.eventName,
      address: values.address,
      budget: values.budget,
      note: values.note,
      time: values.time,
    });
    return newEventsList;
  },
  target: listModel.$events,
});

sample({
  clock: $isOpenChangeEvent,
  filter: (v) => !v,
  target: changeEventForm.reset,
});

export const changeEventModel = {
  openChangeEvent,
  $isOpenChangeEvent,
  changeEventForm,
  chooseEventToChange,
  saveChangedEvent,
};
