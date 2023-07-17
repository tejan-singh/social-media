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
    profilePic: "https://i.postimg.cc/26V87hJ5/female-avatar.jpg",
    bio: "Web Deb Student",
    portfolio: "https://adarshbalika.netlify.app/",
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
    profilePic: "https://i.postimg.cc/8z6Rtf2t/50990883.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "Frontend Developer",
    portfolio: "https://tejansingh.netlify.app/",
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
    profilePic:
      "https://i.postimg.cc/zfLGnT4G/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "Social media influencer",
    portfolio: "https://bootstrapmade.com/demo/DevFolio/",
    followers: [],
    following: [],
  },
  {
    _id: "ebhtffhg6c",
    firstName: "Jane",
    lastName: "Doe",
    username: "janeDoe",
    password: "jane#123",
    bio: "Let's create beautiful memories together! 📷🌟",
    profilePic:
      "https://i.postimg.cc/WztC13dG/photo-1685903772095-f07172808761.jpg",
    website: "https://jane.app/",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [],
    following: [],
  },
  {
    _id: "ebhtffh",
    firstName: "Amelia",
    lastName: "Jhonshon",
    username: "amelia",
    password: "amelia@69",
    bio: "Believer in kindness, gratitude, and the power of a genuine smile 😄❤️",
    profilePic:
      "https://i.postimg.cc/X7P3dM3N/photo-1568822617270-2c1579f8dfe2-ixlib-rb-4-0.jpg",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [],
    following: [],
  },
  {
    _id: "tffhg6c",
    firstName: "David",
    lastName: "Jhons",
    username: "david",
    password: "david@123#",
    bio: "not interested in writing bio😌",
    profilePic:
      "https://i.postimg.cc/tJhPPdnp/photo-1633332755192-727a05c4013d-ixlib-rb-4-0.jpg",
    website: "https://david.ncifcrf.gov/",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [],
    following: [],
  },
];
