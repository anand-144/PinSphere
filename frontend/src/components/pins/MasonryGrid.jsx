import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import PinCard from "./PinCards";

const MasonryGrid = ({
  pins,
  onLoadMore,
  hasMore = true,
  loading = false,
}) => {
  const gridRef = useRef(null);
  const sentinelRef = useRef(null);
  const observerRef = useRef(null);

  // GSAP animation for new pins
  useEffect(() => {
    if (!gridRef.current) return;

    const pinCards = gridRef.current.querySelectorAll(".pin-card");

    gsap.fromTo(
      pinCards,
      {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
      }
    );
  }, [pins]);

  // Infinite scroll handler
  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;

      if (target.isIntersecting && hasMore && !loading && onLoadMore) {
        onLoadMore();
      }
    },
    [hasMore, loading, onLoadMore]
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "200px",
      threshold: 0,
    });

    if (sentinel) {
      observerRef.current.observe(sentinel);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  return (
    <div className="px-4 md:px-6 py-6">
      <div ref={gridRef} className="masonry-grid">
        {pins.map((pin) => (
          <PinCard key={pin._id} pin={pin} />
        ))}
      </div>

      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} className="h-10" />

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="loader-spinner" />
        </div>
      )}

      {!hasMore && pins.length > 0 && (
        <p className="text-center text-muted-foreground py-8">
          You've seen all the pins! ✨
        </p>
      )}
    </div>
  );
};

export default MasonryGrid;
