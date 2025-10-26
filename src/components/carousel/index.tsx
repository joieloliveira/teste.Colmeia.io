import React, { useContext } from 'react';
import "./style.css";

import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import Image from "next/image"
import { StaticImageData } from 'next/image'

interface CardProps {
    nome: string
    cardImg: string | StaticImageData
    preco: string | number
    onAddToCart?: () => void
    imagem?: string
}

import { ContextItemsData } from "../../app/context/ItemsDataContext"

import Link from "next/link";


export function CarouselSpacing() {

    const {
        itemsData
      } = useContext(ContextItemsData)!;

    return (
        <Carousel className="w-full bg-[#aedcec]" plugins={[
            Autoplay({
                delay: 2000, stopOnInteraction: true
            }),
        ]}>
            <CarouselContent className="-ml-1 carouselSpacing">
                {Array.from(itemsData).map((p, index) => (
                    <CarouselItem key={index} className="pl-1 sm:basis-1/3 md:basis-1/5 lg:basis-1/8 m-1 basis-1/2">
                        <div className="p-1">
                            <Link href={`/productPage/${p.id}`} prefetch key={index}>
                                <Card className="h-80">
                                    <CardContent className="flex aspect-square items-center justify-center p-0">
                                        <div className="flex flex-col itemCard">
                                            {/* Imagem do produto */}
                                            <div className="relative w-full h-40">
                                                <Image
                                                    src={p.cardImg}
                                                    alt={p.nome}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            {/* Conteúdo */}
                                            <div className="items-center justify-center flex flex-col mt-10">
                                                <h3 className="text-lg font-semibold text-gray-800">{p.nome}</h3>
                                                <p className="text-yellow-600 font-bold text-lg mt-2">R$ {p.preco}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}
