export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center space-y-8">
          <div>
            <img
              src="/images/logo4.png"
              alt="Nokhba Logo"
              className="mx-auto h-20 w-auto"
            />
            <h3 className="text-2xl md:text-3xl font-bold mt-2">نُخبة</h3>
          </div>

          <div className="inline-flex items-center gap-4 border border-white/30 rounded-xl px-6 py-4 bg-white/10 hover:bg-white/20 transition-colors duration-300">
            <div>
              <p className="text-lg md:text-xl">الخط الساخن:</p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="tel:16546"
                className="text-3xl md:text-4xl font-bold hover:text-blue-300 transition-colors"
              >
                16546
              </a>
              {/* Phone icon SVG */}
            </div>
          </div>

          <div className="flex justify-center gap-4 rtl:space-x-reverse mt-4">
            {/* Social media icons */}
             {/* Social Media Icons with Rounded Backgrounds */}
            <div className="flex justify-center gap-4 rtl:space-x-reverse mt-4">
              <a
                href="#"
                className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white transition"
              >
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a
                 href="#"
                className="w-12 h-12 rounded-full flex items-center justify-center bg-sky-500 hover:bg-sky-400 text-white transition"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
               <a
                 href="#"
                 className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-pink-500 to-yellow-500 hover:opacity-90 text-white transition"
               >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full flex items-center justify-center bg-red-600 hover:bg-red-500 text-white transition"
              >
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
          </div>

          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto mt-6">
            تم صنع هذه المنصة بهدف تهيئة الطالب لـ كامل جوانب الثانوية العامة
          </p>
        </div>
      </div>
    </footer>
  );
}