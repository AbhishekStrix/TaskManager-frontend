import "../styles/Sign.css";
import { useState } from "react";
import { Link } from "react-router-dom";


const SignUpPage = () => {
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/users/register", {
                method: "POST",
                body: JSON.stringify({ email, fullName, otp: e.target.otp.value, password }),
                headers: { "Content-Type": "application/json" },
            });

            const respObj = await resp.json();
            if (respObj.status === "success") {
                alert("Registration Successful!");
            } else {
                alert(respObj.message);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/otps", {
                method: "POST",
                body: JSON.stringify({ email: e.target.userEmail.value }),
                headers: { "Content-Type": "application/json" },
            });

            const respObj = await resp.json();
            if (respObj.status === "success") {
                setIsOtpSent(true);
                setFullName(e.target.fullName.value);
                setEmail(e.target.userEmail.value);
            } else {
                alert("Error " + respObj.message);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="container">
            <h1>{isOtpSent ? "Complete Registration" : "Sign Up"}</h1>
            {isOtpSent ? (
                <form onSubmit={handleRegister}>
                    <input type="text" value={email} readOnly />
                    <input type="text" value={fullName} readOnly />
                    <input type="text" name="otp" placeholder="OTP" required />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Register</button>
                </form>
            ) : (
                <form onSubmit={handleSendOtp}>
                    <input type="text" name="fullName" placeholder="Full Name" required />
                    <input type="email" name="userEmail" placeholder="Email" required />
                    <button type="submit">Send OTP</button>
                </form>
            )}
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default SignUpPage;
