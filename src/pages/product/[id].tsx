import { GetStaticPaths, GetStaticProps } from "next"

import Image from "next/image"
import { Cart, ImageContainer, ProductContainer, ProductDetails } from "../styles/pages/product"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"
import axios from "axios"
import { useState } from "react"
import Head from "next/head"
import { useShoppingCart } from "use-shopping-cart"
import { Header } from "@/components/Header"

interface ProductProps {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        price: string;
        description: string
        defaultPriceId: string
        priceFormatted: string
    }
}
export default function Product({ product }: ProductProps) {
    const { addItem, cartDetails, clearCart, totalPrice } = useShoppingCart()
    const [isCreatingCheckoutSession, setIsCreateChekcoutSession] = useState(false)
    async function handleBuyProduct() {
        addItem(product, { priceId: product.defaultPriceId })
        console.log(cartDetails)
        //clearCart()
        // try {
        //     setIsCreateChekcoutSession(true)
        //     const response = await axios.post('/api/checkout', {
        //         priceId: product.defaultPriceId
        //     })
        //     const { checkoutUrl } = response.data
        //     window.location.href = checkoutUrl
        // } catch (error) {
        //     //Conectar com uma ferramenta de observabilidade (Datadog / Sentry)
        //     setIsCreateChekcoutSession(false)
        //     alert('Falha ao redireicionar ao checkout')

        // }
    }
    return (
        <>
            {/* <Cart>
                {Object.values(cartDetails ?? {}).map((entry) => (
                    <div key={entry.id}>
                        <p>{entry.price} * {entry.quantity}  = {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: "BRL"
                        }).format(entry.price * entry.quantity)}</p>
                    </div>
                ))}
                <h1>Total do Carrinho ={new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: "BRL"
                }).format(totalPrice)}</h1>
            </Cart> */}
            <Head>
                <title>{product.name}</title>
            </Head>
            <Header />
            <ProductContainer>
                <ImageContainer>
                    <Image src={product.imageUrl} alt="camisa" width={520} height={480} />
                </ImageContainer>
                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{product.priceFormatted}</span>
                    <p>{product.description}</p>
                    <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>Compar agora</button>
                </ProductDetails>
            </ProductContainer>
        </>
    )
}
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }

}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    })
    const price = product.default_price as Stripe.Price
    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: price.unit_amount / 100,
                priceFormatted: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: "BRL"
                }).format(price.unit_amount / 100),
                description: product.description,
                defaultPriceId: price.id
            }
        },
        revalidate: 60 * 60 * 1 //1 hour
    }
}