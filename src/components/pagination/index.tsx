import React from "react";

import { IPageMetaModel } from "../../api/types";

import "./style.scss";

interface IProps extends IPageMetaModel {
  handleNextButtonClick: () => void;
  handlePrevButtonClick: () => void;
}

const Pagination = (props: IProps) => {
  if (!props.pages) {
    return null;
  }

  return (
    <span className="pagination">
      <button className="page-number" disabled={!props.prev} onClick={props.handlePrevButtonClick}>
        prev
      </button>
      <button className="page-number" disabled={!props.next} onClick={props.handleNextButtonClick}>
        next
      </button>
    </span>
  );
};

export default Pagination;
