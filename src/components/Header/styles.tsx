import { styled } from "@/pages/styles";

export const HeaderContainer = styled('header', {
    padding: '2rem 0',
    width: "100%",
    maxWidth: 1180,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between"
}
)
export const Cart = styled('div', {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    span: {
        position: "relative",
        top: -10,
        right: 16,
        padding: "2px 6px",
        border: "2px solid $gray900",
        borderRadius: '100%',
        background: "#fff",
        color: "$gray800"
    },
})
export const CartItems = styled('div', {

    position: 'absolute',
    display: 'none',
    top: 100,
    right: 50,
    zIndex: '99999',
    width: "350px",
    minHeight: "500px",
    background: "$green300",
    borderRadius: "8px",

    variants: {
        cartDisplay: {
            true: {
                display: "block"
            }
        }
    }

})