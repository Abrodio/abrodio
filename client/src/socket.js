import { io } from "socket.io-client";

const URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:4000";

if (!window._socket) {
  window._socket = io(URL);
}

export default window._socket;
