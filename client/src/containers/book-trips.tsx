import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { cartItemsVar } from '../cache';
import { Button } from '../components';
import { LAUNCH_FRAGMENT } from '../pages/launches';
import * as BookTripsTypes from './__generated__/BookTrips';

const BOOK_TRIPS = gql`
  mutation BookTrips($launchIds: [ID]!) {
    bookTrips(launchIds: $launchIds) {
      success
      message
      launches {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_FRAGMENT}
`;

const BookTrips: React.FC<any> = ({ cartItems }) => {
  const [ bookTrips, { data }] = useMutation<
  BookTripsTypes.BookTrips,
  BookTripsTypes.BookTripsVariables
  >(
    BOOK_TRIPS,
    { 
      variables: { launchIds: cartItems },
    },
  );
  if (data && data.bookTrips && !data.bookTrips.success) {
    return (<div data-testid="message">{data.bookTrips.message}</div>)
  }
  return (
    <Button
      onClick={async() => {
        await bookTrips();
        cartItemsVar([]);
      }}
      data-testid="book-button"
    >
        Book All
    </Button>
  );
}

export default BookTrips;
