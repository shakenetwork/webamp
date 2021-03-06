export default class Emitter {
  on(event, callback) {
    const eventListeners = this._listeners[event] || [];
    eventListeners.push(callback);
    this._listeners[event] = eventListeners;
    const unsubscribe = () => {
      this._listeners[event] = eventListeners.filter(cb => cb !== callback);
    };
    return unsubscribe;
  }

  trigger(event, ...args) {
    const callbacks = this._listeners[event];
    if (callbacks) {
      callbacks.forEach(cb => cb(...args));
    }
  }

  constructor() {
    this._listeners = {};
  }
}
