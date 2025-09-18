// middleware/admin.js

import User from "../model/user.js";

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export default isAdmin;
