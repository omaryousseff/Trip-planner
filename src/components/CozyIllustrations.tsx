import React from 'react';

// Cute Smiling Star Mascot
export const CuteStarMascot: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Star Body */}
    <path
      d="M50 8 C52 8 54 13 58 24 L60 30 C62 33 65 35 69 36 L82 39 C93 42 95 48 87 56 L77 64 C74 67 73 70 74 74 L76 87 C78 98 72 102 63 96 L52 90 C49 88 45 88 42 90 L31 96 C22 102 16 98 18 87 L20 74 C21 70 20 67 17 64 L7 56 C-1 48 1 42 12 39 L25 36 C29 35 32 33 34 30 L36 24 C40 13 42 8 50 8 Z"
      fill="#FFE17D"
      stroke="#F2AA4C"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* Highlight shine */}
    <path
      d="M48 16 C49 16 51 20 54 28 C55 31 58 33 62 34 L73 37"
      stroke="#FFF9DB"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    {/* Rosy Cheeks */}
    <ellipse cx="33" cy="58" rx="5" ry="3.5" fill="#FFA4A4" opacity="0.85" />
    <ellipse cx="67" cy="58" rx="5" ry="3.5" fill="#FFA4A4" opacity="0.85" />
    {/* Happy Eyes */}
    <ellipse cx="38" cy="49" rx="3.5" ry="4.5" fill="#3D291F" />
    <circle cx="39.5" cy="47" r="1.5" fill="#FFFFFF" />
    <ellipse cx="62" cy="49" rx="3.5" ry="4.5" fill="#3D291F" />
    <circle cx="63.5" cy="47" r="1.5" fill="#FFFFFF" />
    {/* Gentle smile */}
    <path
      d="M44 56 Q50 63 56 56"
      stroke="#3D291F"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

// Vintage Golden Compass with Sparkles
export const CozyCompass: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer Sparkles */}
    <path d="M86 16 L88 22 L94 24 L88 26 L86 32 L84 26 L78 24 L84 22 Z" fill="#FFC93C" />
    <circle cx="14" cy="22" r="2.5" fill="#FFC93C" />
    {/* Ring and Casing */}
    <circle cx="50" cy="50" r="38" fill="#FBF6EE" stroke="#9A6B39" strokeWidth="5" />
    <circle cx="50" cy="50" r="33" fill="#FFFDF9" stroke="#DFB277" strokeWidth="2" strokeDasharray="3 3" />
    <circle cx="50" cy="12" r="6" stroke="#9A6B39" strokeWidth="4" fill="none" />
    {/* Cardinal Marks */}
    <path d="M50 20 L50 24 M50 76 L50 80 M20 50 L24 50 M76 50 L80 50" stroke="#9A6B39" strokeWidth="3" strokeLinecap="round" />
    {/* Compass Needle */}
    <polygon points="50,26 56,48 50,45" fill="#E8505B" />
    <polygon points="50,26 44,48 50,45" fill="#FF6F7D" />
    <polygon points="50,74 56,52 50,55" fill="#4B6584" />
    <polygon points="50,74 44,52 50,55" fill="#778CA3" />
    {/* Center Pivot */}
    <circle cx="50" cy="50" r="5" fill="#FFC93C" stroke="#9A6B39" strokeWidth="2" />
  </svg>
);

