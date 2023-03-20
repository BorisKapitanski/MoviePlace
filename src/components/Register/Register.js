import styles from "./register.module.css";
import { useState } from "react"

export const Register = ({
    onRegister,
    formError,
}) => {
    const [userForm, setUserForm] = useState({
        email: "",
        password: "",
        repeatPassword: "",
    });

    const onUserInfoChange = (e) => {
        setUserForm((oldUserForm) => ({ ...oldUserForm, [e.target.name]: e.target.value }));
    }

    return (
        <div className={styles["register"]}>
            <h3>Register</h3>
            <form onSubmit={(e) => onRegister(e, userForm)}>

                {formError &&
                    <div className="error">
                        <p>{formError}</p>
                    </div>
                }

                <div >
                    <label>Email</label>
                    <input type="text" name="email" value={userForm.email} onChange={onUserInfoChange} />
                </div>
                <div >
                    <label>Password</label>
                    <input type="password" name="password" value={userForm.password} onChange={onUserInfoChange} />
                </div >
                <div>
                    <label>Repeat Password</label>
                    <input type="password" name="repeatPassword" value={userForm.repeatPassword} onChange={onUserInfoChange} />
                </div >
                <div>
                    <input className={styles["button"]} type="submit" value="Register" />
                </div >
            </form >
        </div >
    )
}