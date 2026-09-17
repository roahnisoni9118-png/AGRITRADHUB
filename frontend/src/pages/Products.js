import React,{useState} from "react";
import OrderForm from "../components/OrderForm";

const Products = () => {

const [showForm,setShowForm] = useState(false);

return(

<div>

<h2>Product</h2>

<p>Wheat Price ₹2000</p>

<button  onClick={()=>setShowForm(true)} >
Order Now
</button>

{showForm && <OrderForm />}

</div>

);

};

export default Products;