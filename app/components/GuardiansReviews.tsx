export default function GuardiansReviews() {
  const reviews = [
    {
      id: 1,
      name: 'Robert Thompson',
      role: 'Parent',
      review:
        'My daughter improved her math grades significantly within 3 months. Highly recommend!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Maria Garcia',
      role: 'Guardian',
      review: 'Great service! The tutor was very patient and explained concepts clearly.',
      rating: 5,
    },
    {
      id: 3,
      name: 'James Wilson',
      role: 'Parent',
      review: 'Excellent platform with flexible scheduling. My son loves his tutor!',
      rating: 4,
    },
  ]

  return (
    <section className="py-16 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center text-[#1B263B]">What Guardians Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border-l-4 border-[#F4D35E]"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-[#F4D35E]">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">"{review.review}"</p>
              <div>
                <p className="font-semibold text-[#1B263B]">{review.name}</p>
                <p className="text-sm text-gray-600">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
