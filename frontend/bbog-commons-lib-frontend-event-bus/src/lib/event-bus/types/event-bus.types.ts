import { EventBus } from '../EventBus.ts';
import { EventDriven } from '../../event-driven/types/event-driven.types.ts';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export type Message = any;

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: Message) => void;
      EventBus?: EventBus;
    };
  }
}

export enum EventBusOperation {
  Clear = 'BBOGClearEventBus',
  Dispatch = 'BBOGDispatchEventBus'
}

export enum EventBusTopic {
  Stored = 'BBOGEventBusTopic',
  ClearAll = 'BBOGClearAllTopics'
}

export interface SubscriptionOptions {
  readPreviousStoredMessage?: boolean;
  onlyOnce?: boolean;
}

export interface TopicDetail {
  topicName: string;
  topicValue: Message;
  eventDriven?: EventDriven;
}

export interface PostMessagePayload {
  topicName: string;
  topicValue?: Message;
  eventDriven?: EventDriven;
  operationType?: EventBusOperation;
}

// Subscriber ID prefixes:
// 'sub_' -> Persistent subscriber
// 'del_' -> One-time subscriber, automatically removed after first message
export type SubscriberIdPrefix = 'sub_' | 'del_';

export type MessageSubscriber = (message: Message) => void;
