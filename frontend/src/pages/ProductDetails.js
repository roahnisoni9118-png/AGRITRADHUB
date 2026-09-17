
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

export default function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [showReviewBox, setShowReviewBox] = useState(false);

  const [orderBox, setOrderBox] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  // ✅ IMPORTANT
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchProduct();
    loadReviews();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadReviews = async () => {
    try {
      const res = await api.get(`/reviews/${id}`);
      setReviews(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ OWNER CHECK
  const isOwner =
    product?.farmer?._id?.toString() === userId?.toString();

  // ✅ DEBUG LOGS (🔥 VERY IMPORTANT)
  useEffect(() => {
    if (product) {
      console.log("USER ID:", userId);
      console.log("FARMER ID:", product?.farmer?._id);
      console.log("ROLE:", role);
    }
  }, [product]);

  // ✅ DELETE FUNCTION
  const handleDelete = async () => {
    try {
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Product deleted");
      window.location.href = "/";
    } catch (err) {
      alert("Delete failed");
    }
  };

  // REVIEW
  const submitReview = async () => {
    try {
      await api.post(
        "/reviews",
        { productId: id, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Review added");
      setComment("");
      loadReviews();

    } catch {
      alert("Review failed");
    }
  };

  // ORDER
  const submitOrder = async () => {
    try {
      await api.post(
        "/orders",
        {
          productId: id,
          quantity,
          name,
          phone,
          address
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order placed");
      setOrderBox(false);

    } catch {
      alert("Order failed");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="details-page">

      <img src={product.image} alt="" className="details-img" />
      <h2>{product.name}</h2>

      <p><b>Price:</b> ₹{product.price}</p>
      <p><b>Quality:</b> {product.quality}</p>

      {/* ✅ BUTTONS */}
      <div style={{ marginTop: 15 }}>

        {/* Merchant buttons */}
        {role === "merchant" && (
          <button onClick={() => setOrderBox(true)}>Buy</button>
        )}

        {role === "merchant" && (
          <button onClick={() => setShowReviewBox(!showReviewBox)}>
            Review
          </button>
        )}

        {/* ✅ Farmer Owner Buttons */}
        {role === "farmer" && isOwner && (
          <>
            
            <button onClick={handleDelete}>Delete</button>
          </>
        )}

      </div>

      {/* REVIEW BOX */}
      {showReviewBox && role === "merchant" && (
        <div>
          <h3>Add Review</h3>

          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="5">⭐⭐⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="2">⭐⭐</option>
            <option value="1">⭐</option>
          </select>

          <br /><br />

          <textarea
            placeholder="Write review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <br /><br />

          <button onClick={submitReview}>Submit</button>
        </div>
      )}

      {/* REVIEWS */}
      <h3>Reviews</h3>

      {reviews.length === 0 ? (
        <p>No reviews</p>
      ) : (
        reviews.map((r) => (
          <p key={r._id}>⭐ {r.rating} - {r.comment}</p>
        ))
      )}

      {/* FARMER DETAILS */}
      <h3>Farmer Details</h3>

      <p>Name: {product.farmer?.name}</p>
      <p>Contact: {product.farmer?.contact}</p>
      <p>Area: {product.area}</p>
      <p>District: {product.district}</p>
      <p>State: {product.state}</p>

      {/* ORDER POPUP */}
      {orderBox && (
        <div className="popup">
          <h3>Place Order</h3>

          <input
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <br /><br />

          <input
            placeholder="Enter Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <br /><br />

          <input
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <br /><br />

          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <br /><br />

          <button onClick={submitOrder}>Submit</button>
          <button onClick={() => setOrderBox(false)}>Cancel</button>

        </div>
      )}

    </div>
  );
}