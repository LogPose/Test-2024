import { createEvent, restore, sample } from "effector";
import { listModel } from "./listModel";
import { createForm } from "effector-forms";
import { EEventType, TEvent } from "../types";

const openChangeEvent = createEvent<boolean>();
const chooseEventToChange = createEvent<TEvent>();

const $isOpenChangeEvent = restore(openChangeEvent, false);

interface IChangeEventForm {
  type: EEventType;
  eventName: string;
  budget?: string;
  note?: string;
  address?: string;
  time?: string;
}

const changeEventForm = createForm<IChangeEventForm>({
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

sample({
  clock: listModel.$chosenDate,
  target: $isOpenChangeEvent.reinit,
});

export const changeEventModel = {
  openChangeEvent,
  $isOpenChangeEvent,
  changeEventForm,
  chooseEventToChange,
};
