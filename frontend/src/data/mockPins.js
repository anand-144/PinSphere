export const mockPins = [
  {
    _id: "1",
    slug: "modern-minimal-living-room",
    title: "Modern Minimal Living Room",
    description: "Clean lines and neutral tones create a serene space",
    imageUrl:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=600&fit=crop",
    likes: ["user1", "user2"],
    author: {
      username: "designlover",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    createdAt: "2024-01-15",
  },
  {
    _id: "2",
    slug: "cozy-coffee-corner",
    title: "Cozy Coffee Corner",
    description: "The perfect spot for your morning routine",
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=500&fit=crop",
    likes: ["user1"],
    author: {
      username: "coffeelover",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    createdAt: "2024-01-14",
  },
  {
    _id: "3",
    slug: "sunset-beach-vibes",
    title: "Sunset Beach Vibes",
    description: "Golden hour magic at the beach",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=700&fit=crop",
    likes: ["user2", "user3", "user4"],
    author: {
      username: "traveler",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    createdAt: "2024-01-13",
  },

  // 🔽 (rest of your pins stay EXACTLY the same)

  {
    _id: "16",
    slug: "vintage-aesthetics",
    title: "Vintage Aesthetics",
    description: "Timeless charm from another era",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=550&fit=crop",
    likes: ["user3"],
    author: {
      username: "vintagevibes",
      avatar: "https://i.pravatar.cc/150?img=16",
    },
    createdAt: "2023-12-31",
  },
];

export const getMorePins = (page) => {
  return mockPins.map((pin) => ({
    ...pin,
    _id: `${pin._id}-page${page}`,
    slug: `${pin.slug}-${page}`,
  }));
};
