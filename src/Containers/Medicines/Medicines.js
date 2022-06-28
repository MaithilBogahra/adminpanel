import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function Medicines(props) {

  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInsert = (values) => {

    let id = Math.floor(Math.random() * 1000);

    let data = {
      id: id,
      ...values
    }

    // console.log(values)
    const localData = JSON.parse(localStorage.getItem("Medicines"));
    // console.log(localData);
    if (localData === null) {
      localStorage.setItem("Medicines", JSON.stringify([data]))
    } else {
      localData.push(data)
      localStorage.setItem("Medicines", JSON.stringify(localData))
    }
    handleClose();
    loadData();
    formikobj.resetForm();
  }

  let schema = yup.object().shape({
    name: yup.string().required(),
    price: yup.number().required().positive().integer(),
    quntity: yup.string().required(),
    expiryDate: yup.string().required(),

  });

  const formikobj = useFormik({
    initialValues: {
      name: '',
      price: '',
      quntity: '',
      expiryDate: '',
    },
    validationSchema: schema,
    onSubmit: values => {
      handleInsert(values);

    },
  });

  const handleDelete = (params) => {
    const localData = JSON.parse(localStorage.getItem("Medicines"));
    const fdata = localData.filter((l) => l.id !== params.id)
    localStorage.setItem('Medicines', JSON.stringify(fdata))
    loadData();

  }

  const columns = [

    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'quntity', headerName: 'Quntity', width: 130 },
    { field: 'expiryDate', headerName: 'ExpiryDate', width: 130 },
    {
      field: 'action',
      headerName: 'Action',
      width: 130,
      renderCell: (params) => (
        <IconButton aria-label="delete" onClick={() => handleDelete(params)}>
          <DeleteIcon />
        </IconButton>
      )
    },
  ];

  const loadData = () => {
    let localData = JSON.parse(localStorage.getItem('Medicines'));
    if (localData !== null) {
      setData(localData);
    }

  }

  useEffect(() => {
    loadData();
  }, []);

  const { errors, handleChange, handleSubmit, handleBlur, touched } = formikobj
  // console.log(data);
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Medicine
      </Button>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Medicine</DialogTitle>
        <Formik values={formikobj}>
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField

                margin="dense"
                id="name"
                name="name"
                label="Medicine Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name ? <p>{errors.name}</p> : ''}
              <TextField

                margin="dense"
                id="price"
                name="price"
                label="Price"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.price && touched.price ? <p>{errors.price}</p> : ''}
              <TextField

                margin="dense"
                id="quntity"
                name="quntity"
                label="Quntity"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.quntity && touched.quntity ? <p>{errors.quntity}</p> : ''}
              <TextField

                margin="dense"
                id="expiryDate"
                name="expiryDate"
                label="Expiry Date"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.expiryDate && touched.expiryDate ? <p>{errors.expiryDate}</p> : ''}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type='submit'>Submit</Button>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    </div>
  );
}


export default Medicines;