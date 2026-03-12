import React from "react";
import { Link } from "react-router-dom";
import AddPropertyBanner from "../../assets/Banners/AddPropertyBanner.jpg";
import PolicyLayout from "../../Components/PolicyLayout/PolicyLayout";
import { Helmet } from 'react-helmet-async';

const sections = [
    {
        id: "intro",
        label: "1. Introduction",
        content: (
            <>
                <p className="font-Inter text-[12.5px] sm:text-[14.5px] 2xl:text-[16.5px] leading-[19px] sm:leading-[24px]">
                    Welcome to Newlista (“we,” “us,” “our”). We are committed to protecting your privacy and personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit or use <Link to={'/'}>www.newlista.com</Link> (the “Site”), including your rights under the California Consumer Privacy Act (CCPA/CPRA) and other applicable laws.
                </p>
                <p className="mt-2 font-Inter text-[12.5px] sm:text-[14.5px] 2xl:text-[16.5px] leading-[19px] sm:leading-[24px]">
                    By using Newlista, you consent to the data practices described in this policy.
                </p>
            </>
        ),
    },
    {
        id: "collect",
        label: "2. What Information We Collect",
        content: (
            <>
                <p className="font-semibold text-[14.5px] sm:text-[16px]">A. Information You Provide Directly:</p>
                <ul className="mt-1 list-disc pl-6 space-y-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    <li>Full name, email address, phone number</li>
                    <li>Investment preferences</li>
                    <li>Location or property interests</li>
                    <li>Account information (username, password)</li>
                    <li>Payment and billing information (for paid features)</li>
                    <li>Any data or documents you upload to your account</li>
                    <li>Communications or inquiries sent to us</li>
                </ul>
                <p className="mt-4 font-medium text-[14.5px] sm:text-[16px]">B. Information Collected Automatically:</p>
                <ul className="mt-1 list-disc pl-6 space-y-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    <li>IP address</li>
                    <li>Browser and device information</li>
                    <li>Pages visited, time spent on pages, click data</li>
                    <li>Cookies, web beacons, and similar technologies</li>
                </ul>
            </>
        ),
    },
    {
        id: "cookies",
        label: "3. Cookies & Tracking Technologies",
        content: (
            <>
                <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    Newlista uses cookies and similar tracking technologies to improve user experience, support website functionality, and analyze usage trends.
                </p>
                <ul className="mt-2 list-disc pl-6 space-y-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    <li>
                        <span className="font-bold">Essential Cookies –</span> Required for site functionality, such as maintaining login sessions and security. These are always active.
                    </li>
                    <li>
                        <span className="font-bold">Analytics Cookies –</span> We use Google Analytics and similar tools to understand user behavior and improve performance. These may collect information such as your IP address, device type, and browsing activity.
                    </li>
                    <li>
                        <span className="font-bold">Advertising & Personalization Cookies –</span>{" "}
                        If enabled, these may be used to deliver relevant content, remember your preferences, or support retargeting/advertising campaigns
                    </li>
                </ul>
                <h3 className="mt-4 text-[16px] font-bold">Your Choices:</h3>
                <ul className="mt-2 list-disc pl-6 space-y-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    <li>
                        Users in the United States may opt out of analytics and advertising cookies via the cookie consent banner or browser settings.
                    </li>
                    <li>
                        Visitors from the European Union (EU), European Economic Area (EEA), or other regions with similar privacy laws will be asked to provide explicit consent before non-essential cookies (analytics or advertising) are placed on your device.
                    </li>
                </ul>
                <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    You may disable or withdraw consent at any time through your browser settings. Please note that some features of the Site may not function properly without cookies.
                </p>
            </>
        ),
    },
    {
        id: "use",
        label: "4. How We Use Your Information",
        content: (
            <>
                <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">We use your information to:</p>
                <ul className="mt-1 list-disc pl-6 space-y-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    <li>Provide and manage your account</li>
                    <li>Facilitate communication with other users (investor networking)</li>
                    <li>Verify eligibility for investor-only access</li>
                    <li>Enable property listing and viewing</li>
                    <li>Process payments (for premium features or listing fees)</li>
                    <li>Detect and prevent fraud or misuse</li>
                    <li>Send email communications (updates, offers, alerts)</li>
                    <li>Comply with legal obligations</li>
                </ul>
            </>
        ),
    },
    {
        id: "comms",
        label: "5. Communications Consent (CAN-SPAM / TCPA Compliance)",
        content: (
            <>
                <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    By signing up, you consent to receive emails from Newlista about your account, new features, and investor-related opportunities. If you provide a phone number, you may also receive SMS messages. You may opt out at any time via the unsubscribe link or by replying "STOP" to SMS messages
                </p>
            </>
        ),
    },
    {
        id: "disclosure",
        label: "6. Disclosure of Information",
        content: (
            <>
                <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    We do not sell or rent your personal information. However, we may disclose it under these circumstances:
                </p>
                <ul className="mt-1 list-disc pl-6 space-y-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    <li>
                        To service providers assisting with our operations (e.g., hosting, payment
                        processing, analytics)
                    </li>
                    <li>If required by law or legal process</li>
                    <li>In the event of a merger, acquisition, or sale of assets</li>
                    <li>
                        To enforce our Terms of Use or protect the rights, safety, or security of
                        Newlista or its users
                    </li>
                </ul>
                <p className="mt-3 font-bold">SMS Communications:</p>
                <p className="mt-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    Newlista does not send commercial SMS messages to users at this time. If SMS messaging is implemented in the future, it will comply with all applicable federal and state laws, including any bonding or registration requirements. Newlista is not responsible for compliance with such laws for any SMS messages sent by third-party users, service providers, or other entities. Users opting in to receive SMS messages are responsible for providing accurate contact information and for any permissions required under applicable law.
                </p>
                <p className="mt-3 font-bold">User-to-User Communications</p>
                <p className="mt-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    Newlista is a networking and marketplace platform that facilitates direct communication between users, including investors, property owners, and other participants. As part of this functionality, certain personal contact information—such as a user’s email address and/or phone number—may be shared with other users when a user initiates or participates in a communication through the platform (including inquiries, contact forms, or responses).
                </p>
                <p className="mt-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    By using Newlista and engaging in communications with other users, you acknowledge and consent to the disclosure of your contact information solely for the purpose of enabling direct communication and transaction-related discussions.
                </p>
                <p className="mt-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    Users are not required to share a personal phone number. If a user prefers not to disclose a personal phone number, they may choose to use an alternative contact method, such as a virtual or secondary phone number provided by a third-party service (for example, a free Google Voice number available at https://voice.google.com). Use of any third-party service is optional and subject to that provider’s own terms and privacy policies. Newlista does not control or endorse third-party services.
                </p>
                <p className="mt-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    Users should share contact information responsibly and understand that once information is shared with another user, Newlista does not control how that information is used outside the platform. Newlista is not responsible for communications, interactions, or transactions that occur directly between users.
                </p>
                <p className="mt-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    Certain communication features may be limited based on account type (Free vs. Paid), and the method of message delivery (email, dashboard messaging, or other means) may vary accordingly.
                </p>
            </>
        ),
    },
    {
        id: "thirdparty",
        label: "7. Third-Party Services and Links",
        content: (
            <>
                <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    Newlista may contain links to third-party websites. We are not responsible for their privacy practices or content. Please review their privacy policies before providing them with any information.
                </p>
            </>
        ),
    },
    {
        id: "retention",
        label: "8. Data Retention and Deletion",
        content: (
            <>
                <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    We retain user information for as long as necessary to provide the service and meet legal obligations. If you wish to delete your account or request data deletion, contact us at:{" "}
                    <Link className="text-PurpleColor font-semibold underline" to="mailto:privacy@newlista.com">
                        privacy@newlista.com
                    </Link>
                    .
                </p>
            </>
        ),
    },
    {
        id: "rights",
        label: "9. Your Rights Under CPRA/CCPA (California Residents)",
        content: (
            <>
                <p className="mt-2 font-Inter text-[15.5px] 2xl:text-[16.5px] font-semibold">If you are a California resident, you have the right to:</p>
                <ul className="mt-1 list-disc pl-6 space-y-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    <li>Request access to the personal information we collect</li>
                    <li>Request correction or deletion of your data</li>
                    <li>
                        Opt-out of the sale or sharing of your personal information (note: we do not
                        sell personal data)
                    </li>
                    <li>Request information about how your data is shared with third parties</li>
                </ul>
                <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    You may exercise these rights by contacting us at{" "}
                    <Link className="text-PurpleColor font-semibold underline" to="mailto:privacy@newlista.com">
                        privacy@newlista.com
                    </Link>
                    .
                </p>
            </>
        ),
    },
    {
        id: "children",
        label: "10. Children’s Privacy (COPPA)",
        content: (
            <>
                <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    Newlista is not intended for users under the age of 18. We do not knowingly collect personal data from children under 13. If you believe we have collected such information, contact us immediately at compliance@newlista.com
                    <Link
                        className="text-PurpleColor font-semibold underline ml-1"
                        to="mailto:compliance@newlista.com"
                    >
                        compliance@newlista.com
                    </Link>{" "}
                    and we will delete it.
                </p>
            </>
        ),
    },
    {
        id: "security",
        label: "11. Security of Your Information",
        content: (
            <>
                <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    We implement appropriate administrative, technical, and physical safeguards to protect your data. However, no system is completely secure. Users are responsible for keeping login credentials confidential.
                </p>
            </>
        ),
    },
    {
        id: "automated-access",
        label: "12. Automated Access and AI Crawlers",
        content: (
            <>
                <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    Our servers employ automated safeguards to monitor and manage non-human traffic. To protect the integrity and performance of our platform, certain automated bots, including large-scale data scrapers and AI model training crawlers—may be restricted or blocked. These measures help prevent unauthorized data harvesting and ensure that legitimate users and AI-assisted visitors accessing our site for informational or research purposes experience consistent performance and availability.
                </p>
            </>
        ),
    },
    {
        id: "accessibility",
        label: "13. ADA & Accessibility",
        content: (
            <>
                <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    Newlista is committed to providing a platform that is accessible to all users. If you experience any accessibility barriers while using our platform, please contact us at {" "}
                    <Link className="text-PurpleColor font-semibold underline ml-1" to="mailto:support@newlista.com">
                        support@newlista.com
                    </Link>
                    .
                </p>
            </>
        ),
    },
    {
        id: "intl",
        label: "14. International Use",
        content: (
            <>
                <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    Newlista is intended for use by U.S. residents only. If you access the platform from outside the U.S., you do so at your own risk and are responsible for complying with local laws.
                </p>
            </>
        ),
    },
    {
        id: "changes",
        label: "15.  Changes to This Privacy Policy",
        content: (
            <>
                <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page, and your continued use of Newlista constitutes your acceptance of those changes.
                </p>
            </>
        ),
    },
    {
        id: "contact",
        label: "16. Contact Us",
        content: (
            <>
                <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
                   If you have questions about this Privacy Policy or wish to make a request regarding your data, please contact:
                </p>
                <ul className="mt-2 list-none pl-0 space-y-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px]">
                    <li>Newlista</li>
                    <li>
                        Email:{" "}
                        <Link to="mailto:info@newlista.com" className="text-PurpleColor font-semibold underline">
                            privacy@newlista.com
                        </Link>
                    </li>
                    <li>
                        Website:{" "}
                        <Link
                            to="/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-PurpleColor font-semibold underline"
                        >
                            www.newlista.com
                        </Link>
                    </li>
                </ul>
            </>
        ),
    },
];

export default function PrivacyPolicy() {
    return (
        <>

 <Helmet>
        <title>Newlista Privacy Policy – Investor Data Protection</title>
        <meta
          name="description"
          content="Learn how Newlista protects investor data and privacy, manages cookies and ensures secure interactions across our investor‑only real‑estate network."
        />
      </Helmet>

        <PolicyLayout
            title="Privacy Policy"
            lastUpdated="December 24, 2025"
            heading="Privacy Policy – Investor Data Protection on Newlista"
            bannerImage={AddPropertyBanner}
            sections={sections}
            desc={"We are committed to respecting your privacy and protecting your personal information"}
            sidebarTitle="On this page"
            backToTopId="intro"
        />
        </>
    );
}
