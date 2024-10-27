const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Enable CORS for requests from your Vercel app
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://scandiweb-vue.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  // If this is a preflight request, respond with 200 OK
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Forward all requests to the Vercel app
app.use(
  "/",
  createProxyMiddleware({
    target: "https://scandiweb-vue.vercel.app",
    changeOrigin: true,
    secure: true,
  })
);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
