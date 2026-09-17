const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const transporter = require("../config/mailer");

const router = express.Router();

/* =========================
   CREATE ORDER
========================= */
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "merchant") {
      return res.status(403).json({ msg: "Only merchant allowed" });
    }

    const { productId, quantity, name, phone, address } = req.body;
    const qty = quantity || 1;

    const product = await Product.findById(productId).populate("farmer");

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const order = await Order.create({
      product: product._id,
      merchant: req.user.id,
      farmer: product.farmer._id,
      quantity: qty,
      name,
      phone,
      address
    });

    // EMAIL
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: product.farmer.email,
        subject: "New Order Received 🌾",
        text: `Hello ${product.farmer.name}

Product: ${product.name}
Quantity: ${qty}

Customer: ${name}
Phone: ${phone}
Address: ${address}`
      });
    } catch (e) {
      console.log("Email error:", e.message);
    }

    res.json(order);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   MERCHANT ORDERS
========================= */
router.get("/my", auth, async (req, res) => {
  try {
    if (req.user.role !== "merchant") {
      return res.status(403).json({ msg: "Only merchant allowed" });
    }

    const orders = await Order.find({ merchant: req.user.id })
      .populate("product")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   FARMER ORDERS (MISSING FIX)
========================= */
router.get("/farmer", auth, async (req, res) => {
  try {
    if (req.user.role !== "farmer") {
      return res.status(403).json({ msg: "Only farmer allowed" });
    }

    const orders = await Order.find({ farmer: req.user.id })
      .populate("product")
      .populate("merchant")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   UPDATE STATUS (FIXED)
========================= */
router.put("/:id/status", auth, async (req, res) => {
  try {
    if (req.user.role !== "farmer") {
      return res.status(403).json({ msg: "Only farmer allowed" });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    order.status = req.body.status;
    await order.save();

    res.json(order);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;