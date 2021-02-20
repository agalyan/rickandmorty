import React from "react";
import { makeStyles } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  content: {
    minHeight: "85vh",
  },
}));

type PaginateWrapperProps = React.PropsWithChildren<{
  page: number;
  pagesCount: number;
  changePage: (event: React.ChangeEvent<unknown>, value: number) => void;
}>;

function PaginateWrapper({
  page,
  pagesCount,
  changePage,
  children,
}: PaginateWrapperProps) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.content}>{children}</div>
      <Pagination count={pagesCount} page={page} onChange={changePage} />
    </>
  );
}

export default PaginateWrapper;
