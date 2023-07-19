import React from "react";
import styles from "./Aside.module.css";
import { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { handleFollowUser, handleUnFollowUser } from "../utils/appUtils";
import { Link } from "react-router-dom";

const Aside = () => {
  const {
    appState: { allUsers, loggedinUser },
    dispatch,
    getAllUsers,
  } = useContext(AppContext);

  useEffect(() => {
    getAllUsers();
  }, [loggedinUser]);

  return (
    <aside className={styles.aside}>
      <div>
        <div className={styles.heading}>
          <p>
            <b>Who to follow ?</b>
          </p>
        </div>
        {
          <div className={styles["aside-container"]}>
            {allUsers.map(
              ({
                id,
                firstName,
                lastName,
                username,
                profilePic,
                _id,
                followers,
              }) =>
                loggedinUser.username !== username && (
                  <article className={styles.suggestions} key={id}>
                    <div className={styles["user-profile-details"]}>
                      <img
                        className={styles.profilePic}
                        src={profilePic}
                        alt=""
                      />
                      <Link
                        to={`/profile/${username}`}
                        className={styles["user-profile"]}
                      >
                        <p
                          className={styles.title}
                        >{`${firstName} ${lastName}`}</p>
                        <p className={styles.username}>{`@${username}`}</p>
                      </Link>
                    </div>

                    <p className={styles.follow}
                      onClick={
                        followers?.some(({ _id }) => _id === loggedinUser._id)
                          ? () => {
                              handleUnFollowUser(dispatch, _id);
                            }
                          : () => {
                              handleFollowUser(dispatch, _id);
                            }
                      }
                    >
                      {followers?.some(({ _id }) => _id === loggedinUser._id)
                        ? "Unfollow"
                        : "Follow"}
                    </p>
                  </article>
                )
            )}
          </div>
        }
      </div>
    </aside>
  );
};

export default Aside;
