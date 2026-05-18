import AddPropertyBanner from "../../assets/Banners/AddPropertyBanner.jpg";
import PolicyLayout from "../../Components/PolicyLayout/PolicyLayout";
import { Helmet } from 'react-helmet-async';

const sections = [
    {
        id: "commitment",
        label: "Our Commitment",
        content: (
            <>
                <p className="font-Inter text-[12.5px] sm:text-[14.5px] 2xl:text-[16.5px] leading-[19px] sm:leading-[24px]">
                    Newlista is committed to providing a digital platform that is accessible to all users, including those with disabilities. We continually strive to improve the user experience and apply recognized accessibility standards to the extent reasonably practicable, including the Web Content Accessibility Guidelines (WCAG) 2.1, Levels A and AA, and the Americans with Disabilities Act (ADA).
                </p>
            </>
        ),
    },
    {

        id: "Efforts",
        label: "Our Efforts",
        content: (
            <>
                <ul className="mt-1 list-disc pl-6 space-y-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    <li>We design and maintain Newlista following best practices for accessibility. </li>
                    <li>We regularly review the platform to identify and address potential accessibility barriers. </li>
                    <li>Some features may rely on third-party tools or integrations outside our control; however, we make commercially reasonable efforts to work with vendors that support accessibility. </li>
                    <li>We conduct periodic audits using internal testing and assistive technologies such as screen readers (e.g., JAWS, NVDA, VoiceOver) to improve accessibility. </li>
                </ul>
            </>
        ),
    },
    {
        id: "Assistance",
        label: "Feedback & Assistance",
        content: (
            <>
                <p className="font-Inter text-[12.5px] sm:text-[14.5px] 2xl:text-[16.5px] leading-[19px] sm:leading-[24px]">
                    If you experience difficulty accessing any part of Newlista, don't hesitate to get in touch with us at: <span className="font-bold text-PurpleColor">support@newlista.com</span>
                </p>
                <p className="mt-3 font-bold">When contacting us, please provide:</p>
                <ul className="mt-1 list-disc pl-6 space-y-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    <li>
                        Your name and contact information
                    </li>
                    <li>
                        The webpage or feature where you experienced difficulty
                    </li>
                    <li>
                        A brief description of the issue
                    </li>
                </ul>
                <p className="font-Inter text-[12.5px] sm:text-[14.5px] 2xl:text-[16.5px] leading-[19px] sm:leading-[24px]">
                    We will make reasonable efforts to provide the information, content, or service you need in an accessible format.
                </p>
            </>
        ),
    },
    {
        id: "Portal",
        label: "Accessibility Portal",
        content: (
            <>
                <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    To facilitate transparency and continuous improvement, Newlista maintains an <span className="font-bold text-PurpleColor">Accessibility Portal</span> where users can view:
                </p>
                <ul className="mt-1 list-disc pl-6 space-y-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    <li>Accessibility audits and reports</li>
                    <li>Updates on ongoing accessibility improvements  </li>
                    <li>Guidance on using assistive technologies with our platform  </li>
                </ul>
                <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    You can access the portal here: <span className="font-bold text-PurpleColor"> [insert link to accessibility portal]</span>
                </p>
            </>
        ),
    },
    {
        id: "Content",
        label: "Third-Party Content",
        content: (
            <>
                <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    Certain links or features may direct you to third-party websites or services. We cannot guarantee that these third-party sites comply with accessibility laws or standards.


                </p>

            </>
        ),
    },
    {
        id: "Ongoing",
        label: "Ongoing Commitment",
        content: (
            <>
                <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    While we cannot guarantee that every part of Newlista will be fully accessible to every user, we are committed to listening, learning, and making continuous improvements to enhance accessibility for all.
                </p>

            </>
        ),
    },
];

export default function Accessibility() {
    return (
        <>

 <Helmet>
        <title>Newlista Accessibility Statement – Inclusive Investor Platform</title>
        <meta
          name="description"
          content="Discover how Newlista ensures accessibility and inclusive access for all investors using our investor‑only commercial real‑estate network."
        />
      </Helmet>

        <PolicyLayout
            title="Accessibility Statement"
            heading="Accessibility Statement – Inclusive Investor Platform"
            lastUpdated="October 1, 2025"
            desc="Newlista is committed to providing a digital platform that is accessible to all users, including those with disabilities."
            bannerImage={AddPropertyBanner}
            sections={sections}
            sidebarTitle="On this page"
            backToTopId="commitment"
        />

        </>
    );
}
