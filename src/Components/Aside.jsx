import React from "react";
import styles from "./Aside.module.css";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { handleFollowUser, handleUnFollowUser } from "../utils/appUtils";

const Aside = () => {
  const {
    appState: { allUsers, loggedinUser },
    dispatch,
  } = useContext(AppContext);

  // const isFollowing = allUsers?.some(({ following }) =>
  //   following.map(({ _id }) => _id === loggedinUser._id)
  // );
  // console.log(isFollowing);
  return (
    <aside className={styles.aside}>
      <div>
        <div className={styles.heading}>
          <p>
            <b>Who to follow ?</b>
          </p>
        </div>
        <div className={styles["aside-container"]}>
          {allUsers.map(
            ({
              id,
              firstName,
              lastName,
              username,
              profilePic,
              _id,
              following,
            }) =>
              loggedinUser.username !== username && (
                <article className={styles.suggestions} key={id}>
                  <img src={profilePic} alt="" />
                  <div>
                    <p className={styles.title}>{`${firstName} ${lastName}`}</p>
                    <p className={styles.username}>{`@${username}`}</p>
                  </div>
                  <button
                    onClick={
                      following?.some(({ _id }) => _id === loggedinUser._id)
                        ? () => {
                            handleUnFollowUser(dispatch, _id);
                          }
                        : () => {
                            handleFollowUser(dispatch, _id);
                          }
                    }
                  >
                    {following?.some(({ _id }) => _id === loggedinUser._id) ? "Unfollow" : "Follow"}
                  </button>
                </article>
              )
          )}
        </div>
      </div>
    </aside>
  );
};

export default Aside;
