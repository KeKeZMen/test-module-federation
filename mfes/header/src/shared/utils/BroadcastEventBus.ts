export class BroadcastEventBus {
  private static channels: { [key: string]: BroadcastChannel } = {};

  private static getChannel(key: string): BroadcastChannel {
    if (!this.channels[key]) {
      this.channels[key] = new BroadcastChannel(key);
    }
    return this.channels[key];
  }

  static emit(eventName: string, data?: any) {
    console.log(`send ${eventName} event`);
    const channel = this.getChannel(eventName);
    channel.postMessage(data);
  }

  static on(eventName: string, callback: (data: any) => void) {
    console.log(`subscribe to ${eventName} event`);
    const channel = this.getChannel(eventName);
    channel.addEventListener("message", (event) => {
      callback(event.data);
    });
  }

  static off(eventName: string, callback: (data: any) => void) {
    console.log(`remove subscribe from ${eventName} event`);
    const channel = this.getChannel(eventName);
    channel.removeEventListener(eventName, callback);
    channel.close();
    delete this.channels[eventName];
  }
}
