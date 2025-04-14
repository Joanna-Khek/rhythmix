import {React, useEffect, useMemo, useState} from 'react'
import {Box, Typography} from '@mui/material';
import Navbar from './navbar/Navbar';
import Instructions from './Instructions';
import Message from './Message';

export default function Recommender({ data, drawerCloseWidth, drawerOpenWidth }) {
        const [drawerOpen, setDrawerOpen] = useState(false);

        return (
            <>
                <Navbar
                    open={drawerOpen}
                    setOpen={setDrawerOpen}/>
                <Message
                    open={drawerOpen}
                    message={"Recommender Page"}
                    drawerCloseWidth={drawerCloseWidth}
                    drawerOpenWidth={drawerOpenWidth}
                />

                <Box>
                    {data.map((item) => (
                        <Typography key={item.id}>Prompt: {item.prompt}</Typography>
                    ))}
                </Box>


            </>
        );
    };
