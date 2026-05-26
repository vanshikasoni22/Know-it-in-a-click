import React from 'react'

export default function ArchitectureTable({ architecture }) {
  if (!architecture || !Array.isArray(architecture) || architecture.length === 0) return null

  // Helper to determine if a string looks like a file or folder
  const isFile = (path) => {
    // If it has a file extension or matches common file formats
    return path.includes('.') || path.endsWith('file')
  }

  return (
    <div className="bg-[#161b22] border border-github-border rounded-xl p-6 shadow-md transition-all hover:border-[#444c56]">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="p-2 bg-[#1f242c] rounded-lg border border-github-border text-[#a855f7] shadow-inner">
          {/* Architecture/Grid Icon */}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-[#f0f6fc]">System Architecture & File Roles</h3>
      </div>

      <div className="overflow-x-auto rounded-lg border border-github-border bg-[#0d1117]">
        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr className="border-b border-github-border bg-[#161b22]">
              <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-github-muted w-1/3">
                File or Folder
              </th>
              <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-github-muted">
                Role in Repository
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-github-border text-sm font-medium">
            {architecture.map((item, idx) => {
              const fileCheck = isFile(item.file_or_folder)
              return (
                <tr
                  key={idx}
                  className="hover:bg-[#161b22]/50 transition-colors duration-150 group"
                >
                  <td className="px-5 py-3.5 whitespace-nowrap text-[#f0f6fc] font-mono text-xs flex items-center gap-2.5">
                    {fileCheck ? (
                      /* File Icon */
                      <svg className="w-4 h-4 text-github-muted group-hover:text-github-accent transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    ) : (
                      /* Folder Icon */
                      <svg className="w-4 h-4 text-github-accent/70 group-hover:text-github-accent transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    )}
                    <span className="font-semibold select-all truncate max-w-[220px] md:max-w-none block" title={item.file_or_folder}>
                      {item.file_or_folder}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-github-text text-xs md:text-sm font-normal leading-relaxed">
                    {item.role}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
