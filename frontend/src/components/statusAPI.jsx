import {React, useEffect, useMemo, useState} from 'react'
import Button from '@mui/material/Button';
import AlertMessage from './AlertMessage';
import AxiosInstance from './Axios';

export default function StatusAPI({setAPIStatus}) {

    const [myData, setMyData] = useState([])
    const [showCheckStatus, setShowCheckStatus] = useState(false);

    const handleButtonClick = () => {
        setShowCheckStatus(true);

        if (myData.status == true) {
            setAPIStatus(true);
        } else if (myData.status == false) {
            setAPIStatus(false);
        }
      };

    const GetData = () =>{
        AxiosInstance.get(`api-check/`).then((res) =>{
        setMyData(res.data)
        } )
    }

    useEffect(() => {
        GetData();
      }, []);

    return (
        <div>
        <Button onClick={handleButtonClick}>Check API Status</Button>
        {showCheckStatus && <AlertMessage
                messageText={myData.message}
                messageSeverity={myData.status === true ? 'success' : 'error'}
                />} {/* Conditionally render CheckStatus */}
        </div>
    )

}
