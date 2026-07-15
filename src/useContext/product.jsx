import { createContext, useState } from "react";
import useFetch from "../useFetch";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [rating, setRating] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  // console.log("Search Term: ", searchTerm);
  // console.log('Categories: ', categories)

  const url = `https://modern-mart-backend.vercel.app/api/products`;

  const { data, loading, error } = useFetch(url);

  const productData = data?.products || data?.data || data || [];
  console.log('Product Data: ', productData);
  

  const filteredProducts = productData?.filter((product) => {
    const searchMatch =
      !searchTerm ||
      product.productName.toLowerCase().includes(searchTerm.toLowerCase());

    const priceMatch = !price || product.productPrice <= price;

    const categoryMatch =
      categories.length === 0 ||
      categories.includes(product?.categoryField?.categoryField);

    const ratingMatch = !rating || product.rating >= rating;

    return searchMatch && priceMatch && categoryMatch && ratingMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "LOW_TO_HIGH") {
      return a.productPrice - b.productPrice;
    }

    if (sortBy === "HIGH_TO_LOW") {
      return b.productPrice - a.productPrice;
    }

    return 0;
  });

  async function getCategory(categoryName) {
    try {
      const res = await fetch(
        `https://modern-mart-backend.vercel.app/api/category/${encodeURIComponent(categoryName)}`,
      );
      const data = await res.json();
      console.log("Category API response:", data);

      setCategoryData(data?.data || []);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  }

  return (
    <ProductContext.Provider
      value={{
        setSearchTerm,
        setPrice,
        setCategories,
        categories,
        setRating,
        price,
        setSortBy,
        sortBy,
        rating,
        loading,
        error,
        filteredProducts,
        sortedProducts,
        categoryData,
        getCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
