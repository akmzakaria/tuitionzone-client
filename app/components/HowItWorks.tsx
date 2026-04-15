export default function HowItWorks() {
  const stepsGuardians = [
    { number: 1, title: 'Sign Up', description: 'Create your account in minutes' },
    {
      number: 2,
      title: 'Browse Tutors',
      description: 'Find tutors that match your needs',
    },
    { number: 3, title: 'Book Session', description: 'Schedule a convenient time' },
    { number: 4, title: 'Learn & Grow', description: 'Start your learning journey' },
  ]

  const stepsTutors = [
    { number: 1, title: 'Register', description: 'Create your tutor profile' },
    {
      number: 2,
      title: 'Set Schedule',
      description: 'Choose your available time slots',
    },
    { number: 3, title: 'Accept Bookings', description: 'Confirm student sessions' },
    { number: 4, title: 'Earn Money', description: 'Get paid for your expertise' },
  ]

  return (
    <section className="py-16 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center text-[#1B263B]">How It Works</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center text-[#1B263B]">For Guardians</h3>
            <div className="space-y-6">
              {stepsGuardians.map((step) => (
                <div key={step.number} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#415A77] text-white rounded-full flex items-center justify-center font-bold border-2 border-[#F4D35E]">
                    {step.number}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{step.title}</h4>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-8 text-center text-[#1B263B]">For Tutors</h3>
            <div className="space-y-6">
              {stepsTutors.map((step) => (
                <div key={step.number} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#415A77] text-white rounded-full flex items-center justify-center font-bold border-2 border-[#F4D35E]">
                    {step.number}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{step.title}</h4>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
