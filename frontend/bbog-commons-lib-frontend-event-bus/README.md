# bbog-commons-lib-frontend-event-bus

Librería TypeScript para transmisión asíncrona de mensajes mediante un bus de eventos que implementa el patrón Pub/Sub, diseñada para comunicación entre un Shell y sus Microfrontends dentro de la misma ventana del navegador. Versión BBOG basada en `@avaldigitallabs/adl-commons-lib-frontend-event-bus`.

Usa `bbog-commons-lib-secure-web-storage` para cifrar los mensajes que se almacenan en `sessionStorage`.

## Instalación (monorepo local)

```json
"dependencies": {
  "bbog-commons-lib-frontend-event-bus": "file:../bbog-commons-lib-frontend-event-bus"
}
```

## Build

```bash
npm install
npm run build
```

## Uso básico

```ts
import { EventBus, EventDriven, TopicDetail } from 'bbog-commons-lib-frontend-event-bus';

const eventBus = EventBus.getInstance(false, EventDriven.PostMessage | EventDriven.CustomEvent);
const topic = eventBus.accessTopic('SHELL_TOPIC');

topic.subscribe(({ topicName, topicValue }: TopicDetail) => {
  console.log(topicName, topicValue);
});

topic.publish({ origin: 'shell' }, true);

// Al destruir el componente:
topic.unsubscribe();
```

### API

* `EventBus.getInstance(debug = false, eventDriven = EventDriven.PostMessage)` — instancia Singleton.
* `eventBus.accessTopic(topicName)` — obtiene o crea un `Topic`.
* `topic.publish(value, store = false)` — publica un mensaje, opcionalmente cifrado en sessionStorage.
* `topic.subscribe(callback, options)` — se suscribe a los mensajes del topic.
* `topic.unsubscribe()` — elimina la suscripción (obligatorio al destruir el componente).
* `topic.clearStoredTopic(topicName?)` — limpia mensajes almacenados.

Ver el README de `@avaldigitallabs/adl-commons-lib-frontend-event-bus` para la referencia completa de la API — esta versión mantiene la misma interfaz pública.
