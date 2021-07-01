const eventTypes = require('./lib/eventTypes');
const EventSource = require("eventsource");

class EventSourceClient {
  constructor(config) {
    // todo: typechecks

    this.config = config;
    this.features = {};
    
    const options = {
      headers: { Authorization: config.sdkKey}
    }
    const apiClient = new EventSource(config.getServerAddress(), options);
    this.apiClient = apiClient;
  }

  start() {
    this.handleEvents();
    this.handleErrors();
  }

  handleEvents() {
    this.apiClient.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      const eventType = data.eventType;
      const payload = data.payload;
      console.log(data.eventType === eventTypes.FEATURE_UPDATES);
      switch (eventType) {
        case eventTypes.FEATURE_UPDATE:
          this.handleFeatureUpdate(payload);
        case eventTypes.FEATURE_UPDATES:
          this.handleFeatureUpdates(payload);
      }
    }
  }

  handleErrors() {
    this.apiClient.onerror = (error) => {
      console.log("Event source failed: ", error);
    }
  }

  handleFeatureUpdate(payload) {
    const { key, value } = payload;
    this.features[key] = value;
  }

  handleFeatureUpdates(payload) {
    const { key, value } = payload;
    this.features[key] = value;
  }

  getFeature(key) {
    const value = this.features[key];
    return value;
  }
}

module.exports = EventSourceClient