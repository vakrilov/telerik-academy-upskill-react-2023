import { useState } from "react";


const value = "hi there"

const App = () => {
  const [count, setCount] = useState(0);
  console.log("Parent is rendering");


  return (
    <>
      <h1>Hi there</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <Child value={value} />
      </div>
    </>
  );
}

const Child = ({ value }) => {
  console.log("Child is rendering");

  return (
    <div>
      <h2>Child</h2>
      <p>{JSON.stringify(value)}</p>
    </div>
  );
};

export default App;
