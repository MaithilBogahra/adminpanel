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
import EditOffIcon from '@mui/icons-material/EditOff';

function Patient(props) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [did, setDid] = useState();
    const [dopen, setDOpen] = React.useState(false);
    const [update, setUpdate] = useState(false)

    const handleDClickOpen = () => {
        setDOpen(true);
    };


    const handleClickOpen = () => {
        setOpen(true);
        setDOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
        setDOpen(false);
    };

    const handleAdd = (values) => {
        let id = Math.floor(Math.random() * 1000);

        let data = {
            id: id,
            ...values
        }
        const addData = JSON.parse(localStorage.getItem("Patient"));
        if (addData === null) {
            localStorage.setItem("Patient", JSON.stringify([data]))
        } else {
            addData.push(data);
            localStorage.setItem("Patient", JSON.stringify(addData));
        }
        handleClose();
        loadData();
        formikobj.resetForm();
    }
    const handleEdit = (params) => {
        handleClickOpen();

        setUpdate(true)
        formikobj.setValues(params.row)
        console.log(params);
    }
    const handleUpdataData = (values) => {
        const addData = JSON.parse(localStorage.getItem("Patient"));
        const ldata = addData.map((l) => {
            if (l.id === values.id) {
                return values;
            } else {
                return l;
            }
        })
        localStorage.setItem("Patient", JSON.stringify(ldata));
        handleClose();
        loadData()
        setUpdate(false);
        formikobj.resetForm();
    }

    let schema = yup.object().shape({
        patientname: yup.string().required(),
        patientage: yup.number().required().positive().integer(),
        patientaddress: yup.string().required(),

    });
    const formikobj = useFormik({
        initialValues: {
            patientname: '',
            patientage: '',
            patientaddress: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            if (update) {
                handleUpdataData(values)
            } else {
                handleAdd(values);
            }
        },

    });

    const { errors, handleBlur, handleChange, handleSubmit, touched, values } = formikobj

    const columns = [

        { field: 'patientname', headerName: 'Patient name', width: 130 },
        { field: 'patientage', headerName: 'PatientAge', width: 130 },
        { field: 'patientaddress', headerName: 'PatientAddress', width: 90, },
        {
            field: 'action',
            headerName: 'Action',
            width: 90,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => { handleDClickOpen(); setDid(params.id) }}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params)}>
                        <EditOffIcon />
                    </IconButton>
                </>
            )
        },
    ];
    const handleRemove = (params) => {
        const addData = JSON.parse(localStorage.getItem("Patient"));
        const fdata = addData.filter((a) => a.id !== did)
        localStorage.setItem("Patient", JSON.stringify(fdata));

        handleClose();
        loadData();
    }
    const loadData = () => {
        let localData = JSON.parse(localStorage.getItem('Patient'));
        if (localData !== null) {
            setData(localData);
        }
    }
    useEffect(() => {
        loadData();
    });

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Patient
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
            <Dialog fullWidth
                open={dopen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are You Sure Delete?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleRemove} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Patient</DialogTitle>
                <Formik values={formikobj}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>

                            <TextField
                                margin="dense"
                                value={values.patientname}
                                id="patientname"
                                label="Patient Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.patientname && touched.patientname ?
                                <p>{errors.patientname}</p>
                                :
                                ""
                            }
                            <TextField
                                margin="dense"
                                value={values.patientage}
                                id="patientage"
                                label="Patient Age"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.patientage && touched.patientage ?
                                <p>{errors.patientage}</p>
                                :
                                ""
                            }
                            <TextField
                                margin="dense"
                                value={values.patientaddress}
                                id="patientaddress"
                                label="Patient Address"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.patientaddress && touched.patientaddress ?
                                <p>{errors.patientaddress}</p>
                                :
                                ""
                            }
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            {
                                update ?
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

export default Patient;