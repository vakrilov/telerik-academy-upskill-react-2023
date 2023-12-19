import { useEffect, useMemo } from "react";
import { createContext, useContext, useState } from "react";

const UserContext = createContext();
const CountContext = createContext();

const AppStateProvider = ({ children }) => {
  const [user] = useState({ firstName: "John", lastName: "Doe" });
  const [countdown, setCountdown] = useState(1000);

  useEffect(() => {
    const interval = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(interval);
  }, [setCountdown]);

  const userValue = useMemo(() => ({ user }), [user]);

  return (
    <UserContext.Provider value={userValue}>
      <CountContext.Provider value={countdown}>
        {children}
      </CountContext.Provider>
    </UserContext.Provider>
  );
};

export default function App() {
  return (
    <AppStateProvider>
      <h1>App</h1>
      <div className="App">
        <Sidebar />
        <MainContent />
      </div>
    </AppStateProvider>
  );
}

const Sidebar = () => {
  console.log("Sidebar rendered");
  return (
    <aside>
      Sidebar
      <Profile />
    </aside>
  );
};

const Profile = () => {
  console.log("Profile rendered");
  const { user } = useContext(UserContext);
  return (
    <div>
      Hi, {user.firstName} {user.lastName}!
    </div>
  );
};

const MainContent = () => {
  console.log("MainContent rendered");
  return (
    <main>
      Main Content
      <Banner />
    </main>
  );
};

const Banner = () => {
  console.log("Banner rendered");
  const countdown = useContext(CountContext);

  return <div>CountDown: {countdown}</div>;
};
