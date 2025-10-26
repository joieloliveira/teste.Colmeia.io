"use client"

import Header from "../../components/header"
import Footer from "../../components/footer"
import Cart from "../../components/cart"

export default function CartResume() {

    return (
        <>
            <Header />
            <div className="flex flex-col min-h-screen bg-[#fcf9eb]">
                <Cart />
            </div>
            <Footer />
        </>
    )
}
