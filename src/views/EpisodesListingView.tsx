import React from "react";
import PaginateWrapper from "@/modules/shared/PaginateWrapper";
import EpisodeList from "@/modules/episodes/EpisodeList";
import gql from "graphql-tag";
import { useGetEpisodesQuery } from "@/generated/graphql";
import PAGE_INFO_FRAGMENT from "@/modules/apollo/fragments";

const GET_EPISODES = gql`
  query GetEpisodes($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      results {
        ...EpisodeList_episode
      }
      info {
        ...pageInfo
      }
    }
  }
  ${EpisodeList.fragments.episode}
  ${PAGE_INFO_FRAGMENT}
`;

function EpisodesListingView() {
  const [page, setPage] = React.useState(1);

  const { data, loading, error } = useGetEpisodesQuery({
    query: GET_EPISODES,
    variables: { page: page },
    notifyOnNetworkStatusChange: true,
  });
  if (error) {
    throw error;
  }
  const { episodes } = data || {};

  const results = episodes?.results;
  const pagesCount = episodes?.info?.pages || 1;

  const changePage = (event: React.ChangeEvent<unknown>, value: number) =>
    setPage(value);

  return (
    <PaginateWrapper
      page={page}
      pagesCount={pagesCount}
      changePage={changePage}
    >
      <EpisodeList episodes={results} loading={loading} />
    </PaginateWrapper>
  );
}

export default EpisodesListingView;
