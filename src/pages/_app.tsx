import { AppProps } from "next/app";
import { globalStyles } from "./styles/global";
import logo from '../assets/logo.svg'
import Image from "next/image";
import { Container, Header } from "./styles/pages/app";
import Link from "next/link";
globalStyles()
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Link href="/">
          <Image src={logo} alt="Logo do ignite shop" />
        </Link>
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
