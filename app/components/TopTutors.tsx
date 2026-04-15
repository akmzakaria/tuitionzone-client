export default function TopTutors() {
  const tutors = [
    {
      id: 1,
      name: 'Emily Wilson',
      specialty: 'Mathematics',
      students: 120,
      rating: 4.9,
      image: '👩‍🏫',
    },
    {
      id: 2,
      name: 'David Brown',
      specialty: 'Physics',
      students: 95,
      rating: 4.8,
      image: '👨‍🏫',
    },
    {
      id: 3,
      name: 'Lisa Anderson',
      specialty: 'English',
      students: 150,
      rating: 4.9,
      image: '👩‍🏫',
    },
    {
      id: 4,
      name: 'James Miller',
      specialty: 'Computer Science',
      students: 110,
      rating: 4.9,
      image: '👨‍🏫',
    },
  ]

  return (
    <section className="py-16 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center text-[#1B263B]">Top Tutors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutors.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center border-t-4 border-[#F4D35E]"
            >
              <div className="text-5xl mb-4">{tutor.image}</div>
              <h3 className="text-xl font-semibold mb-1 text-[#1B263B]">{tutor.name}</h3>
              <p className="text-[#415A77] font-medium mb-3">{tutor.specialty}</p>
              <div className="flex justify-center items-center gap-4 mb-3 text-sm text-gray-600">
                <span>{tutor.students} students</span>
                <span className="flex items-center gap-1">
                  <span className="text-[#F4D35E]">★</span>
                  {tutor.rating}
                </span>
              </div>
              <button className="bg-[#415A77] text-white px-4 py-2 rounded w-full hover:bg-[#F4D35E] hover:text-[#1B263B] transition font-bold border-2 border-[#F4D35E]">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
