import { useState, useEffect } from "react";

export default function FButton({
  children,
  category,
  discount,
  onClick,
  disabled = false,
  variant = "default", // default, outline, text
  fullWidth = false, // ← NEW
  color = "black", // ← NEW: Accepts custom color
  bgColor = "white", // NEW: For button background color
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [activeColor, setActiveColor] = useState("bg-blue-500");
  const [rippleEffect, setRippleEffect] = useState({
    active: false,
    x: 0,
    y: 0,
  });

  // Colors for the button
  const colorOptions = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-teal-500",
    "bg-green-500",
    "bg-pink-500",
    "bg-amber-500",
  ];

  // Animation to fade in the button
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Function to cycle through colors
  const handleClick = (e) => {
    if (disabled) return;

    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRippleEffect({ active: true, x, y });

    // Reset ripple after animation
    setTimeout(() => {
      setRippleEffect({ active: false, x: 0, y: 0 });
    }, 700);

    // Cycle colors
    const currentIndex = colorOptions.indexOf(activeColor);
    const nextIndex = (currentIndex + 1) % colorOptions.length;
    setActiveColor(colorOptions[nextIndex]);

    // Trigger any provided onClick handler
    if (onClick) onClick(e);

    // Pulse effect
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);
  };

  // Determine style based on variant
  // let baseStyle = "relative px-6 py-2 rounded-lg font-medium text-base transition-all duration-300 overflow-hidden group";
  let baseStyle = `
  relative px-6 py-2 rounded-lg font-medium text-base transition-all duration-300 overflow-hidden group 
  ${fullWidth ? "w-full" : "w-auto"}
`;
  let bgStyle = "";
  let textColor = "text-black";

  if (variant === "outline") {
    bgStyle = "bg-transparent text-black border-2 border-black";
  } else if (variant === "text") {
    bgStyle = "bg-transparent hover:bg-gray-100";
  } else {
    // default variant uses custom bgColor
    bgStyle = "";
  }

  if (disabled) {
    bgStyle = "bg-gray-200 cursor-not-allowed";
    textColor = "text-gray-400";
  }

  return (
    <button
      className={`
    ${baseStyle}
    ${bgStyle}
    ${textColor}
    ${isVisible ? "opacity-100" : "opacity-0"}
    ${isPressed ? "scale-95" : "scale-100"}
    ${disabled ? "" : "hover:shadow-lg"}
    ${fullWidth ? "w-full" : ""}
  `}
      style={{
        backgroundColor:
          variant === "default" && !disabled ? bgColor : undefined,
      }}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
      onClick={handleClick}
      disabled={disabled}
    >
      {/* Slower sliding background - already black */}
      {!disabled && (
        <span
          className={`absolute inset-0 bg-black transition-transform duration-1000 ease-in-out origin-left
            ${isHovered ? "scale-x-100" : "scale-x-0"}`}
          style={{
            transformOrigin: isHovered ? "left" : "right",
            backgroundColor: disabled ? "" : color,
          }}
        />
      )}

      {/* Ripple effect overlay */}
      {rippleEffect.active && (
        <span
          className="absolute bg-white rounded-full opacity-30 animate-ripple"
          style={{
            width: "200px",
            height: "200px",
            top: `${rippleEffect.y - 100}px`,
            left: `${rippleEffect.x - 100}px`,
          }}
        />
      )}

      {/* Button content */}
      <span
        className={`relative z-10 transition-colors duration-1000 flex items-center justify-center gap-2
        ${isHovered && !disabled ? "text-white" : "text-current"}`}
      >
        {children}

        {/* Optional loading spinner animation */}
        {disabled && (
          <span className="inline-block w-4 h-4 ml-2 border-2 border-gray-400 rounded-full border-t-transparent animate-spin"></span>
        )}
      </span>

      {/* Category and discount badge */}
      {category && !disabled && (
        <span
          className="absolute top-0 right-0 z-10 px-2 py-1 text-xs text-white rounded-bl-lg"
          style={{ backgroundColor: color }}
        >
          {category} {discount && `- ${discount}%`}
          <span className="absolute w-1 h-1 bg-white rounded-full -bottom-1 -left-1 animate-pulse"></span>
        </span>
      )}

      {/* Color accent for hover - CHANGED TO BLACK */}
      {!disabled && (
        <>
          <span
            className="absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-20"
            style={{ backgroundColor: disabled ? "" : color }}
          />
          <span
            className="absolute transition-opacity duration-700 rounded-lg opacity-0 -inset-1 blur-sm group-hover:opacity-30"
            style={{ backgroundColor: disabled ? "" : color }}
          />
        </>
      )}

      {/* Accent dots - CHANGED TO BLACK */}
      {!disabled && (
        <>
          <span className="absolute top-0 right-0 z-10 w-2 h-2 rounded-full bg-rose-600 opacity-70" />
          <span className="absolute bottom-0 left-0 z-10 w-2 h-2 rounded-full bg-fuchsia-600 opacity-70" />
        </>
      )}

      {/* Animated particles - CHANGED TO GRAYSCALE */}
      {!disabled && (
        <>
          <span className="absolute left-0 z-10 w-1 h-1 bg-blue-600 rounded-full opacity-0 top-1/2 group-hover:opacity-60 group-hover:animate-ping" />
          <span className="absolute right-0 z-10 w-1 h-1 bg-purple-600 rounded-full opacity-0 top-1/2 group-hover:opacity-60 group-hover:animate-ping" />

          {/* Changed from colored to grayscale particles */}
          <span className="absolute z-10 w-1 h-1 delay-300 bg-blue-600 rounded-full opacity-0 bottom-1/4 right-1/4 group-hover:opacity-60 group-hover:animate-ping" />
          <span className="absolute z-10 w-1 h-1 delay-200 bg-purple-600 rounded-full opacity-0 top-1/4 left-1/4 group-hover:opacity-60 group-hover:animate-ping" />
        </>
      )}

      {/* Edge glow effect */}
      {!disabled && (
        <span className="absolute inset-0 z-0 transition-all duration-700 border border-transparent rounded-lg group-hover:border-white/20"></span>
      )}
    </button>
  );
}
