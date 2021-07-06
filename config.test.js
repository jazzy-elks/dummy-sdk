const FakeConfig = require('./mocks/fakeConfig');

describe('testing config', () => {
  let fakeConfig;
  const serverAddress = "http://localhost:3030";
  const sdkKey = "JazzyElksRule";

  beforeEach(() => {
    fakeConfig = new FakeConfig(serverAddress, sdkKey);
  });

  test("initialize a connection", () => {
    const client = fakeConfig.connect();
    expect(client.apiClient.serverAddress).toEqual(`${serverAddress}/features`);
  });

  test("emit a fake event", () => {
    const client = fakeConfig.connect();
    client.apiClient.fakeEmitMessage();
    expect(client.features).toHaveProperty('show button');
    expect(client.features).toHaveProperty('show button.key', 'show button');
  });

  test("client with context", () => {
    fakeConfig.connect();
    const clientWithContext = fakeConfig.withContext();
    expect(clientWithContext.context).toHaveProperty('userKey');
  });
});

