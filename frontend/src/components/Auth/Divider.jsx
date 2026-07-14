export default function Divider() {
  return (
    <div className="flex items-center my-6">
      <div className="flex-1 h-px bg-gray-300"></div>

      <span className="px-4 text-sm text-gray-500 font-medium">
        OR
      </span>

      <div className="flex-1 h-px bg-gray-300"></div>
    </div>
  );
}

// export default Divider;