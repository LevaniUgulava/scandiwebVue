const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Allow only requests from http://scandiweb12.000.pe
app.use((req, res, next) => {
  if (req.headers.origin === "http://scandiweb12.000.pe") {
    res.setHeader("Access-Control-Allow-Origin", "http://scandiweb12.000.pe");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200); // For preflight requests
    }
  }
  next();
});

// Proxy all requests to the Vercel app
app.use(
  "/",
  createProxyMiddleware({
    target: "https://scandiweb-vue.vercel.app", // Vercel URL
    changeOrigin: true,
    secure: true, // Ensures HTTPS to Vercel
  })
);

const PORT = 3000; // Or another port
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
