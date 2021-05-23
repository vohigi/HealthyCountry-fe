import React from "react";
import { Pagination } from "antd";

import "./customStyles.scss";

const PaginationWrapper = (props) => (
  <div className={props.containerClassName}>
    <Pagination showTitle={false} children={null} {...props} />
  </div>
);

export default PaginationWrapper;
