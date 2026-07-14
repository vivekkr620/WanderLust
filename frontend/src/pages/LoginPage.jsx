import AuthLayout from "../components/Auth/AuthLayout";
import AuthInput from "../components/Auth/AuthInput";
import AuthButton from "../components/Auth/AuthButton";
import Divider from "../components/Auth/Divider";
import SocialLoginButton from "../components/Auth/SocialLoginButton";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <AuthLayout title="Welcome Back" subtitle="Continue your journey">
      <AuthInput label="Email" type="email" placeholder="Enter your email" />

      <AuthInput
        label="Password"
        type="password"
        placeholder="Enter your password"
      />

      <div className="mt-6">
        <AuthButton text="Login" />
      </div>

      <Divider />

      <Divider />

      <SocialLoginButton />

      <p className="text-center text-sm text-gray-600 mt-6">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-rose-500 hover:text-rose-600 transition-colors"
        >
          Sign Up
        </Link>
      </p>

    </AuthLayout>
  );
}
