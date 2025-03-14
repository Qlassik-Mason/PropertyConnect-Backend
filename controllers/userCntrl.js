import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";


//create user
export const createUser = asyncHandler(async (req, res) => {
  

  let { name, email, image, buyProperty, favPropertyID} = req.body;

  console.log("creating a user");

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        image,
        buyProperty,
        favPropertyID,
        
      },
    });

    res.send({ message: "User created successfully", user });
  } catch (err) {
    
      throw new Error(err.message);
    
  }
});

// function to buy a property
export const buyProperty = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadybought = await prisma.user.findUnique({
      where: { email },
      select: { buyProperty: true },
    });

    if (alreadybought.buyProperty.some((property) => property.id === id)) {
      res
        .status(400)
        .json({ message: "This property is already sold" });
    } else {
      await prisma.user.update({
        where: { email: email },
        data: {
          buyProperty: { push: { id, date } },
        },
      });
      res.send("your property purchase has been added successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// funtion to get all properties of a user
export const getAllProperties = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const properties = await prisma.user.findUnique({
      where: { email },
      select: { buyProperty: true },
    });
    res.status(200).send(properties);
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to cancel property transact
export const cancelProperty = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { buyProperty: true },
    });

    const index = user.buyProperty.findIndex((property) => property.id === id);

    if (index === -1) {
      res.status(404).json({ message: "property not found" });
    } else {
      user.buyProperty.splice(index, 1);
      await prisma.user.update({
        where: { email },
        data: {
          buyProperty: user.buyProperty,
        },
      });

      res.send("property cancelled successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to add a property in favourite list of a user
export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user.favPropertyID.includes(rid)) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favPropertyID: {
            set: user.favPropertyID.filter((id) => id !== rid),
          },
        },
      });

      res.send({ message: "Removed from favorites", user: updateUser });
    } else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favPropertyID: {
            push: rid,
          },
        },
      });
      res.send({ message: "Updated favorites", user: updateUser });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to get all favorites
export const getAllFavorites = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const favResd = await prisma.user.findUnique({
      where: { email },
      select: { favPropertyID: true },
    });
    res.status(200).send(favResd);
  } catch (err) {
    throw new Error(err.message);
  }
});
