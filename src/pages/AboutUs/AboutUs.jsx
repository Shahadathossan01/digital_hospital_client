import { Container, Typography, Grid, Card, CardContent, Divider } from "@mui/material";
import VideocamIcon from '@mui/icons-material/Videocam';
const AboutUs = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        About Us
      </Typography><Divider></Divider>
      <Typography variant="body1" paragraph align="center">
      Sureline, is a Complete digital healthcare platform that is available on demand
Our mission at Sureline is to transform the way you obtain medical care. Our goal is to make high-quality, reasonably priced, and easily accessible healthcare available to everyone, wherever they may be. You can quickly schedule a doctor's consultation if you live in a rural place. We recognize how difficult it may be to find time for doctor's appointments in the fast-paced world of today. For this reason, we make healthcare accessible so you may get the care you require without any fuss
      </Typography>
      <Typography sx={{marginTop:"50px"}} variant="h4" gutterBottom align="center">
      SureLine
      </Typography><Divider></Divider>
      <Typography variant="body1" paragraph align="center">
      Sureline Telehealth Care is a modern telemedicine platform designed to provide convenient and accessible healthcare services. By connecting patients with licensed medical professionals online, SLTC offers personalized consultations, prescriptions, and follow-up care from the comfort of your home. Our mission is to simplify healthcare access, making it more efficient, affordable, and available for everyone, no matter where they are.
      </Typography>
      <Typography sx={{marginTop:"50px"}} variant="h6">Accessible Healthcare for All</Typography>
      <Typography>Equal Access to Healthcare SLTC ensures that all individuals, regardless of their location, financial status, or background, have access to healthcare services.</Typography>
      <Typography sx={{marginTop:"30px"}} variant="h6">Expert Medical Team</Typography>
      <Typography>International Medical Expertise SLTC will recruit and maintain a network of certified and experienced healthcare professionals from both local and international backgrounds</Typography>

      <Typography sx={{marginTop:"50px"}} variant="h4" gutterBottom align="center">
      Who We Are
      </Typography><Divider></Divider>
      <Typography variant="body1" paragraph align="center">
      Sure Line Teleheathcare org established the ground-breaking e-health platform Sureline. Our team is made up of seasoned medical professionals, technologies, and customer service specialists who are committed to ensuring that everyone has access to healthcare. Our goal is to make it simpler for you to manage your health by using technology to close the gap between patients and healthcare professionals.

      </Typography>

      <Typography sx={{marginTop:"50px"}} variant="h4" gutterBottom align="center">
      What We Offer
      </Typography><Divider></Divider>
      <Grid container spacing={3} justifyContent="center">
        {[
          {
            title: "Instant Consultation",
            description:
              "For just 10tk, get in touch with medical experts rapidly and easily from any location.",
            icon:"VideocamIcon"
          },
          {
            title: "Video Consultations",
            description:
              "Use video calls to consult with qualified specialist physicians from the convenience of your home.",
          },
          {
            title: "Health Hub",
            description:
              "Take use of our extensive array of wellness and health services available throughout Bangladesh.",
          },
          {
            title: "Ambulance Services",
            description: "Immediately schedule both non-emergency and emergency services.",
          },
          {
            title: "Blood Bank Locator",
            description: "Easily locate and get in touch with local blood banks.",
          },
          {
            title: "Appointment Booking",
            description:
              "Easily make online appointments for your family members' medical care.",
          },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2">{item.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography  variant="h4" gutterBottom align="center" sx={{ marginTop:"50px" }}>
        Our Commitment
      </Typography><Divider></Divider>
      <Typography variant="body1" paragraph align="center">
        At Sureline, we are committed to quality care, affordability, convenience, and data privacy.
      </Typography>

      <Typography variant="h4" gutterBottom align="center" sx={{ marginTop:"50px"}}>
        Join Us on Our Journey
      </Typography><Divider></Divider>
      <Typography variant="body1" paragraph align="center">
        We would love to have you join us as we improve healthcare. Sureline can assist with everything
        from a brief consultation to ongoing medical care.
      </Typography>
      <Typography variant="body1" align="center" fontWeight="bold">
        "We prioritize your health."
      </Typography>

      <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4 }}>
        Contact Us
      </Typography><Divider></Divider>
      <Typography variant="body1" paragraph align="center">
        Email: sureline.official@gmail.com | Call: 01954346618
      </Typography>

      <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4 }}>
        Our Address
      </Typography><Divider></Divider>
      <Typography variant="body1" paragraph align="center">
        Savar, Dhaka, Bangladesh | Sureline Private Company Ltd.
      </Typography>
      <Typography variant="body2" align="center">
        Trade License Number: TRAD/DNCC/085514/2024
      </Typography>
    </Container>
  );
};

export default AboutUs;
