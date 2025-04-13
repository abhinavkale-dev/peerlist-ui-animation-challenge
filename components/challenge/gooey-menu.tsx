type GooeyMenuProps = {
    id?: string;
    strength?: number;
  };
  
  export const GooeyMenu = ({
    id = "goo-filter",
    strength = 10,
  }: GooeyMenuProps) => {
    const blurValue = strength;
    const matrixValues = "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9";
  
    return (
      <svg className="hidden absolute" aria-hidden="true">
        <defs>
          <filter id={id}>
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation={blurValue}
              result="blur"
            />
            <feColorMatrix
              in="blur"
              type="matrix"
              values={matrixValues}
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    );
  };