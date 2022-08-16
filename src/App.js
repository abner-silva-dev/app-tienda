import { useState, useContext } from "react";
import { ArticlesContext } from "./context/articlesContex";

import Header from "./components/header/header.component";
import ModalAddArticles from "./components/modal-add-articles/modal-add-articles.component";
import ProductsGrid from "./components/products-grid/products-grid.component";
import "./index.css";
import ModelUpdateArticle from "./components/model-update-article/model-update-article.component";
import ModalAdvertence from "./components/modal-advertence/modal-advertence.component";

function App() {
  return (
    <div className="content">
      <Header />
      <ProductsGrid />
      <ModalAddArticles />
      <ModelUpdateArticle />
      <ModalAdvertence />
    </div>
  );
}

export default App;
