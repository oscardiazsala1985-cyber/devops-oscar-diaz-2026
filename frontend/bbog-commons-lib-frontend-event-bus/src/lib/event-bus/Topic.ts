import { v4 as uuidv4 } from 'uuid';
import {
  Message,
  MessageSubscriber,
  SubscriberIdPrefix,
  SubscriptionOptions
} from './types/event-bus.types.ts';
import { StorageManager } from './StorageManager.ts';
import { EventDrivenStrategy } from '../event-driven/types/event-driven.types.ts';

export class Topic {
  private readonly _topicName: string;
  private readonly _debug: boolean;
  private _currentSubscriberId = '';
  private readonly _eventDrivenStrategies: EventDrivenStrategy[];

  // Registry of subscriber callbacks to be invoked when a message is published on this topic.
  private _subscribersRegistry: Map<string, MessageSubscriber>;

  constructor(
    topicName: string,
    debug: boolean,
    subscribersRegistry: Map<string, MessageSubscriber>,
    eventDrivenStrategies: EventDrivenStrategy[]
  ) {
    this._topicName = topicName;
    this._subscribersRegistry = subscribersRegistry;
    this._debug = debug;
    this._eventDrivenStrategies = eventDrivenStrategies;
  }

  public notifySubscribers(message: Message): void {
    this._subscribersRegistry.forEach((subscriber, index) => {
      if (index.startsWith('del_')) {
        // Remove one-time subscribers before notifying
        this._subscribersRegistry.delete(index);
      }

      // Notify the current subscriber with the new message
      subscriber(message);
    });
  }

  public publish(topicValue: Message, store = false): void {
    if (store) {
      StorageManager.storeTopic(this._topicName, topicValue, this._debug);
    }

    this._eventDrivenStrategies.forEach((strategy: EventDrivenStrategy) => {
      strategy.publish(this._topicName, topicValue);
    });
  }

  public subscribe(
    subscriber: MessageSubscriber,
    options: SubscriptionOptions = {
      readPreviousStoredMessage: true,
      onlyOnce: false
    }
  ): void {
    setTimeout(() => {
      const storedTopic = StorageManager.fetchTopic(
        this._topicName,
        this._debug
      );

      let hasAlreadyReceivedStoredMessage = false;

      if (!!storedTopic?.topicValue && options.readPreviousStoredMessage) {
        // Immediately deliver the latest stored message to the new subscriber, if configured
        subscriber(storedTopic);
        hasAlreadyReceivedStoredMessage = true;
      }

      const prefix: SubscriberIdPrefix = options.onlyOnce ? 'del_' : 'sub_';
      this._currentSubscriberId = prefix + uuidv4();

      if (!hasAlreadyReceivedStoredMessage || !options.onlyOnce) {
        // Register the subscriber to receive future messages
        this._subscribersRegistry.set(this._currentSubscriberId, subscriber);
      }
    });
  }

  public clearStoredTopic(topicName?: string): void {
    if (topicName) {
      StorageManager.clearTopic(topicName, this._debug);
    } else {
      StorageManager.clearAllTopics(this._debug);
    }
  }

  public unsubscribe(): void {
    // Inform all event-driven strategies to unsubscribe from this topic
    this._eventDrivenStrategies.forEach((strategy: EventDrivenStrategy) => {
      strategy.unsubscribe(this._topicName);
    });

    // Remove this subscriber from the registry
    this._subscribersRegistry.delete(this._currentSubscriberId);
  }
}
