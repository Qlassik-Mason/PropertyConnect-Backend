import express from "express";
import {
  buyProperty,
  cancelProperty,
  createUser,
  getAllProperties,
} from "../controllers/userCntrl.js";
import jwtCheck from "../config/auth0Config.js";
const router = express.Router();

router.post("/register",  createUser);
router.post("/buyproperty/:id", jwtCheck, buyProperty);
router.post("/allproperty", getAllProperties);
router.post("/cancelproperty/:id", jwtCheck, cancelProperty);
export { router as userRoute };
