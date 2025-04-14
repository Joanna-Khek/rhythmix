import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  background: '#d2d1d5',
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
}));

export default function Instructions({ open, data, drawerCloseWidth, drawerOpenWidth }) {
  const [expanded, setExpanded] = React.useState('panel1');
  const [showCheckStatus, setShowCheckStatus] = React.useState(false);

  const handleButtonClick = () => {
    setShowCheckStatus(true);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div
        style={{
            marginLeft: open ? drawerOpenWidth : drawerCloseWidth, // matches your drawer width (240 when open, ~72 when closed)
            transition: 'margin-left 0.3s ease',
            padding: '16px'
        }}
        >
      <Accordion sx={{ mb: 2 }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography component="span" color='blue'>Step 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography>By clicking on the button below, you can check if required APIs
                are present in the .env file. <br />
                Proceed to the next step if the APIs are
                present and working properly.
            </Typography>

            <Button onClick={handleButtonClick}>Check API Status</Button>
            {showCheckStatus && <AlertMessage data={data}/>} {/* Conditionally render CheckStatus */}
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ mb: 2 }} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography component="span" color='blue'>Step 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ mb: 2 }} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography component="span" color='blue'>Step 3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
