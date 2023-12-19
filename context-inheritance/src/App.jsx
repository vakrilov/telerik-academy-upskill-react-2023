import { createContext, useContext, useMemo, useState } from "react";

const themeContext = createContext({ theme: "light" });

// const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState("light");
//   return (
//     <themeContext.Provider value={{ theme, setTheme }}>
//       {children}
//     </themeContext.Provider>
//   );
// };

const App = () => {
  console.log("rendering app");
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>Hi there</h1>
      <SectionOne />
      <SectionTwo />

      <div className="counter">
        <p>Count: {count}</p>
        <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      </div>
    </>
  );
};

const SectionOne = () => {
  console.log("rendering section 1");

  const { theme } = useContext(themeContext);

  return (
    <div className={`section ${theme}`}>
      <h3>Section1</h3>
      <ThemeSwitcher />
    </div>
  );
};

const SectionTwo = () => {
  console.log("rendering section 2");
  const { theme } = useContext(themeContext);

  return (
    <div className={`section ${theme}`}>
      <h3>Section 2</h3>
      <ThemeSwitcher />
    </div>
  );
};

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(themeContext);

  return (
    <label>
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={(e) => {
          setTheme(e.target.checked ? "dark" : "light");
        }}
      />
      Use dark theme
    </label>
  );
};

export default App;
