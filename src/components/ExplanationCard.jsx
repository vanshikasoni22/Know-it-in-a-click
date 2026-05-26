import React from 'react'

export default function ExplanationCard({ summary, whatItSolves }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Summary Card */}
      <div className="bg-[#161b22] border border-github-border rounded-xl p-6 shadow-md transition-all hover:border-[#444c56] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-2 bg-[#1f242c] rounded-lg border border-github-border text-github-accent shadow-inner">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#f0f6fc]">Repository Summary</h3>
          </div>
          <p className="text-github-text text-sm md:text-base leading-relaxed whitespace-pre-line">
            {summary || 'No summary description provided.'}
          </p>
        </div>
        <div className="mt-4 pt-3 border-t border-github-border/50 text-right">
          <span className="text-[10px] text-github-muted font-mono uppercase tracking-wider">AI Generated Insight</span>
        </div>
      </div>

      {/* What it Solves Card */}
      <div className="bg-[#161b22] border border-github-border rounded-xl p-6 shadow-md transition-all hover:border-[#444c56] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-2 bg-[#1f242c] rounded-lg border border-github-border text-github-success shadow-inner">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#f0f6fc]">What It Solves</h3>
          </div>
          <p className="text-github-text text-sm md:text-base leading-relaxed whitespace-pre-line">
            {whatItSolves || 'No solution description provided.'}
          </p>
        </div>
        <div className="mt-4 pt-3 border-t border-github-border/50 text-right">
          <span className="text-[10px] text-github-muted font-mono uppercase tracking-wider">Problem Statement & Purpose</span>
        </div>
      </div>
    </div>
  )
}
