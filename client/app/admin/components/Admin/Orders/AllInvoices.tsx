import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useGetAllCoursesQuery } from "@/redux/features/courses/courseApi";
import Loader from "@/app/components/Loader/Loader";
// import { useTheme } from "@mui/material";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { AiOutlineMail } from "react-icons/ai";

type Props = {
  isDashboard?: boolean;
};

const AllInvoices = ({ isDashboard }: Props) => {
  //   const { theme, setTheme } = useTheme();
  const { isLoading, data } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});

  const [orderData, setOrderData] = useState<any>([]);

  useEffect(() => {
    if (data) {
      const temp = data.orders.map((item: any) => {
        const user = usersData?.users.find(
          (user: any) => user._id === item.userId
        );
        const course = coursesData?.courses.find(
          (course: any) => course._id === item.courseId
        );
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "$" + course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [data, usersData, coursesData]);

  const columns: any = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? [
          { field: "userEmail", headerName: "Email", flex: 1 },
          { field: "title", headerName: "Course Title", flex: 1 },
        ]
      : []),
    { field: "price", headerName: "Price", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "created_at", headerName: "Created At", flex: 0.5 }]
      : [
          {
            field: "",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {
              return (
                <a href={`mailto:${params.row.userEmail}`}>
                  <AiOutlineMail className="text-white" size={20} />
                </a>
              );
            },
          },
        ]),
  ];

  const rows: any = [
    {
      id: "1",
      userName: "Alice Johnson",
      userEmail: "alice.johnson@example.com",
      title: "JavaScript Basics",
      price: "$200",
      created_at: "3 days ago",
    },
    {
      id: "2",
      userName: "Bob Smith",
      userEmail: "bob.smith@example.com",
      title: "Advanced React",
      price: "$350",
      created_at: "1 week ago",
    },
    {
      id: "3",
      userName: "Charlie Brown",
      userEmail: "charlie.brown@example.com",
      title: "Node.js Mastery",
      price: "$400",
      created_at: "5 days ago",
    },
    {
      id: "4",
      userName: "Diana Prince",
      userEmail: "diana.prince@example.com",
      title: "CSS for Beginners",
      price: "$150",
      created_at: "2 weeks ago",
    },
    {
      id: "5",
      userName: "Ethan Hunt",
      userEmail: "ethan.hunt@example.com",
      title: "Full-Stack Development",
      price: "$600",
      created_at: "1 month ago",
    },
    {
      id: "6",
      userName: "Fiona Gallagher",
      userEmail: "fiona.gallagher@example.com",
      title: "Python for Data Science",
      price: "$500",
      created_at: "3 weeks ago",
    },
    {
      id: "7",
      userName: "George Michael",
      userEmail: "george.michael@example.com",
      title: "Machine Learning Basics",
      price: "$700",
      created_at: "4 days ago",
    },
    {
      id: "8",
      userName: "Hannah Montana",
      userEmail: "hannah.montana@example.com",
      title: "UI/UX Design Principles",
      price: "$300",
      created_at: "2 days ago",
    },
    {
      id: "9",
      userName: "Ian Curtis",
      userEmail: "ian.curtis@example.com",
      title: "DevOps Essentials",
      price: "$450",
      created_at: "6 days ago",
    },
    {
      id: "10",
      userName: "Jane Doe",
      userEmail: "jane.doe@example.com",
      title: "Kubernetes for Beginners",
      price: "$550",
      created_at: "1 day ago",
    },
  ];

  orderData.forEach((item: any, index: number) => {
    rows.push({
      id: item.id || `row-${index}`, // Use item.id or fallback to a unique index-based ID
      userName: item.userName,
      userEmail: item.userEmail,
      title: item.title,
      price: item.price,
      created_at: item.updatedAt
        ? new Date(item.updatedAt).toLocaleString()
        : "N/A", // Handle missing updatedAt
    });
  });

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="0 40px">
          <Box
            m="40px 0 0 0"
            height={isDashboard ? "35vh" : "90vh"}
            overflow="hidden"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-8y5i81-MuiDataGrid-root .MuiDataGrid-container--top [role=row], .css-8y5i81-MuiDataGrid-root .MuiDataGrid-container--bottom [role=row]":
                {
                  background: "none",
                },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: "#fff",
              },
              "& .MuiDataGrid-sortIcon": {
                color: "#fff",
              },
              "& .MuiDataGrid-row": {
                color: "#fff",
                borderBottom: "1px solid #ffffff30 !important",
              },
              "& .MuiTablePagination-root": {
                color: "#fff",
                borderBottom: "none !important",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none !important",
              },
              ".name-column--cell": {
                color: "#fff",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#3e4396",
                borderBottom: "none",
                color: "#fff",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "#1f2a40",
              },
              "& .MuiDataGrid-footerContainer": {
                color: "#fff",
                borderTop: "none",
                backgroundColor: "#3e4396",
              },
              "& .MuiCheckbox-root": {
                color: "#7b7ede !important",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "#fff !important",
              },
            }}
          >
            <DataGrid
              checkboxSelection={isDashboard ? false : true}
              rows={rows}
              columns={columns}
              components={isDashboard ? {} : { Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
