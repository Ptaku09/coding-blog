export const MobileHomeBackground = () => {
  return (
    <div className="fixed w-screen h-screen">
      <svg
        id="visual"
        viewBox="0 0 390 844"
        width="390"
        height="844"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
      >
        <defs>
          <filter id="blur1" x="-10%" y="-10%" width="120%" height="120%">
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
            <feGaussianBlur stdDeviation="138" result="effect1_foregroundBlur"></feGaussianBlur>
          </filter>
        </defs>
        <rect width="390" height="844" fill="#071a44"></rect>
        <g filter="url(#blur1)">
          <circle cx="178" cy="340" fill="#040d22" r="307"></circle>
          <circle cx="355" cy="438" fill="#071a44" r="307"></circle>
          <circle cx="106" cy="498" fill="#040d22" r="307"></circle>
          <circle cx="171" cy="712" fill="#040d22" r="307"></circle>
          <circle cx="122" cy="128" fill="#071a44" r="307"></circle>
          <circle cx="386" cy="260" fill="#040d22" r="307"></circle>
        </g>
      </svg>
    </div>
  );
};
