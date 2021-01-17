import { EventEmitter } from "typeorm/platform/PlatformTools";
import EventListenerInterface from "../interfaces/event-listener.interface";
import EventInterface from "../interfaces/event.interface";

class EventListenerContainer {
    private static instance: EventListenerContainer;
    private emitter = new EventEmitter();

    public static getInstance(): EventListenerContainer {
        if (!EventListenerContainer.instance) {
            EventListenerContainer.instance = new EventListenerContainer();
        }

        return EventListenerContainer.instance;
    }

    public emitEvent = (event: string, data?: any): void => {
        this.emitter.emit(event, data);
    }

    public setEvents(eventsListeners: EventListenerInterface[]): void {
        eventsListeners.forEach(((eventsListener: EventListenerInterface) => {
            eventsListener.getEvents().forEach((event: EventInterface) => {
                this.emitter.on(event.name, event.callback);
            });
        }));
    }
}

export default EventListenerContainer;
