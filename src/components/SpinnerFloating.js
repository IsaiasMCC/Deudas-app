import React from 'react'

const SpinnerFloating = () => {
  return (
    <div className="absolute text-center mt-56 left-1/2">
      <div
        className="animate-spin inline-block w-20 h-20 border-[6px] border-current border-t-transparent text-blue-600 rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default SpinnerFloating