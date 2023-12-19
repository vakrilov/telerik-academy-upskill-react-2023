import { useStore } from "./store";

function BearCounter() {
  const bears = useStore((state) => state.bears);
  return <h1>{bears} bears around here...</h1>;
}

function AddBear() {
  const increaseBears = useStore((state) => state.increaseBears);
  return <button onClick={increaseBears}>one up</button>;
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
