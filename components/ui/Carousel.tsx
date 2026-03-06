'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

interface CarouselProps {
  children: React.ReactNode;
  showDots?: boolean;
  showArrows?: boolean;
}

export function Carousel({
  children,
  showDots = true,
  showArrows = true,
}: CarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const children = container.children;
    const itemCount = children.length;

    setTotalItems(itemCount);
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);

    // Calculate current index based on scroll position
    if (itemCount > 0 && children[0]) {
      const itemWidth = (children[0] as HTMLElement).offsetWidth;
      const gap = 16; // Corresponds to gap-4
      const index = Math.round(scrollLeft / (itemWidth + gap));
      setCurrentIndex(Math.min(index, itemCount - 1));
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    updateScrollState();

    container.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      container.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const children = container.children;
    if (index < 0 || index >= children.length) return;

    const targetChild = children[index] as HTMLElement;
    container.scrollTo({
      left: targetChild.offsetLeft,
      behavior: 'smooth',
    });
  };

  const scrollPrev = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const children = container.children;
    if (children.length === 0) return;

    const itemWidth = (children[0] as HTMLElement).offsetWidth;
    const gap = 16;
    container.scrollBy({
      left: -(itemWidth + gap),
      behavior: 'smooth',
    });
  };

  const scrollNext = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const children = container.children;
    if (children.length === 0) return;

    const itemWidth = (children[0] as HTMLElement).offsetWidth;
    const gap = 16;
    container.scrollBy({
      left: itemWidth + gap,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      {/* Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {children}
      </div>

      {/* Arrow Buttons */}
      {showArrows && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollLeft}
            className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] transition-opacity disabled:opacity-0"
            aria-label="Previous"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollRight}
            className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] transition-opacity disabled:opacity-0"
            aria-label="Next"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 4L10 8L6 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {showDots && totalItems > 1 && (
        <div className="mt-[var(--spacing-16)] flex justify-center gap-2">
          {Array.from({ length: totalItems }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToIndex(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-[var(--color-foreground-base)]'
                  : 'bg-[var(--color-border-base)]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
