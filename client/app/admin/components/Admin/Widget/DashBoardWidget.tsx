import React from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import AllInvoices from "../Orders/AllInvoices";
import { FaBorderNone } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import OrdersAnalytics from "../Analytics/OrderAnalytics";
import { styles } from "@/app/styles/style";

const DashBoardWidget = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <OrdersAnalytics isDashboard={true} />
      </div>
      <div>
        <div className="mt-10 grid grid-cols-1 gap-4 p-4">
          {/* Card 1 */}
          <div className="bg-[#111C43] text-white rounded-lg shadow-md p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
                <div className="text-4xl font-bold flex items-center gap-4">
                <FaBorderNone height={15} width={15} />
                <span>120</span>
                </div>
              <div className="w-10 h-10 border-4 border-blue-500 rounded-full flex items-center justify-center flex-col">
                {/* Placeholder for circular progress */}
                <p className="text-green-400 text-sm mt-20">+120%</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-lg font-semibold">Sales Obtained</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#111C43] text-white rounded-lg shadow-md p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold flex items-center gap-4">
                <GoPeople height={15} width={15} />
                <span>450</span>
                </div>
              <div className="w-10 h-10 border-4 border-blue-500 rounded-full flex items-center justify-center flex-col">
                {/* Placeholder for circular progress */}
                <p className="text-green-400 text-sm mt-20">+150%</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-lg font-semibold">New Users</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p
          className={`${styles.title} pl-12 pt-8 mb-2 text-[20px] text-start `}
        >
          Recent Transactions
        </p>
        <AllInvoices isDashboard={true} />
      </div>
      <div>
        <UserAnalytics isDashboard={true} />
      </div>
    </div>
  );
};

export default DashBoardWidget;
