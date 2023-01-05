import { useRouter } from "next/router";
import { useState } from "react";
import { logout } from "../services/logout";
import { getProfile } from "../services/profile";
import styles from "../styles/main.module.scss";

const Dashboard = () => {
  const [user, setUser] = useState({
    email: "",
    username: "",
  });

  const router = useRouter();

  const handleGetProfile = async () => {
    const data = await getProfile();

    setUser(data.user);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className={styles.Dashboard}>
      <h1>Dashboard</h1>
      <button onClick={handleGetProfile}>Get Profile</button>
      {user.email !== "" && (
        <div className={styles.ProfileContent}>
          <h3>Profile</h3>
          <p>
            <b>Email:</b> {user.email}
          </p>
          <p>
            <b>Username: </b> {user.username}
          </p>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
