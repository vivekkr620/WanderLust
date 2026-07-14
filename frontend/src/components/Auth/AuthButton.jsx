export default function AuthButton({
  text,
  type = "button",
  onClick,
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="
        w-full
        bg-rose-500
        hover:bg-rose-600
        disabled:bg-gray-400
        disabled:cursor-not-allowed
        text-white
        font-semibold
        py-3
        rounded-xl
        transition-all
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-rose-400
      "
    >
      {text}
    </button>
  );
}
