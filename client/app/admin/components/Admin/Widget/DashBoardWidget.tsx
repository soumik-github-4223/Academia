import React, { useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import AllInvoices from "../Orders/AllInvoices";
import { FaBorderNone } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import OrdersAnalytics from "../Analytics/OrderAnalytics";
import { styles } from "@/app/styles/style";
import { useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";

const DashBoardWidget = () => {

const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();
const [userComparePercentage, setUserComparePercentage] = useState<any>();

const { data, isLoading } = useGetUsersAnalyticsQuery({});
const { data: ordersData, isLoading: ordersLoading } = useGetOrdersAnalyticsQuery({});

useEffect(() => {
  if (isLoading && ordersLoading) {
    return;
  } else {
    if (data && ordersData) {
      const usersLastTwoMonths = data.users.last12Months.slice(-2);
      const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2);

      if (usersLastTwoMonths.length === 2 && ordersLastTwoMonths.length === 2) {
        const usersCurrentMonth = usersLastTwoMonths[1].count;
        const usersPreviousMonth = usersLastTwoMonths[0].count;
        const ordersCurrentMonth = ordersLastTwoMonths[1].count;
        const ordersPreviousMonth = ordersLastTwoMonths[0].count;

        const usersPercentChange =
          ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) * 100;
        const ordersPercentChange = ordersPreviousMonth!==0 ?
          ((ordersCurrentMonth - ordersPreviousMonth) / ordersPreviousMonth) * 100 : 100;

        setUserComparePercentage({
          currentMonth: usersCurrentMonth,
          previousMonth: usersPreviousMonth,
          percentChange: usersPercentChange,
        });

        setOrdersComparePercentage({
          currentMonth: ordersCurrentMonth,
          previousMonth: ordersPreviousMonth,
          percentChange: ordersPercentChange,
        });
      }
    }
  }
}, [data, ordersData, isLoading, ordersLoading]);

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
                <span>{ordersComparePercentage?.currentMonth}</span>
                </div>
              <div className="w-10 h-10 border-4 border-blue-500 rounded-full flex items-center justify-center flex-col">
                {/* Placeholder for circular progress */}
                <p className="text-green-400 text-sm mt-20">{ordersComparePercentage?.percentChange >0 ? '+' + ordersComparePercentage?.percentChange.toFixed(2)+ '%':'-' + ordersComparePercentage?.percentChange.toFixed(2) + '%'}</p>
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
                <span>{userComparePercentage?.currentMonth} </span>
                </div>
              <div className="w-10 h-10 border-4 border-blue-500 rounded-full flex items-center justify-center flex-col">
                {/* Placeholder for circular progress */}
                <p className="text-green-400 text-sm mt-20">{userComparePercentage?.percentChange >=0 ? '+' + userComparePercentage?.percentChange.toFixed(2)+ '%':'-' + userComparePercentage?.percentChange.toFixed(2) + '%'}  </p>
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
