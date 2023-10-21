import React, { useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

export const Register = (props) => {
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otp, setOtp] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: email,
            password: pass,
        };

        // Make the API call
        fetch("http://localhost:3001/api/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json()) // Parse the response as JSON
            .then((data) => {
                if (data.message == "OTP Sent to registered mail") {
                    window.alert(data.message);
                    setShowOtpInput(true);
                } else {
                    window.alert("Email Already In Use");
                }
            })
            .catch((error) => {
                window.alert("Email Already In Use");
                console.log("Error:", error);
            });
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: email,
            otp: otp,
        };

        // Make the API call to verify the entered OTP
        fetch("http://localhost:3001/api/user/signup/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json()) // Parse the response as JSON
            .then((data) => {
                if (data.message === "User Registration Successfull!") {
                    Cookies.set("userId", data.data.id, { expires: 1 });
                    window.alert(data.message);
                    nav("/dashboard");
                } else {
                    console.log("Error:", data.message);
                }
            })
            .catch((error) => {
                window.alert('Wrong Or Expired OTP');
                console.log("Error:", error);
            });
    };

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            {!showOtpInput ? (
                <form className="register-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="youremail@gmail.com"
                        id="email"
                        name="email"
                        required
                    />
                    <label htmlFor="password">New Password</label>
                    <input
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        type="password"
                        placeholder="********"
                        id="password"
                        name="password"
                        required
                    />
                    <button type="submit">Register</button>
                </form>
            ) : (
                    <form className="otp-form" onSubmit={handleOtpSubmit}>
                        <label htmlFor="otp">Enter OTP</label>
                        <input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            type="text"
                            placeholder="OTP"
                            id="otp"
                            name="otp"
                            required
                        />
                        <button type="submit">Submit</button>
                    </form>
                )}
            <Link to="/login">Go to Login</Link>
        </div>
    );
};
