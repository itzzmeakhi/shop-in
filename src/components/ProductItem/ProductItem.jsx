import React, { useEffect, useState } from 'react';

import { 
        StrikedPrice, 
        DiscountContainer, 
        ItemCard, 
        ImageContainer, 
        SpecsContainer, 
        RatingContainer, 
        HighlightsContainer, 
        Button,
        QuantityContainer,
        QtyBtn
    } from './styles';
import { transformToPrice, getDiscountPercent } from './../../utils/helpers';

const ProductItem = ({ item, addToCart, updateQty, alreadyInCart, qty }) => {
    console.log("=> alreadyInCart", qty)
    const { 
            name, 
            thumbnails, 
            current_price, 
            original_price, 
            discounted,
            rating,
            highlights,
            in_stock 
        } = item;

    const [quantity, setQuantity] = useState(qty);

    useEffect(() => {
        setQuantity(qty);
    }, [qty])

    const incrementQty = () => {
        const qty = quantity + 1;
        setQuantity(qty);
        updateQty({qty: qty, id: item.id});
    } 

    const decrementQty = () => {
        const qty = quantity - 1;
        setQuantity(qty);
        updateQty({qty: qty, id: item.id});
    }

    const priceData = () => {
        if(discounted) {
            return (
                <p>
                    ₹ <StrikedPrice>{
                        transformToPrice(original_price)}
                    </StrikedPrice> 
                    &nbsp; <span>
                        {transformToPrice(current_price)}
                    </span>
                    &nbsp; <DiscountContainer>
                        {getDiscountPercent(original_price, current_price)} off
                    </DiscountContainer>
                </p>
            );
        }
        return (
            <p>₹ {transformToPrice(current_price)}</p>
        );
    }


    return (
        <ItemCard>
            <ImageContainer>
                <img src={thumbnails[0]} alt={`${name}`} />
            </ImageContainer>
            <SpecsContainer>
                <h4>{name}</h4>
                {priceData()}
                <RatingContainer>
                    {rating ? <><span>{rating} &#9733;</span> Rating</>: 'No Ratings'}
                </RatingContainer>
            </SpecsContainer>
            <HighlightsContainer>
                {highlights.filter((_,index) => index < 4).map((highlight, idx) => <p key={idx}>{highlight}</p>)}
            </HighlightsContainer>
            {(!alreadyInCart && quantity === 0) ?
                (
                <Button
                    type="button"
                    disabled={!in_stock}
                    onClick={() => addToCart(item)}>
                    {in_stock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                ) : (
                <QuantityContainer>
                    <QtyBtn
                        disabled={quantity <= 1}
                        type="button"
                        color="#eb4d4b"
                        onClick={() => decrementQty()}>
                            -
                    </QtyBtn>
                    <span>{quantity}</span>
                    <QtyBtn 
                        disabled={quantity >= 10}
                        type="button"
                        color="#16a085"
                        onClick={() => incrementQty()}>
                            +
                    </QtyBtn>
                </QuantityContainer>
                )
            }
        </ItemCard>
    );
}

export default ProductItem;