
import { useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";

export default function CreatePost(){

  const [name,setName] = useState("");
  const [price,setPrice] = useState("");
  const [quality,setQuality] = useState("");
  const [contact,setContact] = useState("");
  const [area,setArea] = useState("");
  const [district,setDistrict] = useState("");
  const [state,setState] = useState("");
  const [image,setImage] = useState(null);
  const [crop,setCrop] = useState("");

  const token = localStorage.getItem("token");

  const createProduct = async (e) => {
    e.preventDefault();

    try{

      if(!image){
        alert("Please select image ❌");
        return;
      }

      if(!crop){
        alert("Please select crop ❌");
        return;
      }

      const formData = new FormData();

      formData.append("name",name);
      formData.append("price",price);
      formData.append("crop",crop);
      formData.append("quality",quality);
      formData.append("contact",contact);
      formData.append("area",area);
      formData.append("district",district);
      formData.append("state",state);
      formData.append("image",image);

      await api.post("/products",formData,{
        headers:{Authorization:`Bearer ${token}`}
      });

      alert("Product Created 🌾");
      window.location.href="/posts";

    }catch(err){
      console.log(err);
      alert("Upload failed");
    }
  };

  return(
    <>
      <Navbar/>

      {/* Center container */}
      <div className="container d-flex justify-content-center align-items-center mt-5">

        {/* Card */}
        <div className="card shadow p-4" style={{width:"450px"}}>

          <h3 className="text-center mb-4">Create Product</h3>

          <form onSubmit={createProduct}>

            {/* Product Name */}
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            </div>

            {/* Price */}
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
              />
            </div>

            {/* Crop */}
            <div className="mb-3">
              <label className="form-label">Select Crop</label>
              <select
                className="form-select"
                value={crop}
                onChange={(e)=>setCrop(e.target.value)}
              >
                <option value="">Select Crop</option>
                <option value="rice">Rice</option>
                <option value="wheat">Wheat</option>
                <option value="corn">Corn</option>
                <option value="seeds">Seeds</option>
                <option value="vegetables">Vegetables</option>
              </select>
            </div>

            {/* Quality */}
            <div className="mb-3">
              <label className="form-label">Quality</label>
              <input
                type="text"
                className="form-control"
                value={quality}
                onChange={(e)=>setQuality(e.target.value)}
              />
            </div>

            {/* Contact */}
            <div className="mb-3">
              <label className="form-label">Contact</label>
              <input
                type="text"
                className="form-control"
                value={contact}
                onChange={(e)=>setContact(e.target.value)}
              />
            </div>

            {/* Area */}
            <div className="mb-3">
              <label className="form-label">Area</label>
              <input
                type="text"
                className="form-control"
                value={area}
                onChange={(e)=>setArea(e.target.value)}
              />
            </div>

            {/* District */}
            <div className="mb-3">
              <label className="form-label">District</label>
              <input
                type="text"
                className="form-control"
                value={district}
                onChange={(e)=>setDistrict(e.target.value)}
              />
            </div>

            {/* State */}
            <div className="mb-3">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                value={state}
                onChange={(e)=>setState(e.target.value)}
              />
            </div>

            {/* Image */}
            <div className="mb-3">
              <label className="form-label">Upload Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e)=>setImage(e.target.files[0])}
              />
            </div>

            {/* Button */}
            <button type="submit" className=" createe-btn btn btn-success w-100">
              Create Post
            </button>

          </form>
        </div>
      </div>
    </>
  );
}