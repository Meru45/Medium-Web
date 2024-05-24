import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SignupInputType } from "@meru_2802/blogs-common";
import { InputBox } from "./InputBox";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInputType>({
    email: "",
    name: "",
    password: "",
  });

  const handleClick = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs,
      );
      const token = res.data;
      localStorage.setItem("token", token);
      navigate("/blogs");
    } catch (error) {
      //alert user
    }
  };

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl flex justify-center font-extrabold">
              {type == "signup" ? "Create an Account" : "Log In"}
            </div>
            <div className="mt-1.5 text-slate-500">
              {type == "signup"
                ? "Already have and account? "
                : "Don't have an account?"}
              <Link
                className="underline"
                to={type == "signup" ? "/signin" : "/signup"}
              >
                {type == "signup" ? "Sign In" : "Sign Up"}
              </Link>
            </div>
          </div>
          <div className="pt-8">
            {type === "signup" ? (
              <InputBox
                label="Username"
                placeholder="Mayur Pachpor..."
                onChange={(e) =>
                  setPostInputs({ ...postInputs, name: e.target.value })
                }
              />
            ) : null}

            <InputBox
              label="Email"
              placeholder="mayur@gmail.com"
              onChange={(e) =>
                setPostInputs({ ...postInputs, email: e.target.value })
              }
            />

            <InputBox
              type="password"
              label="Password"
              placeholder="123456"
              onChange={(e) =>
                setPostInputs({ ...postInputs, password: e.target.value })
              }
            />
            <button
              onClick={handleClick}
              type="button"
              className="mt-8 text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type == "signup" ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
