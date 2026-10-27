
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button, Input, Textarea } from "@heroui/react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowUpRight,
  FiSend,
  FiMessageCircle,
  FiHeadphones,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import toast from "react-hot-toast";
import PageBreadcrumb from "../Components/PageBreadcrumb";

const EMAILJS_SERVICE_ID = "service_n4dvml2";
const EMAILJS_TEMPLATE_ID = "template_vnw2x4m";
const EMAILJS_PUBLIC_KEY = "myx33Vbsu4WrlUAbO";

const contactInfo = [
  {
    icon: FiMail,
    title: "Email us",
    description: "Our team is here to help.",
    value: "salmanfarshidevel@gmail.com.com",
    href: "mailto:support@example.com",
    iconStyle: "bg-red-50 text-red-600",
  },
  {
    icon: FiPhone,
    title: "Call us",
    description: "Mon–Sat, 9 AM – 6 PM.",
    value: "+880 1XXX-XXXXXX",
    href: "tel:+8801XXXXXXXXX",
    iconStyle: "bg-rose-50 text-rose-600",
  },
  {
    icon: FiMapPin,
    title: "Visit us",
    description: "We are happy to hear from you.",
    value: "Dhaka, Bangladesh",
    href: "https://www.google.com/maps/place/Dhaka",
    iconStyle: "bg-orange-50 text-orange-600",
  },
];

function Contact() {
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const subject = formData.get("subject")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (
      EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID" ||
      EMAILJS_TEMPLATE_ID === "YOUR_TEMPLATE_ID" ||
      EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY"
    ) {
      toast.error("Please configure your EmailJS credentials first.");
      return;
    }

    try {
      setIsSending(true);

      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form,
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        }
      );

      toast.success("Your message has been sent successfully!");
      form.reset();
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Message could not be sent. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50/70 pb-16">
      <PageBreadcrumb title="Contact Us" />

      <div className="mx-auto max-w-[1440px] px-4 pt-8 sm:px-6 md:pt-12 lg:px-8">
        {/* Hero section */}
        <div className="relative isolate overflow-hidden rounded-3xl bg-slate-950 px-6 py-12 shadow-xl sm:px-10 md:py-16 lg:px-16">
          <div className="pointer-events-none absolute -right-20 -top-24 -z-10 h-80 w-80 rounded-full bg-red-600/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 -z-10 h-72 w-72 rounded-full bg-rose-600/20 blur-3xl" />

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Hero content */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-semibold tracking-wide text-red-200">
                <FiMessageCircle className="text-sm" />
                WE'D LOVE TO HEAR FROM YOU
              </div>

              <h1 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                Let's start a
                <span className="block bg-gradient-to-r from-red-400 to-rose-300 bg-clip-text text-transparent">
                  conversation.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Have a question about your order, need help choosing a
                product, or just want to say hello? Send us a message.
                We're always happy to help.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-950 bg-red-500 text-sm font-bold text-white">
                    Y
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-950 bg-rose-500 text-sm font-bold text-white">
                    U
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-950 bg-orange-500 text-sm font-bold text-white">
                    M
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    We're here for you
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Your satisfaction matters to us.
                  </p>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/15 text-red-300">
                    <FiHeadphones size={20} />
                  </div>
                  <h3 className="font-semibold text-white">
                    Customer Support
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    We're ready to help with your questions.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/15 text-rose-300">
                    <FiClock size={20} />
                  </div>
                  <h3 className="font-semibold text-white">
                    Quick Response
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Send us your message and we'll get back to you.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="rounded-3xl border border-white/60 bg-white p-5 shadow-2xl shadow-black/20 sm:p-8 lg:p-9">
              <div className="mb-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <FiSend size={22} />
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Send us a message
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Fill out the form below. We'll get back to you as soon
                  as possible.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Input
                    name="name"
                    label="Full name"
                    placeholder="Enter your name"
                    labelPlacement="outside"
                    variant="bordered"
                    radius="lg"
                    isRequired
                    maxLength={100}
                    classNames={{
                      label: "font-medium text-slate-700",
                      inputWrapper:
                        "border-slate-200 bg-slate-50 hover:bg-white group-data-[focus=true]:border-red-500 shadow-none",
                    }}
                  />

                  <Input
                    name="email"
                    type="email"
                    label="Email address"
                    placeholder="you@example.com"
                    labelPlacement="outside"
                    variant="bordered"
                    radius="lg"
                    isRequired
                    maxLength={254}
                    classNames={{
                      label: "font-medium text-slate-700",
                      inputWrapper:
                        "border-slate-200 bg-slate-50 hover:bg-white group-data-[focus=true]:border-red-500 shadow-none",
                    }}
                  />
                </div>

                <Input
                  name="subject"
                  label="Subject"
                  placeholder="What can we help you with?"
                  labelPlacement="outside"
                  variant="bordered"
                  radius="lg"
                  isRequired
                  maxLength={150}
                  classNames={{
                    label: "font-medium text-slate-700",
                    inputWrapper:
                      "border-slate-200 bg-slate-50 hover:bg-white group-data-[focus=true]:border-red-500 shadow-none",
                  }}
                />

                <Textarea
                  name="message"
                  label="Your message"
                  placeholder="Write your message here..."
                  labelPlacement="outside"
                  variant="bordered"
                  radius="lg"
                  minRows={5}
                  maxRows={8}
                  isRequired
                  maxLength={3000}
                  classNames={{
                    label: "font-medium text-slate-700",
                    inputWrapper:
                      "border-slate-200 bg-slate-50 hover:bg-white group-data-[focus=true]:border-red-500 shadow-none",
                  }}
                />

                <Button
                  type="submit"
                  isDisabled={isSending}
                  className="mt-1 h-12 w-full rounded-xl bg-red-600 text-base font-semibold text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-700 hover:shadow-red-600/30 disabled:cursor-not-allowed disabled:opacity-60"
                  endContent={
                    isSending ? null : <FiArrowUpRight size={19} />
                  }
                >
                  {isSending ? "Sending message..." : "Send Message"}
                </Button>

                <p className="flex items-center justify-center gap-2 text-center text-xs text-slate-500">
                  <FiCheckCircle className="shrink-0 text-red-500" />
                  Your information is used to respond to your inquiry.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Contact information */}
        <div className="mt-12">
          <div className="mb-7 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
              GET IN TOUCH
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              We'd love to hear from you
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Choose the best way to reach us. We're happy to help.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {contactInfo.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.title}
                  href={item.href}
                  target={
                    item.title === "Visit us" ? "_blank" : undefined
                  }
                  rel={
                    item.title === "Visit us"
                      ? "noreferrer"
                      : undefined
                  }
                  className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl hover:shadow-red-950/5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconStyle} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon size={22} />
                    </div>

                    <FiArrowUpRight
                      className="text-slate-400 transition-colors group-hover:text-red-600"
                      size={20}
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>

                  <p className="mt-4 break-words text-sm font-semibold text-red-600">
                    {item.value}
                  </p>
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom support banner */}
        <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-red-100 bg-gradient-to-r from-red-50 via-white to-rose-50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600">
              <FiMessageCircle size={23} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Still have questions?
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Send us a message using the contact form above.
              </p>
            </div>
          </div>

          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              document
                .querySelector('input[name="name"]')
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
            }}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-red-600/20 transition hover:bg-red-700"
          >
            Contact Support
            <FiArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
