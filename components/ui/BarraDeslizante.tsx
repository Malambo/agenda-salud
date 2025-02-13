'use client'

import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "./carousel"


export default function BarraDeslizante({lista}: {lista: string[]}) {
    return (
        <Carousel className="py-4 border-t border-b border-emerald-500">

            <CarouselContent className="-ml-1">
                {lista.map(item => (
                    <CarouselItem key={item} className="basis-1/3 text-center">
                        <div>
                            {item}
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />

        </Carousel>
    )
}
