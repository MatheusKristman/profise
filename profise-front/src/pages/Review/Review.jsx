import React, { useState } from "react";

import { Footer, Header, HeaderMobileMenu } from "../Home/components";
import ReviewContent from "./components/ReviewContent";
import LoadingProfessional from "./components/LoadingProfessional";

function Review() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimationActive, setIsAnimationActive] = useState(false);

  return (
    <>
      <Header />
      <HeaderMobileMenu />
      <ReviewContent
        setIsLoading={setIsLoading}
        setIsAnimationActive={setIsAnimationActive}
      />
      <Footer />
      {isLoading && (
        <LoadingProfessional isAnimationActive={isAnimationActive} />
      )}
    </>
  );
}

export default Review;
