import Image from "next/image";
import { HomeContainer, Product } from "./home";
import { useKeenSlider  } from 'keen-slider/react'
import camisa1 from '../assets/camisetas/camisa1.png'
import camisa2 from '../assets/camisetas/camisa2.png'
import camisa3 from '../assets/camisetas/camisa3.png'
import camisa4 from '../assets/camisetas/camisa4.png'

import 'keen-slider/keen-slider.min.css'
 
export default function Home() {
 const [sliderRef]  =useKeenSlider({
  slides:{
    perView:3,
    spacing:48
  }
 })
  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product  className="keen-slider__slide">
        <Image src={camisa1} alt="camisa" width={520} height={480}/>
        <footer>
          <strong>camisata x</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camisa2} alt="camisa" width={520} height={480}/>
        <footer>
          <strong>camisata x</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camisa3} alt="camisa" width={520} height={480}/>
        <footer>
          <strong>Camiseta x</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camisa3} alt="camisa" width={520} height={480}/>
        <footer>
          <strong>Camiseta x</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}
