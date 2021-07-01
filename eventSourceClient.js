import eventTypes from './lib/eventTypes';
const EventSource = require("eventsource");

class EventSourceClient {
  constructor(config) {
    // todo: typechecks

    this.config = config;
    this.features = {};
    
    const options = {
      headers: { Authorization: "JazzyElksRule"}
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
      const eventType = data.eventType;
      const payload = data.payload;
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
    this.features = payload;
  }

  getFeature(key) {
    const value = this.features[key];
    return value;
  }
}

export default EventSourceClient