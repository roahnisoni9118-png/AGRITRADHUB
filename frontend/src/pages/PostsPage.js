import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function PostsPage() {

  const { crop } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, [crop]);

  const loadProducts = async () => {
    const url = crop 
      ? `/products?crop=${crop}` 
      : "/products";

    const res = await api.get(url);
    setProducts(res.data);
  };

  return (
    <div className="post-page">

      <h2>
        {crop ? `${crop.toUpperCase()} Products` : "All Products"}
      </h2>

      <div className="grid">

        {products.map((p) => (

          <div
            className="card"
            key={p._id}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/product/${p._id}`)}
          >

            <img src={p.image} alt="" />

            <h3>{p.name}</h3>

            <p>₹{p.price}</p>

          </div>

        ))}

      </div>

    </div>
  );
}