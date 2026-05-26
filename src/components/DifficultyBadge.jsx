import React from 'react'

export default function DifficultyBadge({ difficulty, goodFirstIssue }) {
  const diff = (difficulty || 'beginner').toLowerCase().trim()

  // Styling and configuration for different difficulties
  const config = {
    beginner: {
      title: 'Beginner Friendly',
      desc: 'Simple architecture. Great code quality for learning core concepts without getting lost in deep boilerplate.',
      bg: 'bg-[rgba(63,185,80,0.06)]',
      border: 'border-[#3fb950]/30',
      text: 'text-[#3fb950]',
      gaugeBg: 'bg-[#3fb950]/20',
      gaugeFill: 'bg-[#3fb950]',
      filledBars: 1,
    },
    intermediate: {
      title: 'Intermediate',
      desc: 'Moderate system complexity. Requires baseline understanding of patterns, framework internals, or dev tooling.',
      bg: 'bg-[rgba(210,153,34,0.06)]',
      border: 'border-[#d29922]/30',
      text: 'text-[#d29922]',
      gaugeBg: 'bg-[#d29922]/20',
      gaugeFill: 'bg-[#d29922]',
      filledBars: 2,
    },
    advanced: {
      title: 'Advanced / Complex',
      desc: 'High architectural complexity. Performance-tuned, custom engines, highly concurrent, or low-level configurations.',
      bg: 'bg-[rgba(248,81,73,0.06)]',
      border: 'border-[#f85149]/30',
      text: 'text-[#f85149]',
      gaugeBg: 'bg-[#f85149]/20',
      gaugeFill: 'bg-[#f85149]',
      filledBars: 3,
    }
  }

  const active = config[diff] || config.beginner

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
      {/* Complexity / Difficulty Card */}
      <div className={`border rounded-xl p-6 shadow-md transition-all hover:border-[#444c56] flex flex-col justify-between bg-[#161b22] border-github-border`}>
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-2 bg-[#1f242c] rounded-lg border border-github-border text-github-accent shadow-inner">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#f0f6fc]">Difficulty Level</h3>
          </div>

          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider mb-3.5 ${active.bg} ${active.text} ${active.border}`}>
            <span className="w-2 h-2 rounded-full currentColor" style={{ backgroundColor: 'currentColor' }}></span>
            {active.title}
          </div>

          <p className="text-github-text text-sm leading-relaxed">
            {active.desc}
          </p>
        </div>

        {/* Gauge bar */}
        <div className="mt-5 pt-4 border-t border-github-border/40">
          <div className="flex items-center justify-between text-xs text-github-muted font-semibold mb-2">
            <span>Complexity Gauge</span>
            <span className={active.text}>{active.filledBars}/3 Level</span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map((bar) => (
              <div
                key={bar}
                className={`h-2.5 flex-1 rounded-full transition-all duration-300 ${
                  bar <= active.filledBars ? active.gaugeFill : 'bg-[#21262d]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Contributor Card (Good First Issue) */}
      <div className="bg-[#161b22] border border-github-border rounded-xl p-6 shadow-md transition-all hover:border-[#444c56] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-2 bg-[#1f242c] rounded-lg border border-github-border text-github-success shadow-inner">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#f0f6fc]">Contribution Index</h3>
          </div>

          {goodFirstIssue ? (
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[rgba(63,185,80,0.06)] text-[#3fb950] border border-[#3fb950]/30 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4" />
                </svg>
                Good First Issues Active
              </div>
              <p className="text-github-text text-sm leading-relaxed">
                This repository features active `good first issue` tags, making it an excellent playground for developers seeking to start open-source contributions.
              </p>
            </div>
          ) : (
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#21262d] text-github-muted border border-github-border px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
                No Starter Issues
              </div>
              <p className="text-github-text text-sm leading-relaxed">
                No standard `good first issue` labels were detected. Contributions may require more direct communication with maintainers or intermediate setup tasks.
              </p>
            </div>
          )}
        </div>

        <div className="mt-5 pt-4 border-t border-github-border/40 text-xs text-github-muted font-mono uppercase tracking-wider">
          {goodFirstIssue ? '👋 Open Source Welcoming' : '🔒 Advanced Development Cycle'}
        </div>
      </div>
    </div>
  )
}
