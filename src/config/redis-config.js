import { createClient } from "redis";

const client = createClient();
client.on("error", (e) => console.log("An error occured ", e));
client.connect();

export default client;
