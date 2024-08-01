import { EEventType, TEvent } from "../types";

export const EVENTS_MOCK: TEvent[] = [
  {
    id: "1",
    date: "08.08.2024",
    eventType: EEventType.Chores,
    name: "We'll go to the Mall",
    note: "Need to byu something to eat",
  },
  {
    id: "2",
    date: "08.02.2024",
    eventType: EEventType.Holiday,
    name: "Paratrooper's Day",
    budget: "8000$",
  },
];
