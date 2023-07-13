import React from "react";
import styles from "./Aside.module.css";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

const Aside = () => {
  const {
    appState: { allUsers, loggedinUser },
  } = useContext(AppContext);

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
            ({ id, firstName, lastName, username, profilePic }) =>
              loggedinUser.username !== username && (
                <article className={styles.suggestions} key={id}>
                  <img src={profilePic} alt="" />
                  <div>
                    <p className={styles.title}>{`${firstName} ${lastName}`}</p>
                    <p className={styles.username}>{`@${username}`}</p>
                  </div>
                  <button>Follow</button>
                </article>
              )
          )}
        </div>
      </div>
    </aside>
  );
};

export default Aside;
