import { createEvent, createStore, restore } from "effector";
import { TEvent } from "../types";
import { EVENTS_MOCK } from "../config";

const changeDate = createEvent<Date>();

const $chosenDate = restore(changeDate, new Date());

const $events = createStore<TEvent[]>(EVENTS_MOCK);

export const listModel = { $chosenDate, changeDate, $events };
