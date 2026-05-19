import React from "react";
import { Link } from "react-router-dom";
import AddPropertyBanner from "../../assets/Banners/AddPropertyBanner.jpg";
import PolicyLayout from "../../Components/PolicyLayout/PolicyLayout";
import { Helmet } from 'react-helmet-async';
const sections = [
    {
        id: "intro",
        label: "Introduction",
        content: (
            <>
                <p className="font-Inter text-[12.5px] sm:text-[14.5px] 2xl:text-[16.5px] leading-[19px] sm:leading-[24px]">
                    By accessing or using Newlista, you agree to be bound by the most recent 
version of these Terms of Use. We may update or modify these Terms from 
time to time. It is your responsibility to review them periodically. 
Continued use of the platform after changes are posted constitutes your 
acceptance of the revised Terms. By accessing or using Newlista, you agree to be bound by the most recent version of these Terms of Use. We may update or modify these Terms from time to time. It is your responsibility to review them periodically. Continued use of the platform after changes are posted constitutes your acceptance of the revised Terms.
                </p>
            </>
        ),
    },
    {

        id: "Platform",
        label: "1. Platform Purpose and Eligibility",
        content: (
    <>
        <p className="font-Inter text-[12.5px] sm:text-[14.5px] 2xl:text-[16.5px] leading-[19px] sm:leading-[24px]">
            Newlista is a networking platform exclusively for bona fide real estate investors seeking off-market investment opportunities.
        </p>

        <p className="font-semibold text-[14.5px] sm:text-[16px] mt-2">
            By signing up, users agree:
        </p>

        <ul className="mt-1 list-disc pl-6 space-y-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            <li>
                They are real estate investors acting on their own behalf or for a legitimate investing entity.
            </li>

            <li>
                Licensed brokers and agents may join only in their capacity as investors and not for the purpose of soliciting clients, marketing listings, obtaining listing agreements, representing other users, or offering brokerage services. Any attempt to use the platform primarily to obtain listings, represent investors, solicit clients, or conduct brokerage activity is strictly prohibited and may result in suspension or termination without refund.
            </li>

            <li>
                Service providers, vendors, marketers, consultants, lenders, contractors, wholesalers, fundraisers, and other third parties may not use Newlista primarily to advertise, promote, solicit, pitch, or sell services or products to users, unless expressly authorized by Newlista in writing.
            </li>

            <li>
                Users may not use Newlista to market, broker, wholesale, raise capital, solicit investments, promote outside services, or send unsolicited commercial messages to other users.
            </li>

            <li>
                Misuse, misrepresentation, solicitation, spam, or conduct inconsistent with Newlista’s investor-focused purpose may result in suspension, termination, or permanent removal from the platform without refund.
            </li>

            <li>
                Newlista reserves the right to verify eligibility, review account activity, limit access, remove content, suspend accounts, and take other action necessary to protect platform integrity.
            </li>

            <li>
                Users must provide accurate, current, and complete information when registering and throughout their use of the platform. By creating an account, users represent and warrant that all information submitted is truthful and not misleading. Users agree to update their account details to maintain accuracy promptly. Misrepresentation, false credentials, impersonation, or use of another person’s or entity’s identity is strictly prohibited and may result in immediate suspension or termination.
            </li>

            <li>
                Users are responsible for ensuring their use of the platform complies with all applicable laws, including but not limited to securities laws, advertising laws, anti-spam laws, Fair Housing laws, and other federal, state, and local requirements.
            </li>

            <li>
                Accounts are personal and non-transferable. Each registered user is responsible for maintaining their own account and may not share, transfer, or allow access to it with other individuals or entities. Any attempt to transfer or share an account is grounds for immediate suspension or termination without refund.
            </li>
        </ul>
    </>
),
    },
    {
        id: "Disclaimer",
        label: "2. Disclaimer & Risk Acknowledgment",
       content: (
    <>
        <p className="font-Inter text-[12.5px] sm:text-[14.5px] 2xl:text-[16.5px] leading-[19px] sm:leading-[24px]">
            Newlista is not a licensed broker, dealer, investment advisor, securities intermediary, or law firm, and does not offer investment, tax, legal, securities, or financial advice. Nothing on this platform constitutes an offer, solicitation, recommendation, endorsement, or advice to buy, sell, invest in, finance, syndicate, or participate in any securities, real estate interests, investment contracts, joint ventures, partnerships, or other investment products.
        </p>

        <p className="font-Inter text-[12.5px] sm:text-[14.5px] 2xl:text-[16.5px] leading-[19px] sm:leading-[24px]">
            We do not form, arrange, structure, sponsor, promote, or facilitate real estate syndications, joint ventures, investment partnerships, securities offerings, pooled investments, or capital raising activities. Any discussions, negotiations, disclosures, representations, agreements, or transactions that occur between users are conducted independently and outside the scope of Newlista.
        </p>

        <p className="font-Inter text-[12.5px] sm:text-[14.5px] 2xl:text-[16.5px] leading-[19px] sm:leading-[24px]">
            Newlista does not determine, verify, certify, or represent whether any user is an accredited investor, non-accredited investor, sophisticated investor, qualified purchaser, lender, borrower, sponsor, issuer, broker, agent, or otherwise eligible to participate in any investment, financing, syndication, securities offering, or real estate transaction. Users are solely responsible for asking appropriate questions, verifying the status and qualifications of other parties, obtaining any necessary documentation, and confirming compliance with all applicable laws before communicating with, investing in, lending to, borrowing from, partnering with, or transacting with another user.
        </p>

        <p className="font-Inter text-[12.5px] sm:text-[14.5px] 2xl:text-[16.5px] leading-[19px] sm:leading-[24px]">
            All property listings are submitted by third parties and are not verified by Newlista. Users are solely responsible for verifying the accuracy, completeness, and legitimacy of any listings, and for conducting their own due diligence and obtaining professional advice before making investment or business decisions. Users must also ensure that their listings and communications comply with applicable laws, including, but not limited to, the Fair Housing Act, FTC advertising standards, anti-spam regulations, securities laws, and other relevant federal, state, and local requirements.
        </p>

        <p className="font-Inter text-[12.5px] sm:text-[14.5px] 2xl:text-[16.5px] leading-[19px] sm:leading-[24px]">
            Newlista does not screen, endorse, or guarantee the qualifications, financial capacity, accredited investor status, experience, licensing, authority, legality, or trustworthiness of any user. If you choose to connect, communicate, negotiate, invest, lend, borrow, partner, or transact with another user, whether through networking features, private messaging, contact forms, listings, or otherwise, you do so at your own risk.
        </p>

        <p className="font-Inter text-[12.5px] sm:text-[14.5px] 2xl:text-[16.5px] leading-[19px] sm:leading-[24px]">
            Newlista is not liable for any losses, disputes, failed transactions, regulatory issues, securities law violations, misrepresentations, omissions, or damages of any kind arising from user-to-user interactions, including but not limited to investment decisions, financing discussions, capital raising, partnerships, joint ventures, syndications, or other business dealings initiated through or outside the platform.
        </p>
    </>
),
    },
    {
        id: "Legal",
        label: "3. Syndication & Legal Compliance Notice",
        content: (
    <>
        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Syndication discussions must occur off-platform and fully comply with all applicable federal and state securities laws, including, but not limited to, regulations enforced by the U.S. Securities and Exchange Commission, state securities regulators, and the Federal Trade Commission.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Newlista does not facilitate, promote, arrange, structure, sponsor, or participate in the sale of securities, investment contracts, syndications, pooled investments, joint ventures, capital raising activities, or other regulated financial interests. Newlista does not verify users’ compliance with any securities, investment, advertising, consumer protection, or anti-fraud laws.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Newlista does not classify, verify, certify, or monitor whether any user is an accredited investor, non-accredited investor, sophisticated investor, qualified purchaser, lender, borrower, sponsor, issuer, broker, agent, or otherwise eligible to participate in any private offering, syndication, securities transaction, pooled investment, joint venture, or other investment-related activity.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            The accredited investor concept may apply to certain private securities offerings and exemptions under federal securities laws, including Regulation D. The applicable rules may vary depending on the type of offering, the parties involved, the nature of the communication, and applicable federal or state law.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Users are solely responsible for asking appropriate questions, verifying the status and qualifications of other parties, obtaining necessary documentation, and determining whether accredited investor status, investor suitability, disclosure obligations, registration requirements, exemption rules, or other legal requirements apply to any discussion, communication, investment, financing, partnership, syndication, or transaction.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Users are solely responsible for understanding and complying with all applicable securities, advertising, consumer protection, anti-fraud, and other federal, state, and local laws before engaging in any investment-related discussions or transactions.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Newlista strongly encourages users to consult with qualified securities counsel, a licensed real estate attorney, a tax advisor, a financial advisor, a syndication specialist, or other appropriate licensed professional before engaging in any investment-related activity. Users may also review guidance from the official SEC website at www.sec.gov and the FTC website at www.ftc.gov.
        </p>
    </>
),
    },
    {
        id: "Jurisdiction",
        label: "4. Governing Law & Jurisdiction",
content: (
    <>
        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            These Terms shall be governed by and construed in accordance with the laws of the State of Texas, without regard to conflict of laws principles.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            By using Newlista, you consent to the exclusive jurisdiction and venue of the courts located in Harris County, Texas, for any disputes not subject to arbitration, and you waive any objection to personal jurisdiction or venue in such courts.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            All disputes arising under or relating to these Terms shall first be resolved through binding arbitration as defined in Section 5. The decision of the arbitrator shall be final and enforceable in any court of competent jurisdiction.
        </p>
    </>
),
    },
    {
        id: "Class",
        label: "5. Arbitration & Class Action Waiver",
      content: (
    <>
        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            By creating an account, accessing, or using Newlista, you agree that any dispute, claim, or controversy arising out of or relating to these Terms, your account, your use of the platform, any listing, communication, transaction, interaction with another user, or any relationship with Newlista shall be resolved exclusively through final and binding individual arbitration, rather than in court, except where applicable law requires otherwise.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Arbitration shall be conducted in accordance with the rules of a recognized arbitration provider, such as AAA or JAMS, unless the parties mutually agree to another arbitration provider. All arbitration proceedings shall be conducted in Houston, Texas, unless Newlista and the user mutually agree to another location or unless applicable law requires a different venue. You acknowledge and agree that you will not require Newlista to travel outside Houston, Texas, for arbitration unless required by applicable law.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            You and Newlista knowingly and voluntarily waive any right to a trial before a judge or jury for any dispute covered by this arbitration provision, except for claims that cannot legally be required to be arbitrated. You and Newlista further agree that any dispute shall be brought only in an individual capacity and not as a plaintiff, claimant, class member, or representative in any class action, collective action, representative action, private attorney general action, or class arbitration.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            The arbitrator shall have authority to resolve disputes only on an individual basis. The arbitrator shall not have authority to consolidate claims of multiple users, preside over any form of class, collective, consolidated, or representative proceeding, or award relief to any person or entity other than the individual party seeking relief, except where applicable law requires otherwise.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Further details regarding the arbitration process are outlined in the Newlista Arbitration Policy, which is incorporated by reference into these Terms of Use. The Arbitration Policy governs the administration, rules, costs, procedures, location, and related matters of arbitration. By using Newlista, you acknowledge and agree that the Arbitration Policy forms part of these Terms.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            If any part of this arbitration provision, jury trial waiver, class action waiver, or class arbitration waiver is found unenforceable, invalid, or unlawful, the remaining provisions shall remain in effect to the fullest extent permitted by law, except where the unenforceable provision is essential to the agreement to arbitrate.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            For any dispute not subject to arbitration, you and Newlista agree to the exclusive jurisdiction and venue of the state or federal courts located in Harris County, Texas, unless applicable law requires otherwise.
        </p>
    </>
),
    },
    {
        id: "Conduct",
        label: "6. User Conduct",
       content: (
    <>
        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Users agree to the following conduct standards while using Newlista:
        </p>

        <ul className="mt-1 list-disc pl-6 space-y-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            <li>
                No harassing, spamming, or unsolicited promotions, in compliance with applicable anti-spam laws, including the CAN-SPAM Act.
            </li>

            <li>
                No offensive, discriminatory, or illegal content, and no advertising or listings that violate the Fair Housing Act, the Civil Rights Act, or other applicable federal, state, or local laws.
            </li>

            <li>
                Users must comply with all applicable local real estate and investment laws.
            </li>

            <li>
                Users may not misrepresent their investment capacity, track record, business affiliations, or credentials when using the networking features of Newlista. Any false, misleading, or exaggerated claims of financial ability or professional qualifications may result in suspension or permanent removal from the platform.
            </li>

            <li>
                No scraping, crawling, automated bots, or other unauthorized data collection methods may be used to access, copy, or extract content, listings, or user information from the platform. Any unauthorized access, scraping, data mining, or use of automated means to extract information is strictly prohibited and may violate the Computer Fraud and Abuse Act (CFAA), the Digital Millennium Copyright Act (DMCA), and other applicable laws. This prohibition applies regardless of the violator’s location. By accessing or attempting to access the platform, all users and non-users agree that these Terms apply to them, and that any violation is subject to enforcement under the laws of the United States and the State of Texas. Newlista reserves the right to pursue claims against violators in any jurisdiction, domestic or international, to the fullest extent permitted by law, including injunctive relief, damages, and recovery of attorneys’ fees.
            </li>
        </ul>

        <p className="mt-3 font-bold">Enforcement and Reporting:</p>

        <p className="mt-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Users may report any account, profile, listing, message, or activity they believe violates these Terms, including harassment, spamming, misrepresentation, scraping, solicitation, suspicious activity, or other misuse of the platform. Reports may be submitted through the reporting tools made available on the platform, including any report button or similar feature displayed on user profiles, listings, messages, or other areas of the platform, or by contacting Newlista directly.
        </p>

        <ul className="mt-1 list-disc pl-6 space-y-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            <li>Investigate reported violations,</li>
            <li>Suspend, restrict, or block accounts,</li>
            <li>Remove, hide, or limit content, and</li>
            <li>
                Terminate accounts for violations of these Terms, inappropriate conduct, misuse of the platform, or any activity that harms Newlista, the platform, or its users.
            </li>
        </ul>

        <p className="mt-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Newlista is not liable for any user-to-user interactions, including harassment, misrepresentation, or other misconduct. Users acknowledge that they use the platform at their own risk and that Newlista is under no obligation to monitor or enforce compliance. However, we will act on reports in a commercially reasonable manner.
        </p>
    </>
),
    },
    {
        id: "Intellectual",
        label: "7. Intellectual Property & Content Ownership",
        content: (
    <>
        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Users retain all rights to content they upload to Newlista.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            By submitting content, you grant Newlista a non-exclusive, worldwide, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, adapt, publish, display, and create derivative works of such content in connection with operating, marketing, and improving the platform. This includes the right to feature your listings in search results, promotional materials, email campaigns, and partner channels.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            You represent and warrant that you have all necessary rights, licenses, and permissions to submit the content and that it does not infringe or violate the rights of any third party, including intellectual property, publicity, or privacy rights.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Newlista complies with the Digital Millennium Copyright Act (DMCA) and will remove content that is reported to infringe third-party rights in accordance with DMCA procedures.
        </p>

        <p className="mt-3 font-bold">
            Content Quality, Moderation, and Listing Display
        </p>

        <p className="mt-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Newlista reserves the right, in its sole discretion, to review, reject, remove, suppress, de-prioritize, or decline to feature any listing, photo, description, profile content, or other user-submitted material that is duplicate, repetitive, incomplete, low quality, misleading, irrelevant, unlawful, or otherwise harmful to the platform, user experience, or platform integrity.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Newlista may limit how many listings, photos, or similar content items from any one user appear at any given time in homepage sections, featured areas, carousels, promotional placements, search previews, or other display surfaces to maintain variety, quality, and usability.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Newlista may mark content as “Needs Revision” and request that a user provide corrected or improved photos, descriptions, or other listing details before the content can remain prominently displayed or continue to appear in certain areas of the platform.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Newlista may make non-material formatting or display adjustments for operational, accessibility, performance, or layout purposes, including cropping, resizing, compressing, reformatting, or standardizing submitted images or content for display. However, Newlista is not obligated to make substantive edits to user content and may instead hide, suspend, or remove it until the user revises it or Newlista otherwise approves it.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Failure to respond to a revision request, or repeated submission of duplicate, misleading, or low-quality content, may result in reduced visibility, removal of the affected content, suspension of listing privileges, or account action consistent with these Terms.
        </p>
    </>
),
    },
    {
        id: "Cookies&Data",
        label: "8. Privacy, Cookies, Data, and Communication Consent",
       content: (
    <>
        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            By registering, users agree to Newlista’s Privacy Policy (accessible via the link in the website footer).
        </p>

        <p className="mt-3 font-bold">Cookies & Analytics</p>

        <ul className="mt-1 list-disc pl-6 space-y-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            <li>
                Newlista uses essential cookies to operate the platform (such as login sessions and security).
            </li>

            <li>
                Non-essential cookies, including analytics (e.g., Google Analytics) and potential advertising/personalization cookies, may be used to track usage, improve platform performance, and enhance user experience. Users acknowledge that Newlista is operated and hosted in the United States. If you access the platform from outside the U.S., you consent to the transfer, storage, and processing of your personal information in the United States in accordance with our Privacy Policy.
            </li>

            <li>
                Users located in the European Union (EU), European Economic Area (EEA), or other regions with similar privacy laws will be asked to provide explicit consent before non-essential cookies are placed on their devices.
            </li>

            <li>
                U.S. users may opt out of non-essential cookies via the cookie banner or browser settings.
            </li>

            <li>
                By continuing to use Newlista after being presented with a cookie consent notice, you acknowledge and agree to the placement and use of cookies as described in our Privacy Policy.
            </li>
        </ul>

        <p className="mt-3 font-bold">Data and Communication Consent</p>

        <ul className="mt-1 list-disc pl-6 space-y-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            <li>
                Users consent to receive digital communications from Newlista, including transactional or relationship emails, platform updates, and, where permitted by law, promotional messages.
            </li>

            <li>
                Commercial email communications will comply with the CAN-SPAM Act and include a clear opt-out option where required by law. Transactional or relationship emails relating to account activity, security, billing, listings, networking, or other core platform functions may be sent as part of the service. They may not include the same opt-out rights as marketing emails.
            </li>

            <li>
                For SMS or phone-based alerts (if applicable), users provide express consent in accordance with the Telephone Consumer Protection Act (TCPA).
            </li>

            <li>
                Consent to cookies, analytics, and communications is a condition of using Newlista to the extent necessary for platform operation. Users may revoke consent for non-essential cookies and marketing communications in accordance with the provided opt-out procedures. Still, such revocation will not prevent Newlista from sending necessary service, security, billing, legal, or other transactional communications.
            </li>

            <li>
                <span className="font-semibold !text-black">SMS Communications:<br /></span>
                Newlista does not send commercial SMS messages to users at this time. If SMS messaging is implemented in the future, it will comply with all applicable federal and state laws, including any bonding or registration requirements. Newlista is not responsible for compliance with such laws for any SMS messages sent by third-party users, service providers, or other entities. Users who opt in to receive SMS messages are responsible for providing accurate contact information and obtaining any necessary permissions under applicable law.
            </li>
        </ul>
    </>
),
    },
    {
        id: "accessibility",
        label: "9. Accessibility Statement",
       content: (
    <>
        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Newlista is committed to providing a website and digital platform that are reasonably accessible to users with disabilities and to making good-faith efforts to comply with the Americans with Disabilities Act, applicable accessibility laws, and generally recognized digital accessibility standards.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Newlista strives to design, develop, and maintain its website, platform, content, and digital services in a manner consistent with the Web Content Accessibility Guidelines (WCAG), to the extent reasonably practicable and commercially feasible. Accessibility is an ongoing effort, and Newlista will continue working to identify and address accessibility barriers as the platform evolves.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            If you experience difficulty accessing any page, feature, form, listing, document, communication, or other part of the Newlista platform, please get in touch with us at support@newlista.com. When contacting us, please describe the accessibility issue, the page or feature involved, the device and browser you are using, and the best way for us to reach you.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Upon receiving an accessibility request, Newlista will make commercially reasonable efforts to review the issue, respond within a reasonable time, and, where appropriate, provide the requested information, service, or communication in an accessible alternative format or through an alternative method.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Some content, features, documents, user-submitted materials, or third-party integrations may not yet be fully accessible or may be outside Newlista’s direct control. Newlista does not control third-party platforms, plug-ins, browsers, assistive technologies, or user-submitted content. However, when Newlista becomes aware of an accessibility barrier within its reasonable control, it will make good-faith efforts to address the issue or provide a reasonable alternative.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Nothing in this Accessibility Statement is intended to limit any rights available under applicable law.
        </p>
    </>
),
    },
    {
        id: "children",
        label: "10. Children’s Online Privacy (COPPA)",
        content: (
    <>
        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            This platform is intended exclusively for users aged 18 years or older. We do not knowingly collect or solicit personal information from anyone under the age of 13. If we learn that personal data from a child under 13 has been inadvertently collected without verified parental consent, we will promptly delete such information.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            The Children’s Online Privacy Protection Act (COPPA) applies to any U.S. website that knowingly collects data from children under 13. Even though this platform is not directed to children and does not intentionally collect such data, we are still required to:
        </p>

        <ul className="mt-1 list-disc pl-6 space-y-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            <li>State that our platform is not for children under 13,</li>
            <li>Affirm that we do not knowingly collect personal information from children under 13, and</li>
            <li>Delete any such data if it is inadvertently collected.</li>
        </ul>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            By using this platform, you affirm that you are at least 18 years old and agree not to provide any personal information if you are under 18.
        </p>
    </>
),
    },
    {
        id: "Subscriptions",
        label: "11. Payment, Subscriptions, and Refunds",
       content: (
    <>
        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Certain features of Newlista may require payment of fees, including membership, subscription, upgrade, or other paid access fees. By purchasing or subscribing to any paid Newlista feature, you agree to provide accurate, current, and complete billing and payment information and authorize Newlista, or its third-party payment processor, to charge your selected payment method for all applicable fees, taxes, service charges, renewal charges, and other amounts associated with your selected plan or purchase.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Unless otherwise stated at the time of purchase, subscriptions automatically renew at the end of each billing cycle at the then-current rate. By subscribing, you authorize Newlista or its third-party payment processor to automatically charge your payment method on a recurring basis until you cancel your subscription or Newlista terminates your access in accordance with these Terms.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            You are responsible for reviewing subscription terms, pricing, billing frequency, renewal terms, cancellation procedures, and any promotional or introductory pricing before completing your purchase. Promotional, discounted, trial, or introductory pricing may expire, and subsequent renewals may be charged at the then-current standard rate unless otherwise stated at the time of purchase.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            All payments are non-refundable except as required by applicable law or expressly stated otherwise in writing by Newlista. Cancellation stops future renewal charges but does not entitle you to a refund, credit, or prorated refund for the current billing period, unused time, partially used services, account inactivity, listing inactivity, removed content, suspended access, or failure to use the platform.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            You may cancel auto-renewal at any time before the next renewal date through your account settings, payment portal, or another cancellation method provided by Newlista. If you cancel after a renewal charge has already been processed, the cancellation will apply to the next billing cycle unless otherwise required by law.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            You are solely responsible for paying any sales tax, use tax, value-added tax, or other transaction-based taxes, duties, or government charges imposed on your purchase or subscription. Newlista remains responsible for its own income taxes.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            If your payment method is declined, expired, unavailable, disputed, reversed, or otherwise cannot be charged, Newlista may suspend, restrict, downgrade, or terminate your paid access or account until payment is successfully processed. You remain responsible for any unpaid amounts owed.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Chargebacks, fraudulent payment disputes, abuse of refund processes, or unpaid balances may result in account suspension, termination, collection activity, or loss of access without refund. Newlista is not responsible for any fees charged by your bank, card issuer, or payment processor.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Third-party payment processors may handle transactions, and your use of those services may be subject to their own terms, privacy policies, and dispute procedures. Newlista does not control third-party processors and is not responsible for their actions, errors, or delays.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Newlista reserves the right to modify fees, subscription plans, billing terms, or pricing at any time. Continued use of paid features after changes take effect constitutes acceptance of the updated pricing and terms, to the extent permitted by law.
        </p>
    </>
),
    },
    {
        id: "Party",
        label: "12. Third-Party Services & Integrations",
       content: (
    <>
        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Newlista may include features, links, or integrations provided by third parties, including, but not limited to, mapping providers, payment processors, analytics tools (e.g., Google Analytics), and other services.
        </p>

        <ul className="mt-1 list-disc pl-6 space-y-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            <li>
                Newlista does not control these third-party services and is not responsible or liable for their availability, accuracy, functionality, content, or security.
            </li>

            <li>
                Your use of any third-party service is subject to that provider’s terms and policies, and you assume all risks associated with such use.
            </li>

            <li>
                Users remain solely responsible for reviewing third-party providers’ privacy policies, cookie practices, and terms of service prior to use.
            </li>

            <li>
                By enabling cookies or analytics features, you acknowledge that third-party providers (such as Google) may collect data in accordance with their own policies.
            </li>
        </ul>
    </>
),
    },
    {
        id: "Survival",
        label: "13. Termination & Survival",
        content: (
    <>
        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Newlista may, at its sole discretion, suspend, restrict, or terminate your account at any time for violations of these Terms, unlawful activity, or any conduct that harms the platform or its users. Upon termination, your right to use Newlista will immediately cease.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            If your account is terminated due to a violation of these Terms, any prepaid fees are non-refundable, and you forfeit any remaining time on your subscription or membership. No credits or refunds will be issued for partial billing periods.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            The following provisions shall survive termination: intellectual property licenses granted to Newlista, disclaimers and limitations of liability, arbitration and dispute resolution provisions, obligations regarding payment and subscriptions, enforcement provisions, and any other obligations which by their nature are intended to survive termination.
        </p>
    </>
),
    },
    {
        id: "Market",
        label: "14. Market Data & Analytics",
       content: (
    <>
        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            By posting listings, profile information, communications, or other content on Newlista, you grant Newlista a nonexclusive, worldwide, royalty-free license to collect, use, aggregate, analyze, and create derived data from such content, along with platform activity, user interactions, listing engagement, search activity, message activity, traffic patterns, and other usage data.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Newlista may use such information for purposes including market research, analytics, platform improvements, investor resources, listing performance insights, fraud prevention, security, user experience improvements, internal business analysis, industry reporting, marketing, and development of new features or services.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Any market data, analytics, reports, trends, or insights shared outside Newlista will be presented in anonymized, deidentified, or aggregate form, and Newlista will not intentionally disclose personally identifiable information without your consent, except as permitted by law, required for platform operation, or described in the Privacy Policy.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            You retain all rights to the content you post, subject to the licenses, permissions, and usage rights granted to Newlista under these Terms and the Privacy Policy.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Newlista may retain and use anonymized, deidentified, aggregate, or derived data even after content is removed or an account is terminated, provided such data does not reasonably identify you as an individual.
        </p>
    </>
),
    },
    {
        id: "inspection",
        label: "15. Property Inspection, Meeting, and Health Risks",
       content: (
    <>
        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Users acknowledge that visiting properties, inspecting real estate, meeting with other users, communicating with strangers, touring vacant or occupied properties, entering construction sites, or participating in business activities connected to Newlista may involve inherent and unforeseeable risks. These risks include, but are not limited to, personal injury, illness, permanent disability, death, property damage, theft, assault, unsafe conditions, environmental hazards, hazardous materials, industrial equipment, structural defects, construction activity, fire, mold, animals, criminal activity, tenant or occupant conduct, neighborhood conditions, weather conditions, transportation risks, and the actions or omissions of other parties.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Newlista does not arrange, supervise, inspect, approve, control, or guarantee any property visit, meeting, showing, inspection, business discussion, negotiation, transaction, or interaction between users. Any decision to visit a property, meet another user, inspect a property, exchange information, negotiate, invest, lend, borrow, partner, or transact with another party is made solely by the users involved and is outside Newlista’s control.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            By using the platform and choosing to participate in any property viewing, inspection, meeting, communication, negotiation, transaction, or business interaction, you knowingly and voluntarily assume all risks associated with those activities. You are solely responsible for taking appropriate safety precautions, verifying the identity and authority of other parties, confirming property access rights, inspecting conditions, obtaining professional advice, and determining whether any meeting, property visit, or business activity is safe and appropriate.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            To the fullest extent permitted by law, you agree to release, defend, indemnify, and hold harmless Newlista, its owners, directors, officers, employees, contractors, agents, affiliates, successors, and assigns from and against any claims, demands, liabilities, losses, damages, injuries, deaths, expenses, costs, and attorneys’ fees arising out of or related to your property visits, inspections, meetings, communications, negotiations, transactions, business activities, or interactions with other users or third parties, including claims involving personal injury, property damage, financial loss, illness, death, misrepresentation, unsafe conditions, or the acts or omissions of other users or third parties.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            This release and indemnification apply whether the activity occurs through the platform, after an introduction made through the platform, or outside the platform after users choose to communicate or interact independently. Newlista is not responsible for the conduct, representations, omissions, safety practices, property conditions, access rights, credentials, financial ability, or legal authority of any user, property owner, tenant, occupant, broker, service provider, contractor, or third party.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Users are strongly encouraged to conduct their own due diligence, use caution when meeting unfamiliar persons, meet in safe or public locations when appropriate, avoid entering unsafe or unauthorized areas, bring qualified professionals when inspecting property, confirm permission to enter any property, comply with all applicable laws, and seek legal, financial, environmental, insurance, engineering, inspection, or other professional advice where appropriate.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Nothing in this section is intended to waive rights or liabilities that cannot be waived under applicable law.
        </p>
    </>
),
    },
    {
        id: "DMCA",
        label: "16. Copyright Infringement and DMCA Notice",
       content: (
    <>
        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Newlista respects the intellectual property rights of others and expects all users to do the same.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            If you believe that content posted on Newlista infringes your copyright, you may submit a written notice to Newlista containing the following:
        </p>

        <ul className="mt-1 list-disc pl-6 space-y-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            <li>Your name and contact information,</li>
            <li>A description of the copyrighted work claimed to be infringed,</li>
            <li>Identification of the material on Newlista that you claim infringes your copyright,</li>
            <li>A good-faith statement that you are authorized to act on behalf of the rights holder, and</li>
            <li>Your electronic or physical signature.</li>
        </ul>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Newlista will respond to valid DMCA notices in accordance with the Digital Millennium Copyright Act (DMCA), including removing or restricting access to infringing content.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Accounts belonging to users who repeatedly infringe copyrights may be terminated at Newlista’s sole discretion.
        </p>
    </>
),
    },
    {
        id: "Rights",
        label: "17.  California Residents’ Rights (California Consumer Privacy Act, as amended by the California Privacy Rights Act) ",
        content: (
    <>
        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            If you are a California resident, you have specific rights under the California Consumer Privacy Act, as amended by the California Privacy Rights Act, including the right to:
        </p>

        <ul className="mt-1 list-disc pl-6 space-y-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            <li>Request access to the personal information we have collected about you,</li>
            <li>Request correction of inaccurate personal information,</li>
            <li>Request deletion of your personal information,</li>
            <li>Opt-out of the sale or sharing of your personal information (if applicable), and</li>
            <li>Obtain information about how your personal information is used, disclosed, or shared.</li>
        </ul>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            To exercise any of these rights, please get in touch with us at privacy@newlista.com. We will respond in accordance with applicable law.
        </p>
    </>
),
    },
    {
        id: "Liability",
        label: "18. Liability & Indemnification",
       content: (
    <>
        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            By using Newlista, you acknowledge and agree that your access to and use of the platform, its features, listings, content, and third-party integrations is at your own risk. Newlista, its officers, directors, employees, agents, affiliates, and partners are not liable for any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to:
        </p>

        <ul className="mt-1 list-disc pl-6 space-y-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            <li>Financial losses, investment losses, or lost opportunities,</li>
            <li>Personal injury, property damage, or death,</li>
            <li>Harassment, misrepresentation, or misconduct by other users,</li>
            <li>Errors, inaccuracies, or omissions in listings or content, and</li>
            <li>Any loss arising from third-party services, integrations, or links.</li>
        </ul>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            You agree to indemnify, defend, and hold harmless Newlista and its affiliates from and against any claims, liabilities, damages, losses, or expenses, including reasonable attorneys’ fees, arising out of or related to:
        </p>

        <ul className="mt-1 list-disc pl-6 space-y-1 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            <li>Your use of the platform or violation of these Terms,</li>
            <li>Your interactions with other users or third parties,</li>
            <li>Any content you submit, post, or transmit, and</li>
            <li>Any breach of applicable laws, rules, or regulations.</li>
        </ul>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            This indemnification obligation survives the termination of your account and your use of Newlista. In no event shall Newlista’s total aggregate liability to you for all claims arising out of or relating to these Terms or your use of the platform exceed the total amount of subscription or service fees you have paid to Newlista in the twelve (12) months immediately preceding the event giving rise to the claim.
        </p>

        <p className="mt-2 font-Inter text-[12.5px] leading-[19px] sm:leading-[24px] sm:text-[14.5px] 2xl:text-[16.5px]">
            Newlista reserves the right to update or modify these Terms of Use at any time. Changes will become effective upon posting to the platform, and continued use of Newlista after such changes constitutes acceptance of the revised Terms.
        </p>
    </>
),
    },
];

export default function TermsAndCondition() {
    return (
        <>

 <Helmet>
        <title>Terms of Use | Commercial Real Estate Networking Rules</title>
        <meta
          name="description"
          content="Review Newlista’s terms of use to understand our investor‑only platform rules, responsibilities and policies for secure real‑estate networking."
        />
      </Helmet>

        <PolicyLayout
            title="Terms of Use"
            lastUpdated="April 1 2026"
            heading="Newlista Terms of Use for Investors"
            desc="We may update or modify these Terms from time to time. It is your responsibility to review them periodically"
            bannerImage={AddPropertyBanner}
            sections={sections}
            sidebarTitle="On this page"
            backToTopId="intro"
        />
        </>
    );
}
