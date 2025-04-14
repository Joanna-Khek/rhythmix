import {React, useEffect, useState} from 'react'
import Alert from '@mui/material/Alert';
export default function AlertMessage({ data }) {

    return (
        <div>
            <Alert
                sx={{ marginTop: '20px'}}
                severity={data.status === true ? 'success' : 'error'}
            >
                {data.message}
            </Alert>

        </div>
    );
}
