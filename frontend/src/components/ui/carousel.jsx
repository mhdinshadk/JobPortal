import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const CarouselContext = React.createContext(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }
  return context;
}

const Carousel = React.forwardRef(
  (
    { orientation = 'horizontal', opts, setApi, plugins, className, children, ...props },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      { ...opts, axis: orientation === 'horizontal' ? 'x' : 'y' },
      plugins
    );

    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api) => {
      if (!api) return;
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    React.useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) return;
      onSelect(api);
      api.on('reInit', onSelect);
      api.on('select', onSelect);
      return () => api?.off('select', onSelect);
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{ carouselRef, api, scrollPrev: api?.scrollPrev, scrollNext: api?.scrollNext, canScrollPrev, canScrollNext }}
      >
        <div ref={ref} className={cn('relative', className)} {...props}>
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = 'Carousel';

const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div ref={ref} className={cn('flex gap-4', className)} {...props} />
    </div>
  );
});
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('shrink-0 grow-0 basis-full font-medium', className)} {...props} />
));
CarouselItem.displayName = 'CarouselItem';

const CarouselPrevious = React.forwardRef(({ className, ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <Button
      ref={ref}
      className={cn(
        'absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black',
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
});
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef(({ className, ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <Button
      ref={ref}
      className={cn(
        'absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black ',
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-5 w-5" />
    </Button>
  );
});
CarouselNext.displayName = 'CarouselNext';

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
