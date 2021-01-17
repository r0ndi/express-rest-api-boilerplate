import EventInterface from "./event.interface";

interface EventListenerInterface {
    getEvents: () => EventInterface[];
}

export default EventListenerInterface;
