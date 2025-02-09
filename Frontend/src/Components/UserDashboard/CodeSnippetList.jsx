import React from 'react';

function CodeSnippetList({ snippets }) {
  return (
    <div className="space-y-4">
      {snippets.map((snippet) => (
        <div key={snippet.id} className="backdrop-blur-sm bg-[#415A77]/60 p-4 rounded-xl border border-[#415A77]/50 hover:border-[#598392]/40 transition-colors">
          <h3 className="text-lg font-medium mb-2">{snippet.title}</h3>
          <pre className="backdrop-blur-md bg-[#01161E]/80 p-4 rounded-lg overflow-x-auto border border-[#124559]/50">
            <code className="text-sm font-mono text-[#EFF6E0]">
              {snippet.code}
            </code>
          </pre>
        </div>
      ))}
    </div>
  );
}

export default CodeSnippetList;