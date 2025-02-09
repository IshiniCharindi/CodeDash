import React, { useState } from 'react';

function AddSnippetModal({ onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, code });
    setTitle('');
    setCode('');
  };

  return (
    <div className="fixed inset-0 bg-[#415A77]/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="backdrop-blur-md bg-[#1B263B]/60 rounded-xl border border-[#124559]/50 p-6 w-full max-w-2xl shadow-2xl">
        <h2 className="text-xl font-semibold mb-4">Add New Code Snippet</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded-lg bg-[#1B263B]/80 text-[#EFF6E0] border border-[#124559]/50 focus:border-[#598392] transition-colors backdrop-blur-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Code</label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows="6"
              className="w-full p-2 rounded-lg bg-[#1B263B]/80 text-[#EFF6E0] border border-[#124559]/50 focus:border-[#598392] transition-colors backdrop-blur-sm font-mono"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#0D1B2A]/80 border border-[#1B263B]/50 hover:bg-[#598392] transition-colors backdrop-blur-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#0D1B2A] border border-[#1B263B]/50 hover:bg-[#598392] transition-colors backdrop-blur-sm"
            >
              Add Snippet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSnippetModal;