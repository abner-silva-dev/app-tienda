import { createContext, useState, useEffect } from "react";

export const ArticlesContext = createContext();

export const ArticleProvider = ({ children }) => {
  const [articles, setArticle] = useState(
    JSON.parse(localStorage.getItem("tienda"))
      ? [...JSON.parse(localStorage.getItem("tienda"))]
      : []
  );
  const [articleFiltered, setArticleFiltered] = useState(articles);
  const [curArticle, setCurArticle] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);

  useEffect(() => {
    setArticleFiltered(articles);
  }, [articles]);

  useEffect(() => {
    if (isOpenModal) {
      document.querySelector(".modal").classList.remove("hidden");
      document.querySelector(".overlay").classList.remove("hidden");
    } else {
      document.querySelector(".modal").classList.add("hidden");
      document.querySelector(".overlay").classList.add("hidden");
    }
  }, [isOpenModal]);

  useEffect(() => {
    if (isOpenModalUpdate) {
      document.querySelector(".modal2").classList.remove("hidden");
      document.querySelector(".overlay2").classList.remove("hidden");
    } else {
      document.querySelector(".modal2").classList.add("hidden");
      document.querySelector(".overlay2").classList.add("hidden");
    }
  }, [isOpenModalUpdate]);

  const value = {
    articles,
    setArticle,
    isOpenModal,
    setIsOpenModal,
    isOpenModalUpdate,
    setIsOpenModalUpdate,
    curArticle,
    setCurArticle,
    articleFiltered,
    setArticleFiltered,
  };

  return (
    <ArticlesContext.Provider value={value}>
      {children}
    </ArticlesContext.Provider>
  );
};
