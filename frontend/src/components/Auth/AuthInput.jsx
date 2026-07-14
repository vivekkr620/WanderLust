export default function AuthInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="
          w-full
          px-4
          py-3
          border
          border-gray-300
          rounded-xl
          outline-none
          focus:ring-2
          focus:ring-rose-500
          focus:border-rose-500
          transition-all
          duration-200
        "
      />
    </div>
  );
}
