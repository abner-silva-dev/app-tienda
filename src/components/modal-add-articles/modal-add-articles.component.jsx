import { Fragment, useContext } from "react";
import { ArticlesContext } from "../../context/articlesContex";
import { saveLocalStorage } from "../../helpers/helpers";

const showAdvertence = function () {
  document.querySelector(".advertence").classList.remove("hidden");
};

let emptyBox = false;

let newArticle = {
  id: 0,
  title: "",
  supplierPrice: 0,
  salePrice: 0,
  quantityProducts: 0,
  urlImgProduct: "",
};

const ModalAddArticles = () => {
  const { articles, setArticle, setIsOpenModal } = useContext(ArticlesContext);

  return (
    <Fragment>
      <div className="modal">
        <button
          className="btn--close-modal"
          onClick={() => setIsOpenModal(false)}
        >
          &times;
        </button>
        <h2 className="modal__header">Nuevo producto</h2>
        <form className="modal__form">
          <label>Nombre producto</label>
          <input
            className="inputForm"
            type="text"
            placeholder="INTRODUCE NOMBRE DEL PRODUCTO"
            onChange={(e) => (newArticle.title = e.target.value)}
          />
          <label>Imagen producto</label>
          <input
            className="inputForm file"
            type="file"
            onChange={function (e) {
              const file = document.querySelector(".file").files;
              const urlImage = window.URL.createObjectURL(file[0]);
              newArticle.urlImgProduct = urlImage;
            }}
          />

          <label>Precio provedor</label>
          <input
            className="inputForm"
            type="text"
            onChange={(e) => (newArticle.supplierPrice = e.target.value)}
            placeholder="INTRODUCE PRECIO PROVEDOR"
          />
          <label>Precio venta</label>
          <input
            className="inputForm"
            type="text"
            placeholder="INTRODUCE PRECIO DE VENTA"
            onChange={(e) => (newArticle.salePrice = e.target.value)}
          />
          <label>Total productos</label>
          <input
            className="inputForm"
            type="text"
            placeholder="INTRODUCE TOTAL DE PRODUCTOS"
            onChange={(e) => (newArticle.quantityProducts = e.target.value)}
          />
          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();

              const inputsAreCompleate = [
                ...document.querySelectorAll(".inputForm"),
              ].every((input) => {
                return input.value !== "";
              });

              if (inputsAreCompleate) emptyBox = true;

              if (!inputsAreCompleate) showAdvertence();

              if (emptyBox) {
                newArticle.id = (Date.now() + "").slice(-10);
                newArticle.supplierPrice = +newArticle.supplierPrice;
                newArticle.salePrice = +newArticle.salePrice;
                newArticle.quantityProducts = +newArticle.quantityProducts;
                const auxState = [...articles];
                auxState.push({ ...newArticle });
                setArticle(auxState);
                [...document.querySelectorAll(".inputForm")].forEach(
                  (el) => (el.value = "")
                );
                saveLocalStorage(auxState);
                setIsOpenModal(false);
                newArticle = {
                  id: 0,
                  title: "",
                  supplierPrice: 0,
                  salePrice: 0,
                  quantityProducts: 0,
                  urlImgProduct: "",
                };
                emptyBox = false;
              }
            }}
          >
            AGREGAR PRODUCTO
          </button>
        </form>
      </div>
      <div
        className="overlay hidden"
        onClick={() => setIsOpenModal(false)}
      ></div>
    </Fragment>
  );
};

export default ModalAddArticles;
