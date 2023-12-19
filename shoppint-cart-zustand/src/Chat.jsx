import { useEffect } from "react";
import { useAppStore } from "./AppStateProvider";

const predefinedMessages = [
  "Hi, I'm a bot",
  "How are you?",
  "I'm fine, thanks",
  "What are you doing?",
  "I'm writing some code",
];
export const Chat = () => {
  console.log("Chat rendered");

  const chatMessages = useAppStore((store) => store.chatMessages);
  const addChatMessage = useAppStore((store) => store.addChatMessage);

  useEffect(() => {
    const timer = setInterval(() => {
      addChatMessage({
        id: Date.now(),
        content:
          predefinedMessages[
            Math.floor(Math.random() * predefinedMessages.length)
          ],
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [addChatMessage]);

  return (
    <div className="panel">
      <h3>Chat</h3>
      <div className="panel">
        {chatMessages.map(({ id, content }) => (
          <div className="msg" key={id}>
            {content}
          </div>
        ))}
      </div>
    </div>
  );
};
