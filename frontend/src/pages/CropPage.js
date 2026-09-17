import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

export default function CropPage() {

  const { crop } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [crop]);

  const fetchPosts = async () => {
    try {
      const res = await api.get(`/products?crop=${crop.toLowerCase()}`);
      console.log("DATA:", res.data);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="crop-container">

      <h2 style={{ textTransform: "capitalize" }}>
        {crop} Crop
      </h2>

      {posts.length === 0 ? (
        <p>Sorry : No crops found 🌱</p>
      ) : (

        <div className="grid">

          {posts.map((post) => {

            console.log("IMAGE:", post.image);

            return (
              <div 
                className="card" 
                key={post._id}
                onClick={() => navigate(`/product/${post._id}`)} 
                style={{cursor:"pointer"}}
              >

                <img
                  src={post.image}
                  alt={post.name}
                  className="card-img"
                />

                <h3>{post.name}</h3>
                <p>₹{post.price}</p>

                {/* ✅ ONLY ADD THESE 2 LINES */}
                <p className="farmer">👨‍🌾 {post.farmer?.name}</p>

              </div>
            );
          })}

        </div>

      )}

    </div>
  );
}