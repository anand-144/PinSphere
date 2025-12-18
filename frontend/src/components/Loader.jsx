import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-black"></div>
    </div>
  )
}

export default Loader
