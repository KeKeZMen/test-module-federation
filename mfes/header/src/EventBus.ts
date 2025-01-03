export class EventBus {
  static emit(eventName: string, details?: CustomEventInit) {
    console.log(`emit ${eventName} event`);
    window.dispatchEvent(new CustomEvent(eventName, details));
  }

  static on(eventName: string, callback: (...args: any) => any) {
    console.log(`subscribe on ${eventName} event`);
    window.addEventListener(eventName, callback);
  }

  static off(eventName: string, callback: (...args: any) => any) {
    console.log(`remove ${eventName} event`);
    window.removeEventListener(eventName, callback);
  }
}
