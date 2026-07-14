import AuthLayout from "../components/Auth/AuthLayout";
import AuthInput from "../components/Auth/AuthInput";
import AuthButton from "../components/Auth/AuthButton";
import Divider from "../components/Auth/Divider";
import SocialLoginButton from "../components/Auth/SocialLoginButton";
import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join WanderLust today"
    >
      <AuthInput
        label="Full Name"
        placeholder="Enter your full name"
      />

      <AuthInput
        label="Username"
        placeholder="Choose a username"
      />

      <AuthInput
        label="Email"
        type="email"
        placeholder="Enter your email"
      />

      <AuthInput
        label="Password"
        type="password"
        placeholder="Create a password"
      />

      <AuthInput
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
      />

      <div className="mt-6">
        <AuthButton text="Create Account" type="submit" />
      </div>

      <Divider />

      <SocialLoginButton text="Sign up with Google" />

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-rose-500 hover:text-rose-600 transition-colors"
        >
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}