// Cute Squiggly Arrow ⤵
export const SquigglyArrow: React.FC<{ className?: string }> = ({ className = "w-8 h-8 text-stone-400" }) => (
  <svg viewBox="0 0 50 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 12 Q20 8 22 24 T36 36 L36 30 M36 36 L30 36"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Adorable Retro Pastel Camper Van
export const CozyCamperVan: React.FC<{ className?: string }> = ({ className = "w-16 h-12" }) => (
  <svg viewBox="0 0 120 90" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Star Trail */}
    <path d="M-10 45 L-6 48 L-10 51 L-14 48 Z" fill="#FFE17D" />
    <line x1="-12" y1="52" x2="-2" y2="52" stroke="#DFB277" strokeWidth="2" strokeDasharray="2 3" />
    
    {/* Roof rack & Luggage */}
    <rect x="35" y="10" width="45" height="4" rx="2" fill="#5C4D43" />
    <rect x="40" y="4" width="16" height="8" rx="2" fill="#55B69C" stroke="#3A8A74" strokeWidth="1.5" />
    <rect x="60" y="2" width="15" height="10" rx="2" fill="#FF8C68" stroke="#D96342" strokeWidth="1.5" />

    {/* Body Upper (Cream) */}
    <path
      d="M20 50 L20 28 C20 18 30 14 42 14 L85 14 C96 14 105 22 105 34 L105 50 Z"
      fill="#FFFDF7"
      stroke="#4A3F35"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />

    {/* Body Lower (Mint / Peach pastel) */}
    <path
      d="M18 50 L18 64 C18 69 22 72 28 72 L32 72 M48 72 L78 72 M94 72 L98 72 C103 72 106 68 106 63 L106 50 Z"
      fill="#8BD3C7"
      stroke="#4A3F35"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />

    {/* Separation Stripe */}
    <line x1="18" y1="50" x2="106" y2="50" stroke="#FF9C80" strokeWidth="4" />

    {/* Windows */}
    {/* Front windshield */}
    <path d="M84 22 L100 32 C101 35 101 44 100 45 L84 45 Z" fill="#D3F1FD" stroke="#4A3F35" strokeWidth="2.5" />
    {/* Side window with cute curtains */}
    <rect x="52" y="22" width="26" height="22" rx="3" fill="#D3F1FD" stroke="#4A3F35" strokeWidth="2.5" />
    <path d="M52 22 Q58 32 52 44" fill="#FFAAA6" />
    <path d="M78 22 Q72 32 78 44" fill="#FFAAA6" />
    {/* Driver/Rear window */}
    <rect x="25" y="22" width="20" height="22" rx="3" fill="#D3F1FD" stroke="#4A3F35" strokeWidth="2.5" />

    {/* Headlight & Taillight */}
    <circle cx="104" cy="56" r="3.5" fill="#FFEAA7" stroke="#4A3F35" strokeWidth="2" />
    <rect x="17" y="54" width="3" height="6" rx="1.5" fill="#E8505B" stroke="#4A3F35" strokeWidth="1.5" />

    {/* Wheels */}
    <g>
      <circle cx="40" cy="72" r="11" fill="#3D352E" />
      <circle cx="40" cy="72" r="5" fill="#FFFDF7" stroke="#DFB277" strokeWidth="2" />
    </g>
    <g>
      <circle cx="86" cy="72" r="11" fill="#3D352E" />
      <circle cx="86" cy="72" r="5" fill="#FFFDF7" stroke="#DFB277" strokeWidth="2" />
    </g>
  </svg>
);

