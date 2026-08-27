function Logo({ bounce, onAnimationEnd }) {
  return (
    <svg
      className={bounce ? 'logo-bounce' : ''}
      onAnimationEnd={onAnimationEnd}
      viewBox="0 0 100 100"
      width="64"
      height="64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="gomitoloGradient" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#e57368" />
          <stop offset="60%" stopColor="#c0392b" />
          <stop offset="100%" stopColor="#922b21" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="46" r="30" fill="url(#gomitoloGradient)" />
      <path d="M20 46 Q50 18 80 46" stroke="#7b241c" strokeWidth="2.5" fill="none" opacity="0.6" />
      <path d="M20 46 Q50 74 80 46" stroke="#7b241c" strokeWidth="2.5" fill="none" opacity="0.6" />
      <path d="M22 34 Q50 46 22 58" stroke="#7b241c" strokeWidth="2.5" fill="none" opacity="0.5" />
      <path d="M78 34 Q50 46 78 58" stroke="#7b241c" strokeWidth="2.5" fill="none" opacity="0.5" />
      <path d="M50 16 Q28 46 50 76" stroke="#7b241c" strokeWidth="2.5" fill="none" opacity="0.6" />
      <path d="M50 16 Q72 46 50 76" stroke="#7b241c" strokeWidth="2.5" fill="none" opacity="0.6" />
      <path d="M80 46 Q94 58 90 76 Q88 84 80 82" stroke="#7b241c" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9" />
    </svg>
  )
}

export default Logo