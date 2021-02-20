import React from "react";
import BaseList from "@/modules/shared/BaseList";
import EpisodeListItem from "./EpisodeListItem";
import gql from "graphql-tag";
import { EpisodeList_EpisodeFragment, Maybe } from "@/generated/graphql";

type ListItem = Maybe<EpisodeList_EpisodeFragment>;

interface EpisodeListProps {
  episodes: Maybe<Array<ListItem>>;
  loading?: boolean;
  maxVisibleItemCount?: number;
}

const renderItem = (episode: ListItem) =>
  episode?.id ? <EpisodeListItem key={episode.id} episode={episode} /> : null;

const EpisodeList = ({
  episodes,
  loading,
  maxVisibleItemCount,
}: EpisodeListProps) => {
  return (
    <BaseList
      items={episodes}
      loading={loading}
      maxVisibleItemCount={maxVisibleItemCount}
      renderItem={renderItem}
    />
  );
};

EpisodeList.fragments = {
  episode: gql`
    fragment EpisodeList_episode on Episode {
      ...EpisodeListItem_episode
    }
    ${EpisodeListItem.fragments.episode}
  `,
};

export default EpisodeList;
