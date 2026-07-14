import { FcGoogle } from "react-icons/fc";

export default function SocialLoginButton({ text = "Continue with Google", onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        w-full
        flex
        items-center
        justify-center
        gap-3
        border
        border-gray-300
        rounded-xl
        py-3
        font-medium
        hover:bg-gray-50
        transition-all
        duration-200
      "
    >
      <FcGoogle size={22} />
      <span>{text}</span>
    </button>
  );
}

// export default SocialLoginButton;