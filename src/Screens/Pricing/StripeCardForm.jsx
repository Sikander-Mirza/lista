import React, { useState, useImperativeHandle, forwardRef } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import AlertModal from "../../Components/AlertModal/AlertModal";

const StripeCardForm = forwardRef(({ onPaymentSuccess }, ref) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isCardComplete, setIsCardComplete] = useState(false);

  const handleChange = (event) => {
    setIsCardComplete(event.complete);
  };

  useImperativeHandle(ref, () => ({
    async submitPayment() {
      if (!stripe || !elements) return { success: false };

      if (!isCardComplete) {
        AlertModal({
          icon: "warning",
          title: "Incomplete Card Details",
          text: "Please fill in all card information.",
        });
        return { success: false };
      }

      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        // AlertModal({
        //   icon: "error",
        //   title: "Payment Failed",
        //   text: error.message,
        // });
        return { success: false };
      }

      // AlertModal({
      //   icon: "success",
      //   title: "Thank You",
      //   iconColor: "#703BF7",
      //   text: "Package Purchased Successfully",
      // });

      if (onPaymentSuccess && typeof onPaymentSuccess === "function") {
        onPaymentSuccess(paymentMethod.id);
      }

      return { success: true, paymentMethodId: paymentMethod.id };
    },
  }));

  return (
    <div className="max-w-lg mx-auto p-6 ">
      <h1 className="text-[22px] font-[700] mb-2 font-Urbanist text-[#1E1E1E]">
        Enter Card Details
      </h1>

      <div className="p-4 border border-PurpleColor rounded-md bg-gray-50 mb-6">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#1a202c",
                fontFamily: "inherit",
                "::placeholder": {
                  color: "#a0aec0",
                },
              },
              invalid: {
                color: "#e53e3e",
              },
            },
          }}
          onChange={handleChange}
        />
      </div>

    </div>
  );
});

export default StripeCardForm;
