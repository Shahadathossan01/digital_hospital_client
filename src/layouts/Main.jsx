import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";
import { Box } from "@mui/material";
import Footer from "../components/shared/Footer/Footer";

const Main = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh", // Ensures the page takes full height
            }}
        >
            <Box>
                <Navbar />
            </Box>

            {/* Content should take up remaining space */}
            <Box sx={{marginTop:"80px"}}>
                <Outlet />
            </Box>

            {/* Footer always at the bottom */}
            <Box sx={{ width: "100%", mt: "auto" }}>
                <Footer />
            </Box>
        </Box>
    );
};

export default Main;
