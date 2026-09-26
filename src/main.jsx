import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import "./firebase";

createRoot(document.getElementById("root")).render(<App />);