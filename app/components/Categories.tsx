export default function Categories() {
  const categories = [
    { name: 'Mathematics', count: 250 },
    { name: 'Science', count: 180 },
    { name: 'English', count: 320 },
    { name: 'Programming', count: 150 },
    { name: 'History', count: 120 },
    { name: 'Art & Design', count: 90 },
    { name: 'Languages', count: 200 },
    { name: 'Music', count: 80 },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center text-[#1B263B]">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#415A77] to-[#1B263B] text-white p-6 rounded-lg text-center hover:shadow-lg transition cursor-pointer border-t-4 border-[#F4D35E]"
            >
              <h3 className="font-semibold text-lg">{category.name}</h3>
              <p className="text-sm opacity-90">{category.count} tutors</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