// Adorable Capybara with Backpack Mascot
export const CozyCapybara: React.FC<{ className?: string }> = ({ className = "w-20 h-24" }) => (
  <svg viewBox="0 0 120 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Backpack on side */}
    <rect x="75" y="70" width="25" height="35" rx="7" fill="#FF8C52" stroke="#3A281E" strokeWidth="3" />
    <path d="M78 80 L97 80" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
    <path d="M70 75 Q78 68 85 75" stroke="#3A281E" strokeWidth="3.5" fill="none" />
    
    {/* Capybara Body */}
    <ellipse cx="58" cy="92" rx="32" ry="34" fill="#C49A6C" stroke="#3A281E" strokeWidth="3.5" />
    {/* Belly Highlight */}
    <ellipse cx="52" cy="98" rx="18" ry="20" fill="#D6AF85" />
    
    {/* Cute Feet */}
    <rect x="36" y="118" width="14" height="14" rx="6" fill="#A87E52" stroke="#3A281E" strokeWidth="3" />
    <rect x="62" y="118" width="14" height="14" rx="6" fill="#A87E52" stroke="#3A281E" strokeWidth="3" />

    {/* Arms holding backpack straps */}
    <path d="M38 82 Q42 95 48 94" stroke="#3A281E" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M68 82 Q76 90 78 86" stroke="#3A281E" strokeWidth="4" strokeLinecap="round" fill="none" />

    {/* Head */}
    <path
      d="M32 46 C32 28 44 24 64 24 C82 24 90 32 90 48 C90 64 80 72 62 72 C42 72 32 62 32 46 Z"
      fill="#C49A6C"
      stroke="#3A281E"
      strokeWidth="3.5"
    />

    {/* Snout */}
    <path
      d="M62 44 C66 44 86 46 88 56 C88 64 78 68 64 68 C54 68 52 62 52 56 C52 46 58 44 62 44 Z"
      fill="#A87E52"
    />

    {/* Capybara Small Ears */}
    <ellipse cx="40" cy="28" rx="5" ry="7" transform="rotate(-15 40 28)" fill="#8F633B" stroke="#3A281E" strokeWidth="2.5" />
    <ellipse cx="78" cy="28" rx="5" ry="7" transform="rotate(15 78 28)" fill="#8F633B" stroke="#3A281E" strokeWidth="2.5" />

    {/* Chill Relaxed Eyes */}
    <path d="M48 44 Q53 41 57 44" stroke="#2B1D16" strokeWidth="3" strokeLinecap="round" fill="none" />
    <circle cx="52" cy="42" r="1" fill="#FFFFFF" />

    {/* Cute Nostril */}
    <ellipse cx="80" cy="56" rx="2.5" ry="2" fill="#2B1D16" />
    <ellipse cx="84" cy="56" rx="2.5" ry="2" fill="#2B1D16" />

    {/* Rosy Blush */}
    <ellipse cx="46" cy="54" rx="5" ry="3" fill="#FF9E9E" opacity="0.8" />

    {/* Sparkle over head */}
    <path d="M96 20 L98 25 L103 27 L98 29 L96 34 L94 29 L89 27 L94 25 Z" fill="#FFC93C" />
  </svg>
);

// 8 OCCASION ILLUSTRATIONS FROM IMG_0781.png

// 1. Tropical Palm Island (Vacation / Leisure)
export const PalmIslandOccasion: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ocean water */}
    <ellipse cx="40" cy="62" rx="34" ry="10" fill="#E2F5F4" />
    <path d="M12 63 Q20 60 28 63 T44 63 T60 63 T68 63" stroke="#87D3D0" strokeWidth="2" strokeLinecap="round" />
    {/* Sandy Island Mound */}
    <path d="M22 62 Q40 50 58 62 Z" fill="#FCE7BA" stroke="#D19E5B" strokeWidth="1.5" />
    {/* Palm Trunk */}
    <path d="M40 56 Q36 42 42 30" stroke="#96613D" strokeWidth="3.5" strokeLinecap="round" />
    {/* Coconut */}
    <circle cx="39" cy="31" r="2.5" fill="#6B4123" />
    <circle cx="43" cy="31" r="2.5" fill="#6B4123" />
    {/* Palm Leaves */}
    <path d="M42 30 Q26 24 22 34" stroke="#48B774" strokeWidth="3" strokeLinecap="round" />
    <path d="M42 30 Q44 14 54 18" stroke="#48B774" strokeWidth="3" strokeLinecap="round" />
    <path d="M42 30 Q58 26 62 36" stroke="#48B774" strokeWidth="3" strokeLinecap="round" />
    <path d="M42 30 Q30 18 36 12" stroke="#5CCB89" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// 2. Ring in Open Pink Velvet Box (Proposal / Romantic)
export const RingBoxOccasion: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Box bottom cushion */}
    <rect x="22" y="44" width="36" height="22" rx="7" fill="#F88B8B" stroke="#D65858" strokeWidth="2" />
    <rect x="26" y="42" width="28" height="6" rx="3" fill="#FFC2C2" />
    {/* Box Lid open upwards */}
    <path d="M22 42 C22 28 32 20 40 20 C48 20 58 28 58 42 Z" fill="#FFA5A5" stroke="#D65858" strokeWidth="2" />
    {/* Ring slot */}
    <ellipse cx="40" cy="44" rx="9" ry="3" fill="#D65858" />
    {/* Diamond Ring Standing Up */}
    <circle cx="40" cy="35" r="9" stroke="#E8B838" strokeWidth="2.5" fill="none" />
    {/* Sparkling Diamond */}
    <polygon points="40,20 44,25 40,29 36,25" fill="#D3F1FD" stroke="#5EAFD6" strokeWidth="1" />
    {/* Sparkle shine */}
    <path d="M47 18 L48 21 L51 22 L48 23 L47 26 L46 23 L43 22 L46 21 Z" fill="#FFE17D" />
  </svg>
);

