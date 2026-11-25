import {
  EventDriven,
  EventDrivenStrategy
} from '../../types/event-driven.types.ts';
import { Topic } from '../../../event-bus/Topic.ts';
import {
  EventBusOperation,
  EventBusTopic,
  Message,
  PostMessagePayload
} from '../../../event-bus/types/event-bus.types.ts';

export class PostMessageStrategy implements EventDrivenStrategy {
  private _isIntoReactNativeWebView = !!window['ReactNativeWebView'];

  constructor(private _topicsRegistry: Map<string, Topic>) {}

  public initializeListener(): void {
    window.addEventListener('message', (event: MessageEvent) => {
      if (event.origin === window.location.origin) {
        if (event.data.operationType === EventBusOperation.Clear) {
          if (event.data.topicName === EventBusTopic.ClearAll) {
            this._topicsRegistry.clear();
          } else {
            this._topicsRegistry.delete(event.data.topicName);
          }
        } else {
          const topic = this._topicsRegistry.get(event.data.topicName);
          if (topic) {
            topic.notifySubscribers(event.data);
          }
        }
      }
    });
  }

  public publish(topicName: string, topicValue: Message): void {
    this._postMessage({
      topicName,
      topicValue,
      eventDriven: EventDriven.PostMessage
    });
  }

  public unsubscribe(topicName: string): void {
    this._postMessage({
      operationType: EventBusOperation.Clear,
      topicName
    });
  }

  private _postMessage(payload: PostMessagePayload): void {
    if (this._isIntoReactNativeWebView) {
      window['ReactNativeWebView']?.postMessage(JSON.stringify(payload));
    }

    window.postMessage(payload, window.location.origin);
  }
}
