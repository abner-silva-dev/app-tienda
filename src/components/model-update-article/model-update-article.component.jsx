import { Fragment, useContext } from "react";
import { ArticlesContext } from "../../context/articlesContex";
import { saveLocalStorage } from "../../helpers/helpers";

let updateArticle = {};

const ModelUpdateArticle = () => {
  const { articles, setArticle, setIsOpenModalUpdate, curArticle } =
    useContext(ArticlesContext);

  return (
    <Fragment>
      <div className="modal modal2 hidden">
        <button
          className="btn--close-modal"
          onClick={() => setIsOpenModalUpdate(false)}
        >
          &times;
        </button>
        <h2 className="modal__header">Actualizar</h2>
        <form className="modal__form">
          <label>Nombre producto</label>
          <input
            className="inputForm1"
            type="text"
            placeholder="INTRODUCE NOMBRE DEL PRODUCTO"
            onChange={(e) => {
              updateArticle.title = e.target.value;
            }}
          />
          <label>Imagen producto</label>
          <input
            className="inputForm1 file2"
            type="file"
            onChange={function (e) {
              const file = document.querySelector(".file2").files;
              const urlImage = window.URL.createObjectURL(file[0]);
              updateArticle.urlImgProduct = urlImage;
            }}
          />

          <label>Precio provedor</label>
          <input
            className="inputForm1"
            type="text"
            placeholder="INTRODUCE PRECIO PROVEDOR"
            onChange={(e) => (updateArticle.supplierPrice = e.target.value)}
          />
          <label>Precio venta</label>
          <input
            className="inputForm1"
            type="text"
            placeholder="INTRODUCE PRECIO DE VENTA"
            onChange={(e) => (updateArticle.salePrice = e.target.value)}
          />
          <label>Total productos</label>
          <input
            className="inputForm1"
            type="text"
            placeholder="INTRODUCE TOTAL DE PRODUCTOS"
            onChange={(e) => (updateArticle.quantityProducts = e.target.value)}
          />
          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();

              const currentCard = articles.findIndex(
                (article) => article.id === curArticle.id
              );

              updateArticle.id = articles[currentCard].id;
              updateArticle.supplierPrice = updateArticle.supplierPrice
                ? +updateArticle.supplierPrice
                : articles[currentCard].supplierPrice;
              updateArticle.salePrice = updateArticle.salePrice
                ? updateArticle.salePrice
                : articles[currentCard].salePrice;
              updateArticle.quantityProducts = updateArticle.quantityProducts
                ? +updateArticle.quantityProducts
                : articles[currentCard].quantityProducts;

              const auxState = [...articles];
              auxState[currentCard] = { ...updateArticle };

              setArticle(auxState);
              saveLocalStorage(auxState);
              setIsOpenModalUpdate(false);
            }}
          >
            ACTUALIZAR PRODUCTO
          </button>
        </form>
      </div>
      <div
        className="overlay overlay2 hidden"
        onClick={() => setIsOpenModalUpdate(false)}
      ></div>
    </Fragment>
  );
};

export default ModelUpdateArticle;
