import { useContext } from "react";
import { ArticlesContext } from "../../context/articlesContex";
import { update, saveLocalStorage } from "../../helpers/helpers";

const Article = ({ arti }) => {
  const { articles, setArticle, setIsOpenModalUpdate, setCurArticle } =
    useContext(ArticlesContext);

  return (
    <article key={arti.id} className="card">
      <div className="container-image-product">
        <img className="imgProduct" src={arti.urlImgProduct} alt={arti.title} />
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
            console.log(arti);
            setCurArticle(arti);
            // updateArticle = {
            //   id: articles[currentCard].id,
            //   title: articles[currentCard].title,
            //   supplierPrice: articles[currentCard].supplierPrice,
            //   salePrice: articles[currentCard].salePrice,
            //   quantityProducts: articles[currentCard].quantityProducts,
            //   urlImgProduct: articles[currentCard].urlImgProduct,
            // };
            setIsOpenModalUpdate(true);
          }}
        >
          Actualizar
        </button>
      </div>
    </article>
  );
};

export default Article;
