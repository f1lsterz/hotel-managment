import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Message } from "../../utils/types/message";
import { useUserStore } from "../../stores/user";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const { user } = useUserStore();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      const socketInstance = io(
        import.meta.env.VITE_CHAT_URL || "http://localhost:3001",
        {
          transports: ["websocket"],
        }
      );
      setSocket(socketInstance);

      socketInstance.emit("findAllMessages");

      socketInstance.on("findAllMessages", (fetchedMessages: Message[]) => {
        setMessages(fetchedMessages);
      });

      socketInstance.on("newMessage", (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socketInstance.disconnect();
        setSocket(null);
      };
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (newMessage.trim() && socket) {
      socket.emit("createMessage", { content: newMessage, senderId: user?.id });
      console.log("Sent message:", { content: newMessage, senderId: user?.id });
      setNewMessage("");
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-4 w-96">
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          ×
        </button>
        <div className="h-64 overflow-y-auto border border-gray-200 p-2">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div key={message.id} className="mb-2">
                <strong>{message.id}:</strong> {message.content}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Hotel`s hotline is listening
            </p>
          )}
        </div>
        <div className="mt-2 flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow border border-gray-300 rounded p-2"
            placeholder="Write message..."
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
