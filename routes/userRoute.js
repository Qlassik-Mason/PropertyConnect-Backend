import express from "express";
import {
  buyProperty,
  cancelProperty,
  createUser,
  getAllProperties,
  getAllFavorites,
  toFav,
} from "../controllers/userCntrl.js";
import jwtCheck from "../config/auth0Config.js";
const router = express.Router();

router.post("/register",  createUser);
router.post("/buyproperty/:id", jwtCheck, buyProperty);
router.post("/allproperty", getAllProperties);
router.post("/cancelproperty/:id", jwtCheck, cancelProperty);
router.post("/toFav/:rid", jwtCheck, toFav);
router.post("/allFav/", jwtCheck, getAllFavorites);
export { router as userRoute };
