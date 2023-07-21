const express = require("express")
const WebSocket = require("ws");
const app = express()
//const wss = new WebSocket.Server({ server });
const wss = new WebSocket.Server({ port: 8001 });

app.listen(8000, () => {
  console.log("WebSockets server listening on port 8080");
});

wss.on("connection", (ws, request) => {
  // 메시지를 받아서 모든 채널에 메시지 출력하기
  ws.on("message", data => {
      wss.clients.forEach(client => {
      client.send(data.toString())
      })
  })
})

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

});