// 3. Two Friends on Pink Retro Scooter (Adventure / Road Trip)
export const ScooterDuoOccasion: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Scooter Wheels */}
    <circle cx="24" cy="62" r="7" fill="#4A3F35" />
    <circle cx="24" cy="62" r="3" fill="#FFF" />
    <circle cx="58" cy="62" r="7" fill="#4A3F35" />
    <circle cx="58" cy="62" r="3" fill="#FFF" />
    {/* Scooter Body */}
    <path d="M24 60 L36 60 L44 52 L56 52 L60 60" stroke="#F26A6A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M52 52 L56 36 L52 36" stroke="#4A3F35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Front Light */}
    <circle cx="60" cy="40" r="3" fill="#FFF9C4" stroke="#4A3F35" strokeWidth="1.5" />
    {/* Driver (Front) */}
    <circle cx="48" cy="28" r="6" fill="#87D3D0" stroke="#4A3F35" strokeWidth="1.5" />
    <path d="M44 34 Q46 44 48 50" stroke="#4A3F35" strokeWidth="3" strokeLinecap="round" />
    {/* Passenger (Back) */}
    <circle cx="35" cy="26" r="6" fill="#FFAAA6" stroke="#4A3F35" strokeWidth="1.5" />
    <path d="M34 32 Q38 42 40 50" stroke="#4A3F35" strokeWidth="3" strokeLinecap="round" />
    {/* Cute wave arm */}
    <path d="M30 30 Q24 24 24 18" stroke="#4A3F35" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 4. Cool Ghost with Sunglasses (Solo Adventure)
export const CoolGhostOccasion: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ghost Silhouette */}
    <path
      d="M24 62 Q20 40 24 30 C27 18 53 18 56 30 Q60 40 56 62 Q52 58 48 62 Q44 58 40 62 Q36 58 32 62 Q28 58 24 62 Z"
      fill="#FFFDF7"
      stroke="#4A3F35"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Cool Sunglasses */}
    <rect x="29" y="32" width="10" height="7" rx="2" fill="#222" />
    <rect x="42" y="32" width="10" height="7" rx="2" fill="#222" />
    <line x1="39" y1="35" x2="42" y2="35" stroke="#222" strokeWidth="2" />
    {/* Little Ghost Hands */}
    <path d="M22 42 Q16 42 18 46" stroke="#4A3F35" strokeWidth="2" strokeLinecap="round" />
    <path d="M58 42 Q64 42 62 46" stroke="#4A3F35" strokeWidth="2" strokeLinecap="round" />
    {/* Smug smile */}
    <path d="M38 46 Q41 49 44 46" stroke="#4A3F35" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

// 5. Parents with Baby (Family with Kids)
export const FamilyBabyOccasion: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Parent Left (Dad) */}
    <circle cx="30" cy="28" r="7" fill="#B3E5FC" stroke="#3A2E25" strokeWidth="2" />
    <rect x="22" y="36" width="16" height="24" rx="5" fill="#81C784" stroke="#3A2E25" strokeWidth="2" />
    {/* Parent Right (Mom) */}
    <circle cx="50" cy="28" r="7" fill="#FFE082" stroke="#3A2E25" strokeWidth="2" />
    <rect x="42" y="36" width="16" height="24" rx="5" fill="#FF8A80" stroke="#3A2E25" strokeWidth="2" />
    {/* Happy Baby in middle */}
    <circle cx="40" cy="46" r="6" fill="#FFE0B2" stroke="#3A2E25" strokeWidth="1.5" />
    <ellipse cx="40" cy="56" rx="7" ry="6" fill="#FFF9C4" stroke="#3A2E25" strokeWidth="1.5" />
    {/* Floating Love Heart */}
    <path d="M40 18 C38 14 34 14 34 18 C34 22 40 25 40 25 C40 25 46 22 46 18 C46 14 42 14 40 18 Z" fill="#FF5252" />
  </svg>
);

