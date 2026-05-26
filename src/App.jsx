// Setup: npm create vite@latest repo-explainer -- --template react
// cd repo-explainer && npm install && npm install -D tailwindcss
// npx tailwindcss init
// npm run dev

import React, { useState } from 'react'
import RepoInput from './components/RepoInput'
import RepoMeta from './components/RepoMeta'
import ExplanationCard from './components/ExplanationCard'
import TechStack from './components/TechStack'
import ArchitectureTable from './components/ArchitectureTable'
import DifficultyBadge from './components/DifficultyBadge'
import FunFact from './components/FunFact'

export default function App() {
  const [repoUrl, setRepoUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  // Central explain handler (supports direct invocation from example clicks too)
  async function handleExplain(targetUrl) {
    const activeUrl = targetUrl || repoUrl
    if (!activeUrl) return

    // Previous results (data) are cleared with setData(null) at the start of each new request
    setData(null)
    setError(null)

    // Strip .git suffix before sending:
    const cleanUrl = activeUrl.trim().replace(/\.git$/, '')

    // Validate format before fetch — must match:
    const githubRegex = /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/?$/
    if (!githubRegex.test(cleanUrl)) {
      setError('Enter a valid GitHub URL: https://github.com/owner/repo')
      return
    }

    // setLoading(true) is called BEFORE the fetch
    setLoading(true)

    try {
      const res = await fetch('/webhook/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repo_url: cleanUrl })
      })

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }

      const raw = await res.json()
      console.log('raw response:', raw)

      let parsed
      try {
        const cleaned = (raw.text || raw.output || '')
          .replace(/^```json\s*/i, '')
          .replace(/```\s*$/i, '')
          .trim()
        parsed = JSON.parse(cleaned)
      } catch(e) {
        console.error('Parse failed:', e)
        setError('Received a response but could not read it. Try again.')
        setLoading(false)
        return
      }

      const data = {
        summary: parsed.summary || '',
        what_it_solves: parsed.what_it_solves || '',
        tech_stack: parsed.tech_stack || [],
        architecture: parsed.architecture || [],
        difficulty: parsed.difficulty || 'intermediate',
        good_first_issue: parsed.good_first_issue ?? false,
        fun_fact: parsed.fun_fact || '',
        meta: raw.meta || {}
      }

      console.log('final parsed data:', data)
      setData(data)
    } catch (e) {
      console.error(e)
      setError('Something went wrong. Is your n8n workflow running or endpoint active?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-github-bg text-github-text selection:bg-github-accent/30 selection:text-white flex flex-col justify-between">
      
      {/* Navigation Header */}
      <header className="border-b border-github-border bg-github-bg/85 backdrop-blur-md sticky top-0 z-50 transition-all">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => { setData(null); setRepoUrl(''); setError(null); }}>
            {/* Pulsing AI Planet Logo */}
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-github-accent to-[#bc8ff4] flex items-center justify-center text-white shadow-md shadow-github-accent/20 group-hover:scale-105 transition-transform duration-200">
              <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <span className="font-extrabold text-base md:text-lg text-[#f0f6fc] tracking-tight group-hover:text-github-accent transition-colors">
                Know it in a Click
              </span>
              <span className="hidden sm:inline-block text-[10px] text-github-muted bg-[#21262d] border border-github-border rounded-full px-2 py-0.5 ml-2 font-semibold font-mono tracking-wider uppercase">
                AI Explainer v1.0
              </span>
            </div>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-github-muted hover:text-github-accent border border-github-border hover:border-github-accent/40 bg-[#161b22] px-3.5 py-1.5 rounded-lg transition-all active:scale-95"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-8 md:py-12">
        
        {/* URL Input Area (Sticky top inside body, or standard section) */}
        <RepoInput
          repoUrl={repoUrl}
          setRepoUrl={setRepoUrl}
          onExplain={handleExplain}
          loading={loading}
        />

        {/* --- Empty State / Hero State --- */}
        {!loading && !error && !data && (
          <section className="text-center mt-12 md:mt-20 max-w-2xl mx-auto space-y-6 animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#f0f6fc] tracking-tight leading-tight">
              Get an instant AI breakdown of <span className="text-transparent bg-clip-text bg-gradient-to-r from-github-accent to-[#bc8ff4]">any GitHub repo</span>
            </h1>
            <p className="text-github-muted text-base md:text-lg leading-relaxed font-medium">
              Understand files, system architecture, difficulties, tech stacks, and repo trivia in a single click without digging through thousands of lines of documentation.
            </p>
            <div className="pt-4 flex items-center justify-center gap-6 text-xs text-github-muted select-none font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-github-accent"></span>
                Instant Explanation
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-github-success"></span>
                Architecture Index
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#bc8ff4]"></span>
                Difficulty Meter
              </div>
            </div>
          </section>
        )}

        {/* --- Error Banner State --- */}
        {error && (
          <section className="max-w-3xl mx-auto mt-8 bg-[rgba(248,81,73,0.06)] border border-github-danger/40 rounded-xl p-6 flex items-start gap-4 animate-fade-in shadow-md">
            <div className="p-2.5 bg-[#21262d] rounded-lg border border-github-border text-github-danger shadow-inner flex-shrink-0 animate-bounce">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-[#f0f6fc] text-lg">Analysis Connection Failed</h3>
              <p className="text-github-text text-sm leading-relaxed">
                {error}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => handleExplain()}
                  className="bg-[#21262d] hover:bg-[#30363d] border border-github-border hover:border-github-accent text-[#f0f6fc] font-bold text-xs px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3m-3-3v12" />
                  </svg>
                  Retry request
                </button>
              </div>
            </div>
          </section>
        )}

        {/* --- Loading Skeleton Cards State --- */}
        {loading && (
          <section className="space-y-6 mt-8 animate-pulse">
            {/* Header / Meta Card Skeleton */}
            <div className="bg-[#161b22] border border-github-border rounded-xl p-6 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2.5 flex-1">
                  <div className="h-7 bg-[#21262d] rounded-md w-1/3"></div>
                  <div className="h-4 bg-[#21262d] rounded-md w-3/4"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-7 bg-[#21262d] rounded-full w-16"></div>
                  <div className="h-7 bg-[#21262d] rounded-full w-24"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column Skeletons */}
              <div className="lg:col-span-2 space-y-6">
                {/* Summary & Solves Skeletons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#161b22] border border-github-border rounded-xl p-6 h-60 space-y-4">
                    <div className="h-5 bg-[#21262d] rounded-md w-1/2"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-[#21262d] rounded-md w-full"></div>
                      <div className="h-4 bg-[#21262d] rounded-md w-11/12"></div>
                      <div className="h-4 bg-[#21262d] rounded-md w-4/5"></div>
                    </div>
                  </div>
                  <div className="bg-[#161b22] border border-github-border rounded-xl p-6 h-60 space-y-4">
                    <div className="h-5 bg-[#21262d] rounded-md w-1/2"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-[#21262d] rounded-md w-full"></div>
                      <div className="h-4 bg-[#21262d] rounded-md w-5/6"></div>
                      <div className="h-4 bg-[#21262d] rounded-md w-3/4"></div>
                    </div>
                  </div>
                </div>

                {/* Difficulty & Contribution Skeletons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-[#161b22] border border-github-border rounded-xl p-6 h-48 space-y-4">
                    <div className="h-5 bg-[#21262d] rounded-md w-1/2"></div>
                    <div className="h-4 bg-[#21262d] rounded-md w-full"></div>
                    <div className="h-3 bg-[#21262d] rounded-md w-2/3"></div>
                  </div>
                  <div className="bg-[#161b22] border border-github-border rounded-xl p-6 h-48 space-y-4">
                    <div className="h-5 bg-[#21262d] rounded-md w-1/2"></div>
                    <div className="h-4 bg-[#21262d] rounded-md w-full"></div>
                    <div className="h-3 bg-[#21262d] rounded-md w-2/3"></div>
                  </div>
                </div>

                {/* Architecture Table Skeleton */}
                <div className="bg-[#161b22] border border-github-border rounded-xl p-6 space-y-4">
                  <div className="h-5 bg-[#21262d] rounded-md w-1/4"></div>
                  <div className="border border-github-border rounded-lg overflow-hidden space-y-0.5">
                    {[1, 2, 3].map((row) => (
                      <div key={row} className="bg-[#0d1117] px-4 py-3 flex gap-4">
                        <div className="h-4 bg-[#21262d] rounded-md w-1/4"></div>
                        <div className="h-4 bg-[#21262d] rounded-md w-2/3"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column Skeletons */}
              <div className="lg:col-span-1 space-y-6">
                {/* Tech Stack Skeleton */}
                <div className="bg-[#161b22] border border-github-border rounded-xl p-6 space-y-4">
                  <div className="h-5 bg-[#21262d] rounded-md w-1/3"></div>
                  <div className="flex flex-wrap gap-2">
                    <div className="h-8 bg-[#21262d] rounded-md w-20"></div>
                    <div className="h-8 bg-[#21262d] rounded-md w-24"></div>
                    <div className="h-8 bg-[#21262d] rounded-md w-16"></div>
                    <div className="h-8 bg-[#21262d] rounded-md w-28"></div>
                  </div>
                </div>

                {/* Fun Fact Skeleton */}
                <div className="bg-[#161b22] border border-github-border rounded-xl p-6 space-y-4">
                  <div className="h-5 bg-[#21262d] rounded-md w-1/3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-[#21262d] rounded-md w-full"></div>
                    <div className="h-4 bg-[#21262d] rounded-md w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* --- Loaded Results State --- */}
        {!loading && !error && data && (
          <section className="space-y-6 mt-8 animate-fade-in">
            {/* Header / Meta badge block */}
            <RepoMeta meta={data.meta} />

            {/* Dashboard grid structure */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Primary Content (Left 2/3) */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Summary card */}
                <ExplanationCard
                  summary={data.summary}
                  whatItSolves={data.what_it_solves}
                />

                {/* Difficulty badges card */}
                <DifficultyBadge
                  difficulty={data.difficulty}
                  goodFirstIssue={data.good_first_issue}
                />

                {/* Architecture directory table */}
                <ArchitectureTable
                  architecture={data.architecture}
                />
              </div>

              {/* Sidebar Content (Right 1/3) */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* Colored tech stack badges */}
                <TechStack
                  techStack={data.tech_stack}
                />

                {/* Glow callout fun fact trivia box */}
                <FunFact
                  funFact={data.fun_fact}
                />
              </div>

            </div>
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-github-border bg-[#0d1117] py-6 text-center select-none">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-github-muted text-xs font-semibold">
            &copy; {new Date().getFullYear()} Know it in a Click. Built with React + Vite + Tailwind CSS.
          </p>
          <div className="flex gap-4 text-xs font-semibold text-github-muted">
            <span className="hover:text-github-accent cursor-pointer transition-colors" onClick={() => alert('An AI agent designed this system.')}>About</span>
            <span>&middot;</span>
            <span className="hover:text-github-accent cursor-pointer transition-colors" onClick={() => alert('Endpoint requests sent to http://localhost:5678.')}>API Status</span>
            <span>&middot;</span>
            <span className="hover:text-github-accent cursor-pointer transition-colors" onClick={() => window.open('https://github.com', '_blank')}>Source</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
