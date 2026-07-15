import { createContext, useState, useEffect } from "react";
import useFetch from "../useFetch";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [formSubmitted, setFormSubmitted] = useState("");
  const [deletedMessage, setDeletedMessage] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [userAddress, setUserAddress] = useState([]);

  const { data: getUserDetails } = useFetch(
    "https://modern-mart-backend.vercel.app/api/user",
  );

  const { data: getApiAddress } = useFetch(
    "https://modern-mart-backend.vercel.app/api/address",
  );

  const userDetails = getUserDetails?.data || [];

  useEffect(() => {
    if (getApiAddress?.data) {
      setUserAddress(getApiAddress.data);
    }
  }, [getApiAddress]);

  const formHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://modern-mart-backend.vercel.app/api/address",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ address, location }),
        },
      );

      const responseData = await res.json();

      setUserAddress((prev) => [...prev, responseData.data]);

      setFormSubmitted("Address added successfully!");
      setAddress("");
      setLocation("");
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  const deletedUserAddress = async (userAddressId) => {
    try {
      await fetch(
        `https://modern-mart-backend.vercel.app/api/address/${userAddressId}`,
        {
          method: "DELETE",
        },
      );

      setUserAddress((prev) =>
        prev.filter((addr) => addr._id !== userAddressId),
      );

      setDeletedMessage("Address deleted successfully!");
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const updateUserAddress = async (userAddressId, updatedData) => {
    try {
      const res = await fetch(
        `https://modern-mart-backend.vercel.app/api/address/${userAddressId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        },
      );

      if (!res.ok) throw new Error("Failed to update address");

      const response = await res.json();

      setUserAddress((prev) =>
        prev.map((addr) =>
          addr._id === userAddressId ? { ...addr, ...response.data } : addr,
        ),
      );

      setFormSubmitted("Address updated successfully!");
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userDetails,
        userAddress,
        formHandler,
        deletedUserAddress,
        formSubmitted,
        deletedMessage,
        updateUserAddress,
        address,
        setAddress,
        location,
        setLocation,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
