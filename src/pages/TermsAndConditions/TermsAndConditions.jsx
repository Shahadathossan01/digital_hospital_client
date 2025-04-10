
import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';

const terms = [
  "Users must provide accurate information during registration.",
  "Appointments are subject to doctor availability and approval.",
  "Video consultations are recorded for quality and legal purposes.",
  "Prescriptions provided are based on virtual consultation and medical judgment.",
  "Doctors and patients must maintain mutual respect and professionalism.",
  "Users agree not to misuse the platform in any illegal or harmful way.",
  "Sureline Health reserves the right to update terms at any time.",
];

const TermsAndConditions = () => {
  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: 'auto',
        p: 3,
        mt:8
      }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
          Terms & Conditions
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Typography variant="body1" gutterBottom>
          Welcome to Sureline Health! Before using our services, please read our Terms &
          Conditions carefully:
        </Typography>

        <List>
          {terms.map((term, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemIcon>
                <GavelIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={term} />
            </ListItem>
          ))}
        </List>

        <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
          By registering or booking an appointment, you agree to abide by these terms and
          use Sureline Health responsibly.
        </Typography>
      </Paper>
    </Box>
  );
};

export default TermsAndConditions;
