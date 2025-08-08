import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <Helmet>
        <title>About - MM Fashion BD | Passion for Fashion in Bangladesh</title>
      </Helmet>
      {/* Header Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          স্বাগতম মিসাম মারিফা ফ্যাশন ওয়ার্ল্ড-এ!
        </h1>
        <p className="max-w-4xl mx-auto text-gray-600 text-lg">
          <span className="font-semibold text-[#c3192a]">মিসাম মারিফা ফ্যাশন ওয়ার্ল্ড</span>-এর যাত্রা শুরু হয়েছে ফ্যাশনের প্রতি ভালোবাসা এবং নারীদের আত্মনির্ভরশীলতা গড়ে তোলার এক নিঃস্বার্থ প্রচেষ্টাকে কেন্দ্র করে। মিসাম ও মারিফা—এই দুই নামের পেছনে রয়েছে আমাদের বিশ্বাস, স্বপ্ন এবং সৃজনশীলতার এক অপার গল্প। আমরা হাতে তৈরি, দেশীয় পণ্য, অ্যামব্রয়ডারি করা পোশাক ও ফ্যাশন আইটেমের মাধ্যমে নারীদের জন্য স্বকীয়তা এবং ঐতিহ্যের এক নতুন সংজ্ঞা তৈরি করছি।
        </p>
      </section>

      {/* Image + Story */}
      <section className="flex flex-col lg:flex-row items-center gap-10 mb-16">
        <img
          src="https://i.ibb.co.com/dw4bR2nX/Misam-Marifa-Fashion-World.png"
          alt="Store"
          className="rounded-lg shadow-lg w-full md:w-1/2 h-80 md:h-[440px]"
        />
        <div className="lg:w-1/2">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">
            আমাদের গল্প
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            আমাদের পণ্যের প্রতিটি ডিজাইনে থাকে ভালোবাসা, যত্ন এবং শিল্প। দেশীয় হস্তশিল্প, আধুনিক স্টাইল এবং মানসম্পন্ন উপকরণের মিশ্রণে আমরা তৈরি করি এমন পোশাক যা আপনাকে শুধু সুন্দরই নয়, স্বাচ্ছন্দ্যও দেবে।
          </p>
         
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="grid md:grid-cols-2 gap-10 mb-16">
        <div className="bg-[#ceb1cf67] border-l-4 border-[#d8b6da] p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-3 text-green-700">আমাদের লক্ষ্য:</h3>
          <p className="text-gray-600 space-y-2">
            <li>দেশীয় ফ্যাশনকে বিশ্ব দরবারে তুলে ধরা ।</li>

            <li>নারীদের জন্য নিজস্ব পরিচয়ের একটি প্ল্যাটফর্ম তৈরি করা ।</li>

            <li> গুণগতমান এবং কাস্টমার সন্তুষ্টির সর্বোচ্চ গুরুত্ব দেওয়া ।</li>
          </p>
        </div>
        <div className="bg-[#ceb1cf67] border-l-4 border-[#d8b6da] p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-3 text-green-700">আমাদের আনন্দ</h3>
          <p className="text-gray-600">
            আমরা শুধু পোশাক বিক্রি করি না, আমরা আত্মবিশ্বাস, রুচিশীলতা এবং নারীর সৃজনশীল শক্তিকে উদযাপন করি। আপনি আমাদের ওয়েবসাইটে যা দেখবেন, তার প্রতিটিতেই থাকবে একটি করে গল্প—আপনার মতোই এক অজানা গল্প।
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4 text-green-800">Join Our Journey</h2>
        <p className="text-gray-600 mb-6">
          যোগাযোগ করুন, আমাদের সঙ্গে যুক্ত হোন, এবং মিসাম মারিফা ফ্যাশন ওয়ার্ল্ড-এর যাত্রায় সঙ্গী হোন।
        </p>
        <p className="mb-4">
          <span className="font-semibold text-green-900">মিসাম মারিফা ফ্যাশন ওয়ার্ল্ড</span>
          “স্বপ্ন দেখুন, স্টাইলের সঙ্গে বাঁচুন।”
        </p>
        <Link to="/collections">
          <button className="shop_now">
            Shop Now
          </button>
        </Link>
      </section>
    </div>
  );
};

export default About;
