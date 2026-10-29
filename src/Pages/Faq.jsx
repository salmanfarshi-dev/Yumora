
import React, { useState, useEffect } from "react";
import PageBreadcrumb from "../Components/PageBreadcrumb";
import { Accordion, AccordionItem } from "@heroui/react";

function FaqSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-5 items-start justify-between animate-pulse">
      <div className="md:w-[43%] w-full">
        <div className="w-full h-64 sm:h-80 md:h-[500px] rounded-xl bg-gray-200" />
      </div>

      <div className="md:w-[50%] w-full space-y-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-14 md:h-16 w-full rounded-xl border border-gray-200 bg-gray-100"
          />
        ))}
      </div>
    </div>
  );
}

function Faq() {
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      <PageBreadcrumb title="Faq" />

      <div className="max-w-360 mx-auto px-4 md:px-6 lg:px-0 py-4 md:py-16 lg:py-20">
        {loading ? (
          <FaqSkeleton />
        ) : (
          <div className="flex flex-col md:flex-row gap-5 items-start justify-between animate-[fadeIn_0.4s_ease-out_both]">
            <div className="md:w-[43%] w-full overflow-hidden relative rounded-xl">
              {!imageLoaded && (
                <div className="absolute inset-0 min-h-64 md:min-h-[500px] animate-pulse bg-gray-200" />
              )}

              <img
                src="/aboutbanner.png"
                alt="Frequently asked questions"
                onLoad={() => setImageLoaded(true)}
                className={`h-full w-full object-cover transition-opacity duration-500 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            <div className="md:w-[50%] w-full animate-[fadeIn_0.6s_ease-out_both]">
              <Accordion variant="splitted">
                <AccordionItem
                  key="1"
                  aria-label="Hotel facilities"
                  title="What Facilities Does Your Hotel Have?"
                  className="bg-transparent shadow border border-border1 text-xs md:text-sm text-[#7A7A7A] tracking-[0.48px] leading-[24.5px]"
                  classNames={{
                    title: "text-sm md:text-[16px] font-semibold",
                    content: "",
                  }}
                >
                  <p>
                    Our hotel offers many modern facilities for guests. We have
                    comfortable rooms, free Wi-Fi, a swimming pool, and a
                    restaurant. We also provide free parking and room service.
                    Our friendly staff are always ready to help guests. We try
                    our best to make every guest's stay comfortable and
                    enjoyable.
                  </p>
                </AccordionItem>

                <AccordionItem
                  key="2"
                  aria-label="Booking a room"
                  title="How Do I Book A Room For My Vacation?"
                  className="bg-transparent shadow border border-border1 text-xs md:text-sm text-[#7A7A7A] tracking-[0.48px] leading-[24.5px]"
                  classNames={{
                    title: "text-sm md:text-[16px] font-semibold",
                  }}
                >
                  <p>
                    You can book a room through our official website or by
                    calling our hotel. First, choose your preferred room and
                    check the available dates. Then, provide the necessary
                    information for booking. You can also contact our reception
                    for help. After confirming your booking, you will receive a
                    confirmation message.
                  </p>
                </AccordionItem>

                <AccordionItem
                  key="3"
                  aria-label="Why choose our hotel"
                  title="How We are best among others?"
                  className="bg-transparent shadow border border-border1 text-xs md:text-sm text-[#7A7A7A] tracking-[0.48px] leading-[24.5px]"
                  classNames={{
                    title: "text-sm md:text-[16px] font-semibold",
                  }}
                >
                  <p>
                    Our hotel is special because we provide excellent service
                    to our guests. We offer comfortable rooms at affordable
                    prices. Our restaurant serves delicious and fresh food. We
                    always maintain a clean and peaceful environment. Our
                    friendly staff work hard to make every guest happy.
                  </p>
                </AccordionItem>

                <AccordionItem
                  key="4"
                  aria-label="Fitness center"
                  title="Is There Any Fitness Center In Your Hotel?"
                  className="bg-transparent shadow border border-border1 text-xs md:text-sm text-[#7A7A7A] tracking-[0.48px] leading-[24.5px]"
                  classNames={{
                    title: "text-sm md:text-[16px] font-semibold",
                  }}
                >
                  <p>
                    Yes, our hotel has a modern fitness center for guests. It
                    has different exercise machines and necessary equipment.
                    Guests can exercise and stay healthy during their vacation.
                    The fitness center provides a comfortable environment for
                    workouts. Our staff are always available to assist guests.
                  </p>
                </AccordionItem>

                <AccordionItem
                  key="5"
                  aria-label="Room service"
                  title="What Type Of Room Service Do You Offer?"
                  className="bg-transparent shadow border border-border1 text-xs md:text-sm text-[#7A7A7A] tracking-[0.48px] leading-[24.5px]"
                  classNames={{
                    title: "text-sm md:text-[16px] font-semibold",
                  }}
                >
                  <p>
                    We offer different types of room services for our guests.
                    These include food delivery, room cleaning, and laundry
                    services. We also provide 24-hour room service for their
                    convenience. Our staff respond quickly to guests' requests.
                    We always try to make our guests feel comfortable and
                    satisfied.
                  </p>
                </AccordionItem>

                <AccordionItem
                  key="6"
                  aria-label="Additional hotel facilities"
                  title="What Facilities Does Your Hotel Have?"
                  className="bg-transparent shadow border border-border1 text-xs md:text-sm text-[#7A7A7A] tracking-[0.48px] leading-[24.5px]"
                  classNames={{
                    title: "text-sm md:text-[16px] font-semibold",
                  }}
                >
                  <p>
                    Our hotel provides many facilities for a comfortable stay.
                    We have air-conditioned rooms, free Wi-Fi, and free
                    parking. Guests can enjoy delicious food in our restaurant.
                    We also offer friendly customer service and room cleaning.
                    Our main goal is to provide a pleasant experience for every
                    guest.
                  </p>
                </AccordionItem>

                <AccordionItem
                  key="7"
                  aria-label="Hotel amenities"
                  title="What Facilities Does Your Hotel Have?"
                  className="bg-transparent shadow border border-border1 text-xs md:text-sm text-[#7A7A7A] tracking-[0.48px] leading-[24.5px]"
                  classNames={{
                    title: "text-sm md:text-[16px] font-semibold",
                  }}
                >
                  <p>
                    Our hotel offers several facilities to make guests'
                    vacations enjoyable. We have a beautiful garden, a swimming
                    pool, and a fitness center. Our rooms are clean, spacious,
                    and comfortable. Guests can also enjoy delicious meals at
                    our restaurant. We always try to provide the best service
                    to our guests.
                  </p>
                </AccordionItem>

                <AccordionItem
                  key="8"
                  aria-label="Booking confirmation"
                  title="How Do I Book A Room For My Vacation?"
                  className="bg-transparent shadow border border-border1 text-xs md:text-sm text-[#7A7A7A] tracking-[0.48px] leading-[24.5px]"
                  classNames={{
                    title: "text-sm md:text-[16px] font-semibold",
                  }}
                >
                  <p>
                    Booking a room at our hotel is very simple. You can visit
                    our official website or contact us by phone. Choose your
                    preferred room and select your check-in and check-out
                    dates. Then, provide your personal information and confirm
                    your booking. You will receive a confirmation message after
                    completing the process.
                  </p>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Faq;
