import React, { Fragment } from 'react';
import { RouteComponentProps } from '@reach/router';
import { gql, useQuery } from '@apollo/client';
import { LAUNCH_FRAGMENT } from './launches';
import * as GetMyTripsTypes from './__generated__/GetMyTrips'
import { Header, LaunchTile, Loading } from '../components';

const GET_MY_TRIPS = gql`
  query GetMyTrips {
    me {
      id
      email
      trips {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_FRAGMENT}
`;
interface ProfileProps extends RouteComponentProps {}

const Profile: React.FC<ProfileProps> = () => {
  const {
    data,
    error,
    loading
  } = useQuery<GetMyTripsTypes.GetMyTrips, any>(GET_MY_TRIPS, { fetchPolicy: 'network-only' });

  if (loading) return <Loading />
  if (error) return <div>{error.message}</div>
  if (!data) return <div>No data found</div>
  return (
    <Fragment>
      <Header />
      {data.me && data.me.trips.length ? (
        data.me.trips.map((launch: any) => <LaunchTile key={launch.id} launch={launch} />)
      ): (
        <div>You have not booked any trips</div>
      )}
    </Fragment>
  );
}

export default Profile;