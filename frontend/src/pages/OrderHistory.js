import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";

export default function OrderHistory() {

const [orders,setOrders] = useState([]);

useEffect(()=>{
loadOrders();
},[]);

const loadOrders = async ()=>{

try{

const res = await api.get("/orders/my"); // ✅ FIX

setOrders(res.data);

}catch(err){

console.log(err);

}

};

return(

<>
<Navbar/>

<div className="page">

<h2>📦 My Orders</h2>

{orders.length===0 && (

<div className="empty-box">
<h3>No Orders Yet</h3>
<p>Browse products and place your first order</p>
</div>

)}

<div className="grid">

{orders.map(o=>(

<div className="card" key={o._id}>

<img src={o.product?.image} alt="" />

<h3>{o.product?.name}</h3>

<p>Price: ₹{o.product?.price}</p>

<p>Quantity: {o.quantity}</p>

<p className="order-date">
{new Date(o.createdAt).toLocaleString()}
</p>

</div>

))}

</div>

</div>

</>

);

}