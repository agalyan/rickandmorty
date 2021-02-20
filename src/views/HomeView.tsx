import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import BaseGridList from "@/modules/shared/BaseGridList";
import BaseCard from "@/modules/shared/BaseCard";
import NextLink from "@/modules/shared/NextLink";
import BaseSeo from "@/modules/seo/BaseSeo";

const useStyles = makeStyles((theme) => ({
  card: {
    "&:hover": {
      "& $mask": {
        opacity: 0.7,
      },
    },
  },
  content: {
    height: "12rem",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  mask: {
    backgroundColor: theme.palette.common.black,
    opacity: 0.6,
    transition: theme.transitions.create("opacity"),
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.common.white,
  },
  titleTypography: {
    padding: theme.spacing(2),
  },
}));

const homeLinks = [
  {
    title: "Characters",
    to: "/characters",
  },
  {
    title: "Episodes",
    to: "/episodes",
  },
  {
    title: "Locations",
    to: "/locations",
  },
];

const HomeView = () => {
  const classes = useStyles();

  return (
    <>
      <BaseSeo title="Home" />
      <BaseGridList
        items={homeLinks}
        spacing={2}
        renderItem={(homeLink) => (
          <Grid key={homeLink.to} item xs={12} sm={4}>
            <NextLink href={homeLink.to}>
              <BaseCard className={classes.card} hasActionArea>
                <div className={classes.content} />
                <div className={clsx(classes.overlay, classes.mask)} />
                <div className={clsx(classes.overlay, classes.title)}>
                  <Typography className={classes.titleTypography} variant="h5">
                    {homeLink.title}
                  </Typography>
                </div>
              </BaseCard>
            </NextLink>
          </Grid>
        )}
      />
    </>
  );
};

export default HomeView;