// 6. Ring on Pillow with Floating Hearts (Honeymoon)
export const HoneymoonRingOccasion: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Velvet Pillow Cushion */}
    <path
      d="M18 52 Q40 46 62 52 Q66 64 62 66 Q40 70 18 66 Q14 64 18 52 Z"
      fill="#D1C4E9"
      stroke="#7E57C2"
      strokeWidth="2"
    />
    <circle cx="20" cy="53" r="2" fill="#7E57C2" />
    <circle cx="60" cy="53" r="2" fill="#7E57C2" />
    <circle cx="20" cy="65" r="2" fill="#7E57C2" />
    <circle cx="60" cy="65" r="2" fill="#7E57C2" />
    {/* Golden Ring Resting */}
    <ellipse cx="40" cy="46" rx="12" ry="15" stroke="#FBC02D" strokeWidth="3" fill="none" />
    {/* Diamond */}
    <polygon points="40,27 44,32 40,36 36,32" fill="#E1F5FE" stroke="#0288D1" strokeWidth="1.5" />
    {/* Two Cute Pink Hearts Floating */}
    <path d="M52 24 C50 20 46 20 46 23 C46 27 52 30 52 30 C52 30 58 27 58 23 C58 20 54 20 52 24 Z" fill="#FF4081" />
    <path d="M60 14 C59 11 56 11 56 13 C56 16 60 18 60 18 C60 18 64 16 64 13 C64 11 61 11 60 14 Z" fill="#FF80AB" />
  </svg>
);

// 7. Cute Stacked Suitcases / Luggage (Weekend Getaway)
export const LuggageStackOccasion: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Bottom Larger Bag (Coral) */}
    <rect x="22" y="44" width="38" height="24" rx="6" fill="#FF7A66" stroke="#3D291F" strokeWidth="2.5" />
    <rect x="26" y="52" width="30" height="2" fill="#FFB4A2" />
    <line x1="32" y1="44" x2="32" y2="68" stroke="#3D291F" strokeWidth="1.5" />
    <line x1="50" y1="44" x2="50" y2="68" stroke="#3D291F" strokeWidth="1.5" />
    {/* Top Smaller Bag (Peach/Pink) */}
    <rect x="26" y="26" width="30" height="18" rx="5" fill="#FFAAA6" stroke="#3D291F" strokeWidth="2.5" />
    <path d="M36 26 L36 22 Q41 20 46 22 L46 26" stroke="#3D291F" strokeWidth="2" fill="none" />
    {/* Cute luggage tag */}
    <polygon points="53,36 57,36 58,42 52,42" fill="#FFE17D" stroke="#3D291F" strokeWidth="1" />
  </svg>
);

// 8. Two Cute Cuddling Dumplings / Peanut Buddies (Friends Getaway)
export const DumplingBuddiesOccasion: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left Dumpling */}
    <path
      d="M32 62 C22 62 18 54 22 42 C24 32 32 26 34 26 C36 26 44 34 42 46 C42 56 38 62 32 62 Z"
      fill="#FFEAA7"
      stroke="#4A3F35"
      strokeWidth="2.5"
    />
    {/* Right Dumpling cuddling in */}
    <path
      d="M48 62 C38 62 36 52 40 40 C42 30 50 26 52 26 C54 26 62 34 60 48 C60 56 56 62 48 62 Z"
      fill="#FFE17D"
      stroke="#4A3F35"
      strokeWidth="2.5"
    />
    {/* Happy Faces */}
    {/* Left dumpling face */}
    <ellipse cx="27" cy="46" rx="1.5" ry="2" fill="#333" />
    <ellipse cx="35" cy="46" rx="1.5" ry="2" fill="#333" />
    <path d="M30 50 Q32 53 34 50" stroke="#333" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="24" cy="50" r="2" fill="#FF8A80" opacity="0.8" />
    {/* Right dumpling face */}
    <ellipse cx="45" cy="46" rx="1.5" ry="2" fill="#333" />
    <ellipse cx="53" cy="46" rx="1.5" ry="2" fill="#333" />
    <path d="M48 50 Q50 53 52 50" stroke="#333" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="56" cy="50" r="2" fill="#FF8A80" opacity="0.8" />
  </svg>
);
