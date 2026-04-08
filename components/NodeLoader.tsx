'use client'

export default function NodeLoader() {
  return (
    <div className="relative w-[90px] h-[90px] flex items-center justify-center">

      {/* Base Glow */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(0,67,250,0.08) 0%, transparent 70%)',
          filter: 'blur(10px)',
        }}
      />

      {/* Outer Dashed Ring */}
      <div
        className="absolute inset-0 rounded-full border border-dashed animate-[spin_10s_linear_infinite]"
        style={{ borderColor: 'rgba(0,67,250,0.25)' }}
      />

      {/* Main Arc */}
      <div
        className="absolute rounded-full border-[2px] border-transparent animate-[spin_2s_linear_infinite]"
        style={{
          inset: '3px',
          borderTopColor: '#0043FA',
          boxShadow: '0 0 7px rgba(0,67,250,0.45)',
        }}
      />

      {/* Reverse Arc */}
      <div
        className="absolute rounded-full border-[2px] border-transparent animate-[spin_3s_linear_infinite_reverse]"
        style={{
          inset: '10px',
          borderBottomColor: 'rgba(29,29,34,0.5)',
          boxShadow: '0 0 5px rgba(29,29,34,0.15)',
        }}
      />

      {/* Inner Fast Ring */}
      <div
        className="absolute rounded-full border border-transparent animate-[spin_1s_ease-in-out_infinite]"
        style={{
          inset: '17px',
          borderLeftColor: 'rgba(0,67,250,0.55)',
        }}
      />

      {/* Orbital Dot */}
      <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[4px] h-[4px] rounded-full"
          style={{
            background: '#0043FA',
            boxShadow: '0 0 4px rgba(0,67,250,0.9)',
          }}
        />
      </div>

      {/* Center Core */}
      <div
        className="absolute w-2 h-2 rounded-full animate-pulse"
        style={{
          background: '#1D1D22',
          boxShadow: '0 0 5px rgba(0,67,250,0.5)',
        }}
      />
    </div>
  )
}
