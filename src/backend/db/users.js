import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: "72c4f0b5-8829-4b8e-b7b5-e13585eaa96a",
    firstName: "Adarsh",
    lastName: "Balika",
    email: "adarshbalika@neog.camp",
    username: "adarshbalika",
    password: "adarshBalika123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [
      { _id: "fe479b4a-1d1c-4b1d-8a6a-837b3f2907cb", username: "tejansingh" },
    ],
    following: [
      { _id: "fe479b4a-1d1c-4b1d-8a6a-837b3f2907cb", username: "tejansingh" },
    ],
  },
  {
    _id: "fe479b4a-1d1c-4b1d-8a6a-837b3f2907cb",
    firstName: "Tejan",
    lastName: "Singh",
    email: "tejan@gmail.com",
    username: "tejansingh",
    password: "tejansingh123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [
      { _id: "72c4f0b5-8829-4b8e-b7b5-e13585eaa96a", username: "adarshbalika" },
    ],
    following: [
      { _id: "72c4f0b5-8829-4b8e-b7b5-e13585eaa96a", username: "adarshbalika" },
    ],
  },
  {
    _id: "1fe94467-87ae-4dd3-b21c-c78eeff7981a",
    firstName: "Seedha",
    lastName: "Baalak",
    email: "test@gmail.com",
    username: "seedhaBaalak",
    password: "seedhaBaalak123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [],
    following: [],
  },
];
