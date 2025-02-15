import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
  ];

  res.json(users);

});

router.get("/:id", (req, res) => {
  res.send(`user ${req.params.id}`);
});

router.post("/", (req, res) => {
  res.send("create user");
});

export default router;
