import React, { useState } from "react";
import PageBreadcrumb from "../Components/PageBreadcrumb";

const posts = [
  {
    title: "Health Benefits of a Raw Food Diet",
    author: "Admin",
    date: "Sep 12, 2026",
    comments: 7,
    image: "/Section→blog-1.jpg.png",
    image2: "/first.jpg",
    image3: "/seccond.jpg",
    body: `A raw diet keeps ingredients close to their natural state, which means more of the vitamins, minerals and enzymes survive the trip from soil to plate. Lightly prepared vegetables, sprouted grains and fresh herbs digest easily and tend to leave you feeling lighter rather than heavy.`,
    body2: `Cooking at high heat can break down water-soluble vitamins like C and several B vitamins. Keeping a portion of each meal raw is a simple way to hold onto that nutrition without changing your whole routine overnight.`,
  },
  {
    title: "Why Your Body Loves Fresh Green Juice",
    author: "Admin",
    date: "Sep 5, 2026",
    comments: 4,
    image: "/Section→blog-2.jpg.png",
    image2: "/third.jpg",
    image3: "/four.jpg",
    body: `A glass of cold-pressed greens delivers concentrated nutrients in a form your body absorbs quickly, without asking your digestion to work through fibre-heavy meals first. Apple, cucumber and a handful of spinach make a gentle everyday base.`,
    body2: `Juicing isn't a replacement for whole vegetables, but as a daily top-up it's an easy way to fit in greens on busy mornings, especially paired with a proper breakfast an hour later.`,
  },
  {
    title: "Building a Raw Pantry: The Essentials",
    author: "Admin",
    date: "Aug 28, 2026",
    comments: 11,
    image: "/Section→blog-3.jpg.png",
    image2: "/five.jpg",
    image3: "/six.jpg",
    body: `A well-stocked raw pantry starts with soaked nuts and seeds, a rotation of fresh sprouts, good olive oil, and a shelf of dried herbs and spices for flavour without cooking. Keep jars visible so you actually reach for them.`,
    body2: `Add a few staples like dates for natural sweetness and a citrus fruit or two, and you can build a full raw meal in minutes without any special equipment beyond a sharp knife.`,
  },
];

function BlogSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-56 sm:h-80 md:h-125 w-full rounded-xl bg-gray-200" />

      <div className="mt-5 h-3 w-52 rounded bg-gray-200" />

      <div className="mt-4 h-8 sm:h-10 w-4/5 rounded bg-gray-200" />

      <div className="mt-5 space-y-3">
        <div className="h-3 w-full rounded bg-gray-200" />
        <div className="h-3 w-full rounded bg-gray-200" />
        <div className="h-3 w-3/4 rounded bg-gray-200" />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:gap-5">
        <div className="h-36 sm:h-52 rounded-xl bg-gray-200" />
        <div className="h-36 sm:h-52 rounded-xl bg-gray-200" />
      </div>

      <div className="mt-6 space-y-3">
        <div className="h-3 w-full rounded bg-gray-200" />
        <div className="h-3 w-5/6 rounded bg-gray-200" />
      </div>
    </div>
  );
}

function Blog() {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const goTo = (i) => {
    setCurrent((i + posts.length) % posts.length);
  };

  const handleImageLoad = (key) => {
    setLoadedImages((prev) => ({
      ...prev,
      [key]: true,
    }));
  };

  return (
    <div>
      <PageBreadcrumb title="Blog" />

      <main className="max-w-360 mx-auto px-4 md:px-6 lg:px-0 mt-4 md:mt-7 lg:mt-12">
        {loading ? (
          <BlogSkeleton />
        ) : (
          <>
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${current * 100}%)`,
                }}
              >
                {posts.map((p, i) => (
                  <article
                    key={i}
                    className="w-full flex-shrink-0 px-1 animate-[fadeIn_0.4s_ease-out_both]"
                  >
                    <div className="relative mb-6 flex items-center justify-center overflow-hidden bg-white">
                      {!loadedImages[`main-${i}`] && (
                        <div className="absolute inset-0 animate-pulse bg-gray-200" />
                      )}

                      <img
                        src={p.image}
                        alt={p.title}
                        onLoad={() => handleImageLoad(`main-${i}`)}
                        className={`w-full h-56 sm:h-80 md:h-125 object-cover transition-opacity duration-500 ${
                          loadedImages[`main-${i}`]
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />
                    </div>

                    <div className="text-xs mb-2 text-green-800">
                      By {p.author} &nbsp;·&nbsp; {p.date} &nbsp;·&nbsp;{" "}
                      {p.comments} comments
                    </div>

                    <h1 className="font-serif text-3xl sm:text-4xl mb-4 leading-tight text-stone-900">
                      {p.title}
                    </h1>

                    <p className="mb-4 leading-relaxed text-stone-700">
                      {p.body}
                    </p>

                    <div className="grid grid-cols-2 gap-2 md:gap-4 lg:gap-8 mt-2 md:mt-5 mb-2 md:mb-5">
                      {[p.image2, p.image3].map((src, index) => {
                        const key = `extra-${i}-${index}`;

                        return (
                          <div
                            key={key}
                            className="relative min-w-0 overflow-hidden bg-gray-100"
                          >
                            {!loadedImages[key] && (
                              <div className="absolute inset-0 animate-pulse bg-gray-200" />
                            )}

                            <img
                              src={src}
                              alt={`${p.title} ${index + 1}`}
                              onLoad={() => handleImageLoad(key)}
                              className={`w-full h-36 sm:h-52 object-cover transition-opacity duration-500 ${
                                loadedImages[key] ? "opacity-100" : "opacity-0"
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>

                    <p className="leading-relaxed text-stone-700">{p.body2}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 md:gap-5 mt-7 pt-5 border-t border-[#e3dcc8] mb-4 md:mb-8 lg:mb-14">
              <button
                onClick={() => goTo(current - 1)}
                className="text-sm px-3 py-1.5 rounded-full border border-[#e3dcc8] hover:border-primary transition-colors"
              >
                ‹ Previous
              </button>

              <div className="flex items-center gap-2">
                {posts.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to blog post ${i + 1}`}
                    aria-current={i === current ? "page" : undefined}
                    className={`w-8 h-8 rounded-full text-sm border transition-colors ${
                      i === current
                        ? "bg-primary border-primary text-white"
                        : "border-[#e3dcc8] text-stone-800 hover:border-primary"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => goTo(current + 1)}
                className="text-sm px-3 py-1.5 rounded-full border border-[#e3dcc8] hover:border-primary transition-colors"
              >
                Next ›
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Blog;
