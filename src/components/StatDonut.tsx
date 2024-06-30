import { useIntersection } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";

interface StatDonutProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  label: string;
}

const StatDonut = ({
  value,
  size = 100,
  strokeWidth = 10,
  color,
  label,
}: StatDonutProps) => {
  const [hasIntersected, setHasBeenIntersected] = useState(false);
  const ref = useRef<SVGSVGElement>(null);
  const { ref: chartRef, entry } = useIntersection({
    root: ref.current,
    threshold: 0.25,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      setHasBeenIntersected(true);
    }
  }, [entry?.isIntersecting]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 200) * circumference;

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg" style={{ color }}>
        {label}
      </h3>
      <svg
        ref={chartRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <g className="origin-center transform rotate-[-90deg]">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
            className="stroke-gray-300"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={hasIntersected ? offset : circumference}
            strokeLinecap="round"
            className={`transition-all duration-1000 ${
              hasIntersected ? "stroke-dashoffset-animate" : ""
            }`}
            style={{
              transitionTimingFunction: "cubic-bezier(0.5, 0, 1, 1)",
            }}
          />
        </g>
        <text
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
          className="text-2xl"
          fill={color}
        >
          {value}
        </text>
      </svg>
    </div>
  );
};

export default StatDonut;
