import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

export default function FrequentlyAsked() {
  return (
    <div>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: 4,
          color: '#40c4ff',
        }}
      >
        Frequently Asked Questions
      </Typography>

      {/* Accordion 1 */}
      <Accordion sx={{ backgroundColor: '#263238', color: 'white', borderRadius: 2, marginBottom: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>
            What is the purpose of this platform?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontSize: '14px', color: '#cfd8dc' }}>
            This platform is designed to help users manage their appointments and medical needs easily, offering one-to-one video communication and online prescription services.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Accordion 2 */}
      <Accordion sx={{ backgroundColor: '#263238', color: 'white', borderRadius: 2, marginBottom: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>
            How can I apply for an appointment?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontSize: '14px', color: '#cfd8dc' }}>
            You can apply for an appointment by filling out a form in the app. Make sure your information is accurate to ensure prompt processing.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Accordion with Actions */}
      <Accordion sx={{ backgroundColor: '#263238', color: 'white', borderRadius: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>
            How can I get a prescription?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontSize: '14px', color: '#cfd8dc' }}>
            After your appointment, you will be provided with a prescription based on your consultation.
          </Typography>
        </AccordionDetails>
        {/* <AccordionActions>
          <Button
            sx={{
              backgroundColor: '#40c4ff',
              color: 'white',
              '&:hover': {
                backgroundColor: '#0288d1',
              },
              fontWeight: 'bold',
            }}
            size="small"
          >
            Get Started
          </Button>
        </AccordionActions> */}
      </Accordion>
    </div>
  );
}
