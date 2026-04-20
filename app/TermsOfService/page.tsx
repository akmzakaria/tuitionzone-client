import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Assuming these are imported from your theme file
export const theme = {
  colors: {
    primary: '#1B263B',
    secondary: '#F4D35E',
    background: '#F8F9FA',
    action: '#415A77',
    accent: '#E8D5B7',
    text: '#1B263B',
    lightText: '#676E7E',
  },
}

export const themeClasses = {
  header: `border-b-4`, // Colors handled via style attribute for reliability
  banner: `bg-gradient-to-r`,
  button: `transition-all duration-200 shadow-sm px-6 py-2 rounded-md font-semibold`,
}

const TermsOfService = () => {
  const lastUpdated = 'April 18, 2026'

  return (
    <div className="">
      <Navbar />
      <div
        className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans"
        style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
      >
        <Head>
          <title>Terms of Service | TuitionZoneBD</title>
        </Head>

        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
          {/* Header Section */}
          <header
            className={`${themeClasses.header} py-10 px-6 text-center`}
            style={{ backgroundColor: theme.colors.primary, borderColor: theme.colors.secondary }}
          >
            <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white">
              Terms of Service
            </h1>
            <p
              className="mt-2 text-sm md:text-base opacity-90"
              style={{ color: theme.colors.accent }}
            >
              Ensuring a safe and transparent learning environment for TuitionZoneBD.
            </p>
          </header>

          {/* Content Body */}
          <div className="p-8 md:p-14 space-y-10 leading-relaxed">
            <section>
              <h2
                className="text-xl font-bold mb-4 flex items-center"
                style={{ color: theme.colors.primary }}
              >
                <span
                  className="w-2 h-6 mr-3 rounded-full"
                  style={{ backgroundColor: theme.colors.secondary }}
                ></span>
                1. Platform Nature
              </h2>
              <p style={{ color: theme.colors.lightText }}>
                <strong>TuitionZoneBD</strong> serves as a bridge connecting qualified tutors with
                students or parents in Bangladesh. We are a matchmaking service and do not act as an
                employer for the tutors listed.
              </p>
            </section>

            <section>
              <h2
                className="text-xl font-bold mb-4 flex items-center"
                style={{ color: theme.colors.primary }}
              >
                <span
                  className="w-2 h-6 mr-3 rounded-full"
                  style={{ backgroundColor: theme.colors.secondary }}
                ></span>
                2. Tutor Obligations
              </h2>
              <ul className="list-none space-y-3" style={{ color: theme.colors.lightText }}>
                <li className="flex items-start">
                  <span className="mr-2 text-lg" style={{ color: theme.colors.action }}>
                    •
                  </span>
                  Tutors must provide authentic educational credentials and national ID (NID/Birth
                  Certificate) for verification.
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-lg" style={{ color: theme.colors.action }}>
                    •
                  </span>
                  Any misrepresentation of grades, institutions, or experience will result in an
                  immediate permanent ban.
                </li>
              </ul>
            </section>

            <section>
              <h2
                className="text-xl font-bold mb-4 flex items-center"
                style={{ color: theme.colors.primary }}
              >
                <span
                  className="w-2 h-6 mr-3 rounded-full"
                  style={{ backgroundColor: theme.colors.secondary }}
                ></span>
                3. Service Charges & Payments
              </h2>
              <div
                className="p-5 rounded-lg border-l-4"
                style={{
                  backgroundColor: theme.colors.accent + '33',
                  borderColor: theme.colors.secondary,
                }}
              >
                <p className="text-sm italic" style={{ color: theme.colors.text }}>
                  TuitionZoneBD typically charges a one-time commission from the first month’s
                  salary. Attempting to bypass the platform after a lead has been shared is a breach
                  of these terms.
                </p>
              </div>
            </section>

            <section>
              <h2
                className="text-xl font-bold mb-4 flex items-center"
                style={{ color: theme.colors.primary }}
              >
                <span
                  className="w-2 h-6 mr-3 rounded-full"
                  style={{ backgroundColor: theme.colors.secondary }}
                ></span>
                4. Safety Disclaimer
              </h2>
              <p style={{ color: theme.colors.lightText }}>
                For safety, we advise parents to conduct the first meeting in a common area of the
                house and verify the tutor's ID personally. TuitionZoneBD is not liable for any
                physical, emotional, or financial disputes arising between parties.
              </p>
            </section>

            {/* Call to Action Area */}
            <div
              className="pt-10 border-t flex flex-col items-center gap-6"
              style={{ borderColor: theme.colors.accent }}
            >
              <Link
                href={'/'}
                className={`${themeClasses.button} hover:cursor-pointer hover:scale-102 active:scale-98`}
                style={{
                  backgroundColor: theme.colors.action,
                  color: '#FFFFFF',
                  borderColor: theme.colors.secondary,
                }}
              >
                Accept & Continue
              </Link>
              <div className="text-center">
                <p className="text-sm" style={{ color: theme.colors.lightText }}>
                  Questions? Reach out at:
                  <span
                    className="block font-semibold mt-1"
                    style={{ color: theme.colors.primary }}
                  >
                    support@tuitionzonebd.com
                  </span>
                </p>
              </div>
            </div>

            <p className="text-center text-xs pt-4" style={{ color: theme.colors.lightText }}>
              Last Updated: {lastUpdated}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default TermsOfService
