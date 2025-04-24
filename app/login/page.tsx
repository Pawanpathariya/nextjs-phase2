import Link from "next/link";
import { Inter, Roboto_Mono } from 'next/font/google';
import { FaFacebook, FaGoogle, FaGithub } from 'react-icons/fa';

const inter = Inter({ subsets: ['latin'], weight: '400', variable: '--font-inter' });
const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: '400', variable: '--font-roboto-mono' });

export { inter, robotoMono };

const Login: React.FC = () => {
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
              <Link href="/signup">Sign up</Link>
            </span>
          </p>
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
          />
        </div>

        <div className="btn" style={{ backgroundColor: "#DD2745", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", top: "20px" }}>
          <button className="text-white">SIGN IN</button>
        </div>
        <div className="relative flex justify-end top-7">
          <p className="text-gray-500">Forgot Password ?</p>
        </div>
        <br />
        <br />
        <div className="flex justify-center items-center gap-3">
          <div className="w-41 h-1 bg-gray-300"></div>
          <h1>or Sign in</h1>
          <div className="w-41 h-1 bg-gray-300"></div>
        </div>

        <div className="flex gap-10 justify-center items-center mt-3">
          <button className="w-30 p-2 h-8 border border-gray-300 bg-white text-gray-900 flex justify-center items-center hover:bg-gray-100">
            <FaGithub className="text-xl text-gray-800" /> GitHub
          </button>
          <button className="w-30 p-2 h-8 border border-gray-300 bg-white text-gray-900 flex justify-center items-center hover:bg-gray-100">
            <FaGoogle className="text-xl text-red-600" /> Google
          </button>
          <button className="w-30 p-2 h-8 border border-gray-300 bg-white text-gray-900 flex justify-center items-center hover:bg-gray-100">
            <FaFacebook className="text-xl text-blue-600" /> Facebook
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;

