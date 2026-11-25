import { sessionStorage } from 'bbog-commons-lib-secure-web-storage';
import { isValidJSON } from './utils/json.utils.ts';
import {
  EventBusTopic,
  Message,
  TopicDetail
} from './types/event-bus.types.ts';

export class StorageManager {
  private static _readStoredMessages(
    topicName: string,
    debug: boolean
  ): Map<string, Message> {
    try {
      const storedObject = JSON.parse(
        this.storage(debug).getItem(EventBusTopic.Stored) ?? '[]'
      );
      return this._deserializeMessageRegistry(
        new Map<string, string>(storedObject),
        topicName
      );
    } catch (error) {
      console.error('Error parsing the storage item:', error);
      return new Map<string, string>();
    }
  }

  private static _deserializeMessageRegistry(
    messagesRegistry: Map<string, Message>,
    topicName: string
  ): Map<string, Message> {
    if (
      messagesRegistry.get(topicName) &&
      isValidJSON(messagesRegistry.get(topicName))
    ) {
      messagesRegistry.set(
        topicName,
        JSON.parse(messagesRegistry.get(topicName) as string)
      );
    }
    return messagesRegistry;
  }

  private static _writeMessagesToStorage(
    messagesRegistry: Map<string, Message>,
    debug: boolean
  ): void {
    const serializedMessages = JSON.stringify(
      Array.from(messagesRegistry.entries())
    );
    this.storage(debug).setItem(EventBusTopic.Stored, serializedMessages);
  }

  public static storage(debug: boolean): Storage | typeof sessionStorage {
    return debug ? window.sessionStorage : sessionStorage;
  }

  public static fetchTopic(topicName: string, debug: boolean): TopicDetail {
    const messagesRegistry = this._readStoredMessages(topicName, debug);
    return {
      topicName: topicName,
      topicValue: messagesRegistry.get(topicName)
    };
  }

  public static storeTopic(
    topicName: string,
    topicValue: Message,
    debug: boolean
  ): void {
    setTimeout(() => {
      const messagesRegistry = this._readStoredMessages(topicName, debug);
      messagesRegistry.set(
        topicName,
        typeof topicValue === 'object' && topicValue !== null
          ? JSON.stringify(topicValue)
          : topicValue
      );
      this._writeMessagesToStorage(messagesRegistry, debug);
    });
  }

  public static clearTopic(topicName: string, debug: boolean): void {
    setTimeout(() => {
      const messagesRegistry = this._readStoredMessages(topicName, debug);
      messagesRegistry.delete(topicName);
      this._writeMessagesToStorage(messagesRegistry, debug);
    });
  }

  public static clearAllTopics(debug: boolean): void {
    setTimeout(() => {
      this.storage(debug).removeItem(EventBusTopic.Stored);
    });
  }
}
