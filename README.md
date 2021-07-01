## A dummy SDK for Feature Flags

**Installation**

`npm install jazzy-elks-dummy-sdk` for the package.

**Usage**

```
const SDK = require("jazzy-elks-dummy-sdk");
const client = new SDK("http://localhost:3030", "JazzyElksRule");
const eventSourceClient = client.connect(); // makes an active sse connection
console.log(eventSourceClient.get("Hi")); // gets feature
```