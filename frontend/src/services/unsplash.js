const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const BASE_URL = "https://api.unsplash.com";

export const fetchPinsFromUnsplash = async ({
  page = 1,
  perPage = 20,
  query = "creative",
}) => {
  const url = query
    ? `${BASE_URL}/search/photos?page=${page}&per_page=${perPage}&query=${query}`
    : `${BASE_URL}/photos?page=${page}&per_page=${perPage}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch images from Unsplash");
  }

  const data = await res.json();
  const results = data.results || data;

  // 🔁 Map Unsplash → PinSphere shape
  return results.map((item) => ({
    _id: item.id,
    slug: item.slug || item.id,
    title: item.alt_description || "Untitled",
    description: item.description || item.alt_description || "",
    imageUrl: item.urls.regular,
    likes: [],
    createdAt: item.created_at,
    createdBy: {
      username: item.user.username,
      avatar: item.user.profile_image.medium,
    },
  }));
};
