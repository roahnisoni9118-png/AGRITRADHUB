import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrderHistory from "./pages/OrderHistory";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PostsPage from "./pages/PostsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import Chatbot from "./components/Chatbot";
import FarmerOrders from "./pages/FarmerOrders";
import CropPage from "./pages/CropPage";
import ProductDetails from "./pages/ProductDetails";   // ✅ added

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/posts" element={<PostsPage />} />

        <Route path="/crops/:crop" element={<CropPage />} />

        <Route path="/product/:id" element={<ProductDetails />} />   {/* ✅ added */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/create" element={<CreatePost />} />
         
        <Route path="/orders" element={<OrderHistory />} />

        <Route path="/farmer-orders" element={<FarmerOrders/>}/>
        
      </Routes>

      <Chatbot/>

    </BrowserRouter>
  );
}

export default App;