// Basic WebRTC signaling server using WebSocket
const WebSocket = require('ws');
const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });

// roomName -> [ws, ws, ...]
const rooms = {};

wss.on('connection', ws => {

    let room = null;
    ws.on('message', msg => {
        // Convert Buffer to string if needed
        if (Buffer.isBuffer(msg)) msg = msg.toString('utf8');
        console.log('[Received]', msg);
        if (typeof msg !== 'string') return; // Only handle string messages
        let data;
        try { data = JSON.parse(msg); } catch (e) { return; }
        if (!data.room) return;
        room = data.room;
        if (!rooms[room]) {
            rooms[room] = [];
            console.log(`[Room Created] ${room}`);
        }
        if (!rooms[room].includes(ws)) {
            rooms[room].push(ws);
            console.log(`[Join] Client joined room: ${room} (Total: ${rooms[room].length})`);
            // If there are now 2 clients, notify only the second one to trigger handshake
            if (rooms[room].length === 2) {
                try {
                    ws.send(JSON.stringify({ room, type: 'init' }));
                } catch (e) {}
            }
        }
        // Broadcast to all other clients in the room
        rooms[room].forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(msg);
            }
        });
    });
    ws.on('close', () => {
        if (room && rooms[room]) {
            rooms[room] = rooms[room].filter(client => client !== ws);
            console.log(`[Leave] Client left room: ${room} (Remaining: ${rooms[room].length})`);
            if (rooms[room].length === 0) {
                delete rooms[room];
                console.log(`[Room Deleted] ${room}`);
            }
        }
    });
});

console.log('Signaling server running on port', PORT);
