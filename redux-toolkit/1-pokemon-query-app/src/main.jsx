import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

const rootElement = document.getElementById("root");

const reactRoot = ReactDOM.createRoot(rootElement);

reactRoot.render(
  <Provider store={store}>
    <App />
  </Provider>
);
