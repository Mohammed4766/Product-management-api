const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let products = [
  { id: 1, name: 'iPhone', price: 3000 },
  { id: 2, name: 'Galaxy', price: 2500 },
  { id: 3, name: 'Pixel', price: 2000 }
];

app.get("/Api/product", (req, res) => {
  res.json(products);
});

app.get("/Api/product/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === parseInt(id));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

app.post("/Api/product", (req, res) => {
  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name: req.body.name,
    price: req.body.price
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put("/Api/product/:id", (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

app.delete("/Api/product/:id", (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  products.splice(index, 1);
  res.json({ message: "Product deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
