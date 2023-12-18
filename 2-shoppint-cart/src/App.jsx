import { createContext, useContext, useState, useEffect } from "react";

const AppState = createContext();

const AppStateProvider = ({ children }) => {
  const [store, setState] = useState({
    chatMessages: [{ id: 0, content: "Hi there" }],
    items: [
      { id: 1, name: "Item 1", price: 10 },
      { id: 2, name: "Item 2", price: 20 },
      { id: 3, name: "Item 3", price: 30 },
    ],
    cart: { items: 4, price: 100 },
  });

  const addChatMessage = (message) => {
    setState((prevState) => {
      const chatMessages = [...prevState.chatMessages, message].slice(-5);
      return {
        ...prevState,
        chatMessages,
      };
    });
  };

  return (
    <AppState.Provider value={{ store, actions: { addChatMessage } }}>
      {children}
    </AppState.Provider>
  );
};
const useAppState = () => useContext(AppState).store;
const useAppActions = () => useContext(AppState).actions;

export default function App() {
  return (
    <AppStateProvider>
      <h1>App</h1>
      <div className="App">
        <Chat />
        <MainContent />
        <ShoppingCart />
      </div>
    </AppStateProvider>
  );
}

const predefinedMessages = [
  "Hi, I'm a bot",
  "How are you?",
  "I'm fine, thanks",
  "What are you doing?",
  "I'm writing some code",
];
const Chat = () => {
  console.log("Chat rendered");

  const { chatMessages } = useAppState();
  const { addChatMessage } = useAppActions();

  useEffect(() => {
    const timer = setTimeout(() => {
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

const MainContent = () => {
  console.log("MainContent rendered");
  const { items } = useAppState();

  return (
    <main className="panel">
      <h3>Main Content</h3>
      <div className="panel">
        {items.map((item) => {
          return (
            <div key={item.id}>
              <button>-</button>
              {item.name}
              <button>+</button>
            </div>
          );
        })}
      </div>
    </main>
  );
};

const ShoppingCart = () => {
  console.log("ShoppingCart rendered");

  const { cart } = useAppState();

  return (
    <div className="panel">
      <h3>Cart</h3>
      <div className="panel">
        Items: {cart.items}
        <br />
        Price: {cart.price}
      </div>
    </div>
  );
};
