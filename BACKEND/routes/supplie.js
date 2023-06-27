const { response } = require("express");
const router = require("express").Router();
const Supplie = require("../models/supplie");

// Add supplie
router.route("/add").post((req, res) => {
  const { name, email, idNo,  address, product } = req.body;

  const newSupplie = new Supplie({
    name,
    email,
    idNo,
    
    address,
    product
  });

  newSupplie
    .save()
    .then(() => {
      res.json("New Supplie Created");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to create supplie" });
    });
});

// View all supplie
router.route("/").get((req, res) => {
  Supplie.find()
    .then((supplie) => {
      res.json(supplie);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch supplie" });
    });
});

// Update supplie by id
router.route("/update/:id").put((req, res) => {
  const { name, email, idNo,  address, product } = req.body;
  const supplieId = req.params.id;

  Supplie.findByIdAndUpdate(
    supplieId,
    {
      $set: {
        name,
        email,
        idNo,
        address,
        product
      }
    },
    { new: true }
  )
    .then((updatedSupplie) =>
      res.json({
        success: true,
        message: "Supplie updated",
        updatedSupplie: updatedSupplie
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to update supplie" });
    });
});

// Delete Supplie by ID
router.route("/delete/:id").delete((req, res) => {
  const supplieId = req.params.id;

  Supplie.findByIdAndDelete(supplieId)
    .then(() => {
      res.json({ success: true, message: "Supplie deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to delete supplie" });
    });
});

// Get Supplie by idNo
router.route("/get/:idNo").get((req, res) => {
  const supplieIdNo = req.params.idNo;

  Supplie.findOne({ idNo: supplieIdNo })
    .then((supplie) => {
      if (!supplie) {
        return res.status(404).json({ error: "Supplie not found" });
      }
      res.json({ status: "Supplie fetched", supplie });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to get supplie" });
    });
});

// Search Supplie
router.get("/search/:searchInput", (req, res) => {
  const { searchInput } = req.params;

  Supplie.find({
    $or: [
      { name: { $regex: searchInput, $options: "i" } },
      { email: { $regex: searchInput, $options: "i" } },
      { idNo: { $regex: searchInput, $options: "i" } },
      { address: { $regex: searchInput, $options: "i" } },
      { product: { $regex: searchInput, $options: "i" } }
    ]
  })
    .then((supplie) => {
      res.json(supplie);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to search supplie" });
    });
});

module.exports = router;
