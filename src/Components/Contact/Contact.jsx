import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/contact`, formData); // 🔁 Change URL to your backend
      console.log(response.data);
      
      if (response.data.insertedId) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", mobile: "", message: "" });
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4 py-16 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white/40 backdrop-blur-md rounded-2xl shadow-xl p-8 md:p-16 grid md:grid-cols-2 gap-10 border border-white/30">

        {/* Left Side - Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-bold text-gray-900">Get in Touch</h2>
          <p className="text-gray-800 text-lg">
            We had love to hear from you! Whether you have a question about features, pricing, or anything else — our team is ready to answer all your questions.
          </p>

          <div className="space-y-4 text-gray-800 text-base">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-xl text-[#4d7c0f]" />
              <span>Mollah Complex, Sher-E-bangla road, Nirala More, Khulna</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-xl text-[#4d7c0f]" />
              <span> +880 1793 000111</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-xl text-[#4d7c0f]" />
              <span>haramainkhusbu@gmail.com</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-semibold text-gray-900">Send us a message</h3>

          <div>
            <label className="block font-medium mb-1 text-gray-800">Your Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4d7c0f] outline-none bg-white/70"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-800">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4d7c0f] outline-none bg-white/70"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-800">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              required
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4d7c0f] outline-none bg-white/70"
              placeholder="Mobile number"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-800">Your Message</label>
            <textarea
              name="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4d7c0f] outline-none resize-none bg-white/70"
              placeholder="Write something..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#4d7c0f] hover:bg-[#3e650a] transition-all text-white font-semibold py-3 rounded-xl shadow-md"
          >
            {loading ? "Sending..." : "Send Message"} <FaPaperPlane />
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default ContactUsPage;
