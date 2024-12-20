import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Pagination,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import users from "../user.json";
import { TableView, GridView } from "@mui/icons-material";
import { SET_USERS, setUserData } from "../redux/action/action";
import { useDispatch, useSelector } from "react-redux";

const columns = [
  { field: "serialNo", headerName: "Sl. No", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 204,
  },
  {
    field: "email",
    headerName: "email",

    sortable: false,
    width: 220,
  },
  {
    field: "phone",
    headerName: "Phone Number",

    width: 180,
  },
  {
    field: "age",
    headerName: "Age",

    width: 100,
  },
  {
    field: "location",
    headerName: "Location",

    width: 200,
  },
  {
    field: "role",
    headerName: "Role",

    width: 140,
  },
  {
    field: "joiningDate",
    headerName: "Joining Date",

    width: 120,
  },
  {
    field: "status",
    headerName: "Status",

    width: 150,
  },
];

const DashboardPage = ({ fullWidth = true }) => {
  const dispatch = useDispatch();

  // Load user.json data into Redux store
  useEffect(() => {
    if (users) {
      dispatch(setUserData(users)); // Use the action creator function
    }
  }, [dispatch]);
  const [viewType, setViewType] = React.useState("table");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [usersPerPage] = React.useState(6);

  const userState = useSelector((state) => state.user.users);

  const rows = userState?.map((user, index) => ({
    ...user,
    serialNo: index + 1, // Add serial number
  }));
  console.log(users, "djndj");

  const handleViewChange = (event, newView) => {
    if (newView) {
      setViewType(newView);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Pagination logic to slice users array
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userState.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          alignItems: "center",
          margin: 5,
          borderBottom: "1px solid black",
        }}
      >
        User List
      </Typography>

      <Paper sx={{ margin: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ToggleButtonGroup
            value={viewType}
            exclusive
            onChange={handleViewChange}
            aria-label="view type"
            sx={{ mb: 2 }}
          >
            <Tooltip title="Table View" arrow>
              <ToggleButton value="table" aria-label="table view">
                <TableView />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Card View" arrow>
              <ToggleButton value="card" aria-label="card view">
                <GridView />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </Box>
        <Box>
          {viewType === "table" ? (
            <Box sx={{}}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                sx={{
                  "& .MuiDataGrid-columnHeader": {
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    fontSize: "16px",
                  },
                  "& .MuiDataGrid-menuIcon svg": {
                    fill: "#fff",
                  },
                  "& .MuiDataGrid-sortIcon": {
                    color: "#fff",
                  },
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Grid container spacing={2}>
                {currentUsers.map((user) => (
                  <Grid item xs={12} sm={6} md={4} key={user.id}>
                    <Card sx={{ width: "100%" }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Name: {user.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Age: {user.age ? user.age : "N/A"}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Role: {user.role ? user.role : "N/A"}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Email: {user.email ? user.email : "N/A"}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Phone: {user.phone ? user.phone : "N/A"}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Status: {user.status ? user.status : "N/A"}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              {/* Pagination controls */}

              {viewType === "card" && (
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  sx={{
                    mt: 2,
                    mb: 2,
                    display: "flex",
                    justifyContent: "center",
                  }}
                />
              )}
            </Box>
          )}
        </Box>
      </Paper>
    </div>
  );
};

export default DashboardPage;
