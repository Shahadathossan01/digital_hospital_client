import AmbulanceService from "../../components/shared/AmbulanceService/AmbulanceService";
import Banner from "../../components/shared/Banner/Banner";
import BloodBankService from "../../components/shared/BloodBankService/BloodBankService";
import FrequentlyAsked from "../../components/shared/FrequentlyAsked/FrequentlyAsked";
import HealthConcerns from "../../components/shared/HealthConcerns/HealthConcerns";
import HealthSpecialties from "../../components/shared/HealthSpecialties/HealthSpecialties";
import HomeBlogs from "../../components/shared/HomeBlogs/HomeBlogs";
import ImageCarousel from "../../components/shared/ImageCarousel/ImageCarousel";
import InstantVideo from "../../components/shared/InstantVideo/InstantVideo";
import SearchDoctor from "../../components/shared/SearchDoctor/SearchDoctor";
import Services from "../../components/shared/Services/Services";
import HowItWorks from "../../components/shared/HowItworks/HowItWorks";
import WhyChooseUs from "../../components/shared/WhyChooseUs/WhyChooseUs";

const Home = () => {
    
    return (
        <>
            <SearchDoctor></SearchDoctor>
            <ImageCarousel></ImageCarousel>
            <Services></Services>
            <HealthConcerns></HealthConcerns>
            <HealthSpecialties></HealthSpecialties>
            <InstantVideo></InstantVideo>
            <AmbulanceService></AmbulanceService>
            <BloodBankService></BloodBankService>
            <HomeBlogs></HomeBlogs>
            <HowItWorks></HowItWorks>
            <WhyChooseUs></WhyChooseUs>
            <FrequentlyAsked></FrequentlyAsked>
        </>
    );
};

export default Home;