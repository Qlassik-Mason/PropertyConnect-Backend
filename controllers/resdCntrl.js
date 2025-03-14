
import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createProperty = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    city,
    country,
    image,
    property_type 
  
  } = req.body.data;

  console.log(req.body.data);
  try {
    const property = await prisma.property.create({
      data: {
        title,
        description,
        price,
        address,
        city,
        country,
        image,
        property_type 
        
      },
    });

    res.send({ message: "property created successfully", property });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("property not created");
    }
    throw new Error(err.message);
  }
});

// function to get all the documents/Properties
export const getAllProperties = asyncHandler(async (req, res) => {
  const properties = await prisma.property.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(properties);
});

// function to get a specific document/residency
export const getProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const property = await prisma.property.findUnique({
      where: { id },
    });
    res.send(property);
  } catch (err) {
    throw new Error(err.message);
  }
});


// function to get property by city
export const getPropertyByCity = asyncHandler(async (req, res) => {
  const { city } = req.params;

  try {
    const property = await prisma.property.findMany({
      where: { city },
    });
    res.send(property);
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to get a property by price
export const getPropertyBYPrice = asyncHandler(async (req, res) => {
  const { price } = req.params;

  try {
    const property = await prisma.property.findMany({
      where: {price },
    });
    res.send(property);
  } catch (err) {
    throw new Error(err.message);
  }
});


// function to get a property by country
export const getPropertyByCountry = asyncHandler(async (req, res) => {
  const { country} = req.params;

  try {
    const property = await prisma.property.findMany({
      where: { country },
    });
    res.send(property);
  } catch (err) {
    throw new Error(err.message);
  }
});

