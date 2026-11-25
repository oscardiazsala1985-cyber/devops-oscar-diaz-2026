import {
  EventDriven,
  EventDrivenStrategy
} from '../../types/event-driven.types.ts';
import { CustomEventStrategy } from '../concrete/CustomEventStrategy.ts';
import { PostMessageStrategy } from '../concrete/PostMessageStrategy.ts';
import {
  isCustomEventEnabled,
  isPostMessageEnabled
} from '../../utils/event-driven.utils.ts';
import { Topic } from '../../../event-bus/Topic.ts';

export class EventDrivenContext {
  private _strategies: EventDrivenStrategy[] = [];

  constructor(eventDriven: EventDriven, subscriptions: Map<string, Topic>) {
    if (isCustomEventEnabled(eventDriven)) {
      this._strategies.push(new CustomEventStrategy(subscriptions));
    }

    if (isPostMessageEnabled(eventDriven)) {
      this._strategies.push(new PostMessageStrategy(subscriptions));
    }
  }

  public initialize(): void {
    this._strategies.forEach((strategy: EventDrivenStrategy) => {
      strategy.initializeListener();
    });
  }

  public getStrategies(): EventDrivenStrategy[] {
    return this._strategies;
  }
}
