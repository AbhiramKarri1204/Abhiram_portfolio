import React, { useState } from 'react';
import IntroVideoSplash from './components/IntroVideoSplash';
import YourPortfolioComponent from './components/YourPortfolioComponent';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro ? (
        <IntroVideoSplash onTransition={() => setShowIntro(false)} />
      ) : (
        <YourPortfolioComponent />
      )}
    </>
  );
}
