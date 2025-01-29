import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';

const Header = () => {
  return (
    <Box sx={{ textAlign: 'center', marginBottom: 3 ,marginTop:3}}>
      <Typography 
        variant="h4" 
        sx={{ 
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }, 
          fontWeight: 'bold', 
          color: 'primary.main',
        }}
      >
        Frequently asked Questions?
      </Typography>
      <Typography
    variant="body1"
    sx={{
      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.25rem' },
      color: 'text.secondary',
      lineHeight: 1.6,
      textAlign: 'center',
    }}
  >
    Questions you might ask about our services
  </Typography>
    </Box>
  );
};

const FrequentlyAskedCard=({item})=>{
  return (
    <Accordion sx={{ backgroundColor: '#263238', color: 'white', borderRadius: 2, marginBottom: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>
            {item.question}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontSize: '14px', color: '#cfd8dc' }}>
            {item.ans}
          </Typography>
        </AccordionDetails>
      </Accordion>
  )
}

const FrequentlyAskedList=()=>{
  const FQA=[
    {
      id:"1",
      question:"What is the purpose of this paltform?",
      ans:"This platform is designed to help users manage their appointments and medical needs easily, offering one-to-one video communication and online prescription services."
    },
    {
      id:"2",
      question:"How can I apploy for an appointment?",
      ans:"You can apply for an appointment by filling out a form in the app. Make sure your information is accurate to ensure prompt processing."
    },
    {
      id:"3",
      question:"How can I get prescription?",
      ans:"After your appointment, you will be provided with a prescription based on your consultation."
    }
  ]
  return(
    <>
      {
        FQA.map(item=>(
          <FrequentlyAskedCard key={item.id} item={item}></FrequentlyAskedCard>
        ))
      }
    </>
  )
}

export default function FrequentlyAsked() {
  return (
    <>
      <Header></Header>
      <FrequentlyAskedList></FrequentlyAskedList>
    </>
  );
}
