"use client"

import
  useEmblaCarousel,
  {type UseEmblaCarouselType} from "embla-carousel-react"
import {ChevronLeft, ChevronRight} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {
    type ComponentProps,
    type HTMLAttributes,
    useState,
    useCallback,
    useContext,
    useEffect,
    createContext,
    forwardRef} from "react"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel debe utilizarse dentro de un <Carousel />")
  }
  return context
}

const Carousel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & CarouselProps>((
    {
        setApi,
        orientation = "horizontal",
        opts,
        plugins,
        className,
        children,
        ...props
    },
    ref
) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )

    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    const onSelect = useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
    }, [scrollPrev, scrollNext])

    useEffect(() => {
        if (!api || !setApi) return
        setApi(api)
    }, [api, setApi])

    useEffect(() => {
        if (!api) return

        onSelect(api)
        api.on("reInit", onSelect)
        api.on("select", onSelect)

        return () => {
        api?.off("select", onSelect)
        }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
            carouselRef,
            scrollPrev,
            scrollNext,
            api: api,
            opts,
            orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
            canScrollPrev,
            canScrollNext
        }}>
        <section
            ref={ref}
            onKeyDownCapture={handleKeyDown}
            className={cn("relative", className)}
            aria-roledescription="carousel"
            {...props}>
            {children}
        </section>
      </CarouselContext.Provider>
    )
})
Carousel.displayName = "Carousel"

const CarouselContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
    
    const {carouselRef, orientation} = useCarousel()

    return (
        <div ref={carouselRef} className="overflow-hidden">
            <div
            ref={ref}
            className={cn(
                "flex",
                orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
                className
            )}
            {...props}
            />
        </div>
    )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({className, ...props}, ref) => {

    const {orientation} = useCarousel()

    return (
        <div
            ref={ref}
            role="group"
            aria-roledescription="slide"
            className={cn(
            "min-w-0 shrink-0 grow-0 basis-full",
            orientation === "horizontal" ? "pl-4" : "pt-4",
            className
            )}
            {...props}
        />
    )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
    ({className, variant = "ghost", size = "icon", ...props}, ref) => {
    
    const {scrollPrev, orientation, canScrollPrev} = useCarousel()

    return (
    <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props} >
        <ChevronLeft className={`size-4 ${canScrollPrev ? 'text-orange-700 size-8 font-bold' : 'text-transparent'} `} />
        <span className="sr-only">anterior</span>
    </Button>
    )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
    ({className, variant = "ghost", size = "icon", ...props}, ref) => {

  const {scrollNext, orientation, canScrollNext} = useCarousel()

    return (
        <Button
            ref={ref}
            variant={variant}
            size={size}
            className={cn(
            "absolute size-8 rounded-full",
            orientation === "horizontal"
                ? "-right-12 top-1/2 -translate-y-1/2"
                : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
            className
            )}
            disabled={!canScrollNext}
            onClick={scrollNext}
            {...props}>
            <ChevronRight className={`size-4 ${canScrollNext ? 'text-orange-700 size-8 font-bold' : 'text-transparent'} `} />
            <span className="sr-only">siguiente</span>
        </Button>
    )
})
CarouselNext.displayName = "CarouselNext"

export {
    type CarouselApi,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext
}