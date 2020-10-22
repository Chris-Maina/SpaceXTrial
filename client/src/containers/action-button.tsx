import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { cartItemsVar } from '../cache';
import { Button, Loading } from '../components';
import { LAUNCH_FRAGMENT } from '../pages/launches';
import { LaunchDetails_launch } from '../pages/__generated__/LaunchDetails';

const TOGGLE_CART = gql`
  mutation addOrRemoveFromCart($launchId: ID!) {
    addOrRemoveFromCart(id: $launchId) @client
  }
`;

const CANCEL_TRIP = gql`
  mutation cancelTrip($launchId: ID!) {
    cancelTrip(launchId: $launchId) {
      success
      message
      launches {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_FRAGMENT}
`;

interface ActionButtonProps extends Partial<LaunchDetails_launch> {};

const ActionButton: React.FC<ActionButtonProps> = ({ isBooked, id }) => {
  const [mutate, { loading, error }] = useMutation(
    isBooked? CANCEL_TRIP : TOGGLE_CART,
    {
      variables: { launchId: id },
    }
  )
  const cartItems = cartItemsVar()
  const isInCart = id ? cartItems.includes(id) : false;
  if (loading) return <Loading />
  if (error) return <div>An error occurred</div>
  return (
    <Button
      onClick={() => mutate()}
      data-testid='action-button'
    >
      {isBooked
        ? 'Cancel this trip'
        : isInCart 
          ? 'Remove from cart'
          : 'Add to cart'
      }
    </Button>
  );
}

export default ActionButton;