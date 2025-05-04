'use client'
import React from 'react';
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginVendorAct } from "../actions/loginvendoract";
import { useActionState } from "react";
import { toast } from 'react-hot-toast';
import { sendOtp } from "../actions/otpVerifyVendor";

const initialState = {
  success: false,
  error: ''
};



const Login: React.FC = () => {
  const router = useRouter();
  const [state, formAction] = useActionState(LoginVendorAct, initialState);
  const [otp, setOtp] = useState("");
  const [otp11, setOtp11] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
 const [user, setUser] = useState<any>({});
  const handleSendOtp = async () => {
    if (!email || !password) {
      toast.error("Please fill all the required fields");
      return;
    }
    let response = await sendOtp(email,password);
    setOtp11(response?.otp);
    if (response.error) {
      toast.error(response.error);
      return;
    }
    if (response.success) {
      toast.success("OTP sent successfully");
     setUser(response.user);
      setOtpSent(true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp == otp11) {
      localStorage.setItem("user", "vendor")
      localStorage.setItem("email", user.email)
      localStorage.setItem("name", user.name)
      localStorage.setItem('id', user.id)
        router.push("/Vendor/Vendordashboard")
    } else {
      toast.error("OTP is not correct");
    }
  };


  useEffect(() => {
    const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (user == 'vendor') {
      router.push("/Vendor/Vendordashboard");
    }
  }, []);

  return (
    <>
      <div className="w-full border border-gray-500 h-13 text-center">
        <img
          src="/images/igp.png"
          alt=""
          className="w-20 absolute top-1/22 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
        <img
          src="https://cdn.igp.com/raw/upload/assets/svg-icons/rebrand-login-ill.svg"
          alt=""
          width="100%"
        />
      </div>

      <div className="p-12 absolute top-90 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg w-130 h-auto">
        <div>
          <h1 className="text-2xl inter">Sign in</h1>
          <p>
            Don't have an account?{" "}
            <span className="text-blue-600 relative left-2.5 font-bold">
              <Link href="/Vendor/signup">Sign up</Link>
            </span>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-10">
          <div className="flex flex-col mb-4">
            <label htmlFor="emailOrMobile" className="text-gray-600">
              Email ID or Mobile Number <sup>*</sup>
            </label>
            <input
              type="text"
              name="email"
              id="emailOrMobile"
              placeholder="Enter Email"
              className="shadow-lg p-3 border border-gray-300 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="password" className="text-gray-600">
              Password <sup>*</sup>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              className="shadow-lg p-3 border border-gray-300 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {otpSent && (
            <div className="flex flex-col mb-4">
              <label htmlFor="otp" className="text-gray-600">
                OTP <sup>*</sup>
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="Enter OTP"
                className="shadow-lg p-3 border border-gray-300 w-full"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          )}
          {!otpSent ? (
            <div
              className="btn"
              style={{
                backgroundColor: "#DD2745",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                top: "20px"
              }}
            >
              <button type="button" className="text-white" onClick={handleSendOtp}>
                SEND OTP
              </button>
            </div>
          ) : (
            <div
              className="btn"
              style={{
                backgroundColor: "#DD2745",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                top: "20px"
              }}
            >
              <button type="submit" className="text-white">SIGN IN</button>
            </div>
          )}
        </form>

        {state.error && (
          <p className="text-red-500 mt-4">{state.error}</p>
        )}

        <div className="relative flex justify-end top-7">
          <p className="text-gray-500">Forgot Password ?</p>
        </div>
        <br />
        <br />
      </div>
    </>
  );
}

export default Login;

