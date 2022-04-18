import { useState } from "react";
import "./index.css";

let currentCard;
let emptyBox = false;

const showAdvertence = function () {
  document.querySelector(".advertence").classList.remove("hidden");
};
const closeAdvertence = function () {
  document.querySelector(".advertence").classList.add("hidden");
};

const toggleWindow = function () {
  document.querySelector(".modal").classList.toggle("hidden");
  document.querySelector(".overlay").classList.toggle("hidden");
  closeAdvertence();
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
        <h1>PRODUCTOS</h1>
        <div className="header-tools">
          <button className="add" onClick={toggleWindow}>
            NUEVO PRODUCTO
          </button>
          <input
            className="header-input"
            placeholder="Buscar producto"
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
        </div>
      </header>
      <div className="grid-product">
        {articles.map((arti) => (
          <article key={arti.id} className="card">
            <div className="container-image-product">
              <img
                className="imgProduct"
                src={arti.urlImgProduct}
                alt={arti.title}
              />
            </div>
            <div className="container-details">
              <h2 className="titleArt">{arti.title}</h2>

              <span>
                Precio provedor: <span>$ {arti.supplierPrice}</span> pesos
              </span>
              <span>
                Precio venta: <span>$ {arti.salePrice}</span> pesos
              </span>
              <span>
                total de productos: <span>{arti.quantityProducts}</span>
              </span>
              <span>
                Total utilidades: ${" "}
                {arti.quantityProducts * (arti.salePrice - arti.supplierPrice)}
              </span>
              <span>
                Total pagado: $ {arti.quantityProducts * arti.supplierPrice}
              </span>
            </div>

            <div className="container-btn">
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
            </div>
          </article>
        ))}
      </div>
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
            placeholder="INTRODUCE NOMBRE DEL PRODUCTO"
            onChange={(e) => (newArticle.title = e.target.value)}
          />
          <label>Imagen</label>
          <input
            className="inputForm"
            type="text"
            placeholder="INTRODUCE URL DE IMAGEN"
            onChange={(e) => (newArticle.urlImgProduct = e.target.value)}
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
              if (
                [...document.querySelectorAll(".inputForm")].every(
                  (input) => input.value !== ""
                )
              )
                emptyBox = true;
              if (emptyBox === false) {
                showAdvertence();
              }

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
                toggleWindow();
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
            className="inputForm1"
            type="text"
            placeholder="INTRODUCE NOMBRE DEL PRODUCTO"
            onChange={(e) => {
              updateArticle.title = e.target.value;
            }}
          />
          <label>Imagen</label>
          <input
            className="inputForm1"
            type="text"
            placeholder="INTRODUCE URL DE IMAGEN"
            onChange={(e) => (updateArticle.urlImgProduct = e.target.value)}
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
              toggleWindow2();
            }}
          >
            ACTUALIZAR PRODUCTO
          </button>
        </form>
      </div>
      <div className="overlay overlay2 hidden" onClick={toggleWindow2}></div>
      <div className="advertence hidden">
        <button
          className="btn--close-modal btn--advertence-close"
          onClick={closeAdvertence}
        >
          &times;
        </button>
        <div className=" container-advertence">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon-advertence"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p>Todos los campos deben estar llenos</p>
        </div>
      </div>
      <footer>
        <p>&copy; Copyright by Dylan Abner Silva</p>
        <div>
          <a
            target="_blank"
            href="https://www.facebook.com/dylanabner.silvaaraujo.7"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="100"
              fill="#f5eaea"
              viewBox="0 0 256 256"
            >
              <rect width="256" height="256" fill="none"></rect>
              <circle
                cx="128"
                cy="128"
                r="96"
                fill="none"
                stroke="#f5eaea"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></circle>
              <path
                d="M168,88H152a23.9,23.9,0,0,0-24,24V224"
                fill="none"
                stroke="#f5eaea"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></path>
              <line
                x1="96"
                y1="144"
                x2="160"
                y2="144"
                fill="none"
                stroke="#f5eaea"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></line>
            </svg>
          </a>

          <a
            target="_blank"
            href="https://www.instagram.com/abner_sa0/"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="100"
              fill="#f5eaea"
              viewBox="0 0 256 256"
            >
              <rect width="256" height="256" fill="none"></rect>
              <circle
                cx="128"
                cy="128"
                r="40"
                fill="none"
                stroke="#f5eaea"
                strokeMiterlimit="10"
                strokeWidth="16"
              ></circle>
              <rect
                x="36"
                y="36"
                width="184"
                height="184"
                rx="48"
                fill="none"
                stroke="#f5eaea"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></rect>
              <circle cx="180" cy="76" r="12"></circle>
            </svg>
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/dylan-abner-silva-araujo-6b3079230/"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="100"
              fill="#f5eaea"
              viewBox="0 0 256 256"
            >
              <rect width="256" height="256" fill="none"></rect>
              <rect
                x="36"
                y="36"
                width="184"
                height="184"
                rx="8"
                fill="none"
                stroke="#f5eaea"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></rect>
              <line
                x1="120"
                y1="112"
                x2="120"
                y2="176"
                fill="none"
                stroke="#f5eaea"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></line>
              <line
                x1="88"
                y1="112"
                x2="88"
                y2="176"
                fill="none"
                stroke="#f5eaea"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></line>
              <path
                d="M120,140a28,28,0,0,1,56,0v36"
                fill="none"
                stroke="#f5eaea"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></path>
              <circle cx="88" cy="80" r="12"></circle>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
