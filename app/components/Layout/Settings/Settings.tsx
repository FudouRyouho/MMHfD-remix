import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectConfig,
} from "~/store/configSlince";
import type { RootState } from "~/store/store";
import Masonry from "react-masonry-css";

interface IProps {}

const Settings: React.FC<IProps> = ({}) => {
  const dispatch = useDispatch();
  const config = useSelector((state: RootState) => selectConfig(state));

  const breakpointColumns = {
    default: 5,
    840: 1,
    1140: 2,
    1440: 3,
    1740: 4,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex flex-auto w-max gap-4 p-8"
      columnClassName=""
    >
    </Masonry>
  );
};

export default Settings;
