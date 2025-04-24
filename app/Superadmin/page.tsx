'use client';
import Link from "next/link";
import { Inter, Roboto_Mono } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], weight: '400', variable: '--font-inter' });
const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: '400', variable: '--font-roboto-mono' });
import { useState } from "react";
import { useRouter } from "next/navigation";
export { inter, robotoMono };
const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email == "admin@gmail.com" && password == "admin123") {
      alert('login successful');
      localStorage.setItem("user", "superadmin");
      router.push("/Superadmin/Superadmindashboard");
    } else {
      alert("Invalid Credentials");
    }
  };
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
        </div>

        <div className="mt-10">
          <label htmlFor="emailOrMobile" className="text-gray-600">
            Email ID or Mobile Number <sup>*</sup>
          </label>{" "}
          <br />
          <input
            type="text"
            id="emailOrMobile"
            placeholder="Enter Email or Mobile Number"
            className="shadow-lg p-3 border border-gray-300 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="password" className="text-gray-600">
            Password <sup>*</sup>
          </label>{" "}
          <br />
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            className="shadow-lg p-3 border border-gray-300 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="btn" style={{ backgroundColor: "#DD2745", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", top: "20px" }}>
          <button className="text-white" onClick={handleSubmit}>SIGN IN</button>
        </div>
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

