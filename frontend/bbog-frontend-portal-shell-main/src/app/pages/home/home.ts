import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Topic, TopicDetail } from 'bbog-commons-lib-frontend-event-bus';
import {
  EventBusService,
  MF1_TOPIC,
  SHELL_TOPIC
} from '../../shared/event-bus/event-bus.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  protected readonly lastMessageFromMf1 = signal<string | null>(null);

  private readonly shellTopic: Topic;
  private readonly mf1Topic: Topic;

  constructor(private readonly eventBusService: EventBusService) {
    this.shellTopic = this.eventBusService.accessTopic(SHELL_TOPIC);
    this.mf1Topic = this.eventBusService.accessTopic(MF1_TOPIC);
  }

  ngOnInit(): void {
    this.mf1Topic.subscribe(({ topicValue }: TopicDetail) => {
      this.lastMessageFromMf1.set(JSON.stringify(topicValue));
    });
  }

  ngOnDestroy(): void {
    this.shellTopic.unsubscribe();
    this.mf1Topic.unsubscribe();
  }

  publishToMf1(): void {
    this.shellTopic.publish(
      { origin: 'shell', sentAt: new Date().toISOString() },
      true
    );
  }
}
