import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';

function Patient(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
            alert(JSON.stringify(values, null, 2));
        },
    });

    const { errors, handleBlur, handleChange, handleSubmit, touched } = formikobj
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Patient
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Patient</DialogTitle>
                <Formik values={formikobj}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>

                            <TextField
                                margin="dense"
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
                            <Button type='submit'>Submit</Button>
                        </DialogActions>
                    </Form>
                </Formik>
            </Dialog>
        </div>
    );
}

export default Patient;