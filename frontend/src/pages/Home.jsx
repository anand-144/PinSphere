import { useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import MasonryGrid from "../components/pins/MasonryGrid";
import Loader from "../components/Loader";
import { mockPins, getMorePins } from "../data/mockPins";

const Home = () => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setPins(mockPins);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Infinite scroll loader
  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      const newPins = getMorePins(page + 1);

      setPins((prev) => [...prev, ...newPins]);
      setPage((prev) => prev + 1);
      setLoadingMore(false);

      if (page >= 4) {
        setHasMore(false);
      }
    }, 1000);
  }, [loadingMore, hasMore, page]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Explore Ideas | PinSphere</title>
        <meta
          name="description"
          content="Explore creative ideas, images, and inspiration on PinSphere. Discover and save the best visual content."
        />
      </Helmet>

      <main
        className="
          px-3 sm:px-6 lg:px-8
          max-w-[1600px] mx-auto
          animate-fade-up
        "
      >
        <MasonryGrid
          pins={pins}
          onLoadMore={loadMore}
          hasMore={hasMore}
          loading={loadingMore}
        />

        {loadingMore && (
          <div className="flex justify-center py-10">
            <div className="loader-spinner" />
          </div>
        )}

        {!hasMore && (
          <p className="text-center text-muted-foreground py-10 text-sm">
            You’ve reached the end ✨
          </p>
        )}
      </main>
    </>
  );
};

export default Home;
