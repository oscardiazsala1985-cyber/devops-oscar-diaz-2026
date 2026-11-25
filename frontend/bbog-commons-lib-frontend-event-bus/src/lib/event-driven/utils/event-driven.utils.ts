import { EventDriven } from '../types/event-driven.types.ts';

export const isCustomEventEnabled = (eventDriven: EventDriven): boolean => {
  return (eventDriven & Number(EventDriven.CustomEvent)) !== 0;
};

export const isPostMessageEnabled = (eventDriven: EventDriven): boolean => {
  return (eventDriven & Number(EventDriven.PostMessage)) !== 0;
};
