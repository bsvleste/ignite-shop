import Image from 'next/image'
import Link from 'next/link'
import { Cart, CartItems, HeaderContainer } from './styles'
import logo from '../../assets/logo.svg'
import { ShoppingCart } from '@phosphor-icons/react'

type HeaderProps = {
    showCart?: boolean
    showCartItems?: () => void
}

export function Header({ showCart = false, showCartItems }: HeaderProps) {
    return (
        <HeaderContainer>
            <Link href="/">
                <Image src={logo} alt="Logo do ignite shop" />
            </Link>
            <Cart onClick={showCartItems}>
                <ShoppingCart size={32} weight="fill" />
                <span>0</span>
            </Cart>

            <CartItems cartDisplay={showCart}>
            </CartItems>
        </HeaderContainer>
    )
}