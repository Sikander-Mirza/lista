import GuidanceSec from "../../Components/AboutUs/GuidanceSec/GuidanceSec";
import HeroSection from "../../Components/AboutUs/HeroSection/HeroSection";
import TestimonialSection from "../../Components/Home/TestimonialSection/TestimonialSection";
import ServiceCardShowcase from "../../Components/AboutUs/ServiceCardShowcase/ServiceCardShowcase";
import { Helmet } from 'react-helmet-async';


const AboutUs = () => {
  return (
    <>

 <Helmet>
        <title>About Newlista | Real Estate Investor Network & Capital Partnerships</title>
        <meta
          name="description"
          content="Learn about Newlista’s investor‑only real‑estate network. We connect investors, facilitate capital partnerships and provide off‑market commercial opportunities."
        />
        <link rel="canonical" href="https://www.newlista.com/about-us" />

         <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name:
              "About Newlista | Commercial Real Estate Investor Network",
            url: "https://www.newlista.com/about-us",
            description:
              "Learn about Newlista’s investor-focused commercial real estate network connecting investors and sponsors to collaborate and discover property opportunities across the United States.",
            publisher: {
              "@type": "Organization",
              "@id": "https://www.newlista.com/#organization",
              name: "Newlista Ventures LLC",
              logo: {
                "@type": "ImageObject",
                url: "https://www.newlista.com/assets/NewlistaLogo-BV7NO06Q.png",
              },
            },
          })}
        </script>
        
      </Helmet>

      <HeroSection></HeroSection>
      <div className="min-[1780px]:px-28">
        <ServiceCardShowcase></ServiceCardShowcase>
        <GuidanceSec></GuidanceSec>
        <section className="py-14 flex justify-center 2xl:-ml-10">
          <TestimonialSection></TestimonialSection>
        </section>
      </div>
      
    </>
  );
};

export default AboutUs;
