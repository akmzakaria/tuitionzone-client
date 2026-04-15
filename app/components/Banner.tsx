export default function Banner() {
  return (
    <section className="bg-gradient-to-r from-[#1B263B] to-[#415A77] text-white py-16 text-center">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Find Quality Tutoring</h2>
        <p className="text-lg mb-8 opacity-90">
          Connect with experienced tutors and guardians. Learn and teach on your own terms.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="bg-[#F4D35E] text-[#1B263B] px-8 py-3 rounded-lg font-bold hover:bg-white transition">
            Find a Tutor
          </button>
          <button className="border-2 border-[#F4D35E] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#F4D35E] hover:text-[#1B263B] transition">
            Become a Tutor
          </button>
        </div>
      </div>
    </section>
  )
}
