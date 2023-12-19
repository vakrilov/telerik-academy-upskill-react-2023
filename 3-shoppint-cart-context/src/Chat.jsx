import { useEffect } from "react";
import { useAppState, useAppActions } from "./AppStateProvider";

const predefinedMessages = ["Hi, I'm not a bot"];

const getRandomMessage = () =>
  predefinedMessages[Math.floor(Math.random() * predefinedMessages.length)];

export const Chat = () => {
  console.log("Chat rendered");

  const { chatMessages } = useAppState();
  const { addChatMessage } = useAppActions();

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
