import {React, useState} from 'react'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import InputPrompt from './InputPrompt';
import StatusAPI from './statusAPI';
import AdjustAttributes from './AdjustAttributes';
import Recommender from './Recommender';
import AlertMessage from './AlertMessage';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
  maxWidth: '1000px', // Constrain accordion width
  width: '100%',
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  background: '#e1e0e2',
  flexDirection: 'row-reverse',
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: 'rotate(90deg)',
    },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(214, 81, 81, 0.05)',
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(216, 89, 89, 0.13)',
  maxWidth: '100%', // Ensure content stays within bounds
}));

export default function Instructions({ open, drawerCloseWidth, drawerOpenWidth }) {
  const [expanded, setExpanded] = useState('panel1');
  const [graphState, setGraphState] = useState(null);
  const [myPrompt, setPrompt] = useState([]);
  const [apiStatus, setAPIStatus] = useState(false);


  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    // <div
    //     style={{
    //         width: '100%',
    //         marginLeft: open ? drawerOpenWidth : drawerCloseWidth, // matches your drawer width (240 when open, ~72 when closed)
    //         transition: 'margin-left 0.3s ease',
    //         padding: '16px',
    //     }}
    //     >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center horizontally
        justifyContent: 'center', // Center vertically
        minHeight: '100vh', // Full viewport height for vertical centering
        marginLeft: open ? drawerOpenWidth : drawerCloseWidth, // Preserve drawer offset
        transition: 'margin-left 0.3s ease',
        padding: '16px',
        boxSizing: 'border-box',
        width: `calc(100% - ${open ? drawerOpenWidth : drawerCloseWidth}px)`, // Adjust width for drawer
      }}
    >
      <div style={{ maxWidth: '1000px', width: '100%' }}>
        <Typography variant="h6" component="h1" sx={{ mb: 6 }}>
          Follow the steps below to get your song recommendations!
        </Typography>

        <Accordion sx={{ mb: 2 }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>

          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography component="span" color='blue'>Step 1: Check API Status</Typography>
          </AccordionSummary>

          <AccordionDetails>
              <Typography>By clicking on the button below, you can check if required APIs
                  are present in the .env file. <br />
                  Proceed to the next step if the APIs are
                  present and working properly.
              </Typography>

              <StatusAPI setAPIStatus={setAPIStatus}/>
          </AccordionDetails>


        </Accordion>
        <Accordion sx={{ mb: 2 }} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography component="span" color='blue'>Step 2: Input Prompt </Typography>
          </AccordionSummary>
          <AccordionDetails>

            {apiStatus === true ? (
              <div>
                <Typography>
                  Describe the kind of songs you are looking for! You may also include the
                  name of the artists if you wish to.
                </Typography>

                <InputPrompt
                  setGraphState={setGraphState}
                  setPrompt={setPrompt}
                />
              </div>
            ) : (
              <AlertMessage
                messageSeverity={"error"}
                messageText={"Please check the API status in Step 1 before proceeding."}
                />
            )}
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 2 }} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography component="span" color='blue'>Step 3: Adjust Attributes</Typography>
          </AccordionSummary>
          <AccordionDetails>

          {apiStatus === true && graphState? (
            <div>
              <Typography>
                Here are the attributes that we think matches what you are looking for.
                You may adjust them below if you wish to. Hover over to the attributes
                to see their descriptions.
              </Typography>

              <AdjustAttributes
                graphState={graphState}
                setGraphState={setGraphState}
              />
            </div>
            ) : (
              <AlertMessage
                messageSeverity={"error"}
                messageText={"Please ensure that the above steps are completed before proceeding."}
              />
            )}
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 2 }} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
            <Typography component="span" color='blue'>Step 4: Get Songs!</Typography>
          </AccordionSummary>
          <AccordionDetails>

          {apiStatus === true && graphState? (
            <div>
              <Recommender />
            </div>
          ) : (
            <AlertMessage
                messageSeverity={"error"}
                messageText={"Please ensure that the above steps are completed before proceeding."}
              />
          )}

          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
