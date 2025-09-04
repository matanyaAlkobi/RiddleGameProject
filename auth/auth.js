import jwt from "jsonwebtoken";
import "dotenv/config";

export const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log("🔑 Incoming request to protected route");
  console.log("📦 Cookies received:", req.cookies);

  if (!token) {
    console.log("🚨 No token found in cookies");
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    console.log("🕵️ Verifying token...");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token verified successfully:", decoded);

    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
