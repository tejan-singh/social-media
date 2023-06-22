import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    email: "adarshbalika@neog.camp",
    username: "adarshbalika",
    password: "adarshBalika123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Tejan",
    lastName: "Singh",
    email: "test@gmail.com",
    username: "tejansingh",
    password: "tejansingh123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
