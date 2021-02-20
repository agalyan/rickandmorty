import React, { useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NextLink from "@/modules/shared/NextLink";
import { showDrawerVar } from "@/modules/apollo/cache";

const useStyles = makeStyles((theme) => ({
  logoLink: {
    display: "flex",
    alignItems: "center",
    "& img": {
      width: 60,
    },
  },
}));

const AppHeader = React.forwardRef((props, ref) => {
  const classes = useStyles();

  const handleClick = useCallback(() => {
    showDrawerVar(true);
  }, []);

  return (
    <>
      <AppBar ref={ref} position="fixed" color="default">
        <Toolbar>
          <NextLink className={classes.logoLink} href="/">
            <img src="/images/logo.png" alt="Rick and Morty" />
          </NextLink>
          <Box flexGrow={1} />
          <IconButton onClick={handleClick}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
});

export default AppHeader;
