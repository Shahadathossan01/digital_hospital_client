
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
import ReplayIcon from '@mui/icons-material/Replay';

const refundPoints = [
  "Users can request a refund if the doctor cancels the appointment or fails to join the video consultation.",
  "Refund requests must be made within 24 hours of the scheduled appointment time.",
  "No refunds will be issued for missed appointments by the patient without prior cancellation.",
  "In case of technical failure on our end, users are eligible for a full refund or reschedule.",
  "All refund requests will be reviewed and processed within 5–7 business days.",
  "Refunds will be credited to the original payment method used during the transaction.",
  "Sureline Health reserves the right to refuse refunds for misuse or policy violations.",
];

const RefundPolicy = () => {
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
          Refund Policy
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Typography variant="body1" gutterBottom>
          At Sureline Health, we strive to ensure fair and transparent payment practices. Please read our refund policy carefully:
        </Typography>

        <List>
          {refundPoints.map((point, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemIcon>
                <ReplayIcon color="success" />
              </ListItemIcon>
              <ListItemText primary={point} />
            </ListItem>
          ))}
        </List>

        <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
          By making a payment on Sureline Health, you acknowledge and accept our refund terms and conditions.
        </Typography>
      </Paper>
    </Box>
  );
};

export default RefundPolicy;
