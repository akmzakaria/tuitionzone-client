export default function TutorsReviews() {
  const reviews = [
    {
      id: 1,
      name: 'Alex Kumar',
      role: 'Tutor',
      review: 'TutionZone is an amazing platform to earn and help students at the same time!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Angela Davis',
      role: 'Tutor',
      review: 'Easy to use platform with reliable payment system. Very professional!',
      rating: 5,
    },
    {
      id: 3,
      name: 'Michael Scott',
      role: 'Tutor',
      review: 'Great community of tutors. Supportive and helpful team!',
      rating: 4,
    },
  ]

  return (
    <section className="py-16 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center text-[#006D77]">What Tutors Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gradient-to-br from-[#F5F5F5] to-[#FFDDD2]/20 p-6 rounded-lg border-l-4 border-[#83C5BE]"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-[#FFDDD2]">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">"​{review.review}"</p>
              <div>
                <p className="font-semibold text-[#006D77]">{review.name}</p>
                <p className="text-sm text-gray-600">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
