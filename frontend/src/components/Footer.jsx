import { Camera, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full px-4 py-5 border-t border-pink-200 bg-gradient-to-br from-pink-50 via-purple-50 to-white">
      <div className="flex flex-col items-center max-w-4xl mx-auto">
        <div className="flex items-center mb-2 space-x-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg shadow-md bg-gradient-to-r from-pink-500 to-purple-500">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-extrabold text-transparent bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text">
            PixVault
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mb-2 text-base font-medium">
          <a
            href="#privacy"
            className="text-purple-700 transition-colors hover:text-pink-500"
          >
            Privacy
          </a>
          <a
            href="#terms"
            className="text-purple-700 transition-colors hover:text-pink-500"
          >
            Terms
          </a>
          <a
            href="#support"
            className="text-purple-700 transition-colors hover:text-pink-500"
          >
            Support
          </a>
          <span className="flex items-center gap-2 text-purple-700">
            <Heart className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-normal">Made with love</span>
          </span>
        </div>

        <div className="mt-1 text-xs text-center text-purple-600">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-pink-600">PixVault</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
