import React from "react";
import styles from "./Aside.module.css";
import { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { handleFollowUser } from "../utils/appUtils";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { useState } from "react";

const Aside = () => {
  const {
    appState: { suggestedUsers, loggedinUser, loading },
    dispatch,
    getAllUsers,
  } = useContext(AppContext);

  const [isRequested, setIsRequested] = useState(true);

  useEffect(() => {
    getAllUsers();
  }, [loggedinUser]);

  if (loading) return <Loader />;

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
            {suggestedUsers?.map(
              ({
                id,
                firstName,
                lastName,
                username,
                profilePic,
                _id,
                followers,
              }) => (
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

                  <p
                    className={styles.follow}
                    onClick={() =>
                      isRequested &&
                      handleFollowUser(dispatch, _id, setIsRequested)
                    }
                  >
                    Follow
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
