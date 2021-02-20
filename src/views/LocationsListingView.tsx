import React from "react";
import PaginateWrapper from "@/modules/shared/PaginateWrapper";
import PAGE_INFO_FRAGMENT from "@/modules/apollo/fragments";
import gql from "graphql-tag";
import { useGetLocationsQuery } from "@/generated/graphql";
import LocationList from "@/modules/locations/LocationList";

const GET_LOCATIONS = gql`
  query GetLocations($page: Int) {
    locations(page: $page) {
      results {
        ...LocationList_location
      }
      info {
        ...pageInfo
      }
    }
  }
  ${LocationList.fragments.location}
  ${PAGE_INFO_FRAGMENT}
`;

function LocationsListingView() {
  const [page, setPage] = React.useState(1);

  const { data, loading, error } = useGetLocationsQuery({
    query: GET_LOCATIONS,
    variables: { page: page },
    notifyOnNetworkStatusChange: true,
  });

  if (error) {
    throw error;
  }

  const locations = data?.locations;
  const results = locations?.results;
  const pagesCount = locations?.info?.pages || 1;

  const changePage = (event: React.ChangeEvent<unknown>, value: number) =>
    setPage(value);

  return (
    <>
      <PaginateWrapper
        page={page}
        pagesCount={pagesCount}
        changePage={changePage}
      >
        <LocationList locations={results} loading={loading} />
      </PaginateWrapper>
    </>
  );
}

export default LocationsListingView;
