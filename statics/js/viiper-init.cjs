const net = require("net");

function send(client, path, obj) {
  const json = JSON.stringify(obj);
  const cmd = `${path} ${json}\0`;
  client.write(cmd);
}

const client = net.createConnection({ port: 3242, host: "127.0.0.1" }, () => {
  console.log("Connected to VIIPER API");

  // Crear bus correctamente
  send(client, "bus/create", { name: "main" });
});

client.on("data", (data) => {
  const msg = data.toString();
  console.log("VIIPER:", msg);

  try {
    const json = JSON.parse(msg);

    if (json.busId) {
      const busId = json.busId;

      send(client, `bus/${busId}/add`, { type: "mouse" });
    }
  } catch (e) {
    console.log("Non-JSON response:", msg);
  }
});

client.on("error", (err) => {
  console.error("Socket error:", err);
});
