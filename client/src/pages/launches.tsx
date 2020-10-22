import React, { Fragment }  from 'react';
import { RouteComponentProps } from '@reach/router';
import { gql, useQuery } from '@apollo/client'
import { Loading, LaunchTile, Header, Button } from '../components';
import * as GetLaunchListTypes from './__generated__/GetLaunchList';

export const LAUNCH_FRAGMENT = gql`
  fragment LaunchTile on Launch {
    id
    site
    isBooked
    rocket {
      id
      name
      type
    }
    mission {
      name
      missionPatch
    }
  }
`;

export const GET_LAUNCHES = gql`
   query GetLaunches($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_FRAGMENT}
`;

interface LaunchesProps extends RouteComponentProps {}

const Launches: React.FC<LaunchesProps> = () => {
  const {
    error,
    loading,
    data,
    fetchMore
  } = useQuery<
    GetLaunchListTypes.GetLaunchList,
    GetLaunchListTypes.GetLaunchListVariables
  >(GET_LAUNCHES);

  if (loading) return <Loading />
  if (error) return <div>{error}</div>
  if (!data) return <div>There are no launches</div>
  return (
      <Fragment>
        <Header />
        {data.launches &&
          data.launches.launches &&
          data.launches.launches.map((launch: any) => <LaunchTile key={launch.id} launch={launch} />)
        }
        {data.launches &&
          data.launches.hasMore && (
            <Button 
              onClick={() => fetchMore({
                variables: {
                  after: data.launches.cursor
                },
                updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                  if (!fetchMoreResult) return prev;
                  return {
                    ...fetchMoreResult,
                    launches: {
                      ...fetchMoreResult.launches,
                      launches: [
                        ...prev.launches.launches,
                        ...fetchMoreResult.launches.launches,
                      ]
                    }
                  }
                }
              })}>
                Load More
            </Button>
          )}
      </Fragment>
    );
}

export default Launches;
