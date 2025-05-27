/* eslint-disable no-unused-vars */
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import {
  Loader,
  Camera,
  Shield,
  Sparkles,
  Heart,
  Star,
  Wand2,
} from "lucide-react";

const Landing = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { contactApi } = useAuth();

  const handleContact = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill all fields!");
      return;
    }
    setLoading(true);
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        `${contactApi}`,
        { name, email, message },
        { headers: { "Content-Type": "application/json" } }
      );
      if (data.success) {
        toast.success(data.message);
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-gray-800 bg-white">
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden text-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-50">
        <div className="absolute w-32 h-32 rounded-full top-20 left-10 bg-gradient-to-r from-pink-300 to-purple-300 opacity-20 animate-bounce blur-sm"></div>
        <div className="absolute w-24 h-24 rounded-full opacity-25 top-40 right-20 bg-gradient-to-r from-purple-300 to-indigo-300 animate-pulse"></div>
        <div
          className="absolute w-16 h-16 rounded-full bottom-32 left-20 bg-gradient-to-r from-indigo-300 to-pink-300 opacity-30 animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute w-40 h-40 rounded-full bottom-40 right-10 bg-gradient-to-r from-pink-200 to-purple-200 opacity-15 animate-pulse blur-md"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute w-8 h-8 bg-yellow-300 rounded-full top-1/3 left-1/4 opacity-40 animate-ping"></div>
        <div
          className="absolute w-12 h-12 rounded-full bottom-1/3 right-1/4 bg-rose-300 opacity-30 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 opacity-60"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}

        <motion.div
          className="relative z-10 max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-flex items-center px-6 py-2 mt-8 mb-8 text-sm font-medium text-purple-700 border border-purple-100 rounded-full shadow-lg bg-white/80 backdrop-blur-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 mr-2 text-pink-500" />
            Crafted for Photo Lovers
          </motion.div>

          <motion.h1
            className="mb-6 font-extrabold tracking-tight text-7xl md:text-8xl"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-purple-700 drop-shadow-lg">
              Welcome to
            </span>
            <span className="block text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text animate-pulse">
              PixVault
            </span>
          </motion.h1>

          <motion.p
            className="max-w-3xl mx-auto mb-10 text-2xl font-medium leading-relaxed text-purple-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Transform the way you{" "}
            <span className="font-bold text-transparent bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text">
              store, organize, and showcase
            </span>{" "}
            your precious memories with our beautiful and secure photo
            management platform.
          </motion.p>

          <motion.div
            className="flex flex-col items-center justify-center gap-4 mb-12 sm:flex-row"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link to="/register">
              <motion.button
                className="relative px-10 py-4 overflow-hidden text-lg font-semibold text-white transition-all duration-300 rounded-full shadow-2xl cursor-pointer group bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:shadow-pink-500/25"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center">
                  <Camera className="w-5 h-5 mr-2" />
                  Start Your Journey
                </span>
              </motion.button>
            </Link>

            <Link to="/login">
              <motion.button
                className="px-10 py-4 text-lg font-semibold text-purple-700 transition-all duration-300 border border-purple-200 rounded-full shadow-xl cursor-pointer bg-white/80 backdrop-blur-sm hover:shadow-2xl hover:border-pink-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute transform -translate-x-1/2 bottom-8 left-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            className="flex flex-col items-center text-purple-600"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="mb-2 text-sm font-medium">Discover More</span>
            <div className="flex justify-center w-6 h-10 border-2 border-purple-300 rounded-full">
              <motion.div
                className="w-1 h-3 mt-2 rounded-full bg-gradient-to-b from-pink-500 to-purple-500"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section
        id="about"
        className="relative px-6 py-24 overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50"
      >
        <div className="absolute w-20 h-20 bg-pink-200 rounded-full top-20 left-10 opacity-20 animate-bounce"></div>
        <div className="absolute w-16 h-16 bg-purple-200 rounded-full top-40 right-20 opacity-30 animate-pulse"></div>
        <div
          className="absolute w-12 h-12 bg-indigo-200 rounded-full opacity-25 bottom-20 left-20 animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute w-24 h-24 bg-pink-100 rounded-full bottom-40 right-10 opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full shadow-xl bg-gradient-to-r from-pink-500 to-purple-500"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Camera className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="mb-6 text-5xl font-bold text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text">
              About PixVault
            </h2>

            <motion.div
              className="w-24 h-1 mx-auto mb-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            ></motion.div>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative p-8 bg-white shadow-2xl rounded-3xl ring-1 ring-purple-100">
                <div className="absolute flex items-center justify-center w-8 h-8 rounded-full -top-4 -left-4 bg-gradient-to-r from-pink-500 to-purple-500">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>

                <h3 className="mb-4 text-2xl font-bold text-purple-700">
                  Our Vision
                </h3>
                <p className="text-lg leading-relaxed text-gray-600">
                  PixVault is more than just a photo gallery—it's a sanctuary
                  for your visual memories. We believe every photograph tells a
                  story, and our platform is designed to help you preserve,
                  organize, and share those stories beautifully.
                </p>
              </div>
              <div className="relative p-8 border border-pink-100 shadow-xl bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl">
                <div className="absolute flex items-center justify-center w-8 h-8 rounded-full -top-4 -right-4 bg-gradient-to-r from-purple-500 to-indigo-500">
                  <Heart className="w-4 h-4 text-white" />
                </div>

                <h3 className="mb-4 text-2xl font-bold text-purple-700">
                  Built with Passion
                </h3>
                <p className="text-lg leading-relaxed text-gray-600">
                  Crafted by photographers, for photographers and visual
                  storytellers. We understand the importance of your creative
                  work and have built a platform that respects and enhances your
                  artistic vision.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid grid-cols-1 gap-6">
                <div className="p-6 bg-white border border-purple-100 shadow-xl rounded-2xl">
                  <div className="flex items-center mb-4">
                    <Shield className="w-6 h-6 mr-3 text-purple-500" />
                    <h4 className="text-xl font-semibold text-purple-700">
                      Private & Secure
                    </h4>
                  </div>
                  <p className="leading-relaxed text-gray-600">
                    Your memories are encrypted and stored with privacy-first
                    design. You stay in control—always.
                  </p>
                </div>

                <div className="p-6 bg-white border border-purple-100 shadow-xl rounded-2xl">
                  <div className="flex items-center mb-4">
                    <Wand2 className="w-6 h-6 mr-3 text-pink-500" />
                    <h4 className="text-xl font-semibold text-purple-700">
                      Thoughtfully Organized
                    </h4>
                  </div>
                  <p className="leading-relaxed text-gray-600">
                    Smart tags and albums make it effortless to sort, search,
                    and relive your favorite moments.
                  </p>
                </div>
              </div>

              <motion.div
                className="relative p-8 border border-purple-100 shadow-2xl bg-gradient-to-br from-white to-purple-50 rounded-3xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute w-6 h-6 rounded-full top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-500 opacity-20"></div>
                <div className="absolute w-4 h-4 rounded-full bottom-4 left-4 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-30"></div>

                <h3 className="mb-4 text-xl font-bold text-purple-700">
                  Our Mission
                </h3>
                <p className="leading-relaxed text-gray-600">
                  To provide a secure, elegant, and intuitive platform where
                  your precious memories are not just stored, but celebrated.
                  We're committed to making photo management a delightful
                  experience.
                </p>

                <div className="flex items-center mt-6 space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 bg-gradient-to-r from-pink-${
                          400 + i * 100
                        } to-purple-${
                          400 + i * 100
                        } rounded-full border-2 border-white shadow-sm`}
                      ></div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="inline-flex items-center px-6 py-3 mb-4 text-sm font-medium text-purple-700 bg-purple-100 rounded-full">
              <Sparkles className="w-4 h-4 mr-2" />
              Ready to get started?
            </div>
            <p className="mb-6 text-lg text-gray-600">
              Join thousands of users who trust PixVault with their precious
              memories.
            </p>
            <Link to="/register">
              <motion.button
                className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 rounded-full shadow-xl cursor-pointer bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:shadow-2xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
      <section
        id="features"
        className="px-6 py-24 text-center bg-gradient-to-br from-purple-50 via-pink-50 to-white"
      >
        <motion.h2
          className="mb-16 text-5xl font-semibold text-purple-700 drop-shadow-md"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Features
        </motion.h2>
        <div className="grid max-w-6xl grid-cols-1 gap-10 mx-auto md:grid-cols-3">
          {[
            {
              title: "Secure Cloud Storage",
              desc: "Keep your photos safe with encrypted cloud-based storage.",
            },
            {
              title: "Organized Albums",
              desc: "Create, tag, and sort your collections effortlessly.",
            },
            {
              title: "Responsive Gallery",
              desc: "Enjoy a fast, beautiful UI on any device.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="relative p-8 transition transform bg-white shadow-2xl rounded-3xl ring-4 ring-pink-200 hover:ring-purple-300 hover:shadow-pink-300 hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
            >
              <div className="absolute flex items-center justify-center w-12 h-12 text-lg font-semibold text-white transform -translate-x-1/2 rounded-full shadow-md -top-6 left-1/2 bg-gradient-to-r from-pink-500 to-purple-500">
                {index + 1}
              </div>
              <h3 className="mt-8 mb-3 text-2xl font-semibold text-pink-600">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-purple-600 text-md">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="relative px-6 py-24 overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50"
      >
        <div className="absolute w-24 h-24 bg-pink-200 rounded-full top-10 right-10 opacity-20 animate-bounce"></div>
        <div className="absolute w-32 h-32 bg-purple-200 rounded-full bottom-10 left-10 opacity-15 animate-pulse"></div>
        <div
          className="absolute w-16 h-16 bg-indigo-200 rounded-full opacity-25 top-1/2 right-20 animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full shadow-xl bg-gradient-to-r from-pink-500 to-purple-500"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Heart className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="mb-6 text-5xl font-bold text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text">
              Get In Touch
            </h2>

            <motion.div
              className="w-24 h-1 mx-auto mb-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            ></motion.div>

            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Have questions or feedback? We'd love to hear from you. Send us a
              message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid items-start gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <form
                onSubmit={handleContact}
                className="relative p-8 space-y-6 border shadow-2xl bg-white/90 backdrop-blur-sm rounded-3xl border-white/50"
              >
                <div className="absolute flex items-center justify-center w-8 h-8 rounded-full -top-4 -left-4 bg-gradient-to-r from-pink-500 to-purple-500">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>

                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-6 py-4 text-lg transition-all duration-300 border-2 border-purple-100 rounded-2xl focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 bg-white/80"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full px-6 py-4 text-lg transition-all duration-300 border-2 border-purple-100 rounded-2xl focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 bg-white/80"
                />
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-6 py-4 text-lg transition-all duration-300 border-2 border-purple-100 resize-none rounded-2xl focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 bg-white/80"
                />
                <button
                  type="submit"
                  className="relative w-full py-4 overflow-hidden text-lg font-semibold text-white transition-all duration-300 shadow-xl cursor-pointer bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl hover:shadow-2xl group"
                  disabled={loading}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {loading ? (
                      <Loader className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <Heart className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </span>
                </button>
              </form>
            </motion.div>

            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {[
                {
                  icon: Star,
                  title: "Premium Experience",
                  description:
                    "Enjoy features designed specifically for creative professionals",
                  color: "from-indigo-500 to-blue-500",
                },
                {
                  icon: Shield,
                  title: "Ultimate Photo Security & Privacy",
                  description:
                    "Your photos are encrypted and your privacy is our top priority. Only you control your memories.",
                  color: "from-pink-500 to-rose-500",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="relative p-6 transition-all duration-300 border shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-xl border-white/50"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                >
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 mb-4 bg-gradient-to-r ${item.color} rounded-xl shadow-lg`}
                  >
                    <item.icon className="text-white w-7 h-7" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-purple-700">
                    {item.title}
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Landing;
