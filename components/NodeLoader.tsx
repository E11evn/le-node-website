'use client'

export default function NodeLoader({ computing }: { computing?: boolean }) {
  return (
    <div className="relative w-[60px] h-[60px] flex items-center justify-center">
      <style>{`
        @keyframes nlPulse0 { 0%,100% { transform: scale(1);    } 50% { transform: scale(1.18); } }
        @keyframes nlPulse1 { 0%,100% { transform: scale(1);    } 50% { transform: scale(0.84); } }
        @keyframes nlPulse2 { 0%,100% { transform: scale(1);    } 50% { transform: scale(1.22); } }
        @keyframes nlPulse3 { 0%,100% { transform: scale(1);    } 50% { transform: scale(0.78); } }
        @keyframes nlCorePulse {
          0%,100% { transform: scale(1);   box-shadow: 0 0 5px rgba(0,67,250,0.5); }
          50%     { transform: scale(2.4); box-shadow: 0 0 16px rgba(0,67,250,1);  }
        }
      `}</style>

      {/* Base Glow */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(0,67,250,0.08) 0%, transparent 70%)',
          filter: 'blur(10px)',
        }}
      />

      {/* Outer Dashed Ring */}
      <div style={{ position: 'absolute', inset: 0, transformOrigin: '50% 50%', animation: computing ? 'nlPulse0 0.70s ease-in-out infinite' : 'none' }}>
        <div
          className="absolute inset-0 rounded-full border border-dashed animate-[spin_10s_linear_infinite]"
          style={{ borderColor: 'rgba(0,67,250,0.25)' }}
        />
      </div>

      {/* Main Arc */}
      <div style={{ position: 'absolute', inset: 0, transformOrigin: '50% 50%', animation: computing ? 'nlPulse1 0.50s ease-in-out infinite' : 'none' }}>
        <div
          className="absolute rounded-full border-[2px] border-transparent animate-[spin_2s_linear_infinite]"
          style={{
            inset: '2px',
            borderTopColor: '#0043FA',
            boxShadow: '0 0 7px rgba(0,67,250,0.45)',
          }}
        />
      </div>

      {/* Reverse Arc */}
      <div style={{ position: 'absolute', inset: 0, transformOrigin: '50% 50%', animation: computing ? 'nlPulse2 0.45s ease-in-out infinite' : 'none' }}>
        <div
          className="absolute rounded-full border-[2px] border-transparent animate-[spin_3s_linear_infinite_reverse]"
          style={{
            inset: '7px',
            borderBottomColor: 'rgba(29,29,34,0.5)',
            boxShadow: '0 0 5px rgba(29,29,34,0.15)',
          }}
        />
      </div>

      {/* Inner Fast Ring */}
      <div style={{ position: 'absolute', inset: 0, transformOrigin: '50% 50%', animation: computing ? 'nlPulse3 0.38s ease-in-out infinite' : 'none' }}>
        <div
          className="absolute rounded-full border border-transparent animate-[spin_1s_ease-in-out_infinite]"
          style={{
            inset: '11px',
            borderLeftColor: 'rgba(0,67,250,0.55)',
          }}
        />
      </div>

      {/* Orbital Dot */}
      <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full"
          style={{
            background: '#0043FA',
            boxShadow: '0 0 4px rgba(0,67,250,0.9)',
          }}
        />
      </div>

      {/* Center Core */}
      <div
        className={`absolute w-2 h-2 rounded-full${computing ? '' : ' animate-pulse'}`}
        style={{
          background: '#1D1D22',
          ...(computing
            ? { animation: 'nlCorePulse 0.55s ease-in-out infinite' }
            : { boxShadow: '0 0 5px rgba(0,67,250,0.5)' }),
        }}
      />
    </div>
  )
}
