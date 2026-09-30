import React, { useState } from "react";

function ItemCalculator() {
  // State variables
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("Medium");
  const [color, setColor] = useState("Black");
  const [coupon, setCoupon] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [payment, setPayment] = useState("Cash on Delivery");
  const [message, setMessage] = useState("");

  const unitPrice = 499;

  // Discount based on quantity
  const quantityDiscount = qty >= 3 ? 10 : 0;

  // Coupon discount
  const couponDiscount = coupon === "SAVE50" ? 50 : 0;

  // Calculations
  const subtotal = qty * unitPrice;

  const quantityDiscountAmount =
    (subtotal * quantityDiscount) / 100;

  const afterDiscount =
    subtotal - quantityDiscountAmount;

  const finalDiscount =
    couponDiscount > 0 ? couponDiscount : 0;

  const deliveryCharge = afterDiscount >= 1000 ? 0 : 50;

  const totalPrice =
    afterDiscount - finalDiscount + deliveryCharge;

  // Increase quantity
  function handleIncrement() {
    if (qty < 10) {
      setQty(qty + 1);
    }
  }

  // Decrease quantity
  function handleDecrement() {
    if (qty > 1) {
      setQty(qty - 1);
    }
  }

  // Reset all values
  function handleReset() {
    setQty(1);
    setSize("Medium");
    setColor("Black");
    setCoupon("");
    setIsLiked(false);
    setPayment("Cash on Delivery");
    setMessage("");
  }

  // Place order
  function handleOrder() {
    setMessage(
      `Order placed successfully! ${qty} T-Shirt(s) selected.`
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">

      {/* Heading */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-blue-600">
          E-Commerce Product
        </h2>

        {/* Wishlist */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="text-2xl"
        >
          {isLiked ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Product Details */}
      <div className="bg-blue-50 p-4 rounded-lg mb-5">

        <h3 className="text-xl font-bold mb-1">
          Premium T-Shirt
        </h3>

        <p className="text-gray-600">
          Comfortable cotton t-shirt for everyday use.
        </p>

        <p className="text-lg font-semibold text-green-600 mt-2">
          ₹{unitPrice} / piece
        </p>

        {/* Stock Information */}
        {qty >= 8 ? (
          <p className="text-red-500 font-semibold mt-2">
            ⚠️ Only a few items left!
          </p>
        ) : (
          <p className="text-green-600 mt-2">
            ● In Stock
          </p>
        )}
      </div>

      {/* Size Selection */}
      <div className="mb-5">
        <label className="block font-semibold mb-2">
          Select Size:
        </label>

        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
          <option value="XL">XL</option>
        </select>
      </div>

      {/* Color Selection */}
      <div className="mb-5">
        <label className="block font-semibold mb-2">
          Select Color:
        </label>

        <div className="flex gap-3">

          <button
            onClick={() => setColor("Black")}
            className={`px-4 py-2 rounded-md border ${
              color === "Black"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            Black
          </button>

          <button
            onClick={() => setColor("Blue")}
            className={`px-4 py-2 rounded-md border ${
              color === "Blue"
                ? "bg-blue-600 text-white"
                : "bg-white text-black"
            }`}
          >
            Blue
          </button>

          <button
            onClick={() => setColor("Red")}
            className={`px-4 py-2 rounded-md border ${
              color === "Red"
                ? "bg-red-500 text-white"
                : "bg-white text-black"
            }`}
          >
            Red
          </button>

        </div>
      </div>

      {/* Quantity */}
      <div className="mb-5">

        <p className="font-semibold mb-2">
          Quantity:
        </p>

        <div className="flex items-center gap-5">

          <button
            onClick={handleDecrement}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md"
          >
            -
          </button>

          <span className="text-xl font-bold">
            {qty}
          </span>

          <button
            onClick={handleIncrement}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md"
          >
            +
          </button>

        </div>

        <p className="text-sm text-gray-500 mt-2">
          Maximum 10 items
        </p>

      </div>

      {/* Coupon */}
      <div className="mb-5">

        <label className="block font-semibold mb-2">
          Coupon Code:
        </label>

        <input
          type="text"
          value={coupon}
          onChange={(e) =>
            setCoupon(e.target.value.toUpperCase())
          }
          placeholder="Enter SAVE50"
          className="w-full border border-gray-300 rounded-md p-2"
        />

        {coupon === "SAVE50" && (
          <p className="text-green-600 text-sm mt-2">
            🎉 Coupon applied! ₹50 discount added.
          </p>
        )}

      </div>

      {/* Payment Method */}
      <div className="mb-5">

        <label className="block font-semibold mb-2">
          Payment Method:
        </label>

        <select
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="Cash on Delivery">
            Cash on Delivery
          </option>

          <option value="UPI">
            UPI
          </option>

          <option value="Credit Card">
            Credit Card
          </option>
        </select>

      </div>

      {/* Order Summary */}
      <div className="border-t border-gray-300 pt-4">

        <h3 className="text-lg font-bold mb-3">
          Order Summary
        </h3>

        <p className="mb-2">
          <span className="font-semibold">
            Size:
          </span>{" "}
          {size}
        </p>

        <p className="mb-2">
          <span className="font-semibold">
            Color:
          </span>{" "}
          {color}
        </p>

        <p className="mb-2">
          <span className="font-semibold">
            Quantity:
          </span>{" "}
          {qty}
        </p>

        <p className="mb-2">
          <span className="font-semibold">
            Payment:
          </span>{" "}
          {payment}
        </p>

        <p className="mb-2">
          <span className="font-semibold">
            Subtotal:
          </span>{" "}
          ₹{subtotal}
        </p>

        <p className="mb-2 text-green-600">
          <span className="font-semibold">
            Quantity Discount:
          </span>{" "}
          -₹{quantityDiscountAmount}
        </p>

        <p className="mb-2 text-green-600">
          <span className="font-semibold">
            Coupon Discount:
          </span>{" "}
          -₹{finalDiscount}
        </p>

        <p className="mb-2">
          <span className="font-semibold">
            Delivery:
          </span>{" "}
          {deliveryCharge === 0
            ? "FREE"
            : `₹${deliveryCharge}`}
        </p>

        <div className="bg-green-50 p-3 rounded-md mt-3">

          <p className="text-xl font-bold text-green-700">
            Total: ₹{totalPrice}
          </p>

        </div>

        {qty >= 3 && (
          <p className="text-sm text-green-600 mt-2">
            🎉 You got a 10% quantity discount!
          </p>
        )}

        {afterDiscount >= 1000 && (
          <p className="text-sm text-blue-600 mt-2">
            🚚 Congratulations! You got free delivery.
          </p>
        )}

      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-5">

        <button
          onClick={handleOrder}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
        >
          Place Order
        </button>

        <button
          onClick={handleReset}
          className="flex-1 bg-gray-700 hover:bg-gray-800 text-white py-2 rounded-md"
        >
          Reset
        </button>

      </div>

      {/* Success Message */}
      {message && (
        <div className="bg-green-100 text-green-700 p-3 rounded-md mt-4 text-center">
          {message}
        </div>
      )}

    </div>
  );
}

export default ItemCalculator;
