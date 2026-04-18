import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#1B263B] text-gray-300 py-12 border-t-4 border-[#F4D35E]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-[#F4D35E] font-bold text-lg mb-4">TutionZone</h3>
            <p className="text-sm">Connecting students with expert tutors for quality education.</p>
          </div>
          <div>
            <h4 className="text-[#F4D35E] font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Find Tutors
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Become a Tutor
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#F4D35E] font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/aboutUs" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#F4D35E] font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <Link href="/TermsOfService" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#415A77] pt-8 text-sm text-center">
          <p>
            &copy; 2026 TutionZone. All rights reserved. | Follow us on{' '}
            <a href="#" className="text-[#F4D35E] hover:text-white">
              social media
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
