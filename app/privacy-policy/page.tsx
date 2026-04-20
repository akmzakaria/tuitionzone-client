import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export const metadata = {
  title: 'Privacy Policy - TutionZone',
  description: 'Learn about how TutionZone collects, uses, and protects your personal data.',
}

export default function PrivacyPolicy() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-[#1B263B] mb-2">Privacy Policy</h1>
          <p className="text-[#676E7E] mb-8">Last updated: April 2026</p>

          <div className="bg-white rounded-lg shadow-sm p-8 space-y-8 text-[#1B263B]">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-[#1B263B] mb-4 flex items-center">
                <span className="w-1 h-8 bg-[#F4D35E] mr-3"></span>
                Introduction
              </h2>
              <p className="text-[#676E7E] leading-relaxed">
                At TutionZone, we are committed to protecting your privacy and ensuring you have a positive experience on
                our platform. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information
                when you use our website and services. Please read this policy carefully to understand our practices
                regarding your personal data.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-semibold text-[#1B263B] mb-4 flex items-center">
                <span className="w-1 h-8 bg-[#F4D35E] mr-3"></span>
                Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#415A77] mb-2">Personal Information</h3>
                  <p className="text-[#676E7E]">
                    We collect information you provide directly to us, including:
                  </p>
                  <ul className="list-disc list-inside text-[#676E7E] mt-2 space-y-1">
                    <li>Name, email address, and phone number</li>
                    <li>Date of birth and gender (optional)</li>
                    <li>Educational background and subject interests</li>
                    <li>Payment and billing information</li>
                    <li>Profile information and preferences</li>
                    <li>Communication history with tutors or students</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-[#415A77] mb-2">Automatically Collected Information</h3>
                  <p className="text-[#676E7E]">
                    When you access our platform, we automatically collect:
                  </p>
                  <ul className="list-disc list-inside text-[#676E7E] mt-2 space-y-1">
                    <li>Device information (IP address, browser type, operating system)</li>
                    <li>Usage data (pages visited, time spent, clicks, searches)</li>
                    <li>Cookies and similar tracking technologies</li>
                    <li>Location information (if permitted)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-2xl font-semibold text-[#1B263B] mb-4 flex items-center">
                <span className="w-1 h-8 bg-[#F4D35E] mr-3"></span>
                How We Use Your Information
              </h2>
              <p className="text-[#676E7E] mb-4">We use the information we collect for various purposes:</p>
              <ul className="list-disc list-inside text-[#676E7E] space-y-2">
                <li>To provide, maintain, and improve our services</li>
                <li>To process transactions and send related information</li>
                <li>To match students with appropriate tutors</li>
                <li>To send promotional emails and marketing communications (with your consent)</li>
                <li>To respond to your inquiries and customer service requests</li>
                <li>To monitor and analyze trends and usage patterns</li>
                <li>To prevent fraudulent transactions and enhance security</li>
                <li>To comply with legal obligations</li>
                <li>To personalize your experience on our platform</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-semibold text-[#1B263B] mb-4 flex items-center">
                <span className="w-1 h-8 bg-[#F4D35E] mr-3"></span>
                Information Sharing
              </h2>
              <p className="text-[#676E7E] mb-4">We do not sell your personal information. We may share your information in the following circumstances:</p>
              <ul className="list-disc list-inside text-[#676E7E] space-y-2">
                <li>
                  <strong>With Tutors/Students:</strong> We share necessary information to facilitate tutoring sessions
                </li>
                <li>
                  <strong>Service Providers:</strong> With third-party vendors who assist in operating our platform
                </li>
                <li>
                  <strong>Legal Compliance:</strong> When required by law or to protect our rights
                </li>
                <li>
                  <strong>Business Transfers:</strong> In the event of merger, acquisition, or business sale
                </li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-semibold text-[#1B263B] mb-4 flex items-center">
                <span className="w-1 h-8 bg-[#F4D35E] mr-3"></span>
                Data Security
              </h2>
              <p className="text-[#676E7E] leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal data against
                unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure server
                connections, and regular security assessments. However, no method of transmission over the internet is
                100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-semibold text-[#1B263B] mb-4 flex items-center">
                <span className="w-1 h-8 bg-[#F4D35E] mr-3"></span>
                Cookies and Tracking Technologies
              </h2>
              <p className="text-[#676E7E] mb-4">
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze usage
                patterns, and deliver personalized content. You can control cookie preferences through your browser
                settings, though this may affect some features of our platform.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-semibold text-[#1B263B] mb-4 flex items-center">
                <span className="w-1 h-8 bg-[#F4D35E] mr-3"></span>
                Your Privacy Rights
              </h2>
              <p className="text-[#676E7E] mb-4">Depending on your location, you may have the following rights:</p>
              <ul className="list-disc list-inside text-[#676E7E] space-y-2">
                <li>Right to access your personal data</li>
                <li>Right to correct or update inaccurate information</li>
                <li>Right to delete your personal data (in certain circumstances)</li>
                <li>Right to opt-out of marketing communications</li>
                <li>Right to data portability</li>
                <li>Right to lodge a complaint with a data protection authority</li>
              </ul>
              <p className="text-[#676E7E] mt-4">
                To exercise any of these rights, please contact us at{' '}
                <a href="mailto:privacy@tutionzone.com" className="text-[#415A77] hover:text-[#F4D35E] font-semibold">
                  privacy@tutionzone.com
                </a>
              </p>
            </section>

            {/* Retention */}
            <section>
              <h2 className="text-2xl font-semibold text-[#1B263B] mb-4 flex items-center">
                <span className="w-1 h-8 bg-[#F4D35E] mr-3"></span>
                Data Retention
              </h2>
              <p className="text-[#676E7E] leading-relaxed">
                We retain your personal data for as long as necessary to provide our services and fulfill the purposes
                outlined in this policy. You can request deletion of your account and associated data at any time, subject
                to legal and business requirements.
              </p>
            </section>

            {/* Third-Party Links */}
            <section>
              <h2 className="text-2xl font-semibold text-[#1B263B] mb-4 flex items-center">
                <span className="w-1 h-8 bg-[#F4D35E] mr-3"></span>
                Third-Party Links
              </h2>
              <p className="text-[#676E7E] leading-relaxed">
                Our platform may contain links to third-party websites. We are not responsible for the privacy practices
                of external sites. We encourage you to review their privacy policies before providing any personal
                information.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-semibold text-[#1B263B] mb-4 flex items-center">
                <span className="w-1 h-8 bg-[#F4D35E] mr-3"></span>
                Children's Privacy
              </h2>
              <p className="text-[#676E7E] leading-relaxed">
                TutionZone is not intended for children under the age of 13. We do not knowingly collect personal
                information from children under 13. If we become aware that a child under 13 has provided us with
                personal data, we will delete such information immediately. Parents or guardians concerned about their
                child's information can contact us at{' '}
                <a href="mailto:privacy@tutionzone.com" className="text-[#415A77] hover:text-[#F4D35E] font-semibold">
                  privacy@tutionzone.com
                </a>
              </p>
            </section>

            {/* Policy Changes */}
            <section>
              <h2 className="text-2xl font-semibold text-[#1B263B] mb-4 flex items-center">
                <span className="w-1 h-8 bg-[#F4D35E] mr-3"></span>
                Changes to This Privacy Policy
              </h2>
              <p className="text-[#676E7E] leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal
                requirements. We will notify you of any material changes by updating the "Last updated" date and, if
                necessary, by sending you a notification. Your continued use of our platform constitutes acceptance of
                the updated policy.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-[#1B263B] mb-4 flex items-center">
                <span className="w-1 h-8 bg-[#F4D35E] mr-3"></span>
                Contact Us
              </h2>
              <p className="text-[#676E7E] mb-4">
                If you have questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="bg-[#F8F9FA] p-6 rounded border-l-4 border-[#F4D35E]">
                <p className="font-semibold text-[#1B263B] mb-2">TutionZone</p>
                <p className="text-[#676E7E]">Email: privacy@tutionzone.com</p>
                <p className="text-[#676E7E]">Email: support@tutionzone.com</p>
                <p className="text-[#676E7E]">Website: www.tutionzone.com</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
