import {
  EventDriven,
  EventDrivenStrategy
} from '../../types/event-driven.types.ts';
import { Topic } from '../../../event-bus/Topic.ts';
import {
  EventBusOperation,
  EventBusTopic,
  Message
} from '../../../event-bus/types/event-bus.types.ts';

export class CustomEventStrategy implements EventDrivenStrategy {
  constructor(private _topicsRegistry: Map<string, Topic>) {}

  public initializeListener(): void {
    window.addEventListener(EventBusOperation.Clear, (event: Event) => {
      if (event instanceof CustomEvent) {
        if (event.detail.topicName === EventBusTopic.ClearAll) {
          this._topicsRegistry.clear();
        } else {
          this._topicsRegistry.delete(event.detail.topicName);
        }
      }
    });

    window.addEventListener(EventBusOperation.Dispatch, (event: Event) => {
      if (event instanceof CustomEvent) {
        const topic = this._topicsRegistry.get(event.detail.topicName);
        if (topic) {
          topic.notifySubscribers(event.detail);
        }
      }
    });
  }

  public publish(topicName: string, topicValue: Message): void {
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent(EventBusOperation.Dispatch, {
          detail: {
            topicName,
            topicValue,
            eventDriven: EventDriven.CustomEvent
          }
        })
      );
    });
  }

  public unsubscribe(topicName: string): void {
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent(EventBusOperation.Clear, {
          detail: {
            topicName
          }
        })
      );
    });
  }
}
