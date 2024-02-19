import React, { useState } from "react";
import { Send } from "lucide-react";
import toast from "react-hot-toast";
import useSendMessages from "../../hooks/useSendMessagees";

const MessageInput = () => {
  const [message, setMessages] = useState();
  const { loading, send } = useSendMessages();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(message);
    if (!message) {
      toast.error("message can't be empty !");
      return ;
    }
    await send(message);
    setMessages("");
  };

  return (
    <div className="w-full px-4 my-3">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex items-center">
          <input
            type="text"
            className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white text-lg"
            placeholder="Send a message"
            value={message}
            onChange={(e) => setMessages(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 bg-gray-700 text-white p-3 rounded-lg text-lg"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
