const EventSourceClient = require('./eventSourceClient');
const ClientWithContext = require('./clientWithContext');

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

  withContext() {
    // make sure we are staying in this context
    const self = this;
    return new ClientWithContext({
      context: new Context({

        userKey: "user123"
      }),
      client: self.eventSourceClient,
      config: self
    });
  }

  getServerAddress() {
    return `${this.serverAddress}/features`;
  }
}

module.exports = Config