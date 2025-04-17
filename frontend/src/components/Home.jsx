import {React, useState} from 'react'
import Navbar from './navbar/Navbar';
import Instructions from './Instructions';
import Message from './Message';

export default function Home({ drawerCloseWidth, drawerOpenWidth }) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <Navbar
                open={drawerOpen}
                setOpen={setDrawerOpen}/>
            <Instructions
                open={drawerOpen}
                drawerCloseWidth={drawerCloseWidth}
                drawerOpenWidth={drawerOpenWidth} />

        </>
    );
};
