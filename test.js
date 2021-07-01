import Config from './config';

config = new Config("http://localhost:3030", "JazzyElksRule");

const client = config.connect();
client.start();