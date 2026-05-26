import React from 'react'

export default function RepoMeta({ meta }) {
  if (!meta) return null

  const { name, language, stars, license, description, topics } = meta

  // Format stars count (e.g., 12500 -> 12.5k)
  const formatStars = (num) => {
    if (num === undefined || num === null) return '0'
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
    }
    return num.toString()
  }

  // Parse topics
  const parsedTopics = topics
    ? typeof topics === 'string'
      ? topics.split(',').map((t) => t.trim()).filter(Boolean)
      : Array.isArray(topics)
      ? topics
      : []
    : []

  return (
    <div className="bg-[#161b22] border border-github-border rounded-xl p-6 shadow-md transition-all hover:border-[#444c56]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title and Repo info */}
        <div className="flex-1">
          <div className="flex items-center gap-3">
            {/* Repo Book Icon */}
            <svg className="w-6 h-6 text-github-accent flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8z" />
            </svg>
            <h2 className="text-xl md:text-2xl font-bold text-[#f0f6fc] tracking-tight hover:text-github-accent transition-colors">
              {name || 'Repository Explainer'}
            </h2>
          </div>
          {description && (
            <p className="mt-2.5 text-github-muted text-sm leading-relaxed max-w-4xl">
              {description}
            </p>
          )}
        </div>

        {/* Stats and badges */}
        <div className="flex flex-wrap gap-2.5 self-start md:self-center">
          {/* Stars Pill Badge */}
          {stars !== undefined && (
            <div className="flex items-center gap-1.5 bg-[#21262d] text-[#f0f6fc] border border-github-border px-3 py-1.5 rounded-full text-xs font-semibold select-none hover:bg-[#30363d] transition-colors">
              <svg className="w-4 h-4 text-yellow-400" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
              </svg>
              <span>{formatStars(stars)}</span>
            </div>
          )}

          {/* Language Pill Badge */}
          {language && (
            <div className="flex items-center gap-1.5 bg-[#21262d] text-[#f0f6fc] border border-github-border px-3 py-1.5 rounded-full text-xs font-semibold select-none hover:bg-[#30363d] transition-colors">
              <span className="w-2.5 h-2.5 rounded-full bg-github-accent"></span>
              <span>{language}</span>
            </div>
          )}

          {/* License Pill Badge */}
          {license && (
            <div className="flex items-center gap-1.5 bg-[#21262d] text-[#f0f6fc] border border-github-border px-3 py-1.5 rounded-full text-xs font-semibold select-none hover:bg-[#30363d] transition-colors">
              <svg className="w-4 h-4 text-github-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
              <span>{license}</span>
            </div>
          )}
        </div>
      </div>

      {/* Topics row */}
      {parsedTopics.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-github-border">
          {parsedTopics.map((topic, index) => (
            <span
              key={index}
              className="bg-[#1f242c] text-github-accent hover:bg-[#282f3a] px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors border border-transparent hover:border-[#388bfd]"
            >
              #{topic}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
