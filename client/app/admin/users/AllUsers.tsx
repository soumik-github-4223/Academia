import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { useDeleteUserMutation, useGetAllUsersQuery } from "../../../redux/features/user/userApi";
import Loader from "@/app/components/Loader/Loader";
import toast from "react-hot-toast";

// import { useTheme } from "next-themes";

type Props = {};

const AllCourses = (props: Props) => {
  //   const { theme, setTheme } = useTheme();

  const { data, isLoading, refetch } = useGetAllUsersQuery({},{ refetchOnMountOrArgChange: true });
  

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    {
      field: "",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button onClick={()=>handleDeleteUser(params.row.id)}>
            <AiOutlineDelete className="dark:text-white text-black" size={20} />
          </Button>
        );
      },
    },
  ];


const [deleteUser, { isSuccess:deleteSuccess, error:deleteError}] = useDeleteUserMutation({});

useEffect(() => {
    if(deleteSuccess){
        refetch();
        toast.success("User deleted successfully");
    }
    if(deleteError){
        if ("data" in deleteError) {
            const errorData = deleteError as { data: { message: string } };
            toast.error(errorData.data.message);
          }
    }

}, [deleteSuccess, deleteError,refetch]);

const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) {
        return;
    }
    // Check if the user is an admin
    const user = data?.users.find((user: { _id: string }) => user._id === id);
    if (user?.role === "admin") {
        toast.error("Cannot delete admin user");
        return;
    }
    try {
        await deleteUser(id).unwrap();
    } catch (err) {
        console.error("Failed to delete user:", err);
        toast.error("Failed to delete user");
    }
};

  const rows: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
    courses: number;
  }> = [];

  if (data) {
    data.users.forEach(
      (item: {
        _id: string;
        name: string;
        email: string;
        role: string;
        courses: Array<any>;
      }) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
        });
      }
    );
  }

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="80vh"
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
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: "#fff",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#3e4396",
                borderBottom: "none",
                color: "#fff",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "#1F2A40",
              },
              "& .MuiDataGrid-footerContainer": {
                color: "#fff",
                borderTop: "none",
                backgroundColor: "#3e4396",
              },
              "& .MuiCheckbox-root": {
                color: "#7ebde6 !important",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "#fff !important",
              },
            }}
          >
            <DataGrid rows={rows} columns={columns} />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
