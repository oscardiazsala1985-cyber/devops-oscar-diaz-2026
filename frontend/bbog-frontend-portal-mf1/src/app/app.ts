import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topic, TopicDetail } from 'bbog-commons-lib-frontend-event-bus';
import {
  EventBusService,
  MF1_TOPIC,
  SHELL_TOPIC
} from './shared/event-bus/event-bus.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('bbog-frontend-portal-mf1');
  protected readonly lastMessageFromShell = signal<string | null>(null);

  private readonly shellTopic: Topic;
  private readonly mf1Topic: Topic;

  constructor(private readonly eventBusService: EventBusService) {
    this.shellTopic = this.eventBusService.accessTopic(SHELL_TOPIC);
    this.mf1Topic = this.eventBusService.accessTopic(MF1_TOPIC);
  }

  ngOnInit(): void {
    this.shellTopic.subscribe(({ topicValue }: TopicDetail) => {
      this.lastMessageFromShell.set(JSON.stringify(topicValue));
    });
  }

  ngOnDestroy(): void {
    this.shellTopic.unsubscribe();
    this.mf1Topic.unsubscribe();
  }

  publishToShell(): void {
    this.mf1Topic.publish(
      { origin: 'mf1', sentAt: new Date().toISOString() },
      true
    );
  }
}
