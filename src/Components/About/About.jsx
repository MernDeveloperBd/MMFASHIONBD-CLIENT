import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          About Haramain Khushbo
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          Welcome to <span className="font-semibold text-green-900">Haramain Khushbo</span> — your trusted destination for premium Islamic products, attar, panjabi, prayer mats, and more. We blend tradition with elegance to bring you quality and authenticity.
        </p>
      </section>

      {/* Image + Story */}
      <section className="flex flex-col lg:flex-row items-center gap-10 mb-16">
        <img
          src="https://i.ibb.co/S4sxz04T/Cotton-Print-Panjabi-1-kenakata-bazar-bd.jpg"
          alt="Store"
          className="rounded-lg shadow-lg w-full lg:w-1/2 object-cover h-80"
        />
        <div className="lg:w-1/2">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">
            Our Story
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Founded with love for Islamic tradition, Haramain Khushbo began its journey in the heart of the community to deliver spiritual elegance to every home. From premium attars to elegant panjabis, every product we offer carries quality and heritage.
          </p>
          <p className="text-gray-700">
            Whether you're preparing for Eid, Jummah, or a special gift — we’ve got something graceful for every soul.
          </p>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="grid md:grid-cols-2 gap-10 mb-16">
        <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-3 text-green-700">Our Mission</h3>
          <p className="text-gray-600">
            To provide high-quality Islamic lifestyle products that connect people with culture, elegance, and spirituality.
          </p>
        </div>
        <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-3 text-green-700">Our Vision</h3>
          <p className="text-gray-600">
            To become the most beloved destination for Islamic fashion and fragrance in Bangladesh and beyond.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4 text-green-800">Join Our Journey</h2>
        <p className="text-gray-600 mb-6">
          Discover products that inspire peace and style. Explore Haramain Khushbo today.
        </p>
        <Link to="/collections">
          <button className="btn bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-md">
            Shop Now
          </button>
        </Link>
      </section>
    </div>
  );
};

export default About;
