import Article from "../article/article.component";
import { useContext } from "react";
import { ArticlesContext } from "../../context/articlesContex";

const ProductsGrid = () => {
  const { articleFiltered } = useContext(ArticlesContext);

  return (
    <div className="grid-product">
      {articleFiltered.map((arti) => (
        <Article key={arti.id} arti={arti} />
      ))}
    </div>
  );
};

export default ProductsGrid;
