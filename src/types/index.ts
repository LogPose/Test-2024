export enum EEventType {
  Holiday = "HOLIDAY",
  DayEvent = "DAY_EVENT",
  Chores = "CHORES",
}

export type TEvent = {
  id: string;
  name: string;
  date: string;
  budget?: string;
  time?: string;
  address?: string;
  note?: string;
  eventType: EEventType;
};
