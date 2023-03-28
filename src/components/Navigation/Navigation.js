import styles from "./navigation.module.css";

import { Link } from "react-router-dom";


import { Wheather } from "../Wheather/Wheather";
export const Navigation = ({
    user,
    onLogout,
}) => {


    return (
        <header>
            <div className={styles["nav"]}>
                <div className={styles["logo"]}>
                    <Link to={"/"}>Movie <span>Place</span></Link>
                    
                </div>
                
                <Wheather />

                <nav>
                    <ul>

                        <li><Link to={"/"}>Home</Link></li>
                        <li><Link to={"/movies"}>Movies</Link></li>
                        {user && <>
                            <li><Link to={"/add-movie"}>Add Movie</Link></li>
                            <li><Link onClick={onLogout}>Logout</Link></li>
                        </>
                        }
                        {!user && <>
                            <li><Link to={"/login"}>Login</Link></li>
                            <li><Link to={"/register"}>Register</Link></li>
                        </>
                        }
                        <span>Welcome, {user ? user.email : "Guest"}!</span>

                    </ul>
                </nav>
            </div>
            
        </header>
    )
}