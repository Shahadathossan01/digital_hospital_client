
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
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';

const policies = [
  "We collect only the necessary personal information for registration and medical services.",
  "Your data is securely stored and encrypted in compliance with healthcare regulations.",
  "We do not share your personal or medical data with third parties without consent.",
  "Doctors only access patient information related to their appointments and consultations.",
  "All video consultations are encrypted and may be recorded for quality and legal purposes.",
  "Users have the right to request access, update, or delete their data from our system.",
  "Sureline Health follows strict data protection protocols to ensure user privacy.",
];

const PrivacyPolicy = () => {
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
          Privacy Policy
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Typography variant="body1" gutterBottom>
          At Sureline Health, your privacy is important to us. Here’s how we protect and manage your data:
        </Typography>

        <List>
          {policies.map((policy, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemIcon>
                <PrivacyTipIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary={policy} />
            </ListItem>
          ))}
        </List>

        <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
          By using Sureline Health, you agree to the collection and use of information in accordance with this policy.
        </Typography>
      </Paper>
    </Box>
  );
};

export default PrivacyPolicy;
