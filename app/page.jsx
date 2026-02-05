"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; // Import Image component
import { SyncLoader } from "react-spinners";
import useAuth from "@/hooks/useAuth";

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SyncLoader color="#172243" />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-900 bg-gradient-to-b from-blue-50/50 via-white to-white overflow-x-hidden">
      {/* --- Injected Animations --- */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(2deg);
          }
          50% {
            transform: translateY(-20px) rotate(1deg);
          }
        }
        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.2;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
        }
        @keyframes scan {
          0% {
            top: -100%;
          }
          100% {
            top: 100%;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-ring {
          animation: pulse-ring 4s ease-in-out infinite;
        }
        .scan-line {
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(
            to right,
            transparent,
            #446cc3,
            transparent
          );
          animation: scan 3s linear infinite;
          opacity: 0.3;
        }
      `}</style>

      {/* --- Navigation --- */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 overflow-hidden rounded-xl shadow-sm border border-slate-100 bg-white">
            <Image
              src="/logo.jpg"
              alt="Glusco Logo"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="text-2xl font-black tracking-tighter uppercase">
            <span className="text-[#172243]">glus</span>
            <span className="text-[#446cc3]">co</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/onboarding"
            className="hidden md:block font-semibold text-slate-600 hover:text-[#172243]"
          >
            Sign In
          </Link>
          <Link
            href="/onboarding"
            className="px-5 py-2.5 bg-[#172243] text-white rounded-lg font-medium hover:bg-[#446cc3] transition-all shadow-md"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <header className="relative px-6 pt-16 pb-24 max-w-7xl mx-auto text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-12 items-center">
        <div className="z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#446cc3] text-sm font-medium mb-6 shadow-sm border border-blue-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#446cc3] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#446cc3]"></span>
            </span>
            Next-Gen Diabetes Prediction
          </div>
          <h1 className="text-5xl md:text-5xl font-extrabold text-[#172243] leading-[1.1] mb-6 tracking-tight">
            Track. Predict. Prevent.
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
            Glusco leverages advanced AI to predict diabetes risks with
            clinical-grade accuracy. Access your dashboard, join our community
            forum, and get personalized health insights in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/onboarding"
              className="px-8 py-4 bg-[#172243] text-white rounded-xl font-bold shadow-xl hover:scale-105 transition-transform"
            >
              Analyze Your Risk Now
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 border border-slate-200 rounded-xl font-bold bg-white/80 backdrop-blur-sm hover:bg-slate-50 transition-colors"
            >
              How it Works
            </Link>
          </div>
        </div>

        <div className="mt-16 lg:mt-0 relative flex justify-center">
          {/* Animated Background Pulse Ring */}
          <div className="absolute w-[450px] h-[450px] rounded-full border-2 border-[#446cc3]/10 animate-pulse-ring"></div>

          {/* Device Container */}
          <div className="relative w-[300px] h-[600px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-[6px] border-slate-800 animate-float overflow-hidden">
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-30"></div>

            {/* Screen Content */}
            <div className="relative w-full h-full bg-[#f8fafc] rounded-[2.2rem] overflow-hidden flex flex-col pt-8 px-5 pb-4">
              <div className="scan-line"></div>

              {/* Header Mockup */}
              <div className="flex justify-between items-center mb-6">
                <div className="text-left">
                  <p className="text-[10px] text-slate-400">Welcome back,</p>
                  <p className="text-xs font-bold text-slate-800">User 👋</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white overflow-hidden">
                  <Image
                    src="/default-avatar.png"
                    alt="Avatar"
                    width={32}
                    height={32}
                  />
                </div>
              </div>

              {/* Dashboard Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-4 text-center">
                <p className="text-[10px] font-bold text-slate-800 mb-4 text-left">
                  Diabetes Risk Score
                </p>

                {/* Animated Circle Gauge */}
                <div className="relative flex items-center justify-center mb-4">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#f1f5f9"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#10b981"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray="251"
                      strokeDashoffset="200"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col">
                    <span className="text-xl font-black text-[#10b981]">
                      19%
                    </span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase">
                      Low Risk
                    </span>
                  </div>
                </div>

                <p className="text-[9px] text-slate-500 mb-4 leading-tight">
                  Your lifestyle habits are stable. Keep tracking daily!
                </p>
                <button className="w-full py-2 bg-[#172243] text-white text-[10px] font-bold rounded-lg shadow-md">
                  View AI Summary &gt;
                </button>
              </div>

              {/* Vitals Grid */}
              <p className="text-[10px] font-bold text-slate-800 mb-2 text-left">
                Key Vitals
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white p-2 rounded-xl border border-slate-50 shadow-sm text-left">
                  <span className="text-[8px] text-red-500 font-bold block">
                    Blood Pressure
                  </span>
                  <span className="text-xs font-black text-slate-800">
                    120/80
                  </span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-slate-50 shadow-sm text-left">
                  <span className="text-[8px] text-blue-500 font-bold block">
                    HbA1c
                  </span>
                  <span className="text-xs font-black text-slate-800">6%</span>
                </div>
              </div>

              {/* Bottom Navigation Mockup */}
              <div className="mt-auto flex justify-around items-center pt-2 border-t border-slate-100">
                <div className="w-4 h-4 bg-indigo-600 rounded-sm"></div>
                <div className="w-4 h-4 bg-slate-200 rounded-sm"></div>
                <div className="w-8 h-8 bg-[#172243] rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg">
                  +
                </div>
                <div className="w-4 h-4 bg-slate-200 rounded-sm"></div>
                <div className="w-4 h-4 bg-slate-200 rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- Features Section --- */}
      <section id="features" className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[#172243]/[0.02] -skew-y-3"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-bold text-[#172243] mb-16 tracking-tight animate-fade-in">
            What's Inside
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Added unique delays to each card for a staggered entrance */}
            <FeatureCard
              delay="0.1s"
              icon="📋"
              title="Health Data Input"
              desc="Gathers relevant medical and lifestyle data for detailed health analysis."
            />
            <FeatureCard
              delay="0.2s"
              icon="🤖"
              title="AI-Powered Prediction"
              desc="Generates a Type 2 Diabetes risk prediction using advanced machine learning models."
            />
            <FeatureCard
              delay="0.3s"
              icon="📄"
              title="AI Summary Report"
              desc="Provides an easy-to-understand, AI-generated summary of your overall health status."
            />
            <FeatureCard
              delay="0.4s"
              icon="👥"
              title="Tips & Community Support"
              desc="Access expert wellness advice and connect with a global community for shared health journeys."
            />
            <FeatureCard
              delay="0.5s"
              icon="💡"
              title="Insights and Recommendations"
              desc="Suggests good habits and personalized lifestyle changes based on your unique health data and risk level."
            />
            <FeatureCard
              delay="0.6s"
              icon="📈"
              title="Risk Trends Visualization"
              desc="Tracks and displays changes in your diabetes risk over time to monitor progress and long-term trends."
            />
          </div>
        </div>
      </section>

      {/* --- Meet Our Team Section --- */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#172243] tracking-tight mb-4">
              Meet Our Team
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              The dedicated team behind Glusco, working to make diabetes
              prevention easy and accessible for everyone.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamCard
              name="Jenica Manzano"
              role="Quality Analyst"
              imgSrc="/dev1.jpg"
            />
            <TeamCard
              name="Jarmen Cachero"
              role="Full Stack Developer"
              imgSrc="/dev2.jpg"
            />
            <TeamCard
              name="Alysha Palubon"
              role="Frontend Developer"
              imgSrc="/dev3.jpg"
            />
            <TeamCard
              name="Vanessa Cafe"
              role="Research Specialist"
              imgSrc="/dev4.jpg"
            />
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 px-6 border-t border-slate-100 text-center bg-white">
        <p className="text-sm text-slate-400">
          © 2026 <span className="font-bold text-[#172243]">GLUS</span>
          <span className="font-bold text-[#446cc3]">CO</span>. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc, delay }) {
  return (
    <div
      className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-slate-100 text-left h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group reveal-card"
      style={{ animationDelay: delay }}
    >
      <div className="w-12 h-12 bg-blue-50 text-[#446cc3] rounded-lg flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-[#446cc3] group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#172243] mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function TeamCard({ name, role, imgSrc }) {
  return (
    <div className="group text-center">
      <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-2xl bg-white grayscale hover:grayscale-0 transition-all duration-300 border-2 border-transparent hover:border-[#446cc3] shadow-md">
        <Image src={imgSrc} alt={name} fill className="object-cover" />
      </div>
      <h4 className="text-lg font-bold text-[#172243]">{name}</h4>
      <p className="text-[#446cc3] font-medium text-sm tracking-wide">{role}</p>
    </div>
  );
}
