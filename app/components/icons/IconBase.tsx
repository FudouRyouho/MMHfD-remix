import React from "react";
import { IconNode, LucideProps } from "./lucide/types";
import Icon from "./lucide/Icon";

export const Bell: React.FC<LucideProps> = (props) => (
  <Icon
    iconNode={[
      ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0" }],
      [
        "path",
        {
          d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
        },
      ],
    ]}
    {...props}
  />
);

export const Info: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M12 16v-4" }],
      ["path", { d: "M12 8h.01" }],
    ]}
  />
);

export const ChevronRight: React.FC<LucideProps> = (props) => (
  <Icon {...props} iconNode={[["path", { d: "m9 18 6-6-6-6" }]]} />
);
export const Settings: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      [
        "path",
        {
          d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
        },
      ],
      ["circle", { cx: "12", cy: "12", r: "3" }],
    ]}
  />
);

export const CircleCheck: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "m9 12 2 2 4-4" }],
    ]}
  />
);

export const CircleAlert: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["line", { x1: "12", x2: "12", y1: "8", y2: "12" }],
      ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16" }],
    ]}
  />
);
export const CircleX: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["line", { x1: "12", x2: "12", y1: "8", y2: "12" }],
      ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16" }],
    ]}
  />
);
export const X: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      ["path", { d: "M18 6 6 18" }],
      ["path", { d: "m6 6 12 12" }],
    ]}
  />
);
export const View: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      ["path", { d: "M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" }],
      ["path", { d: "M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" }],
      ["circle", { cx: "12", cy: "12", r: "1" }],
      [
        "path",
        {
          d: "M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0",
        },
      ],
    ]}
  />
);
export const AlertCircle: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["line", { x1: "12", x2: "12", y1: "8", y2: "12" }],
      ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16" }],
    ]}
  />
);
export const CheckCircle: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "m9 12 2 2 4-4" }],
    ]}
  />
);
export const RotateCcw: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }],
      ["path", { d: "M3 3v5h5" }],
    ]}
  />
);
export const Check: React.FC<LucideProps> = (props) => (
  <Icon {...props} iconNode={[["path", { d: "M20 6 9 17l-5-5" }]]} />
);
export const ChevronDown: React.FC<LucideProps> = (props) => (
  <Icon {...props} iconNode={[["path", { d: "m6 9 6 6 6-6" }]]} />
);

export const House: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      ["path", { d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" }],
      ["path", { d: "M9 22V12h6v10" }],
    ]}
  />
);

export const List: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      ["path", { d: "M3 12h.01" }],
      ["path", { d: "M3 18h.01" }],
      ["path", { d: "M3 6h.01" }],
      ["path", { d: "M8 12h13" }],
      ["path", { d: "M8 18h13" }],
      ["path", { d: "M8 6h13" }],
    ]}
  />
);
export const Palette: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor" }],
      ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor" }],
      ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor" }],
      ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor" }],
      [
        "path",
        {
          d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",
        },
      ],
    ]}
  />
);
export const Loader: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      ["path", { d: "M12 2v4" }],
      ["path", { d: "m16.2 7.8 2.9-2.9" }],
      ["path", { d: "M18 12h4" }],
      ["path", { d: "m16.2 16.2 2.9 2.9" }],
      ["path", { d: "M12 18v4" }],
      ["path", { d: "m4.9 19.1 2.9-2.9" }],
      ["path", { d: "M2 12h4" }],
      ["path", { d: "m4.9 4.9 2.9 2.9" }],
    ]}
  />
);
export const Skull: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      ["path", { d: "m12.5 17-.5-1-.5 1h1z" }],
      [
        "path",
        {
          d: "M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z",
        },
      ],
      ["circle", { cx: "15", cy: "12", r: "1" }],
      ["circle", { cx: "9", cy: "12", r: "1" }],
    ]}
  />
);
export const Plus: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      ["path", { d: "M5 12h14" }],
      ["path", { d: "M12 5v14" }],
    ]}
  />
);
export const SquareMousePointer: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      [
        "path",
        {
          d: "M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z",
        },
      ],
      [
        "path",
        { d: "M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" },
      ],
    ]}
  />
);
export const Book: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      [
        "path",
        {
          d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
        },
      ],
    ]}
  />
);
export const Pentagon: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      [
        "path",
        {
          d: "M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z",
        },
      ],
    ]}
  />
);
export const Diamond: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      [
        "path",
        {
          d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z",
        },
      ],
    ]}
  />
);

export const ChevronLeft: React.FC<LucideProps> = (props) => (
  <Icon {...props} iconNode={[["path", { d: "m15 18-6-6 6-6" }]]} />
);

export const ArrowRight: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      ["path", { d: "M5 12h14" }],
      ["path", { d: "m12 5 7 7-7 7" }],
    ]}
  />
);

export const Fire: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M6 16L12 6L18 16" }],
      ["path", { d: "M10 12L12 6L14 12L12 13" }],
    ]}
  />
);

export const Water: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M6 16L12 6L18 16" }],
      ["path", { d: "M10 12L12 6L14 12L12 13" }],
    ]}
  />
);
export const Earth: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M6 16L12 6L18 16" }],
      ["path", { d: "M10 12L12 6L14 12L12 13" }],
    ]}
  />
);
export const Wind: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M6 16L12 6L18 16" }],
      ["path", { d: "M10 12L12 6L14 12L12 13" }],
    ]}
  />
);
export const Dark: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M6 16L12 6L18 16" }],
      ["path", { d: "M10 12L12 6L14 12L12 13" }],
    ]}
  />
);
export const Moon: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" }]]}
  />
);

export const Sun: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      ["circle", { cx: "12", cy: "12", r: "4" }],
      ["path", { d: "M12 2v2" }],
      ["path", { d: "M12 20v2" }],
      ["path", { d: "m4.93 4.93 1.41 1.41" }],
      ["path", { d: "m17.66 17.66 1.41 1.41" }],
      ["path", { d: "M2 12h2" }],
      ["path", { d: "M20 12h2" }],
      ["path", { d: "m6.34 17.66-1.41 1.41" }],
      ["path", { d: "m19.07 4.93-1.41 1.41" }],
    ]}
  />
);
export const Square: React.FC<LucideProps> = (props) => (
  <Icon
    {...props}
    iconNode={[
      ["rect", { x:"3", y:"3", rx:"2" }]
    ]}
  />
);
