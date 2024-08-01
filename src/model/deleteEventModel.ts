import { createEvent, sample } from "effector";
import { listModel } from "./listModel";

const deleteEvent = createEvent<string>();

sample({
  clock: deleteEvent,
  source: listModel.$events,
  fn: (eventsList, id) => eventsList.filter((event) => event.id !== id),
  target: listModel.$events,
});

export const deleteEventModel = { deleteEvent };
