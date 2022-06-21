import React from "react";

function TimeCircle() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="430"
      height="430"
      fill="none"
      viewBox="0 0 430 430"
    >
      <g filter="url(#filter0_b_530_20)">
        <circle cx="215" cy="184" r="117" fill="#7FDBC0"></circle>
      </g>
      <g filter="url(#filter1_bd_530_20)">
        <circle
          cx="215"
          cy="184"
          r="131"
          fill="#EEE"
          fillOpacity="0.3"
          shapeRendering="crispEdges"
        ></circle>
      </g>
      <g filter="url(#filter2_b_530_20)">
        <circle
          cx="215"
          cy="184"
          r="117"
          fill="#fff"
          fillOpacity="0.3"
        ></circle>
      </g>
      <g filter="url(#filter3_b_530_20)">
        <circle
          cx="215"
          cy="184"
          r="97"
          stroke="#EAFFF8"
          strokeDasharray="1 6"
          strokeMiterlimit="3.138"
          strokeWidth="10"
        ></circle>
      </g>
      <g filter="url(#filter4_b_530_20)">
        <circle
          cx="215"
          cy="184"
          r="109"
          stroke="#00D895"
          strokeMiterlimit="3.138"
          strokeOpacity="0.1"
          strokeWidth="4"
        ></circle>
      </g>
      <defs>
        <filter
          id="filter0_b_530_20"
          width="822"
          height="822"
          x="-196"
          y="-227"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feGaussianBlur
            in="BackgroundImage"
            stdDeviation="147"
          ></feGaussianBlur>
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_530_20"
          ></feComposite>
          <feBlend
            in="SourceGraphic"
            in2="effect1_backgroundBlur_530_20"
            result="shape"
          ></feBlend>
        </filter>
        <filter
          id="filter1_bd_530_20"
          width="430"
          height="430"
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feGaussianBlur
            in="BackgroundImage"
            stdDeviation="2"
          ></feGaussianBlur>
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_530_20"
          ></feComposite>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feMorphology
            in="SourceAlpha"
            radius="50"
            result="effect2_dropShadow_530_20"
          ></feMorphology>
          <feOffset dy="31"></feOffset>
          <feGaussianBlur stdDeviation="67"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix>
          <feBlend
            in2="effect1_backgroundBlur_530_20"
            result="effect2_dropShadow_530_20"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect2_dropShadow_530_20"
            result="shape"
          ></feBlend>
        </filter>
        <filter
          id="filter2_b_530_20"
          width="822"
          height="822"
          x="-196"
          y="-227"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feGaussianBlur
            in="BackgroundImage"
            stdDeviation="147"
          ></feGaussianBlur>
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_530_20"
          ></feComposite>
          <feBlend
            in="SourceGraphic"
            in2="effect1_backgroundBlur_530_20"
            result="shape"
          ></feBlend>
        </filter>
        <filter
          id="filter3_b_530_20"
          width="792"
          height="792"
          x="-181"
          y="-212"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feGaussianBlur
            in="BackgroundImage"
            stdDeviation="147"
          ></feGaussianBlur>
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_530_20"
          ></feComposite>
          <feBlend
            in="SourceGraphic"
            in2="effect1_backgroundBlur_530_20"
            result="shape"
          ></feBlend>
        </filter>
        <filter
          id="filter4_b_530_20"
          width="810"
          height="810"
          x="-190"
          y="-221"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feGaussianBlur
            in="BackgroundImage"
            stdDeviation="147"
          ></feGaussianBlur>
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_530_20"
          ></feComposite>
          <feBlend
            in="SourceGraphic"
            in2="effect1_backgroundBlur_530_20"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}

export default TimeCircle;
