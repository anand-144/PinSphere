import { useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import MasonryGrid from "../components/pins/MasonryGrid";
import Loader from "../components/Loader";
import { fetchPinsFromUnsplash } from "../services/unsplash";
import { toast } from "sonner";

const Home = () => {
  const [pins, setPins] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadInitialPins();
  }, []);

  const loadInitialPins = async () => {
    try {
      const data = await fetchPinsFromUnsplash({ page: 1 });
      setPins(data);
    } catch {
      toast.error("Failed to load pins");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const newPins = await fetchPinsFromUnsplash({ page: nextPage });

      if (newPins.length === 0) {
        setHasMore(false);
      } else {
        setPins((prev) => [...prev, ...newPins]);
        setPage(nextPage);
      }
    } catch {
      toast.error("Failed to load more pins");
    } finally {
      setLoadingMore(false);
    }
  }, [page, loadingMore, hasMore]);

  if (loading) return <Loader />;

  return (
    <>
      <Helmet>
        <title>Explore Ideas | PinSphere</title>
      </Helmet>

      <main className="px-3 sm:px-6 lg:px-8 max-w-[1600px] mx-auto animate-fade-up">
        <MasonryGrid
          pins={pins}
          onLoadMore={loadMore}
          hasMore={hasMore}
          loading={loadingMore}
        />
      </main>
    </>
  );
};

export default Home;
