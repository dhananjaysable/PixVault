/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="text-gray-800 bg-white">
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden text-center bg-gradient-to-br from-pink-100 via-purple-100 to-white">
        <motion.div
          className="absolute top-10 right-10 opacity-30 animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        ></motion.div>

        <motion.h1
          className="mb-4 text-6xl font-extrabold tracking-tight text-purple-700 drop-shadow-md"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Welcome to{" "}
          <span className="text-transparent bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text">
            PixVault
          </span>
        </motion.h1>
        <motion.p
          className="max-w-2xl mb-8 text-xl text-purple-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Securely store, organize, and showcase your photos in a beautiful and
          user-friendly interface.
        </motion.p>
        <motion.a
          href="#about"
          className="px-8 py-4 text-lg font-medium text-white transition rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          whileHover={{ scale: 1.05 }}
        >
          Learn More
        </motion.a>
      </section>

      <section id="about" className="px-6 py-24 text-center bg-pink-50">
        <motion.h2
          className="mb-6 text-5xl font-semibold text-purple-700 drop-shadow-sm"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Us
        </motion.h2>
        <motion.p
          className="max-w-3xl mx-auto text-lg text-purple-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          PixVault is a modern photo gallery solution crafted for photographers
          and visual storytellers. Our platform makes photo management elegant,
          intuitive, and secure — with style.
        </motion.p>
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

      <section id="contact" className="px-6 py-24 bg-pink-50">
        <motion.h2
          className="mb-12 text-5xl font-semibold text-center text-purple-700 drop-shadow-md"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Contact Us
        </motion.h2>
        <form className="max-w-xl p-10 mx-auto space-y-6 bg-white shadow-xl rounded-3xl ring-4 ring-pink-200">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-5 py-4 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-5 py-4 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            className="w-full px-5 py-4 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          ></textarea>
          <button
            type="submit"
            className="w-full py-4 text-lg font-semibold text-white transition bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl hover:from-pink-600 hover:to-purple-600"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
