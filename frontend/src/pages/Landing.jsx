/* eslint-disable no-unused-vars */
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Loader, Camera, Shield, Sparkles, Heart, Star } from "lucide-react";

const Landing = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { loading, setLoading, contactApi } = useAuth();

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
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-20 animate-bounce blur-sm"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-purple-300 to-indigo-300 rounded-full opacity-25 animate-pulse"></div>
        <div
          className="absolute bottom-32 left-20 w-16 h-16 bg-gradient-to-r from-indigo-300 to-pink-300 rounded-full opacity-30 animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 right-10 w-40 h-40 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full opacity-15 animate-pulse blur-md"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-yellow-300 rounded-full opacity-40 animate-ping"></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-rose-300 rounded-full opacity-30 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-60"
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
            className="inline-flex mt-8 items-center px-6 py-2 mb-8 text-sm font-medium text-purple-700 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-purple-100"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 mr-2 text-pink-500" />
            Your Photos Deserve Better
          </motion.div>

          <motion.h1
            className="mb-6 text-7xl md:text-8xl font-extrabold tracking-tight"
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
            className="max-w-3xl mx-auto mb-10 text-2xl font-medium text-purple-600 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Transform the way you{" "}
            <span className="text-transparent bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text font-bold">
              store, organize, and showcase
            </span>{" "}
            your precious memories with our beautiful and secure photo
            management platform.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link to="/register">
              <motion.button
                className="group relative px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 cursor-pointer overflow-hidden"
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
                className="px-10 py-4 text-lg font-semibold text-purple-700 bg-white/80 backdrop-blur-sm rounded-full shadow-xl hover:shadow-2xl border border-purple-200 hover:border-pink-300 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            className="flex flex-col items-center text-purple-600"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm font-medium mb-2">Discover More</span>
            <div className="w-6 h-10 border-2 border-purple-300 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full mt-2"
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
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-30 animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-12 h-12 bg-indigo-200 rounded-full opacity-25 animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 right-10 w-24 h-24 bg-pink-100 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-xl"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Camera className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="mb-6 text-5xl font-bold text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text">
              About PixVault
            </h2>

            <motion.div
              className="w-24 h-1 mx-auto mb-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
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
              <div className="relative p-8 bg-white rounded-3xl shadow-2xl ring-1 ring-purple-100">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
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

              <div className="relative p-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl shadow-xl border border-pink-100">
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
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
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: Shield,
                    number: "99.9%",
                    label: "Uptime",
                    color: "from-purple-500 to-indigo-500",
                  },
                  {
                    icon: Camera,
                    number: "1M+",
                    label: "Photos Stored",
                    color: "from-indigo-500 to-blue-500",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -5, scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                  >
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 mb-3 bg-gradient-to-r ${stat.color} rounded-xl shadow-lg`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div
                      className={`text-2xl font-bold text-transparent bg-gradient-to-r ${stat.color} bg-clip-text`}
                    >
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div
                className="relative p-8 bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-2xl border border-purple-100"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-20"></div>
                <div className="absolute bottom-4 left-4 w-4 h-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full opacity-30"></div>

                <h3 className="mb-4 text-xl font-bold text-purple-700">
                  Our Mission
                </h3>
                <p className="text-gray-600 leading-relaxed">
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
                className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
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
        <div className="absolute top-10 right-10 w-24 h-24 bg-pink-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-15 animate-pulse"></div>
        <div
          className="absolute top-1/2 right-20 w-16 h-16 bg-indigo-200 rounded-full opacity-25 animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-xl"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Heart className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="mb-6 text-5xl font-bold text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text">
              Get In Touch
            </h2>

            <motion.div
              className="w-24 h-1 mx-auto mb-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            ></motion.div>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Send us a
              message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <form
                onSubmit={handleContact}
                className="relative p-8 bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl border border-white/50 space-y-6"
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>

                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-6 py-4 text-lg border-2 border-purple-100 rounded-2xl focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all duration-300 bg-white/80"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full px-6 py-4 text-lg border-2 border-purple-100 rounded-2xl focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all duration-300 bg-white/80"
                />
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-6 py-4 text-lg border-2 border-purple-100 rounded-2xl focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all duration-300 bg-white/80 resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden group"
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
                  className="relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                >
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 mb-4 bg-gradient-to-r ${item.color} rounded-xl shadow-lg`}
                  >
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-purple-700 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
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
