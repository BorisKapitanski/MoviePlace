import { useState, useContext } from "react";
import { Context } from "../../context/useContext";
import styles from "./login.module.css";

export const Login = ({
    onLogin
}) => {
    const { formError } = useContext(Context);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const onLoginInputChange = (e) => {
        setFormData((oldFormData) => ({ ...oldFormData, [e.target.name]: e.target.value }));
    }

    return (
        <div className={styles["login"]}>
            <h3>Login</h3>
            <form onSubmit={(e)=>onLogin(e, formData)}>
                {formError &&
                    <div className="error">
                        <p>{formError}</p>
                    </div>
                }
                <div>
                    <label>Email</label>
                    <input type="text" name="email" value={formData.email} onChange={onLoginInputChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={onLoginInputChange} />
                </div>
                <div >
                    <input className={styles["button"]} type="submit" value="Login" />
                </div>
            </form>
        </div>
    )
}