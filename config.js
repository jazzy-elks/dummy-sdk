const EventSourceClient = require('./eventSourceClient');

class Config {
  constructor(serverAddress, sdkKey) {
    this.serverAddress = serverAddress;
    this.sdkKey = sdkKey;
  }

  connect() {
    const eventSourceClient = new EventSourceClient(this);
    this.eventSourceClient = eventSourceClient;
    eventSourceClient.start();
    return eventSourceClient;
  }

  getServerAddress() {
    return `${this.serverAddress}/features`;
  }
}

module.exports = Config