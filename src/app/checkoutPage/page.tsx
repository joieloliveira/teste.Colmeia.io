"use client"

import Header from "../../components/header"
import Footer from "../../components/footer"
import Checkout from "../../components/checkout"
import ProtectedRoute from "../../components/protectedRoute"

export default function CheckoutPage() {

    return (
        <>
            <Header />
            <div className="flex flex-col min-h-screen bg-[#fcf9eb]">
                <ProtectedRoute>
                    <Checkout />
                </ProtectedRoute>
            </div>
            <Footer />
        </>
    )
}
