
import {useEffect,useState} from "react";
import api from "../api";
import Navbar from "../components/Navbar";

export default function FarmerOrders(){

const [orders,setOrders] = useState([]);

useEffect(()=>{
loadOrders();
// eslint-disable-next-line
},[]);

const loadOrders = async()=>{

const res = await api.get("/orders/farmer"); // ✅ FIX

setOrders(res.data);

};

const updateStatus = async(id,status)=>{

await api.put(
`/orders/${id}/status`, // ✅ FIX
{status}
);

loadOrders();

};

return(

<>

<Navbar/>

<div className="page">

<h2>Farmer Orders</h2>

{orders.map(o=>(

<div className="card" key={o._id}>

<h3>{o.product?.name}</h3>

<p>Quantity: {o.quantity}</p>

<p>Merchant: {o.merchant?.name}</p>

<p>Status: {o.status}</p>

<button
className="btn"
onClick={()=>updateStatus(o._id,"Accepted")} 
>
Accept
</button>

<button
className="btn secondary"
onClick={()=>updateStatus(o._id,"Delivered")} 
>
Delivered
</button>

</div>

))}

</div>

</>

);

}