const express = require("express");
const router = express.Router();
const Car = require("../models/car");

// INDEX
router.get("/", async (req, res) => {
    const cars = await Car.find();
    console.log("Cars in DB:", cars);
    res.render("cars/view.ejs", { cars });
});

// NEW
router.get("/new", (req, res) => {
    res.render("cars/new.ejs");
});

// CREATE
router.post("/", async (req, res) => {
    console.log("Incoming form data:", req.body);
    req.body.isFavorite = req.body.isFavorite === "on";
    await Car.create(req.body);
    res.redirect("/cars");
});

// SHOW
router.get("/:id", async (req, res) => {
    const car = await Car.findById(req.params.id);
    res.render("cars/show.ejs", { car });
});

// DELETE
router.delete("/:id", async (req, res) => {
    await Car.findByIdAndDelete(req.params.id);
    res.redirect("/cars");
});

// EDIT
router.get("/:id/edit", async (req, res) => {
    const car = await Car.findById(req.params.id);
    res.render("cars/edit.ejs", { car });
});

// UPDATE
router.put("/:id", async (req, res) => {
    req.body.isFavorite = req.body.isFavorite === "on";
    await Car.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/cars/${req.params.id}`);
});

module.exports = router;
