export default function Header() {
  return (
    <header className="bg-[#1B263B] border-b-4 border-[#F4D35E] sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#F4D35E] whitespace-nowrap">TutionZone</h1>
        <ul className="hidden md:flex gap-8 text-white font-medium flex-1 justify-center">
          <li>
            <a href="#tutions" className="hover:text-[#F4D35E] transition duration-200">
              Tutions
            </a>
          </li>
          <li>
            <a href="#tutors" className="hover:text-[#F4D35E] transition duration-200">
              Tutors
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-[#F4D35E] transition duration-200">
              Contact
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-[#F4D35E] transition duration-200">
              About
            </a>
          </li>
        </ul>
        <button className="bg-[#415A77] text-white px-6 py-2 rounded-lg hover:bg-[#F4D35E] hover:text-[#1B263B] transition duration-200 font-bold border-2 border-[#F4D35E]">
          Login
        </button>
      </nav>
    </header>
  )
}
