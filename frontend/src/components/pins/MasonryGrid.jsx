import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import PinCards from "./PinCards";

const MasonryGrid = ({ pins, onLoadMore, hasMore, loading }) => {
  const gridRef = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.4 }
    );
  }, [pins]);

  const observer = useCallback(
    (entries) => {
      if (entries[0].isIntersecting && hasMore && !loading && onLoadMore) {
        onLoadMore();
      }
    },
    [hasMore, loading, onLoadMore]
  );

  useEffect(() => {
    if (!onLoadMore) return;
    const obs = new IntersectionObserver(observer, { rootMargin: "200px" });
    if (sentinelRef.current) obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [observer, onLoadMore]);

  return (
    <>
      <div
        ref={gridRef}
        className="gap-4"
        style={{ columnCount: 4 }}
      >
        {pins.map((pin) => (
          <PinCards key={pin._id} pin={pin} />
        ))}
      </div>

      <div ref={sentinelRef} className="h-10" />
    </>
  );
};

export default MasonryGrid;
