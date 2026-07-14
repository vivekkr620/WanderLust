export default function AuthLayout({ title, subtitle, children }) {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 transition-all duration-300">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-center text-rose-500 mb-2">
          WanderLust
        </h1>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center">
          {title}
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 text-center mt-2 mb-8">
          {subtitle}
        </p>

        {/* Form Content */}
        {children}

      </div>
    </main>
  );
}
