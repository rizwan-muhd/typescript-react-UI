import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef,  GridRenderCellParams,  GridValueGetterParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';


interface Row {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  // Add other properties as needed
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'gender',
    headerName: 'gender',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'string',
    width: 110,
    editable: true,
  },
  {
    field: 'languages',
    headerName: 'languages',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.languages || ''} ${params.row.languages || ''}`,
  },
  {
    field: 'specialties',
    headerName: 'Specialties',
    type: 'string',
    width: 110,
    editable: true,
  },
  {
    field: 'edit',
    headerName: 'Edit',
    width: 100,
    renderCell: (params: GridRenderCellParams) => (
      <Button variant="outlined" onClick={() => handleEdit(params.row)}>
        Edit
      </Button>
    ),
  },
  {
    field: 'delete',
    headerName: 'Delete',
    width: 120,
    renderCell: (params: GridRenderCellParams) => (
      <Button variant="outlined" color="error" onClick={() => handleDelete(params.row)}>
        Delete
      </Button>
    ),
  },
];

const handleEdit = (row: Row) => {
  // Access row.id for the unique identifier
  console.log(`Edit button clicked for ID: ${row.id}`);
  // Implement your edit logic with the row data
};

const handleDelete = (row: Row) => {
  // Access row.id for the unique identifier
  console.log(`Delete button clicked for ID: ${row.id}`);
  // Implement your delete logic with the row data
};

const rows = [
  { id: 1, lastName: 'Snow',email:"ruu", name: 'Jon',languages:["asddsf","dfgd","sdf"], age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataGridDemo() {

 
  return (
    <Box sx={{ height: 400, width: '100%' }}>
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
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}