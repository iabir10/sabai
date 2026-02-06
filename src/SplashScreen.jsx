import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Set timer to fade out after 3 seconds
    const timer = setTimeout(() => {
      setFadeOut(true);
      // Call onComplete after fade animation completes
      setTimeout(onComplete, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-white flex flex-col justify-center items-center z-50 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 invisible' : 'opacity-100'
      }`}
    >
      {/* Logo Wrapper with Ripple Effect */}
      <div className="relative flex justify-center items-center mb-12 animate-slideUp">
        {/* Ripple Effect Circles */}
        <div className="absolute w-28 h-28 bg-red-200 rounded-full animate-ripple" style={{ opacity: 0.8 }}></div>
        <div className="absolute w-28 h-28 bg-red-200 rounded-full animate-ripple" style={{ opacity: 0.8, animationDelay: '0.5s' }}></div>

        {/* Logo Image */}
        <img
          src="/logoHT02.png"
          alt="HATANG"
          className="w-40 h-auto z-10 drop-shadow-lg"
        />
      </div>

      {/* Tagline */}
      <div className="text-center mb-12 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">HATANG</h1>
        <p className="text-lg text-gray-600">Job for Everyone</p>
      </div>

      {/* Loading Bar */}
      <div className="w-36 h-1 bg-gray-200 rounded-full overflow-hidden animate-fadeIn" style={{ animationDelay: '0.5s' }}>
        <div className="h-full bg-red-500 rounded-full animate-loadProgress"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
