

const express = require("express");
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const { crop } = req.query;

    let filter = {};
    if (crop) {
      filter.crop = crop.toLowerCase();
    }

    const products = await Product.find(filter)
      .populate("farmer", "name email contact");

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET MY PRODUCTS
router.get("/mine", auth, async (req, res) => {
  try {
    if (req.user.role !== "farmer") {
      return res.status(403).json({ msg: "Only farmer allowed" });
    }

    const products = await Product.find({ farmer: req.user.id });
    res.json(products);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET SINGLE PRODUCT (IMPORTANT)
router.get("/:id", async (req, res) => {
  try {
    console.log("ID RECEIVED:", req.params.id);

    const product = await Product.findById(req.params.id)
      .populate("farmer", "name contact");

    console.log("FOUND PRODUCT:", product);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json(product);

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ADD PRODUCT
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {

    if (req.user.role !== "farmer") {
      return res.status(403).json({ msg: "Only farmer allowed" });
    }

    if (!req.file) {
      return res.status(400).json({ msg: "Image is required" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "agritrade_products",
    });

    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      crop: req.body.crop.toLowerCase(),
      image: result.secure_url,
      quality: req.body.quality || "",
      farmerName: req.body.farmerName || "",
      contact: req.body.contact || "",
      area: req.body.area || "",
      district: req.body.district || "",
      state: req.body.state || "",
      farmer: req.user.id,
    });

    res.json(product);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE PRODUCT
router.delete("/:id", auth, async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    if (product.farmer.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    await product.deleteOne();

    res.json({ msg: "Product deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;



