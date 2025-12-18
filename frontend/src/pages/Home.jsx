import { useEffect, useState } from "react";
import { fetchPins } from "../services/pinServices";
import MasonryGrid from "../components/pins/MasonryGrid";
import Loader from "../components/Loader";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPins()
      .then((res) => setPins(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Explore Ideas | PinSphere</title>
        <meta
          name="description"
          content="Explore creative ideas, images, and inspiration on PinSphere."
        />
      </Helmet>

      {loading ? <Loader /> : <MasonryGrid pins={pins} />}
    </>
  );
};

export default Home;
