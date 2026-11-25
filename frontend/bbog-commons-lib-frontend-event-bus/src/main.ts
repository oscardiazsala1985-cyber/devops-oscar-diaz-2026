import { EventBus, EventDriven, Topic, TopicDetail } from './index.ts';

const eventBus: EventBus = EventBus.getInstance(
  false,
  EventDriven.CustomEvent | EventDriven.PostMessage
);

const productListTopic: Topic = eventBus.accessTopic('ProductList');

productListTopic.publish(['A'], true);
productListTopic.publish(['A', 'B'], true);
productListTopic.publish(['A', 'B', 'C']);

productListTopic.subscribe(
  ({ topicName, topicValue, eventDriven }: TopicDetail) => {
    console.log(topicName, topicValue, eventDriven, typeof topicValue);
  },
  { readPreviousStoredMessage: true, onlyOnce: false }
);

productListTopic.publish(['A', 'B', 'C', 'D']);
productListTopic.publish(['A', 'B', 'C', 'D', 'E'], true);

productListTopic.unsubscribe();
