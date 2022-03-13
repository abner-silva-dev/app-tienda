import { useState } from "react";
import "./index.css";

let currentCard;

const toggleWindow = function () {
  document.querySelector(".modal").classList.toggle("hidden");
  document.querySelector(".overlay").classList.toggle("hidden");
};

const toggleWindow2 = function () {
  document.querySelector(".modal2").classList.toggle("hidden");
  document.querySelector(".overlay2").classList.toggle("hidden");
};

const compareStrings = function (obj, string) {
  const newString = obj.title.slice(0, string.length);
  return newString === string;
};

let newArticle = {
  id: 0,
  title: "",
  supplierPrice: 0,
  salePrice: 0,
  quantityProducts: 0,
  urlImgProduct: "",
};

let updateArticle = {};
// let stringInputSearch;

const update = function (articlesArr, id) {
  return articlesArr.filter((art) => !(art.id === id));
};

const saveLocalStorage = function (value) {
  localStorage.setItem("tienda", JSON.stringify(value));
};

function App() {
  const [articles, setArticle] = useState(
    JSON.parse(localStorage.getItem("tienda"))
      ? [...JSON.parse(localStorage.getItem("tienda"))]
      : []
  );

  return (
    <div className="content">
      <header>
        <h1>Tienda</h1>
        <button className="add" onClick={toggleWindow}>
          ➕
        </button>
        <input
          onChange={(e) => {
            const auxState = [
              ...JSON.parse(localStorage.getItem("tienda")),
            ].filter((art) => compareStrings(art, e.target.value));

            if (auxState.length !== 0) setArticle(auxState);
            if (auxState.length === 0) setArticle([]);

            if (e.target.value.length === 0) {
              setArticle([...JSON.parse(localStorage.getItem("tienda"))]);
            }
          }}
        ></input>
      </header>
      <ul className="grid">
        {articles.map((arti) => (
          <li key={arti.id}>
            <article className="card">
              <h2 className="titleArt">{arti.title}</h2>
              <img
                className="imgProduct"
                src={arti.urlImgProduct}
                alt={arti.title}
              />
              <p>
                Precio provedor: <span>$ {arti.supplierPrice}</span> pesos
              </p>
              <p>
                Precio venta: <span>$ {arti.salePrice}</span> pesos
              </p>
              <p>
                total de productos: <span>{arti.quantityProducts}</span>
              </p>
              <p>
                Total utilidades: ${" "}
                {arti.quantityProducts * (arti.salePrice - arti.supplierPrice)}
              </p>
              <p>
                Total pagado: $ {arti.quantityProducts * arti.supplierPrice}
              </p>

              <button
                className="btnEliminar"
                onClick={(e) => {
                  const updateLocal = update(articles, arti.id);
                  setArticle(updateLocal);
                  saveLocalStorage(updateLocal);
                }}
              >
                Eliminar
              </button>
              <button
                className="btnActualizar
          "
                onClick={(e) => {
                  currentCard = articles.findIndex((art) => art.id === arti.id);
                  toggleWindow2();
                  updateArticle = {
                    id: articles[currentCard].id,
                    title: articles[currentCard].title,
                    supplierPrice: articles[currentCard].supplierPrice,
                    salePrice: articles[currentCard].salePrice,
                    quantityProducts: articles[currentCard].quantityProducts,
                    urlImgProduct: articles[currentCard].urlImgProduct,
                  };
                }}
              >
                Actualizar
              </button>
            </article>
          </li>
        ))}
      </ul>
      <div className="modal hidden">
        <button className="btn--close-modal" onClick={toggleWindow}>
          &times;
        </button>
        <h2 className="modal__header">Nuevo producto</h2>
        <form className="modal__form">
          <label>Nombre producto</label>
          <input
            className="inputForm"
            type="text"
            onChange={(e) => (newArticle.title = e.target.value)}
          />
          <label>Imagen</label>
          <input
            className="inputForm"
            type="text"
            onChange={(e) => (newArticle.urlImgProduct = e.target.value)}
          />
          <label>Precio provedor</label>
          <input
            className="inputForm"
            type="text"
            onChange={(e) => (newArticle.supplierPrice = e.target.value)}
          />
          <label>Precio venta</label>
          <input
            className="inputForm"
            type="text"
            onChange={(e) => (newArticle.salePrice = e.target.value)}
          />
          <label>Total productos</label>
          <input
            className="inputForm"
            type="text"
            onChange={(e) => (newArticle.quantityProducts = e.target.value)}
          />
          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();
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
              toggleWindow();
              newArticle = {
                id: 0,
                title: "",
                supplierPrice: 0,
                salePrice: 0,
                quantityProducts: 0,
                urlImgProduct: "",
              };
            }}
          >
            &rarr;
          </button>
        </form>
      </div>
      <div className="overlay hidden" onClick={toggleWindow}></div>
      {/*
       Modal 2
       */}
      <div className="modal modal2 hidden">
        <button className="btn--close-modal" onClick={toggleWindow2}>
          &times;
        </button>
        <h2 className="modal__header">Actualizar</h2>
        <form className="modal__form">
          <label>Nombre producto</label>
          <input
            className="inputForm"
            type="text"
            onChange={(e) => {
              updateArticle.title = e.target.value;
            }}
          />
          <label>Imagen</label>
          <input
            className="inputForm"
            type="text"
            onChange={(e) => (updateArticle.urlImgProduct = e.target.value)}
          />
          <label>Precio provedor</label>
          <input
            className="inputForm"
            type="text"
            onChange={(e) => (updateArticle.supplierPrice = e.target.value)}
          />
          <label>Precio venta</label>
          <input
            className="inputForm"
            type="text"
            onChange={(e) => (updateArticle.salePrice = e.target.value)}
          />
          <label>Total productos</label>
          <input
            className="inputForm"
            type="text"
            onChange={(e) => (updateArticle.quantityProducts = e.target.value)}
          />
          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();
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
              [...document.querySelectorAll(".inputForm")].forEach(
                (el) => (el.value = "")
              );
              saveLocalStorage(auxState);
              toggleWindow2();
            }}
          >
            &rarr;
          </button>
        </form>
      </div>
      <div className="overlay overlay2 hidden" onClick={toggleWindow2}></div>
      <footer>
        <p>
          &copy; Copyright by{" "}
          <a
            target="_blank"
            href="https://www.facebook.com/dylanabner.silvaaraujo.7"
            rel="noreferrer"
          >
            Dylan Abner Silva
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
