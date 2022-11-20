const express = require("express");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies["ACCESS_TOKEN"];
  if (!token)
    return res.status(403).json({
      msg: "Please provide valid token",
    });

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(400).json(err.message);
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = verifyToken;
