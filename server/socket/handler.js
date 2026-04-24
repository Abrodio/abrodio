const Message = require("../models/Message");

module.exports = (io) => {
  io.on("connection", (socket) => {

    socket.on("join_room", async ({ room, country_id, city_id }) => {
      socket.join(room);
      // Send chat history from MongoDB
      try {
        const history = await Message.find({ city_id, country_id })
          .sort("createdAt").limit(100);
        socket.emit("room_history", history);
      } catch (e) { socket.emit("room_history", []); }
    });

    socket.on("send_message", async ({ room, message }) => {
      try {
        // Save to MongoDB
        const saved = await Message.create({
          sender_id:   message.sender_id,
          sender_type: message.sender_type,
          sender_name: message.sender_name,
          message:     message.message,
          city_id:     message.city_id,
          country_id:  message.country_id,
        });
        // Broadcast to room
        io.to(room).emit("receive_message", saved);
      } catch (e) { console.error("Message save error:", e.message); }
    });

    socket.on("typing", ({ room, sender, isTyping }) => {
      socket.to(room).emit("typing", { sender, isTyping });
    });

  });
};
