import React from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import AllInvoices from "../Orders/AllInvoices";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { BiBarChartAlt2 } from "react-icons/bi";

const DashBoardWidget = () => {
  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#111C43",
        }}
      >
        Admin Dashboard
      </Typography>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ marginBottom: "30px" }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{
              padding: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#4d62d9",
              color: "#fff",
              borderRadius: "10px",
            }}
          >
            <Box>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                12,345
              </Typography>
            </Box>
            <AiOutlineUser size={40} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{
              padding: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#3e4396",
              color: "#fff",
              borderRadius: "10px",
            }}
          >
            <Box>
              <Typography variant="h6">Total Orders</Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                8,765
              </Typography>
            </Box>
            <AiOutlineShoppingCart size={40} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{
              padding: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#1f2a40",
              color: "#fff",
              borderRadius: "10px",
            }}
          >
            <Box>
              <Typography variant="h6">Revenue</Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                $123,456
              </Typography>
            </Box>
            <BiBarChartAlt2 size={40} />
          </Paper>
        </Grid>
      </Grid>

      {/* Analytics and Invoices */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "10px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginBottom: "10px",
                color: "#111C43",
              }}
            >
              User Analytics
            </Typography>
            <UserAnalytics isDashboard={true} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "10px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginBottom: "10px",
                color: "#111C43",
              }}
            >
              Order Analytics
            </Typography>
            {/* Placeholder for OrderAnalytics */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "#888",
              }}
            >
              <Typography>Order Analytics Coming Soon...</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "10px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginBottom: "10px",
                color: "#111C43",
              }}
            >
              All Invoices
            </Typography>
            <AllInvoices isDashboard={true} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashBoardWidget;