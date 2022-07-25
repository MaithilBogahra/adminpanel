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
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { getMedicines } from '../../Redux/Action/medicines.action';



function Medicines(props) {

  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [dopen, setDOpen] = React.useState(false);
  const [did, setDid] = useState();
  const [update, setUpdate] = useState(false);
  const [filterData, setfilterData] = useState([]);

  const dispatch = useDispatch()
  const medicines = useSelector(state => state.medicines)

  const c = useSelector(state => state.counter)
  const handleDClickOpen = () => {
    setDOpen(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDOpen(false);
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
      localStorage.setItem("Medicines", JSON.stringify([data]));
    } else {
      localData.push(data)
      localStorage.setItem("Medicines", JSON.stringify(localData));
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
      if (update) {
        handleUpdataData(values)
      } else {
        handleInsert(values);
      }

    },
  });

  const handleDelete = (params) => {
    const localData = JSON.parse(localStorage.getItem("Medicines"));
    const fdata = localData.filter((l) => l.id !== did)
    localStorage.setItem('Medicines', JSON.stringify(fdata))
    handleClose();
    loadData();
  }

  const handleEdit = (params) => {
    handleClickOpen();

    setUpdate(true);
    formikobj.setValues(params.row)
  }
  const handleUpdataData = (values) => {
    let localData = JSON.parse(localStorage.getItem("Medicines"))
    let Udata = localData.map((l) => {
      if (l.id === values.id) {
        return values;
      } else {
        return l;
      }
    })
    localStorage.setItem("Medicines", JSON.stringify(Udata));
    handleClose();
    setUpdate(false);
    loadData();
    formikobj.resetForm();
    console.log(values);
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
        <>
          <IconButton aria-label="delete" onClick={() => { handleDClickOpen(); setDid(params.id) }}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={() => handleEdit(params)}>
            <EditIcon />
          </IconButton>
        </>
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
    dispatch(getMedicines());
    // loadData();
  }, []);

  console.log(medicines)
  const { errors, handleChange, handleSubmit, handleBlur, touched, values } = formikobj
  // console.log(data);

  const handleSearch = (val) => {
    // console.log(val);
    let localData = JSON.parse(localStorage.getItem('Medicines'))
    let fdata = localData.filter((l) => (
      l.name.toLowerCase().includes(val.toLowerCase()) ||
      l.price.toString().includes(val) ||
      l.quntity.toString().includes(val) ||
      l.expiryDate.toString().includes(val)
    ))
    setfilterData(fdata);
  }

  let finalData = filterData.length > 0 ?
    filterData :
    data

  return (


    medicines.isLoading ? 
    <p>Loading.....</p>
    :
    medicines.error != "" ?
    <p>{medicines.error}</p>
    :
    <div>
      <h1>{c.counter}</h1>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Medicine
      </Button>

      <TextField

        id="search"
        name="search"
        label="Search Medicine"
        type="text"
        fullWidth
        variant="standard"
        onChange={(e) => handleSearch(e.target.value)}
      />

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={medicines.medicines}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
      <Dialog fullWidth
        open={dopen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure In Delete?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Add Medicine</DialogTitle>
        <Formik values={formikobj}>
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                value={values.name}
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
                value={values.price}
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
                value={values.quntity}
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
                value={values.expiryDate}
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
              {
                update === true ?
                  <Button type='submit'>Update</Button>
                  :
                  <Button type='submit'>Submit</Button>
              }

            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    </div>
  );
}


export default Medicines;