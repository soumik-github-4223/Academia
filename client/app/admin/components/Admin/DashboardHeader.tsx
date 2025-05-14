"use client";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationApi";
import React, { FC, useEffect, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });
import { format } from "timeago.js";

type Props = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
//   console.log("Notification data is:", data);

  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any>([]);
  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/dezslmymr/video/upload/v1747076644/notification_tone_vwsqml.wav"
    )
  );

  const playNotificationSound = () => {
    audio.play();
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notification.filter((item: any) => item.status === "unread")
      );
    }

    if (isSuccess) {
      refetch();
    }

    audio.load();
  }, [data, isSuccess]);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      refetch();
      playNotificationSound();
    });
  }, []);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0 z-[999]">
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen && setOpen(!open)}
      >
        <IoNotificationsOutline className="text-2xl text-white" />
        <span className="absolute -top-2 -right-2 bg-green-500 rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white  select-none">
          {notifications && notifications.length}
        </span>
      </div>
      {open && (
        <div className="w-[300px] h-[50vh] bg-[#111C43] shadow-xl fixed top-24 right-5 rounded-lg overflow-y-auto scrollbar-hide ">
          <h5 className="text-center text-[20px] font-semibold border-b border-[#ffffff47] text-white p-4">
            Notifications
          </h5>
          {notifications &&
            notifications.map((item: any, index: number) => (
              <div
            className="bg-[#2d3a4e]  font-Poppins border-b border-b-[#ffffff47] "
            key={index}
              >
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-white font-bold ">{item.title}</p>
              <p
                className="text-emerald-300 cursor-pointer hover:text-emerald-500 "
                onClick={() => handleNotificationStatusChange(item._id)}
              >
                Mark as read
              </p>
            </div>
            <p className="px-2 text-blue-100 font-semibold">{item.message}</p>
            <p className="p-2 text-white text-[14px]">
              {format(item.createdAt)}
            </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
