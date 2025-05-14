import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
} from "@mui/material";

const features = [
  {
    title: "Instant Consultation",
    description:
      "For just 10tk, get in touch with medical experts rapidly and easily from any location.",
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
    description:
      "Immediately schedule both non-emergency and emergency services.",
  },
  {
    title: "Blood Bank Locator",
    description:
      "Easily locate and get in touch with local blood banks.",
  },
  {
    title: "Appointment Booking",
    description:
      "Easily make online appointments for your family members' medical care.",
  },
];

const SectionTitle = ({ title }) => (
  <>
    <Typography variant="h4" align="center" gutterBottom sx={{ mt: 8 }}>
      {title}
    </Typography>
    <Divider sx={{ mb: 4, mx: "auto", width: "60%" }} />
  </>
);

const AboutUs = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <SectionTitle title="About Us" />
      <Typography variant="body1" paragraph align="center">
        Sureline is a complete digital healthcare platform available on demand. Our mission is to
        transform the way you obtain medical care by making high-quality, affordable, and accessible
        healthcare available to everyone, regardless of location.
      </Typography>
      <Typography variant="body1" paragraph align="center">
        We recognize how difficult it may be to find time for appointments in today's fast-paced
        world. Sureline simplifies access to care so you can get the help you need without any hassle.
      </Typography>

      <SectionTitle title="Sureline" />
      <Typography variant="body1" paragraph align="center">
        Sureline Telehealth Care is a modern telemedicine platform connecting patients with licensed
        professionals. We offer personalized consultations, prescriptions, and follow-up care—all from
        the comfort of your home.
      </Typography>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" gutterBottom>
          Accessible Healthcare for All
        </Typography>
        <Typography variant="body2">
          SLTC ensures that all individuals—regardless of location or background—have access to quality care.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
          Expert Medical Team
        </Typography>
        <Typography variant="body2">
          SLTC maintains a network of experienced healthcare professionals from both local and
          international backgrounds.
        </Typography>
      </Box>

      <SectionTitle title="Who We Are" />
      <Typography variant="body1" paragraph align="center">
        Sureline Telehealthcare was established to revolutionize digital healthcare. Our team of
        seasoned doctors, engineers, and customer support experts works together to ensure healthcare
        access for everyone. We use technology to close the gap between patients and professionals.
      </Typography>

      <SectionTitle title="What We Offer" />
      <Grid container spacing={4}>
        {features.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={3} sx={{ height: "100%" }}>
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

      <SectionTitle title="Our Commitment" />
      <Typography variant="body1" paragraph align="center">
        At Sureline, we are committed to quality care, affordability, convenience, and data privacy.
      </Typography>

      <SectionTitle title="Join Us on Our Journey" />
      <Typography variant="body1" paragraph align="center">
        Whether you need a brief consultation or ongoing medical support, Sureline is here to help you
        every step of the way.
      </Typography>
      <Typography variant="body1" align="center" fontWeight="bold">
        "We prioritize your health."
      </Typography>

      <SectionTitle title="Contact Us" />
      <Typography variant="body1" paragraph align="center">
        Email: <strong>sureline.official@gmail.com</strong> | Call: <strong>01954346618</strong>
      </Typography>

      <SectionTitle title="Our Address" />
      <Typography variant="body1" paragraph align="center">
        Savar, Dhaka, Bangladesh | Sureline Private Company Ltd.
      </Typography>
      <Typography variant="body2" align="center">
        Trade License Number: <strong>TRAD/DNCC/085514/2024</strong>
      </Typography>
    </Container>
  );
};

export default AboutUs;
