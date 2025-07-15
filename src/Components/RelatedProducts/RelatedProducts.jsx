import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import SingleProduct from "../Products/SingleProduct";

const RelatedProducts = () => {
    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/products`);
            return data;
        },
    });

    if (isLoading) return <LoadingSpinner></LoadingSpinner>;

    // ক্যাটেগরি অনুযায়ী গ্রুপিং এবং র‍্যান্ডম সিলেকশন ফাংশন
    const getRandomRelatedProducts = (products) => {
        // ১. ক্যাটেগরি অনুযায়ী গ্রুপিং
        const categoryMap = {};
        products.forEach(product => {
            if (!categoryMap[product.category]) {
                categoryMap[product.category] = [];
            }
            categoryMap[product.category].push(product);
        });

        // ২. প্রতিটি ক্যাটেগরি থেকে ১টা র‍্যান্ডম প্রোডাক্ট সিলেক্ট 
        const selectedProducts = [];

        Object.values(categoryMap).forEach(productsInCategory => {
            const randomIndex = Math.floor(Math.random() * productsInCategory.length);
            selectedProducts.push(productsInCategory[randomIndex]);
        });

        // ৩. বেশি দেখাতে চাইলে এখানে সিলেক্টেড প্রোডাক্ট সংখ্যা বাড়াতে পারো

        return selectedProducts;
    };

    const relatedProducts = products ? getRandomRelatedProducts(products) : [];

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-6">Related Products</h1>
            {
                relatedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                        {relatedProducts.slice(0,5).map(product => (
                            <SingleProduct key={product._id} product={product}></SingleProduct>
                        ))}
                    </div>
                ) : (
                    <p className="text-red-600 text-center">No Product</p>
                )
            }
        </div>
    );
};

export default RelatedProducts;
