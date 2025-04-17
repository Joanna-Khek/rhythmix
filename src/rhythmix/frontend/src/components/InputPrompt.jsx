import {React, useEffect, useMemo, useState} from 'react'
import {Box} from '@mui/material';
import { useFormik } from 'formik';
import {useNavigate} from 'react-router';
import * as yup from 'yup';
import TextForm from './forms/TextForm';
import AxiosInstance from './Axios';
import Button from '@mui/material/Button';
import AlertMessage from './AlertMessage';

export default function InputPrompt({ setGraphState, setPrompt }) {
    // const [myPrompt, setPrompt] = useState([])
    const [message, setMessage] = useState([])
    const navigate = useNavigate()

    const validationSchema = yup.object({
        prompt: yup
            .string('Enter your prompt')
            .required('Prompt is required'),
    })

    const formik = useFormik({
        initialValues: {
            prompt: "",
        },

        validationSchema: validationSchema,

        onSubmit: (values) => {
            AxiosInstance.post(`prompt/`, values)
            .then((res) => {
                setMessage(
                    <AlertMessage
                        messageText = {"Successfully submitted data to the database!"}
                        messageSeverity = {"success"}
                    />
                )

                setPrompt(res.data)
                setGraphState(res.data.graph_state[0])

                formik.resetForm();

                setTimeout(() => {
                    navigate('/')
                }, 1000)

            })
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>

            {message}

            <Box className={'FormBox'}>
                <Box className={'FormArea'}>
                    <TextForm
                        label={"Enter your prompt"}
                        name="prompt"
                        value={formik.values.prompt}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.prompt && Boolean(formik.errors.prompt)}
                        helperText={formik.touched.prompt && formik.errors.prompt}
                    />
                </Box>

                    <Button type="submit" variant="contained" fullWidth>Submit</Button>


            </Box>

            </form>

        </div>



    );
};
