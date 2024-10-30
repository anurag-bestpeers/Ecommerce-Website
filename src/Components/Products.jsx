import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "./ProductProvider";

const Products = () => {
  const { products, getData, softDelete } = useContext(ProductContext);
  const imageBaseUrl = "../../public/Photos/";
  const placeholderImage = "../../public/Photos/placeholder.png";

  useEffect(() => {
    getData();
  }, []);

  const getFileName = (path) => path.split('\\').pop();

  const getImageUrl = (image) => {
    if (image && image.startsWith("http")) {
      return image; 
    } else if (image && image.startsWith("data:image")) {
      return image;
    } else {
      return image ? `${imageBaseUrl}${getFileName(image)}` : placeholderImage; 
    }
  };

  const handleSoftDelete = (id) => {
    softDelete(id);
  };

  return (
    <div className="product_container">
      {products && products.length > 0 ? (
        products.map((item) => {
          const imageUrl = getImageUrl(item.image);

          return (
            <div key={item.id} className="items">
              <Link to={`/detail/${item.id}`}>
                <img src={imageUrl} alt={item.imageAlt || "Product Image"} />
              </Link>
              <div className="innerItems">
                <h4>{(item.title ? item.title.toUpperCase() : "Untitled").slice(0, 27) + "..."}</h4>
                <div className="price_rating">
                  <p>Price - ${Math.round(item.price)}</p>
                  <p>Rating - {item.rating?.rate}</p>
                </div>
                <div className="productBtn">
                  <button>Buy Now</button>
                  <Link to={`/updateproduct/${item.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleSoftDelete(item.id)}>Delete</button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default Products;
