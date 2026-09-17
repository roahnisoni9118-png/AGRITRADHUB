import React, { useState } from "react";

const OrderForm = ({ productId }) => {

const [form,setForm] = useState({
name:"",
phone:"",
address:"",
quantity:1
});

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleSubmit = (e)=>{
e.preventDefault();
alert("Order Successful");
};

return (

<div style={{border:"2px solid black",padding:"20px",marginTop:"20px"}}>

<h2>Order Form</h2>

<form onSubmit={handleSubmit}>

<input
name="name"
placeholder="Name"
onChange={handleChange}
/>

<br/><br/>

<input
name="phone"
placeholder="Phone"
/>

<br/><br/>

<input
name="address"
placeholder="Address"
/>

<br/><br/>

<input
name="quantity"
type="number"
placeholder="Quantity"
/>

<br/><br/>

<button type="submit">Submit Order</button>

</form>

</div>

);

};

export default OrderForm;