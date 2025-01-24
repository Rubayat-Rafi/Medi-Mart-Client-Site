
import React from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";


const InvoicePage = () => {
  const location = useLocation();
  const paymentData = location.state?.paymentData;
  const componentRef = React.useRef();
  

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Invoice",
  });

  return (
    <div className="p-6 max-w-[1440px] w-11/12 mx-auto">
      <div ref={componentRef} className="border border-gray-300 p-4 rounded-md">
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold text-primaryTextColor">MediMart</h1>
          <p>Invoice</p>
        </div>
        <div>
          <h2 className="font-bold">Customer Information</h2>
          <p>Name: {paymentData?.billing_details?.name}</p>
          <p>Email: {paymentData?.billing_details?.email}</p>
        </div>
        <div className="mt-4">
          <h2 className="font-bold">Purchase Information</h2>
          <p>Grand Total: ${paymentData?.amount}</p>
          <p>Payment ID: {paymentData?.id} </p>
        </div>
      </div>
      <button
        onClick={handlePrint}
        className="bg-mainColor hover:bg-secondBgColor transition text-white px-4 py-2 rounded-md mt-4"
      >
        Print Invoice
      </button>
    </div>
  );
};

export default InvoicePage;
