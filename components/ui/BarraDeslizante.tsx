import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";

export default function BarraDeslizante({matriz}: {matriz: string[]}) {

    return (
        <>
            <Carousel className="border-t border-b border-emerald-500">
                <CarouselContent className="-ml-1">
                    {matriz.map(item => (
                        <CarouselItem key={item} className="basis-1/3 text-center">
                        {item}
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </>
    )
}
