export default function WhyChooseUs() {
  const features = [
    {
      icon: '✓',
      title: 'Expert Tutors',
      description: 'Verified and experienced tutors across all subjects',
    },
    {
      icon: '✓',
      title: 'Flexible Scheduling',
      description: 'Learn at your own pace with flexible time slots',
    },
    {
      icon: '✓',
      title: 'Affordable Rates',
      description: 'Competitive pricing with transparent billing',
    },
    {
      icon: '✓',
      title: '24/7 Support',
      description: 'Get help whenever you need it',
    },
  ]

  return (
    <section className="py-16 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center text-[#1B263B]">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center bg-white p-6 rounded-lg shadow border-t-4 border-[#F4D35E]"
            >
              <div className="text-4xl text-[#F4D35E] mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-[#1B263B]">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
