import { Topic } from './Topic.ts';
import { MessageSubscriber } from './types/event-bus.types.ts';
import {
  EventDriven,
  EventDrivenStrategy
} from '../event-driven/types/event-driven.types.ts';
import { EventDrivenContext } from '../event-driven/strategy/context/EventDrivenContext.ts';

export class EventBus {
  private static _instance: EventBus;
  private readonly _debug: boolean;
  private readonly _eventDrivenStrategies: EventDrivenStrategy[];

  // Registry of all active topics by name
  private _topicsRegistry = new Map<string, Topic>();

  private constructor(debug: boolean, eventDriven: EventDriven) {
    this._debug = debug;

    const eventDrivenContext = new EventDrivenContext(
      eventDriven,
      this._topicsRegistry
    );
    eventDrivenContext.initialize();

    this._eventDrivenStrategies = eventDrivenContext.getStrategies();
  }

  public static getInstance(
    debug = false,
    eventDriven: EventDriven = EventDriven.PostMessage
  ): EventBus {
    if (!EventBus._instance) {
      EventBus._instance = new EventBus(debug, eventDriven);

      if (window['ReactNativeWebView']) {
        window['ReactNativeWebView']['EventBus'] = EventBus._instance;
      }
    }

    return EventBus._instance;
  }

  public accessTopic(topicName: string): Topic {
    if (!this._topicsRegistry.has(topicName)) {
      this._topicsRegistry.set(
        topicName,
        new Topic(
          topicName,
          this._debug,
          new Map<string, MessageSubscriber>(),
          this._eventDrivenStrategies
        )
      );
    }

    return (
      this._topicsRegistry.get(topicName) ??
      (() => {
        throw new Error(`Topic "${topicName}" not found`);
      })()
    );
  }
}
