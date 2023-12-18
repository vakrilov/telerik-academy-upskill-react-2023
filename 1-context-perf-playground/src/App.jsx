import { createContext, useContext, useState } from "react";

const AppStateContext = createContext();

const AppStateProvider = ({ children }) => {
  const [user, setUser] = useState({ firstName: "John", lastName: "Doe" });
  return (
    <AppStateContext.Provider value={{ user, setUser }}>
      {children}
    </AppStateContext.Provider>
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
  const { user } = useContext(AppStateContext);
  console.log("Profile rendered");
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

  const countdown = 1000;

  return <div>CountDown: {countdown}</div>;
};
