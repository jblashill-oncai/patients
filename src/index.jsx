import { App } from "./App";
import * as React from "react";
import { createRoot } from "react-dom/client";
import Modal from 'react-modal';

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw Error("#root element not found");
}
const root = createRoot(rootElement);
root.render(<App />);

Modal.setAppElement(rootElement);
