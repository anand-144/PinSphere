import React from 'react'

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
      <div className="loader-spinner" />
      <p className="text-muted-foreground text-sm animate-pulse">
        Loading amazing ideas...
      </p>
    </div>
  );
};

export default Loader;


