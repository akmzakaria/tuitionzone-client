'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Interfaces
interface Stat {
  id: number
  label: string
  value: string
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const AboutUsPage = () => {
  const [stats, setStats] = useState<Stat[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setStats([
          { id: 1, label: 'Verified Tutors', value: '850+' },
          { id: 2, label: 'Success Stories', value: '5.4K+' },
          { id: 3, label: 'Active Districts', value: '15+' },
          { id: 4, label: 'Avg. Rating', value: '4.9/5' },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-[#1B263B] antialiased selection:bg-[#F4D35E]/30 font-sans overflow-hidden">
        {/* HERO: The Identity */}
        <section className="bg-gradient-to-r from-[#1B263B] to-[#415A77] text-white py-24 md:py-32 text-center">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight"
            >
              Bridging Potential <br />
              with{' '}
              <span className="text-white opacity-80 underline decoration-white/20">
                Excellence.
              </span>
            </motion.h1>

            {/* description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="max-w-3xl mx-auto text-lg md:text-xl mb-12 opacity-90 font-light leading-relaxed"
            >
              TutionZone is Bangladesh&apos;s premier platform designed to connect ambitious
              learners with world-class educators. We make finding the right mentor simple, safe,
              and efficient.
            </motion.p>
          </div>
        </section>

        {/*  THE STORY: Mission & Vision */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gray-50 rounded-[3rem] -z-10 group-hover:rotate-1 transition-transform"></div>
              <div className="relative h-[500px] w-full rounded-[2.5rem] overflow-hidden bg-white border border-gray-100 shadow-2xl flex items-center justify-center">
                <span className="text-9xl font-black text-gray-50 opacity-50 uppercase tracking-widest">
                  TZ
                </span>
                <Image
                  src="/next.svg"
                  alt="About TutionZone"
                  fill
                  className="object-contain p-24 opacity-10"
                />
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-12"
            >
              <motion.div variants={fadeIn} className="space-y-6">
                <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-[#F4D35E]">
                  The Mission
                </h2>
                <p className="text-gray-900 text-2xl font-bold leading-tight">
                  To democratize quality education in Bangladesh by providing a transparent and
                  secure platform.
                </p>
                <p className="text-gray-500 font-light leading-relaxed">
                  We believe every student deserves a mentor who understands their unique learning
                  pace. Our mission is to make finding that mentor effortless and safe.
                </p>
              </motion.div>
              <motion.div variants={fadeIn} className="space-y-6">
                <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-gray-400">
                  The Vision
                </h2>
                <p className="text-gray-500 text-lg font-light leading-relaxed">
                  To become the most trusted global destination for personalized learning, where
                  technology and human expertise create limitless possibilities.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* WHY CHOOSE US: Cards with Hover Animation */}
        <section className="bg-gray-50 py-24 px-6 border-y border-gray-100">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
            >
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
                Why students <br /> trust us.
              </h2>
              <p className="text-gray-500 max-w-xs font-light italic">
                "Quality education is no longer a luxury, it&apos;s a standard."
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
            >
              {[
                {
                  t: 'Verified Profiles',
                  d: 'Every educator goes through a manual background check and credential verification.',
                },
                {
                  t: 'Subject Expertise',
                  d: 'From STEM to Liberal Arts, find specialists for over 120+ unique subjects.',
                },
                {
                  t: 'Zero Hidden Fees',
                  d: 'Direct communication with tutors ensures transparency and no middleman costs.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  whileHover={{ y: -10 }}
                  className="space-y-4 group p-6 hover:bg-white hover:shadow-xl rounded-2xl transition-all duration-300"
                >
                  <div className="w-12 h-[2px] bg-[#F4D35E] group-hover:w-20 transition-all duration-500"></div>
                  <h4 className="text-xl font-bold">{item.t}</h4>
                  <p className="text-gray-500 font-light leading-relaxed">{item.d}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CORE VALUES: Reveal on Scroll */}
        <section className="bg-[#1B263B] py-24 px-6 text-white overflow-hidden relative">
          <div className="max-w-6xl mx-auto text-center mb-16 relative z-10">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
            >
              The Values We Live By
            </motion.h2>
            <div className="w-20 h-1 bg-[#F4D35E] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
            {[
              {
                title: 'Integrity First',
                desc: 'Rigorous verification ensures a community built on honesty and professional excellence.',
              },
              {
                title: 'Student-Centric',
                desc: 'We prioritize the academic growth and personal safety of our learners above all else.',
              },
              {
                title: 'Smart Innovation',
                desc: 'Using advanced matching tech to connect you with the perfect mentor in minutes.',
              },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-10 border border-gray-800 rounded-3xl hover:bg-white/5 transition-all cursor-default"
              >
                <h4 className="text-[#F4D35E] text-xl font-bold mb-4 italic tracking-wider">
                  {v.title}
                </h4>
                <p className="text-gray-400 leading-relaxed font-light">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* IMPACT: Stats with Number Animation Placeholder */}
        <section className="py-20 bg-white border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              {loading
                ? [...Array(4)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-50 animate-pulse rounded" />
                  ))
                : stats.map((stat, i) => (
                    <motion.div
                      key={stat.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="space-y-2 border-l border-gray-100 pl-8"
                    >
                      <p className="text-5xl font-black tracking-tighter text-[#1B263B]">
                        {stat.value}
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-extrabold">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION: Bouncy Button */}
        <section className="py-32 px-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="max-w-6xl mx-auto bg-[#1B263B] p-16 md:p-24 rounded-[3.5rem] text-white text-center relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#F4D35E] opacity-[0.05] rounded-full blur-[100px]"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-[#F4D35E] tracking-tight mb-8">
                Ready to evolve?
              </h2>
              <p className="max-w-xl mx-auto text-gray-400 text-lg md:text-xl font-light mb-12 italic">
                Join the most trusted education network and unlock your potential today.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/"
                    className="bg-[#F4D35E] text-[#1B263B] px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-[0.2em] inline-block shadow-lg"
                  >
                    Find a Tutor
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/"
                    className="border border-gray-600 px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-[0.2em] inline-block hover:bg-white hover:text-[#1B263B] transition-colors"
                  >
                    Join as Tutor
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default AboutUsPage
