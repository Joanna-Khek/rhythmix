import { Typography } from '@mui/material';
import * as React from 'react';

export default function Message({ open, message, drawerCloseWidth, drawerOpenWidth }) {

    return (
        <div
            style={{
                marginLeft: open ? drawerOpenWidth : drawerCloseWidth, // matches your drawer width (240 when open, ~72 when closed)
                transition: 'margin-left 0.3s ease',
            }}
        >
            <Typography>{message}</Typography>
        </div>
    )
}
