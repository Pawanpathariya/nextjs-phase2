'use client';
import Link from "next/link";
import { Inter, Roboto_Mono } from 'next/font/google';
import { Vendoraction } from "../../actions/vendoraction";
import { useRouter } from "next/navigation";
import { useActionState } from 'react';
const initialState = {
  success: false,
  error: ''
};
const inter = Inter({ subsets: ['latin'], weight: '400', variable: '--font-inter' });
const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: '400', variable: '--font-roboto-mono' });

export { inter, robotoMono };

const Signup: React.FC = () => {
    const router = useRouter();
    const [state, formAction] = useActionState(Vendoraction, initialState);
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formAction(formData);
    if (state.success) {
      router.push("/Vendor");
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

      <div className="p-7 absolute top-90 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg w-130 h-auto">
        <div>
          <h1 className="text-2xl inter">Sign up</h1>
          <p>
            Already have an account?{" "}
            <span className="text-blue-600 relative left-2.5 font-bold">
              <Link href="/Vendor">Sign in</Link>
            </span>
          </p>
        </div>

        <form className="mt-10" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-3">
            <label htmlFor="name" className="text-gray-600">
              Name <sup>*</sup>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Your Name"
              className="shadow-lg p-3 border border-gray-300 w-full"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="email" className="text-gray-600">
              Email ID <sup>*</sup>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email ID"
              className="shadow-lg p-3 border border-gray-300 w-full"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="password" className="text-gray-600">
              Password <sup>*</sup>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              className="shadow-lg p-3 border border-gray-300 w-full"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="phone" className="text-gray-600">
              Phone Number <sup>*</sup>
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter Phone Number"
              className="shadow-lg p-3 border border-gray-300 w-full"
            />
          </div>

          <div className="btn" style={{ backgroundColor: "#DD2745", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", top: "20px" }}>
            <button className="text-white" >SIGN UP</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;

