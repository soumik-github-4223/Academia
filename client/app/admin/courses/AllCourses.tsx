import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/courses/courseApi";
import Loader from "@/app/components/Loader/Loader";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

// import { useTheme } from "next-themes";

type Props = {};

const AllCourses = (props: Props) => {
  //   const { theme, setTheme } = useTheme();

  const { data, isLoading, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    // {
    //   field: "  ",
    //   headerName: "Edit",
    //   flex: 0.2,
    //   renderCell: (params: any) => {
    //     return (
    //       <Button>
    //         <AiFillEdit className="text-white" size={20} />
    //       </Button>
    //     );
    //   },
    // },
    {
      field: "",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button onClick={() => handleDeleteCourse(params.row.id)}>
            <AiOutlineDelete className="text-white" size={20} />
          </Button>
        );
      },
    },
  ];

  const [deleteCourse, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteCourseMutation({});
  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Course deleted successfully");
      refetch();
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorData = deleteError as { data: { message: string } };
        toast.error(errorData.data.message);
      }
    }
  }, [deleteSuccess, deleteError, refetch]);

  const { user } = useSelector((state: any) => state.auth);

  // console.log(user.email);

  const handleDeleteCourse = async (id: string) => {
    if (!confirm("Are you sure you want to delete this Course?")) {
      return;
    }

    try {
      if (user.email === "aryatestcustom@gmail.com") {
        toast.error("Course cannot be deleted in guest mode");
        return;
      }

      await deleteCourse(id).unwrap();
    } catch (err) {
      console.error("Failed to delete course:", err);
      toast.error("Failed to delete course");
    }
  };

  const rows: Array<{
    id: string;
    title: string;
    ratings: number;
    purchased: number;
    created_at: string;
  }> = [];

  if (data) {
    data.courses.forEach(
      (item: {
        _id: string;
        name: string;
        ratings: number;
        purchased: number;
        updatedAt: string;
      }) => {
        rows.push({
          id: item._id,
          title: item.name,
          ratings: item.ratings,
          purchased: item.purchased,
          created_at: new Date(item.updatedAt).toLocaleString(),
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
                borderBottom: "1px solid #ffffff30!important",
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
