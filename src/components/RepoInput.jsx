import React, { useState } from 'react'

export default function RepoInput({ repoUrl, setRepoUrl, onExplain, loading }) {
  const [validationError, setValidationError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!repoUrl) {
      setValidationError('Please enter a GitHub repository URL.')
      return
    }
    if (!repoUrl.trim().startsWith('https://github.com/')) {
      setValidationError('URL must start with "https://github.com/".')
      return
    }
    setValidationError(null)
    onExplain()
  }

  const handleInputChange = (val) => {
    setRepoUrl(val)
    if (val && !val.trim().startsWith('https://github.com/')) {
      setValidationError('URL must start with "https://github.com/".')
    } else {
      setValidationError(null)
    }
  }

  const handleExampleClick = (url) => {
    setRepoUrl(url)
    setValidationError(null)
    // Small timeout to allow state to update before calling explain
    setTimeout(() => {
      // Direct action is handled in App.jsx via state change or direct invocation
      // We pass the URL back to run directly
      onExplain(url)
    }, 50)
  }

  const examples = [
    { name: 'axios/axios', url: 'https://github.com/axios/axios', desc: 'Promise based HTTP client' },
    { name: 'facebook/react', url: 'https://github.com/facebook/react', desc: 'UI library for JavaScript' },
    { name: 'torvalds/linux', url: 'https://github.com/torvalds/linux', desc: 'Linux kernel source tree' }
  ]

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          {/* GitHub Icon prefix inside input */}
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-github-muted">
            <svg className="w-5 h-5" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </div>
          <input
            type="text"
            className={`w-full bg-[#161b22] text-[#f0f6fc] placeholder-[#8b949e] pl-11 pr-4 py-3.5 rounded-lg border text-sm font-medium transition-all outline-none ${
              validationError
                ? 'border-github-danger focus:border-github-danger focus:ring-1 focus:ring-github-danger'
                : 'border-github-border focus:border-github-accent focus:ring-1 focus:ring-github-accent'
            }`}
            placeholder="Paste GitHub Repository URL (e.g., https://github.com/facebook/react)"
            value={repoUrl}
            onChange={(e) => handleInputChange(e.target.value)}
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#24292f] hover:bg-[#2f363d] text-github-accent font-semibold px-8 py-3.5 rounded-lg border border-github-border transition-all duration-200 flex items-center justify-center gap-2 text-sm select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none hover:shadow-lg hover:border-github-accent hover:text-white"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-github-accent" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <span>⚡ Explain</span>
            </>
          )}
        </button>
      </form>

      {validationError && (
        <div className="text-github-danger text-xs font-semibold mt-2.5 flex items-center gap-1.5 animate-fade-in pl-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {validationError}
        </div>
      )}

      {/* Examples section under the input */}
      <div className="mt-5 text-left">
        <span className="text-xs text-github-muted uppercase tracking-wider font-semibold">Try an example:</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-2">
          {examples.map((ex) => (
            <button
              key={ex.name}
              type="button"
              onClick={() => handleExampleClick(ex.url)}
              disabled={loading}
              className="bg-[#161b22] hover:bg-[#1f242c] border border-github-border hover:border-github-accent text-left p-3 rounded-lg transition-all group duration-200 focus:outline-none focus:ring-1 focus:ring-github-accent disabled:opacity-50"
            >
              <div className="text-[#f0f6fc] group-hover:text-github-accent text-sm font-semibold flex items-center justify-between">
                <span>{ex.name}</span>
                <svg className="w-4 h-4 text-github-muted group-hover:text-github-accent group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="text-github-muted text-xs truncate mt-1">{ex.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
