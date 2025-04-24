'use client'
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Inter, Roboto_Mono } from 'next/font/google';
import { LoginAdminAct } from "../actions/loginAdminAct";
import { useActionState } from "react";

const inter = Inter({ subsets: ['latin'], weight: '400', variable: '--font-inter' });
const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: '400', variable: '--font-roboto-mono' });

const initialState = {
  success: false,
  error: ''
};

export { inter, robotoMono };

const Login: React.FC = () => {
  const router = useRouter();
  const [state, formAction] = useActionState(LoginAdminAct, initialState);

  
  useEffect(() => {
    if (state.success) {
      console.log(state.admin);
      localStorage.setItem("user","admin")
      localStorage.setItem("email",state.admin.email)
      localStorage.setItem("name",state.admin.name)
      localStorage.setItem('id',state.admin.id)
      router.push("/Admin/Admindashboard");
    }
  }, [state.success, router]);

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
              <Link href="/Admin/signup">Sign up</Link>
            </span>
          </p>
        </div>
        <form className="mt-10" action={formAction}>
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
              required
            />
          </div>
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
