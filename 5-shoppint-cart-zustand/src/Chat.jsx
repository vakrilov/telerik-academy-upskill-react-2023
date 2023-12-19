import { useEffect } from "react";
import { useAppActions, useChatMessages } from "./AppStateProvider";

const predefinedMessages = [
  "Hi, I'm a bot",
  "How are you?",
  "I'm fine, thanks",
  "What are you doing?",
  "I'm writing some code",
];
const getRandomMessage = () =>
  predefinedMessages[Math.floor(Math.random() * predefinedMessages.length)];

export const Chat = () => {
  console.log("Chat rendered");

  const chatMessages = useChatMessages();
  const addChatMessage = useAppActions().addChatMessage

  useEffect(() => {
    const timer = setInterval(() => {
      addChatMessage({
        id: Date.now(),
        content: getRandomMessage(),
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
