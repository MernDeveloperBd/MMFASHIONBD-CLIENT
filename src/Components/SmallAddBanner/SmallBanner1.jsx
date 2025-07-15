import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const SmallAdBannerWithBg = ({ categoryName, imageUrl }) => {
  return (
    <div
      className="relative rounded-lg p-6 flex items-center justify-between w-full h-40 text-white shadow-lg"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>

      <div className="relative z-10 flex items-center gap-3">
        <h3 className="text-xl font-semibold">{categoryName}</h3>
        <span className="bg-red-600 font-bold text-sm px-3 py-1 rounded">
          OFFER
        </span>
      </div>
    </div>
  );
};

const SmallBanner1 = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/products`);
      return data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  // Unique categories থেকে দুটি আলাদা ক্যাটেগরি বেছে নেওয়া
  const uniqueCategories = [...new Set(products.map((p) => p.category))].slice(0, 2);

  // প্রতিটি ক্যাটেগরির জন্য প্রথম প্রোডাক্টের ছবি নেওয়া
  const bannersData = uniqueCategories.map((cat) => {
    const product = products.find((p) => p.category === cat);
    return {
      categoryName: cat,
      imageUrl: product?.image || "", // fallback empty string
    };
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {bannersData.map(({ categoryName, imageUrl }, idx) => (
          <SmallAdBannerWithBg
            key={idx}
            categoryName={categoryName}
            imageUrl={imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default SmallBanner1;
