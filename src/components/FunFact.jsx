import React from 'react'

export default function FunFact({ funFact }) {
  if (!funFact) return null

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#1f242c] to-[#161b22] border border-[#30363d] p-6 shadow-md transition-all duration-300 hover:border-github-accent/40 group neon-glow-blue">
      {/* Decorative background glow */}
      <div className="absolute -right-20 -top-20 w-48 h-48 bg-github-accent/5 rounded-full blur-3xl pointer-events-none group-hover:bg-github-accent/8 transition-colors duration-300"></div>
      
      <div className="flex items-start gap-4">
        {/* Lightbulb Icon with glow effect */}
        <div className="p-2.5 bg-[#21262d] rounded-lg border border-github-border text-yellow-400 group-hover:text-yellow-300 transition-colors shadow-inner flex-shrink-0 animate-pulse-slow">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>

        <div className="space-y-1.5 flex-1">
          <h4 className="text-sm font-bold uppercase tracking-wider text-github-accent">Fun Fact & Repo Trivia</h4>
          <p className="text-[#f0f6fc] text-sm md:text-base leading-relaxed italic font-medium">
            "{funFact}"
          </p>
        </div>
      </div>
    </div>
  )
}
