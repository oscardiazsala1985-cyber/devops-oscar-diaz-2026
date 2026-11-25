import { Injectable } from '@angular/core';
import {
  EventBus,
  EventDriven,
  Topic
} from 'bbog-commons-lib-frontend-event-bus';

// Topics shared with the mf1 microfrontend. Must match the names used there.
export const SHELL_TOPIC = 'SHELL_TOPIC';
export const MF1_TOPIC = 'MF1_TOPIC';

@Injectable({ providedIn: 'root' })
export class EventBusService {
  private readonly eventBus = EventBus.getInstance(
    false,
    EventDriven.PostMessage | EventDriven.CustomEvent
  );

  accessTopic(topicName: string): Topic {
    return this.eventBus.accessTopic(topicName);
  }
}
