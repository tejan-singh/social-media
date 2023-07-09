import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
      "I'm unpredictable, I never know where I'm going until I get there, I'm so random, I'm always growing, learning, changing, I'm never the same person twice. But one thing you can be sure of about me; is I will always do exactly what I want to do.",
    likes: {
      likeCount: 1,
      likedBy: [
        { _id: "fe479b4a-1d1c-4b1d-8a6a-837b3f2907cb", username: "tejansingh" },
      ],
      dislikedBy: [],
    },
    username: "adarshbalika",
    createdAt: "2023-03-14T10:12:12+05:30",
    updatedAt: "2023-07-15T10:12:12+05:30",
  },
  {
    _id: uuid(),
    content:
      "But that was life: Nobody got a guided tour to their own theme park. You had to hop on the rides as they presented themselves, never knowing whether you would like the one you were in line for...or if the bastard was going to make you throw up your corn dog and your cotton candy all over the place.",
    likes: {
      likeCount: 2,
      likedBy: [
        { _id: "fe479b4a-1d1c-4b1d-8a6a-837b3f2907cb", username: "tejansingh" },
        {
          _id: "72c4f0b5-8829-4b8e-b7b5-e13585eaa96a",
          username: "adarshbalika",
        },
      ],
      dislikedBy: [],
    },
    username: "tejansingh",
    createdAt: "2023-01-25T10:38:12+05:30",
    updatedAt: "2023-07-16T18:11:33+05:30",
  },
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "seedhaBaalak",
    createdAt: "2023-02-10T09:30:12+05:30",
    updatedAt: "2023-05-16T18:11:01+05:30",
  },
  {
    _id: uuid(),
    content: "I would rather be strong at heart than strong at mind",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    createdAt: "2023-02-10T09:30:12+05:30",
    updatedAt: "2023-07-21T18:11:01+05:30",
  },
  {
    _id: uuid(),
    content:
      "I walked and walked, sometimes with an objective- a friend's house, a shop, the church or school- but mostly at random, to outrun oppression.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "tejansingh",
    createdAt: "2023-02-10T09:30:12+05:30",
    updatedAt: "2023-07-22T18:11:01+05:30",
  },
];
