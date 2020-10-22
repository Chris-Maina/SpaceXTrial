import React, { Fragment } from 'react';
import { RouteComponentProps } from '@reach/router';
import { gql, useQuery } from '@apollo/client';
import { Header, Loading } from '../components';
import { BookTrips, CartItem } from '../containers';

interface CartProps extends RouteComponentProps {

}

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

const Cart: React.FC<CartProps> = () => {
  const { data, loading, error } = useQuery(GET_CART_ITEMS);
  if (loading) return <Loading />
  if (error) return <div>{error.message}</div>
  return (
    <Fragment>
      <Header>My Cart</Header>
      {!data || (!!data && !data.cartItems.length) ? (<
        div>No items in your cart</div>
        ) : (
          <Fragment>
            {data.cartItems.map((launchId: any) => <CartItem key={launchId} launchId={launchId} />)}
            <BookTrips cartItems={!!data ? data.cartItems : []} />
          </Fragment>
        )}
    </Fragment>
  );
}

export default Cart;
