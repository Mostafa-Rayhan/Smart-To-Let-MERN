import React, { useEffect, useState } from "react";
import { ToastError, ToastSuccess } from "../../hooks/others";
import { base, uploadRoomData } from "../../hooks/api";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [user, setUser] = useState();

  const [status, setStatus] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const profileUser = JSON.parse(localStorage.getItem("user"));
    if (profileUser) {
      // navigate("/admin");
      setUser(profileUser);
    }
  }, [navigate]);

  // useEffect(() => {
  //   if (user) {
  //     navigate(from, { replace: true });
  //   }
  // }, [user]);

  const important = (
    <span
      className=""
      style={{
        position: "absolute",
        color: "red",
        right: "-15px",
        top: "0px",
        fontSize: "1.2em",
      }}
    >
      *
    </span>
  );
  const [info, setInfo] = useState();

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`${base}/user`)
      .then((data) => {
        const users = data?.data;
        console.log("user", data?.data);
        const getuser = users?.find(
          (u) => u.email == info.email && u.password == info.password
        );
        if (getuser) {
          localStorage.setItem("user", JSON.stringify(getuser));
          console.log(from);
          // navigate(from, { replace: true });
          navigate("/")
        } else {
          ToastError("User not found");
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleSign = async (e) => {
    e.preventDefault();
    const body = {
      email: e.target.email.value,
      password: e.target.password.value,
      role: "user",
    };

    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    };
    await axios
      .post(`${base}/user`, body, { headers })
      .then((res) => {
        ToastSuccess("Account successfully created");
        setStatus(true);
      })
      .catch((error) => {
        ToastError(error || "something wrong");
      });
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="mt-20 w-full flex items-center justify-center ">
        {status ? (
          <form
            action=""
            onSubmit={handleSubmit}
            className="mt-3 text-black formDiv w-[90%] mx-auto sm:w-[500px]  "
            style={{}}
          >
            <h3 className="text-2xl font-bold text-center mb-10 ">Login </h3>
            <div className=" mb-5 inputDiv3">
              <label htmlFor="" style={{ position: "relative" }}>
                <span>Email : </span>
                {important}
              </label>{" "}
              <br />
              <input
                onChange={handleChange}
                type="email"
                name="email"
                value={info?.email || ""}
                className="newsInput  py-2 "
                style={{
                  margin: "0px 0px ",
                  borderRadius: "5px ",
                  height: "1.7em",
                }}
              />
            </div>
            <div className=" mb-5 inputDiv3">
              <label htmlFor="" style={{ position: "relative" }}>
                <span>Password : </span>
                {important}
              </label>{" "}
              <br />
              <input
                onChange={handleChange}
                type="password"
                name="password"
                value={info?.password || ""}
                className="newsInput"
                style={{
                  margin: "0px 0px ",
                  borderRadius: "5px ",
                  height: "1.7em",
                }}
              />
            </div>

            <button
              type="submit"
              className="col-span-2 about-one__btn thm-btn w-full submitBtnNews border-2 bg-accent rounded-md text-white "
            >
              Submit
            </button>
            <p className="pt-4">
              Don't have account?{" "}
              <span className="text-blue-500" onClick={() => setStatus(false)}>
                Sign Up
              </span>
            </p>
          </form>
        ) : (
          <form
            action=""
            onSubmit={handleSign}
            className="mt-3 text-black formDiv w-[90%] mx-auto sm:w-[500px]  "
            style={{}}
          >
            <h3 className="text-2xl font-bold text-center mb-10 ">
              Registration{" "}
            </h3>
            <div className=" mb-5 inputDiv3">
              <label htmlFor="" style={{ position: "relative" }}>
                <span>Email : </span>
                {important}
              </label>{" "}
              <br />
              <input
                onChange={handleChange}
                type="email"
                name="email"
                value={info?.email || ""}
                className="newsInput  py-2 "
                style={{
                  margin: "0px 0px ",
                  borderRadius: "5px ",
                  height: "1.7em",
                }}
              />
            </div>
            <div className=" mb-5 inputDiv3">
              <label htmlFor="" style={{ position: "relative" }}>
                <span>Password : </span>
                {important}
              </label>{" "}
              <br />
              <input
                onChange={handleChange}
                type="password"
                name="password"
                value={info?.password || ""}
                className="newsInput"
                style={{
                  margin: "0px 0px ",
                  borderRadius: "5px ",
                  height: "1.7em",
                }}
              />
            </div>

            <button
              type="submit"
              className="col-span-2 about-one__btn thm-btn w-full submitBtnNews border-2 bg-accent rounded-md text-white "
            >
              Submit
            </button>
            <p className="pt-4">
              Already have account?{" "}
              <span className="text-blue-500" onClick={() => setStatus(true)}>
                Login
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
