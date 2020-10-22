import React, { Fragment } from 'react';
import { RouteComponentProps } from '@reach/router';
import { gql, useQuery } from '@apollo/client';
import { Header, LaunchDetail, Loading } from '../components';
import * as LaunchDetailsTypes from './__generated__/LaunchDetails';
import { ActionButton } from '../containers';
import { LAUNCH_FRAGMENT } from './launches';

const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      ...LaunchTile
    }
  }
  ${LAUNCH_FRAGMENT}
`

interface LaunchProps extends RouteComponentProps {
  launchId?: any;
}

const Launch: React.FC<LaunchProps> = ({ launchId }) => {
  const {
    error,
    loading,
    data
  } = useQuery<
    LaunchDetailsTypes.LaunchDetails,
    LaunchDetailsTypes.LaunchDetailsVariables
  >(GET_LAUNCH_DETAILS, { variables: { launchId }});

  if (loading) return <Loading />
  if (error) return <div>{error}</div>
  if (!data) return <div>No data found</div>
  return (
    <Fragment>
      <Header image={data.launch && data.launch.mission && data.launch.mission.missionPatch}>
        {data && data.launch && data.launch.mission && data.launch.mission.name}
      </Header>
      <LaunchDetail {...data.launch} />
      <ActionButton {...data.launch} />
    </Fragment>
  );
}

export default Launch;
