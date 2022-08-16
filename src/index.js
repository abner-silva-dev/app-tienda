import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ArticleProvider } from "./context/articlesContex";

ReactDOM.render(
  <React.StrictMode>
    <ArticleProvider>
      <App />
    </ArticleProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
