export default function LatestTutions() {
  const tutions = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      tutor: 'John Smith',
      level: 'High School',
      price: '$30/hour',
      rating: 4.8,
    },
    {
      id: 2,
      title: 'English Literature',
      tutor: 'Sarah Johnson',
      level: 'College',
      price: '$35/hour',
      rating: 4.9,
    },
    {
      id: 3,
      title: 'Science Fundamentals',
      tutor: 'Mike Chen',
      level: 'Middle School',
      price: '$25/hour',
      rating: 4.7,
    },
    {
      id: 4,
      title: 'Programming in Python',
      tutor: 'Alex Kumar',
      level: 'Beginner to Advanced',
      price: '$40/hour',
      rating: 4.9,
    },
  ]

  return (
    <section className="py-16 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center text-[#1B263B]">Latest Tutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutions.map((tution) => (
            <div
              key={tution.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border-l-4 border-[#F4D35E]"
            >
              <h3 className="text-xl font-semibold mb-2 text-[#1B263B]">{tution.title}</h3>
              <p className="text-[#415A77] mb-2 font-medium">by {tution.tutor}</p>
              <div className="mb-3 text-sm text-gray-600">
                <p>Level: {tution.level}</p>
                <p>Price: {tution.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#F4D35E]">★</span>
                <span className="font-semibold text-[#1B263B]">{tution.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
