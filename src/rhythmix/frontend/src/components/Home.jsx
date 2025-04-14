import {React, useEffect, useMemo, useState} from 'react'
import {Box, Typography} from '@mui/material';
import Navbar from './navbar/Navbar';
import Instructions from './Instructions';
import Message from './Message';

export default function Home({ data, drawerCloseWidth, drawerOpenWidth }) {
        const [drawerOpen, setDrawerOpen] = useState(false);

        return (
            <>
                <Navbar
                    open={drawerOpen}
                    setOpen={setDrawerOpen}/>
                <Message
                    open={drawerOpen}
                    message="Follow the instructions to get started with Rhythmix!"
                    drawerCloseWidth={drawerCloseWidth}
                    drawerOpenWidth={drawerOpenWidth}
                    />
                <Instructions
                    open={drawerOpen}
                    data={data}
                    drawerCloseWidth={drawerCloseWidth}
                    drawerOpenWidth={drawerOpenWidth} />



            </>
        );
    };
