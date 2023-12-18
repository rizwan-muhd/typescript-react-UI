import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAstrologer, deleteAstrologer } from "../../redux/slices/Astrologer";

interface Row {
  _id: string;
  name: string;
  gender: string;
  email: string;
  languages: string[];
  specialties: string[];
}

export default function DataGridDemo() {
  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 40 },
    {
      field: "name",
      headerName: "Name",
      width: 100,
      editable: true,
    },
    {
      field: "gender",
      headerName: "gender",
      width: 100,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      width: 180,
      editable: true,
    },
    {
      field: "languages",
      headerName: "languages",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.languages || ""} ${params.row.languages || ""}`,
    },
    {
      field: "specialties",
      headerName: "Specialties",
      type: "string",
      width: 200,
      editable: true,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Button variant="outlined" onClick={() => handleEdit(params.row)}>
          Edit
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleDelete(params.row)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const handleEdit = (row: Row) => {
    // Access row.id for the unique identifier
    console.log(`Edit button clicked for ID: ${row._id}`);
    navigate(`/astrologer-edit/${row._id}`);
  };

  const handleDelete = async (row: Row) => {
    console.log(`Delete button clicked for ID: ${row._id}`);
    await dispatch(deleteAstrologer({ id: row._id }));
    await dispatch(getAstrologer());
  };
  const navigate = useNavigate();
  const [astrologerData, setAstrologer] = useState<Row[]>([]);
  const astrologer = useAppSelector((state) => state.astrologer);

  // Check if astrologer.data is not null before updating the state

  console.log("astrologer data", astrologer.data);
  const dispatch = useAppDispatch();
  const handleAddAstrologer = () => {
    navigate("/");
  };

  useEffect(() => {
    dispatch(getAstrologer());
  }, [dispatch]);

  useEffect(() => {
    if (astrologer.data !== null) {
      setAstrologer(astrologer.data);
    }
  }, [astrologer.data]);

  return (
    <Grid container>
      <Grid xs={12} md={12}>
        <Box sx={{ padding: "10px" }}>
          <Button variant="contained" onClick={handleAddAstrologer}>
            Add Astrologer
          </Button>
        </Box>
      </Grid>
      <Grid
        xs={12}
        md={12}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box sx={{ height: 400, width: 1050, overflowX: "scroll" }}>
          <DataGrid
            rows={astrologerData || []}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            getRowId={(row) => row._id}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </Grid>
    </Grid>
  );
}
