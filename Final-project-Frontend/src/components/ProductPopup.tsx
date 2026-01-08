import { useNavigate } from "react-router-dom";

const ProductPopup = ({ product, close }: any) => {
    const navigate = useNavigate();

    const handleBuy = () => {
        navigate(`/payment/${product._id}`);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-xl p-6 w-[450px] relative">

                <button
                    className="absolute right-4 top-3 text-xl"
                    onClick={close}
                >
                    ✖
                </button>

                <img
                    src={product.image}
                    className="w-full h-48 object-cover rounded"
                />

                <h2 className="text-2xl font-bold mt-3">{product.name}</h2>

                <p className="mt-2 text-gray-700">
                    {product.description}
                </p>

                <h3 className="mt-3 font-semibold">Ingredients:</h3>
                <ul className="list-disc ml-4">
                    {product.ingredients?.map((i: string, idx: number) => (
                        <li key={idx}>{i}</li>
                    ))}
                </ul>

                <button
                    onClick={handleBuy}
                    className="w-full bg-green-600 text-white py-2 rounded mt-5 hover:bg-green-700"
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default ProductPopup;
