import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import camisa1 from './../../assets/camisetas/camisa1.png'
import Image from "next/image"
import { ImageContainer, ProductContainer, ProductDetails } from "../styles/pages/product"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"

interface ProductProps {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        price: string;
        description: string
        defaultPriceId: string
    }
}


export default function Product({ product }: ProductProps) {
    function handleBuyProduct() {
        console.log(product.defaultPriceId)
    }
    return (
        <ProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} alt="camisa" width={520} height={480} />
            </ImageContainer>
            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>
                <p>{product.description}</p>
                <button onClick={handleBuyProduct}>Compar agora</button>
            </ProductDetails>
        </ProductContainer>
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
                price: new Intl.NumberFormat('pt-BR', {
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