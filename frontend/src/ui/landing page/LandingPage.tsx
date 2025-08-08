import brainboard from "../../assets/brainboard.png";
import icon1 from "../../assets/x_image.png";
import { LinkIcon } from "../../assets/LinkIcon";
import { Youtube } from "../../assets/Youtube";
import { Button } from "../Button";
import { Linkedin } from "../../assets/Linkedin";
import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
const navigate = useNavigate();

  const [showLoginForm, setShowLoginForm] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/signin", {
        username: data.username,
        password: data.password,
      });
      message.success("Logged in successfully")
      localStorage.setItem('username',response.data.response.username);
      localStorage.setItem('token',response.data.generateToken);
      navigate('/content')
    } catch (error) {
      message.error("Login failed")
      console.log(error)
    }
  };

  const handleCreateAccount = () => {
    setShowLoginForm(!showLoginForm);
  };

  const handleSignUp = async () => {
    try {
      await axios.post("http://localhost:8000/api/v1/signup", {
        username: data.username,
        password: data.password,
      });
      message.success("Signed up successfully")
      window.location.reload();
    } catch (error) {
      console.log(error);
      message.error("Sign up failed");
    }
  };

  return (
    <div className="h-screen bg-[#222831] px-16 py-8 flex ">
      <div className="flex flex-col items-center w-full">
        {/* Top Bar */}
        <div className="flex justify-between items-center w-full mb-12 px-8">
          {/* Logo and Title */}
          <div className="flex items-center">
            <img src={brainboard} alt="BrainBoard Logo" className="w-12" />
            <div className="font-semibold text-xl text-white">BrainBoard</div>
          </div>

          {/* Create Account Button */}
          <div>
            <Button
              variant="primary"
              size="sm"
              text={showLoginForm ? "Create Account" : "Login"}
              onClick={handleCreateAccount}
            />
          </div>
        </div>

        <div className="mb-8">
          <p className="text-[#CDC1FF] font-semibold text-4xl text-center mb-4">
            Welcome to BrainBoard!
          </p>
          <p className="text-[#F5EFFF]  text-xl text-center mb-4">
            Your smarter way to save, organize, and access links —anytime,
            anywhere
          </p>
        </div>

        <div className="relative w-[30%] flex flex-col items-center">
          {/* Floating Icons */}
          <div className="absolute top-1/2 -left-20 animate-bounce-slow hover:translate-x-1 transition-transform duration-300">
            <Youtube className="w-18 h-18" />
          </div>

          <div className="absolute top-1 -left-28 animate-bounce-slow hover:translate-x-1 transition-transform duration-300">
            <Linkedin className="w-18 h-18" />
          </div>

          <div className="absolute top-4 -right-24 animate-bounce-slow hover:translate-x-1 transition-transform duration-300">
            <LinkIcon className="w-18 h-18" />
          </div>

          <img
            src={icon1}
            alt="icon1"
            className="w-14 h-14 absolute top-[50%] -right-40 animate-bounce-slow hover:translate-x-1 transition-transform duration-300"
          />
          <input
            className="border text-white p-4 w-full rounded-xl mb-4 bg-transparent placeholder-white"
            name="username"
            placeholder="Username"
            type="text"
            onChange={handleInputChange}
          />
          <input
            className="border text-white p-4 w-full rounded-xl mb-8 bg-transparent placeholder-white"
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleInputChange}
          />
          <Button
            variant="primary"
            size="lg"
            text={showLoginForm ? "Login to proceed" : "Create Account"}
            onClick={showLoginForm ? handleLogin : handleSignUp}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
