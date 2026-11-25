import { Message } from '../../event-bus/types/event-bus.types.ts';

export enum EventDriven {
  CustomEvent = 1 << 0, // 0001 = 1
  PostMessage = 1 << 1 // 0010 = 2
}

export interface EventDrivenStrategy {
  initializeListener(): void;
  publish(topicName: string, topicValue: Message): void;
  unsubscribe(topicName: string): void;
}
