import React from "react";
import PageBreadcrumb from "../Components/PageBreadcrumb";
import { Accordion, AccordionItem } from "@heroui/react";

function Faq() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <section>
      <PageBreadcrumb title="Faq" />
      <div className="max-w-360 mx-auto px-4 md:px-6 lg:px-0 py-4 md:py-16 lg:py-20">
        <div className="flex flex-col md:flex-row gap-5 items-start justify-between">
          <div className=" md:w-[43%] overflow-hidden">
            <img src="/aboutbanner.png" alt="" className="h-full w-full" />
          </div>

          <div className="md:w-[50%]">
            <Accordion variant="splitted">
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
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
                  restaurant. We also provide free parking and room service. Our
                  friendly staff are always ready to help guests. We try our
                  best to make every guest's stay comfortable and enjoyable.
                </p>
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Accordion 1"
                title="How Do I Book A Room For My Vacation?"
                className="bg-transparent shadow border border-border1 text-xs md:text-sm text-[#7A7A7A] tracking-[0.48px] leading-[24.5px]"
                classNames={{
                  title: "text-sm md:text-[16px] font-semibold",
                }}
              >
                <p>
                  You can book a room through our official website or by calling
                  our hotel. First, choose your preferred room and check the
                  available dates. Then, provide the necessary information for
                  booking. You can also contact our reception for help. After
                  confirming your booking, you will receive a confirmation
                  message.
                </p>
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Accordion 1"
                title="How We are best among others?"
                className="bg-transparent shadow border border-border1 text-xs md:text-sm text-[#7A7A7A] tracking-[0.48px] leading-[24.5px]"
                classNames={{
                  title: "text-sm md:text-[16px] font-semibold",
                }}
              >
                <p>
                  Our hotel is special because we provide excellent service to
                  our guests. We offer comfortable rooms at affordable prices.
                  Our restaurant serves delicious and fresh food. We always
                  maintain a clean and peaceful environment. Our friendly staff
                  work hard to make every guest happy.
                </p>
              </AccordionItem>
              <AccordionItem
                key="4"
                aria-label="Accordion 1"
                title="Is There Any Fitness Center In Your Hotel?"
                className="bg-transparent shadow border border-border1 text-xs md:text-sm text-[#7A7A7A] tracking-[0.48px] leading-[24.5px]"
                classNames={{
                  title: "text-sm md:text-[16px] font-semibold",
                }}
              >
                <p>
                  Yes, our hotel has a modern fitness center for guests. It has
                  different exercise machines and necessary equipment. Guests
                  can exercise and stay healthy during their vacation. The
                  fitness center provides a comfortable environment for
                  workouts. Our staff are always available to assist guests.
                </p>
              </AccordionItem>
              <AccordionItem
                key="5"
                aria-label="Accordion 1"
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
                  convenience. Our staff respond quickly to guests' requests. We
                  always try to make our guests feel comfortable and satisfied.
                </p>
              </AccordionItem>
              <AccordionItem
                key="6"
                aria-label="Accordion 1"
                title="What Facilities Does Your Hotel Have?"
                className="bg-transparent shadow border border-border1 text-xs md:text-sm text-[#7A7A7A] tracking-[0.48px] leading-[24.5px]"
                classNames={{
                  title: "text-sm md:text-[16px] font-semibold",
                }}
              >
                <p>
                  Our hotel provides many facilities for a comfortable stay. We
                  have air-conditioned rooms, free Wi-Fi, and free parking.
                  Guests can enjoy delicious food in our restaurant. We also
                  offer friendly customer service and room cleaning. Our main
                  goal is to provide a pleasant experience for every guest.
                </p>
              </AccordionItem>
              <AccordionItem
                key="7"
                aria-label="Accordion 1"
                title="What Facilities Does Your Hotel Have?"
                className="bg-transparent shadow border border-border1 text-xs md:text-sm text-[#7A7A7A] tracking-[0.48px] leading-[24.5px]"
                classNames={{
                  title: "text-sm md:text-[16px] font-semibold",
                }}
              >
                <p>
                  Our hotel offers several facilities to make guests' vacations
                  enjoyable. We have a beautiful garden, a swimming pool, and a
                  fitness center. Our rooms are clean, spacious, and
                  comfortable. Guests can also enjoy delicious meals at our
                  restaurant. We always try to provide the best service to our
                  guests.
                </p>
              </AccordionItem>
              <AccordionItem
                key="8"
                aria-label="Accordion 1"
                title="How Do I Book A Room For My Vacation?"
                className="bg-transparent shadow border border-border1 text-xs md:text-sm text-[#7A7A7A] tracking-[0.48px] leading-[24.5px]"
                classNames={{
                  title: "text-sm md:text-[16px] font-semibold",
                }}
              >
                <p>
                  Booking a room at our hotel is very simple. You can visit our
                  official website or contact us by phone. Choose your preferred
                  room and select your check-in and check-out dates. Then,
                  provide your personal information and confirm your booking.
                  You will receive a confirmation message after completing the
                  process.
                </p>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faq;
