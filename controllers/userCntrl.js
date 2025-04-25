import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";


//create user
export const createUser = asyncHandler(async (req, res) => {
  

  const { name, email, image, buyProperty, date} = req.body.data;
  console.log(req.body.data);
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        image,
        buyProperty,
        date

      },
    });

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
    
  } catch (err) {
     // Basic input validation
    if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
   }else{
    console.error("Error creating user:", err);
    return res.status(500).json({ message: "Internal Server Error" });
   }
  }
});




// function to buy a property
export const buyProperty = asyncHandler(async (req, res) => {
  const { email} = req.body.data;
  const { id } = req.params.id;

  try {
    const alreadybought = await prisma.user.findFirst({
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


