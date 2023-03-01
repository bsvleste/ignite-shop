import { stripe } from "@/lib/stripe";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { ImageContainer, SuccessContainer } from "./styles/pages/success";
interface SuccessProps {
    customerName: string,
    product: {
        name: string,
        imageUrl: string
    }
}
export default function Success({ customerName, product }: SuccessProps) {
    return (
        <>
            <Head>
                <title>Compra Efetuada com sucessp</title>
                <meta name="robots" content="noindex" />
            </Head>
            <SuccessContainer>
                <h1>Compra efetuado com sucesso</h1>
                <ImageContainer>
                    <Image src={product.imageUrl} alt="camisa" width={120} height={110} />
                </ImageContainer>
                <p>Uhhhhhh,<strong>{customerName}</strong>, sua camisa, <strong>{product.name}</strong>,
                    ja esta a caminho da sua casa </p>
                <Link href="/">
                    Voltar ao catalogo
                </Link>
            </SuccessContainer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    if (!query.session_id) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
    const sessionId = String(query.session_id)
    const response = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items", "line_items.data.price.product"]
    })
    const customerName = response.customer_details?.name;
    const product = response.line_items?.data[0].price?.product as Stripe.Product;
    return {
        props: {
            customerName,
            product: {
                name: product.name,
                imageUrl: product.images[0]
            }
        }
    }
}