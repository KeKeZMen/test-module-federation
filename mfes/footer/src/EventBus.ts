export class EventBus {
  static emit(eventName: string, details?: CustomEventInit) {
    window.dispatchEvent(new CustomEvent(eventName, details));
  }

  static on(eventName: string, callback: (...args: any) => any) {
    window.addEventListener(eventName, callback);
  }

  static off(eventName: string, callback: (...args: any) => any) {
    window.removeEventListener(eventName, callback);
  }
}
