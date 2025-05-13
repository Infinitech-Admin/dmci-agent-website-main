"use client";
import { Image } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import React from "react";
import { LuGlobe, LuMenu, LuX } from "react-icons/lu";

// Array of social media data
const social = [
  {
    id: 1,
    image:
      "https://infinitech-testing5.online/media/facebook.png",
    link: "https://www.facebook.com/share/We79XYCKWCDWmhE2/?mibextid=JRoKGi",
  },
  {
    id: 2,
    image:
      "https://infinitech-testing5.online/media/phone-call.png",
    link: "tel:+639175480999",
  },
  {
    id: 3,
    image:
      "https://infinitech-testing5.online/media/mail.png",
    link: "mailto:elladmcihomes.ph@gmail.com",
  },
  {
    id: 4,
    image:
      "https://infinitech-testing5.online/media/instagram.png",
    link: "https://www.instagram.com/ella.dmcihomes",
  },
  {
    id: 5,
    image:
      "https://infinitech-testing5.online/media/viber+(1).png",
    link: "viber://chat?number=639175480999",
  },
  {
    id: 6,
    image:
      "https://infinitech-testing5.online/media/telegram+(2).png",
    link: "https://t.me/+639175480999",
  },
  {
    id: 7,
    image: "/wechat.png",
    link: "weixin://dl/chat?number=639175480999",
  },
  {
    id: 8,
    image: "/whatsapp.png",
    link: "https://wa.me/639175480999",
  },
];

const FloatingIcons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.includes("/room-planner")) {
    return null;
  }

  return (
    <>
      {/* Desktop Social Icons */}
      <div className="fixed top-1/2 right-9 transform -translate-y-1/2 z-50 hidden lg:flex">
        <div className="flex flex-col gap-4">
          {social.map((icon) => (
            <a
              key={icon.id}
              href={icon.link}
              rel="noopener noreferrer"
              target="_blank"
              className="bg-blue-700 p-2 rounded-full shadow-lg hover:bg-blue-800 transition"
            >
              <Image
                alt={`Social icon ${icon.id}`}
                height={32}
                src={icon.image}
                width={32}
              />
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Globe Toggle Button (when closed) */}
      {!isOpen && (
        <div className="fixed bottom-28 right-8 lg:hidden z-[999]">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-700 p-3 rounded-full shadow-lg"
          >
            <LuGlobe className="text-white w-6 h-6" />
          </button>
        </div>
      )}

      {/* Mobile Social Icons + Close Button (when open) */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 flex flex-col items-end gap-2 lg:hidden z-[999] max-h-[70vh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            {social.map((icon) => (
              <a
                key={icon.id}
                href={icon.link}
                rel="noopener noreferrer"
                target="_blank"
                className="bg-blue-700 p-2 rounded-full shadow-lg hover:bg-blue-800 transition"
              >
                <Image
                  alt={`Social icon ${icon.id}`}
                  height={32}
                  src={icon.image}
                  width={32}
                />
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="bg-blue-700 p-3 rounded-full shadow-lg"
          >
            <LuX className="text-white w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
};

export default FloatingIcons;
