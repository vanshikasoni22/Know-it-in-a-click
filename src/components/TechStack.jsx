import React from 'react'

export default function TechStack({ techStack }) {
  if (!techStack || !Array.isArray(techStack) || techStack.length === 0) return null

  // A comprehensive map of technologies to premium color themes (Tailwind classes)
  const getTechColorTheme = (name) => {
    const tech = name.toLowerCase().trim()
    
    // React / React Native
    if (tech.includes('react')) {
      return {
        bg: 'bg-[rgba(56,189,248,0.1)]',
        text: 'text-[#38bdf8]',
        border: 'border-[rgba(56,189,248,0.3)]'
      }
    }
    // TypeScript
    if (tech === 'typescript' || tech === 'ts') {
      return {
        bg: 'bg-[rgba(49,120,198,0.1)]',
        text: 'text-[#3178c6]',
        border: 'border-[rgba(49,120,198,0.3)]'
      }
    }
    // JavaScript
    if (tech === 'javascript' || tech === 'js') {
      return {
        bg: 'bg-[rgba(247,223,30,0.08)]',
        text: 'text-[#f7df1e]',
        border: 'border-[rgba(247,223,30,0.3)]'
      }
    }
    // Node.js / Express
    if (tech.includes('node') || tech === 'express') {
      return {
        bg: 'bg-[rgba(63,185,80,0.1)]',
        text: 'text-[#3fb950]',
        border: 'border-[rgba(63,185,80,0.3)]'
      }
    }
    // Python
    if (tech.includes('python') || tech === 'django' || tech === 'flask' || tech === 'fastapi') {
      return {
        bg: 'bg-[rgba(255,214,102,0.08)]',
        text: 'text-[#ffd666]',
        border: 'border-[rgba(255,214,102,0.3)]'
      }
    }
    // Rust
    if (tech.includes('rust')) {
      return {
        bg: 'bg-[rgba(244,90,51,0.1)]',
        text: 'text-[#f45a33]',
        border: 'border-[rgba(244,90,51,0.3)]'
      }
    }
    // Go / Golang
    if (tech === 'go' || tech === 'golang') {
      return {
        bg: 'bg-[rgba(0,173,216,0.1)]',
        text: 'text-[#00add8]',
        border: 'border-[rgba(0,173,216,0.3)]'
      }
    }
    // Docker / Kubernetes
    if (tech === 'docker' || tech === 'kubernetes' || tech === 'k8s') {
      return {
        bg: 'bg-[rgba(29,145,214,0.1)]',
        text: 'text-[#1d91d6]',
        border: 'border-[rgba(29,145,214,0.3)]'
      }
    }
    // C / C++ / C#
    if (tech === 'c' || tech === 'c++' || tech === 'cpp' || tech === 'c#') {
      return {
        bg: 'bg-[rgba(168,85,247,0.1)]',
        text: 'text-[#a855f7]',
        border: 'border-[rgba(168,85,247,0.3)]'
      }
    }
    // CSS / Tailwind / TailwindCSS
    if (tech.includes('css') || tech.includes('tailwind') || tech === 'sass') {
      return {
        bg: 'bg-[rgba(56,189,248,0.08)]',
        text: 'text-[#38bdf8]',
        border: 'border-[rgba(56,189,248,0.25)]'
      }
    }
    // HTML / Web
    if (tech === 'html' || tech === 'html5') {
      return {
        bg: 'bg-[rgba(244,90,51,0.08)]',
        text: 'text-[#f45a33]',
        border: 'border-[rgba(244,90,51,0.25)]'
      }
    }
    // Ruby / Rails
    if (tech === 'ruby' || tech === 'rails') {
      return {
        bg: 'bg-[rgba(248,81,73,0.1)]',
        text: 'text-[#f85149]',
        border: 'border-[rgba(248,81,73,0.3)]'
      }
    }
    // Swift / iOS / Kotlin / Android
    if (tech === 'swift' || tech === 'kotlin' || tech === 'java') {
      return {
        bg: 'bg-[rgba(236,72,153,0.1)]',
        text: 'text-[#ec4899]',
        border: 'border-[rgba(236,72,153,0.3)]'
      }
    }
    // Postgres / Mongo / Database / SQL / Redis
    if (tech.includes('sql') || tech.includes('postgres') || tech.includes('mongo') || tech === 'redis' || tech.includes('db')) {
      return {
        bg: 'bg-[rgba(54,197,240,0.1)]',
        text: 'text-[#36c5f0]',
        border: 'border-[rgba(54,197,240,0.3)]'
      }
    }

    // Default fallback using a simple hash-to-color selector for determinism
    const colors = [
      { bg: 'bg-[rgba(88,166,255,0.08)]', text: 'text-[#58a6ff]', border: 'border-[rgba(88,166,255,0.25)]' }, // blue
      { bg: 'bg-[rgba(63,185,80,0.08)]', text: 'text-[#3fb950]', border: 'border-[rgba(63,185,80,0.25)]' },   // green
      { bg: 'bg-[rgba(210,153,34,0.08)]', text: 'text-[#d29922]', border: 'border-[rgba(210,153,34,0.25)]' },  // yellow
      { bg: 'bg-[rgba(248,81,73,0.08)]', text: 'text-[#f85149]', border: 'border-[rgba(248,81,73,0.25)]' },   // red
      { bg: 'bg-[rgba(188,143,244,0.08)]', text: 'text-[#bc8ff4]', border: 'border-[rgba(188,143,244,0.25)]' }, // purple
      { bg: 'bg-[rgba(255,166,87,0.08)]', text: 'text-[#ffa657]', border: 'border-[rgba(255,166,87,0.25)]' }   // orange
    ]
    let hash = 0
    for (let i = 0; i < tech.length; i++) {
      hash = tech.charCodeAt(i) + ((hash << 5) - hash)
    }
    const index = Math.abs(hash) % colors.length
    return colors[index]
  }

  return (
    <div className="bg-[#161b22] border border-github-border rounded-xl p-6 shadow-md transition-all hover:border-[#444c56]">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="p-2 bg-[#1f242c] rounded-lg border border-github-border text-github-accent shadow-inner">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-[#f0f6fc]">Technology Stack</h3>
      </div>
      
      <div className="flex flex-wrap gap-2.5">
        {techStack.map((tech, idx) => {
          const theme = getTechColorTheme(tech)
          return (
            <div
              key={idx}
              className={`px-3.5 py-2 rounded-lg border text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-[1.03] select-none shadow-sm ${theme.bg} ${theme.text} ${theme.border}`}
            >
              {tech}
            </div>
          )
        })}
      </div>
    </div>
  )
}
