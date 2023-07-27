<h1 align = "center">Circle - a social media app</h1>

> An interactive social media web app offering unique and personalized experience.

## Features

- User Feed
- List all user posts
- Sort by Date & Trending
- Create a Post
- Like a post
- Edit & Delete Post
- User Profile
  - Add Avatar
  - Add Bio
  - Add Portfolio URL
- Follow/Unfollow
- Explore Feed
- Bookmark Post
- Authentication
- Sign-up
- Login
- Logout

## User Stories

1. User Feed
    - I can see a landing page with a list of user posts.
    - Sort & Filter by Date, Trending
      - Filter by Trending
        - I can filter posts by clicking on the "Trending" button which will show all the posts with the most likes.
      - Sort by Date
        - I can sort the posts by the date added/created.
2. Create a Post
    - I can create a post with a "+" button or "Create new post" button which will open a text box and will have a "Post" or "Submit" button.
3. Like a Post
    - I can give a heart or thumbs up to any post on the user feed.
4. Edit & Delete Post
    - Edit Post
      - I can click on the "Edit Post" button which will open the same component with the text box where we can edit a post & save it. I should be able to edit only my post.
    - Delete Post
      - I can click on the "Delete Post" button which will delete a post. I should be able to delete only my post.
5. User Profile
    - Choose from Avatar options to make profile picture
      - I can see a default avatar for the profile pic to show after Signup.
      - I can add a profile picture to the user profile by clicking on the edit profile and choosing from avatar options and save it by clicking on the save button.
      - I can see 6 to 7 avatar options for selection.
    - Bio
      - I can add a bio of the user by clicking on the edit profile option, where I can see a text box to add texts and save it by clicking on the save button.
    - Portfolio URL
      - I can add a portfolio url of the user by clicking on the edit profile option, where I can see a text box to add the URL of the profile and save it by clicking on the save button.
6. Follow/Unfollow
    - When I click the user profile, I can see a "Follow" button, if I click on it, I can follow the user.
    - If clicked again on the same button, I will "unfollow" the same user.
7. Explore Feed
    - When I click on Explore feed I can see all the posts, even of the people whom I don't follow.
8. Bookmark Post
    - For every post on the user feed, I can see a "Bookmark" option where I can bookmark a post which will add it to the bookmark list.
9. Sign-up Page
    - I can see a sign-up page from where I can sign-up using my email, first name, last name, user name, password & confirm password.
    - I can see a hide-show icon button that shows or hides my password.
10. Login Page
    - I can see a login page from where I can log in using my email & password.
11. Logout
    - I can see a logout button from where I can log out from the app on the header navbar.

## Tech stack used
- React JS
- React hooks
- React Context API and useReducer (for state management)
- React Router v6
- Vanilla CSS
- FontAwesome icons
- react-toastify

## Installing / Getting started
Please run following commands to setup and run project locally

```shell
$ git clone https://github.com/tejan-singh/social-media.git
$ cd social-media
$ npm i
$ npm start
```

## API reference
- [Mockbee](https://mockbee.netlify.app/docs/api/apps/social-media) - mock APIs used to develop the app
