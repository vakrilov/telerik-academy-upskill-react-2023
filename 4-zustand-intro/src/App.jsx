import { useStore } from "./store";

function BearCounter() {
  const bears = useStore((state) => state.bears);
  return <h1>{bears} around here...</h1>;
}

function AddBear() {
  const increasePopulation = useStore((state) => state.increasePopulation);
  return <button onClick={increasePopulation}>one up</button>;
}

function KickOutAllBears() {
  const removeAllBears = useStore((state) => state.removeAllBears);
  return <button onClick={removeAllBears}>bye bears</button>;
}

function App() {
  return (
    <>
      <h1>Hi there</h1>
      <div className="card">
        <BearCounter />
        <AddBear />
        <KickOutAllBears />
      </div>
    </>
  );
}

export default App;
