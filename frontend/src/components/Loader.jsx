import React from 'react'

const Loader = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 rounded-full border-4 border-neutral-200 border-t-red-600 animate-spin" />
      <p className="text-sm text-neutral-500 animate-pulse">
        Loading amazing ideas...
      </p>
    </div>
  );
};

export default Loader;
