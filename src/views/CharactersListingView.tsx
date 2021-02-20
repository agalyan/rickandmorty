import React from "react";
import { Typography } from "@material-ui/core";
import { produce } from "immer";
import InfiniteScrollWrapper from "@/modules/shared/InfiniteScrollWrapper";
import gql from "graphql-tag";
import { useGetCharactersQuery } from "@/generated/graphql";
import CharacterGridList from "@/modules/characters/CharacterGridList";
import PAGE_INFO_FRAGMENT from "@/modules/apollo/fragments";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      results {
        ...CharacterGridList_character
      }
      info {
        ...pageInfo
      }
    }
  }
  ${CharacterGridList.fragments.character}
  ${PAGE_INFO_FRAGMENT}
`;

function CharactersListingView() {
  const {
    data,
    loading,
    error,
    fetchMore,
    networkStatus,
  } = useGetCharactersQuery({
    query: GET_CHARACTERS,
    notifyOnNetworkStatusChange: true,
  });

  if (error) {
    throw error;
  }

  const isSetVariables = networkStatus === 2;

  const characters = !isSetVariables ? data?.characters : undefined;
  const next = characters?.info?.next;

  const hasNextPage = Boolean(next);
  const results = characters?.results || [];

  return (
    <>
      {loading || results.length ? (
        <InfiniteScrollWrapper
          hasNextPage={!!next}
          loading={loading}
          onLoadMore={() =>
            fetchMore({
              // This breaks "@apollo/client 3".
              // It doesn't toggle "loading" even if the "notifyOnNetworkStatusChange" is set to "true".
              // query: GET_CHARACTERS,
              variables: { page: next },
              updateQuery: (prevResult, { fetchMoreResult }) => {
                const newCharacters = fetchMoreResult?.characters;
                const newData = produce(prevResult, (draft) => {
                  let { characters } = draft;
                  if (
                    characters?.results &&
                    newCharacters?.results &&
                    newCharacters?.info
                  ) {
                    characters.results.push(...newCharacters.results);
                    characters.info = newCharacters.info;
                  }
                });

                return newData;
              },
            })
          }
        >
          <CharacterGridList
            characters={results}
            loading={loading || hasNextPage}
          />
        </InfiniteScrollWrapper>
      ) : (
        <Typography>Nothing found.</Typography>
      )}
    </>
  );
}

export default CharactersListingView;
