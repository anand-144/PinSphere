import { useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import MasonryGrid from "../components/pins/MasonryGrid";
import Loader from "../components/Loader";
import { fetchPinsFromUnsplash } from "../services/unsplash";
import { fetchPins } from "../services/pinServices";
import { toast } from "sonner";

const UNSPLASH_LIMIT = 50;
const UNSPLASH_PER_PAGE = 10;

const Home = () => {
  const [pins, setPins] = useState([]);

  const [unsplashPage, setUnsplashPage] = useState(1);
  const [unsplashCount, setUnsplashCount] = useState(0);
  const [usingBackend, setUsingBackend] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Initial load
  useEffect(() => {
    loadInitial();
  }, []);

  const loadInitial = async () => {
    try {
      const data = await fetchPinsFromUnsplash({
        page: 1,
        perPage: UNSPLASH_PER_PAGE,
      });

      setPins(data);
      setUnsplashCount(data.length);
      setUnsplashPage(1);
    } catch {
      toast.error("Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);

      /* ---------------- UNSPLASH PHASE ---------------- */
      if (!usingBackend && unsplashCount < UNSPLASH_LIMIT) {
        const nextPage = unsplashPage + 1;

        const data = await fetchPinsFromUnsplash({
          page: nextPage,
          perPage: UNSPLASH_PER_PAGE,
        });

        setPins((prev) => [...prev, ...data]);
        setUnsplashPage(nextPage);
        setUnsplashCount((prev) => prev + data.length);

        // Switch to backend after limit
        if (unsplashCount + data.length >= UNSPLASH_LIMIT) {
          setUsingBackend(true);
        }

        return;
      }

      /* ---------------- BACKEND PHASE ---------------- */
      if (usingBackend) {
        const res = await fetchPins();
        const backendPins = res.data;

        if (!backendPins.length) {
          setHasMore(false);
        } else {
          setPins((prev) => [...prev, ...backendPins]);
          setHasMore(false); // backend has no pagination yet
        }
      }
    } catch {
      toast.error("Failed to load more pins");
    } finally {
      setLoadingMore(false);
    }
  }, [
    loadingMore,
    hasMore,
    usingBackend,
    unsplashPage,
    unsplashCount,
  ]);

  if (loading) return <Loader />;

  return (
    <>
      <Helmet>
        <title>Explore Ideas | PinSphere</title>
      </Helmet>

      <main className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 py-6">
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
