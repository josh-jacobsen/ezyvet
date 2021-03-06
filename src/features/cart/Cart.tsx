import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { addProductById, removeProduct} from './cartSlice'

export const Cart = () => {
    const products = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const cartTotal = () =>
        products.reduce(
            (sum, product) => sum + (product.product.price * product.quantity), 0
        );

    return (
        <div>
            <div>Items in your cart:</div>
            {products.map(p =>
                <div key={p.product.id}>Name: {p.product.name} Price: {(Math.round(p.product.price * 100) / 100).toFixed(2)} Quantity:<span data-testid="quantity"> {p.quantity} </span>
                    <button onClick={() => dispatch(removeProduct(p.product.id))}>
                        -        
                    </button>
                    <button onClick={() => dispatch(addProductById({id: p.product.id, price: p.product.price, name: p.product.name}))}>
                        +
                    </button>
            
                </div>
            )}
            <div>
                <p>The cart total is:</p>
                {(Math.round(cartTotal() * 100) / 100).toFixed(2)}


            </div>
        </div>
    )
}