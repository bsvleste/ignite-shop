import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { HomeContainer, Product } from "./styles/pages/home";
import { Header } from "@/components/Header";
import { useState } from "react";

interface HomeProps {

  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    priceFormatted: string

  }[]
}

export default function Home({ products }: HomeProps) {
  const [cartIsOpen, setCartIsOpen] = useState(false)

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })
  function showCartItens() {
    setCartIsOpen(prevState => !prevState)
    console.log(cartIsOpen)
  }
  return (
    <>
      <Head>
        <title>IginteShop</title>
      </Head>
      <Header showCart={cartIsOpen} showCartItems={showCartItens} />
      <h2>Passa as propreidades do carrinho por parametro para o Carrinho</h2>
      <HomeContainer ref={sliderRef} className="keen-slider">

        {
          products.map(product => {
            return (
              <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
                <Product className="keen-slider__slide" >
                  <Image src={product.imageUrl} alt="camisa" width={520} height={480} />
                  <footer>
                    <strong>{product.name}</strong>
                    <span>{product.priceFormatted}</span>
                  </footer>
                </Product>
              </Link>
            )
          })
        }
      </HomeContainer>
    </>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })
  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / 100,
      priceFormatted: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: "BRL"
      }).format(price.unit_amount / 100),
    }
  })
  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 //2 hours
  }
}
