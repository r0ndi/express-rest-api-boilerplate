import EventListenerInterface from "../interfaces/event-listener.interface";
import EventInterface from "../interfaces/event.interface";

class UserEventListener implements EventListenerInterface  {
    public static USER_LOGIN_EVENT: string = "user-login";

    public getEvents = (): EventInterface[] => {
        return [{
            name: UserEventListener.USER_LOGIN_EVENT,
            callback: this.userLoginEvent,
        }];
    }

    private userLoginEvent = (userData: any): void => {
        console.log(`User with email ${userData.email} has just logged in`);
    }
}

export default UserEventListener;
