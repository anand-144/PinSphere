import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import PinCard from "./PinCards";

const MasonryGrid = ({
  pins,
  onLoadMore,
  hasMore = false,
  loading = false,
}) => {
  const gridRef = useRef(null);
  const sentinelRef = useRef(null);
  const observerRef = useRef(null);

  // Animate pins
  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".pin-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 30, scale: 0.95 },
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
    if (!onLoadMore) return;

    const sentinel = sentinelRef.current;
    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: "200px",
    });

    if (sentinel) observerRef.current.observe(sentinel);

    return () => observerRef.current?.disconnect();
  }, [handleObserver, onLoadMore]);

  return (
    <div className="px-4 md:px-6 py-6">
      <div ref={gridRef} className="masonry-grid">
        {pins.map((pin) => (
          <PinCard key={pin._id} pin={pin} />
        ))}
      </div>

      <div ref={sentinelRef} className="h-10" />

      {loading && (
        <div className="flex justify-center py-8">
          <div className="loader-spinner" />
        </div>
      )}

      {!hasMore && pins.length > 0 && (
        <p className="text-center text-muted-foreground py-8">
          You've seen all the pins ✨
        </p>
      )}
    </div>
  );
};

export default MasonryGrid;
