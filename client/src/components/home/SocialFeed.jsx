import React, { useEffect, useState } from "react";
import { IoMdGrid } from "react-icons/io";
import reelIcon from "../../assets/reel.png";

const highlightsData = [
  {
    id: 1,
    title: "warzone",
    img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=60",
  },
  {
    id: 2,
    title: "ODYSSEY-9D",
    img: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&q=60",
  },
  {
    id: 3,
    title: "VORTEX-VR",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=60",
  },
  {
    id: 4,
    title: "happy customers",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=60",
  },
  {
    id: 5,
    title: "Crazy Karter",
    img: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=800&q=60",
  },
];

const postsData = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  img: `https://picsum.photos/seed/post${i + 1}/600/600`,
}));

const reelsData = [
  {
    id: 1,
    title: "Reel 1",
    src: "https://www.pexels.com/download/video/5532767/",
    poster: "https://picsum.photos/seed/reel1/600/800",
  },
  {
    id: 2,
    title: "Reel 2",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    poster: "https://picsum.photos/seed/reel2/600/800",
  },
  {
    id: 3,
    title: "Reel 3",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    poster: "https://picsum.photos/seed/reel3/600/800",
  },
];

const INSTA_URL =
  "https://www.instagram.com/thrillville_ent?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

const SocialFeed = () => {
  const [activeView, setActiveView] = useState("posts"); // 'posts' or 'reels'
  const [modal, setModal] = useState({
    open: false,
    type: null,
    src: null,
    title: null,
  });

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setModal({ open: false });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function openImage(src, title) {
    setModal({ open: true, type: "image", src, title });
  }
  function openVideo(src, title) {
    setModal({ open: true, type: "video", src, title });
  }
  function closeModal() {
    setModal({ open: false, type: null, src: null, title: null });
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-md shadow-sm p-4 md:p-6">
      {/* 1) Header: name + follow + message */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 mb-10 px-2  md:px-4">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          <img alt="avatar" src="https://picsum.photos/seed/avatar/200" className="w-full h-full object-cover" />
        </div>

        {/* Name & description */}
        <div>
          <div className="text-lg font-semibold">thrillville_ent</div>
          <div className="text-xs text-gray-500">ThrillVille Entertainment Zone</div>
        </div>

        {/* Buttons: Follow above, Message below */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <button className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm w-28">Follow</button>
          <button className="border border-gray-300 px-4 py-1 rounded-md text-sm w-28">Message</button>
        </div>
      </div>

      {/* 2) Highlights */}
      <div className="mb-4">
        <div className="flex items-center gap-4 overflow-x-auto pb-2 justify-start md:justify-center px-2 md:px-0">
          {highlightsData.map((h) => (
            <button
              key={h.id}
              onClick={() => openImage(h.img, h.title)}
              className="shrink-0 flex flex-col items-center text-xs w-20"
            >
              <div className="w-16 h-16 rounded-full p-0.5 bg-linear-to-tr from-pink-500 to-yellow-400">
                <div className="w-full h-full rounded-full bg-white overflow-hidden">
                  <img
                    src={h.img}
                    alt={h.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="mt-1 truncate w-full text-center">{h.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 3) Posts / Reels toggle and content */}
      <div className="border-t border-gray-100 pt-3">
        <div className="flex items-center justify-center gap-20 px-1 mb-3 md:gap-30 mx-auto">
          <button
            onClick={() => setActiveView("posts")}
            aria-pressed={activeView === "posts"}
            className='p-1'
            title="Posts"
          >
            <IoMdGrid className="w-8 h-8 cursor-pointer" />
          </button>
          <button
            onClick={() => setActiveView("reels")}
            aria-pressed={activeView === "reels"}
            className='p-1'
            title="Reels"
          >
            <img src={reelIcon} alt="" className="w-8 h-8 cursor-pointer" />
          </button>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex w-[200%] transition-transform duration-500 ease-in-out"
            style={{ transform: activeView === 'posts' ? 'translateX(0%)' : 'translateX(-50%)' }}
          >
            {/* Posts panel */}
            <div className="w-1/2 pr-2" aria-hidden={activeView !== 'posts'}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {postsData.slice(0, 3).map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => openImage(p.img, `Post ${p.id}`)}
                    className={`block w-full overflow-hidden pt-[35vh] md:pt-0 md:aspect-square relative ${idx === 2 ? 'hidden md:block' : ''}`}
                  >
                    <img src={p.img} alt={`Post ${p.id}`} className="absolute inset-0 w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="mt-3 flex justify-center">
                <a
                  href={INSTA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm shadow-sm hover:bg-blue-700 transition"
                  aria-label="See more on Instagram"
                >
                  See more
                </a>
              </div>
            </div>

            {/* Reels panel */}
            <div className="w-1/2 pl-2" aria-hidden={activeView !== 'reels'}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {reelsData.slice(0, 3).map((r, idx) => (
                  <button
                    key={r.id}
                    onClick={() => openVideo(r.src, r.title)}
                    className={`block w-full overflow-hidden pt-[35vh] md:pt-0 md:aspect-square rounded relative ${idx === 2 ? 'hidden md:block' : ''}`}
                  >
                    <img src={r.poster} alt={r.title} className="absolute inset-0 w-full h-full object-cover" />

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-black/50 rounded-full p-2">
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 8l6 4-6 4V8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-3 flex justify-center">
                <a
                  href={INSTA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm shadow-sm hover:bg-blue-700 transition"
                  aria-label="See more on Instagram"
                >
                  See more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal.open && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="max-w-[92%] max-h-[92%]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-2">
              <button
                onClick={closeModal}
                className="text-white bg-black/40 rounded-full p-2"
              >
                ✕
              </button>
            </div>
            {modal.type === "image" && (
              <img
                src={modal.src}
                alt={modal.title}
                className="max-h-[80vh] w-auto mx-auto rounded"
              />
            )}
            {modal.type === "video" && (
              <video
                src={modal.src}
                controls
                autoPlay
                className="max-h-[80vh] w-auto mx-auto rounded"
              />
            )}
            {modal.title && (
              <div className="text-white mt-2 text-center">{modal.title}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialFeed;
