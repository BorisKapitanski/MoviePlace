import styles from "./login.module.css";

export const Login = () => {
    return (
        <div className={styles["login"]}>
            <h3>Login</h3>
            <form>
                <div className="error">
                    <p>Title is required!</p>
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" name="email" />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" />
                </div>
                <div >
                    <input className={styles["button"]} type="submit" value="Login" />
                </div>
            </form>
        </div>
    )
}