import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { serviceOrderApi } from "../services/serviceOrderApi";

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const txRef = searchParams.get('tx_ref');
  const status = searchParams.get('status');
  
  useEffect(() => {
    // Manual payment confirmation as fallback
    if (txRef && status === 'successful') {
      const confirmPayment = async () => {
        try {
          // Extract service order ID from tx_ref (assuming format like "flw_101")
          const serviceOrderId = parseInt(txRef.replace('flw_', ''));
          
          if (serviceOrderId) {
            await serviceOrderApi.manualPaymentTrigger({
              data: {
                status: 'successful',
                tx_ref: txRef,
                meta: {
                  type: 'service_order',
                  service_order_id: serviceOrderId
                }
              }
            });
          }
        } catch (error) {
          console.error('Error confirming payment:', error);
        }
      };
      
      confirmPayment();
    }
  }, [txRef, status]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <CheckCircle className="text-green-500" size={80} />
      <h1 className="text-3xl font-bold text-gray-900 mt-4">Payment Successful!</h1>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        Your payment was processed successfully. You can now track your service order in your dashboard.
      </p>
      <div className="mt-6 flex gap-4">
        <Link
          to="/dashboard/user/my-service-orders"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          View My Service Orders
        </Link>
        <Link
          to="/dashboard/user/bookings"
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
        >
          View My Bookings
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;