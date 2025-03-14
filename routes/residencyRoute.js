import express from "express";
import { createProperty, getAllProperties, getProperty, getPropertyByCity, getPropertyByCountry, getPropertyBYPrice } from "../controllers/resdCntrl.js";
import jwtCheck from "../config/auth0Config.js";
const router = express.Router();

router.post("/create",  createProperty)
router.get("/allproperty", getAllProperties)
router.get("/:id", getProperty)
router.get("/city", getPropertyByCity)
router.get("/price", getPropertyBYPrice)
router.get("/country", getPropertyByCountry)
export {router as PropertyRoute}