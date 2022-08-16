import { useContext } from "react";
import { ArticlesContext } from "../../context/articlesContex";

import "./header.style.css";

const Header = () => {
  const { setIsOpenModal, articles, setArticleFiltered } =
    useContext(ArticlesContext);

  return (
    <header>
      <h1>PRODUCTOS</h1>
      <div className="header-tools">
        <button
          className="add"
          onClick={() => {
            setIsOpenModal(true);
          }}
        >
          NUEVO PRODUCTO
        </button>
        <input
          className="header-input"
          placeholder="Buscar producto"
          onChange={(e) => {
            const filterArti = articles.filter((article) =>
              article.title.includes(e.target.value)
            );

            setArticleFiltered(filterArti);
          }}
        ></input>
      </div>
    </header>
  );
};

export default Header;
