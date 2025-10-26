"use client"

import Header from "../../components/header"
import Footer from "../../components/footer"
import LoginSingUp from "../../components/loginSingUp"


export default function LoginSingUpPage() {

    return (
        <>
            <Header />
            <div className="flex flex-col min-h-screen bg-[#fcf9eb]">
                <LoginSingUp />
            </div>
            <Footer />
        </>
    )
}
