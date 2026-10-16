
import React from "react";
import { Form, Input, Textarea, Button } from "@heroui/react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiArrowUpRight,
  FiSend,
  FiMessageCircle,
  FiHeadphones,
} from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import PageBreadcrumb from "../Components/PageBreadcrumb";

const contactInfo = [
  {
    icon: FiMail,
    title: "Email us",
    description: "Our team is here to help.",
    value: "support@example.com",
    href: "mailto:support@example.com",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: FiPhone,
    title: "Call us",
    description: "Mon–Sat, 9 AM – 6 PM.",
    value: "+880 1XXX-XXXXXX",
    href: "tel:+8801XXXXXXXXX",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: FiMapPin,
    title: "Visit us",
    description: "Come say hello at our office.",
    value: "Dhaka, Bangladesh",
    href: "https://maps.google.com/?q=Dhaka+Bangladesh",
    color: "bg-emerald-50 text-emerald-600",
  },
];

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    toast.success("Form validated! Connect an email service to send your message.");
    event.currentTarget.reset();
  };

  return (
    <section className="min-h-screen bg-slate-50/70 pb-16">
      <Toaster position="top-right" />
      <PageBreadcrumb title="Contact Us" />

      <div className="mx-auto max-w-360 px-4 pt-8 sm:px-6 md:pt-12 lg:px-8">
        {/* Hero section */}
        <div className="relative isolate overflow-hidden rounded-3xl bg-slate-950 px-6 py-12 sm:px-10 md:py-16 lg:px-16">
          <div className="absolute -right-20 -top-24 -z-10 h-80 w-80 rounded-full bg-blue-600/30 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 -z-10 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-semibold tracking-wide text-blue-200">
                <FiMessageCircle className="text-sm" />
                WE'D LOVE TO HEAR FROM YOU
              </div>

              <h1 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                Let's start a
                <span className="block bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
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
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-950 bg-blue-500 text-xs font-bold text-white">
                    S
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-950 bg-violet-500 text-xs font-bold text-white">
                    H
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-950 bg-emerald-500 text-xs font-bold text-white">
                    T
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    We're here for you
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Customer support that cares.
                  </p>
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative hidden min-h-64 items-center justify-center lg:flex">
              <div className="absolute h-64 w-64 rounded-full border border-white/10" />
              <div className="absolute h-48 w-48 rounded-full border border-white/10" />

              <div className="relative flex h-36 w-36 items-center justify-center rounded-[2rem] border border-white/20 bg-gradient-to-br from-blue-500 to-violet-600 text-6xl text-white shadow-2xl shadow-blue-500/30">
                <FiHeadphones />
              </div>

              <div className="absolute right-4 top-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 shadow-xl backdrop-blur-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/20 text-xl text-emerald-300">
                  <FiMessageCircle />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Quick response
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    We're listening
                  </p>
                </div>
              </div>

              <div className="absolute bottom-4 left-0 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 shadow-xl backdrop-blur-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/20 text-xl text-blue-300">
                  <FiMail />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Your message matters
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    Every question counts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact information cards */}
        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactInfo.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.title}
                href={item.href}
                target={item.title === "Visit us" ? "_blank" : undefined}
                rel={item.title === "Visit us" ? "noreferrer" : undefined}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/60 sm:p-6"
              >
                <div className="flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${item.color}`}>
                    <Icon />
                  </div>

                  <FiArrowUpRight className="text-xl text-slate-300 transition-colors group-hover:text-blue-600" />
                </div>

                <h2 className="mt-5 text-lg font-bold text-slate-900">
                  {item.title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {item.description}
                </p>

                <p className="mt-4 break-words text-sm font-semibold text-blue-600">
                  {item.value}
                </p>
              </a>
            );
          })}
        </div>

        {/* Contact form and help section */}
        <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px] xl:gap-8">
          {/* Form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 md:p-10">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                CONTACT FORM
              </span>

              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Send us a message
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Fill out the form below and tell us how we can help.
                Please use your correct email address.
              </p>
            </div>

            <Form
              className="flex w-full flex-col gap-5"
              onSubmit={handleSubmit}
            >
              <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
                <Input
                  isRequired
                  name="name"
                  label="Full name"
                  labelPlacement="outside"
                  placeholder="Enter your full name"
                  type="text"
                  variant="bordered"
                  radius="lg"
                />

                <Input
                  isRequired
                  name="email"
                  label="Email address"
                  labelPlacement="outside"
                  placeholder="you@example.com"
                  type="email"
                  variant="bordered"
                  radius="lg"
                />
              </div>

              <Input
                isRequired
                name="subject"
                label="Subject"
                labelPlacement="outside"
                placeholder="What can we help you with?"
                type="text"
                variant="bordered"
                radius="lg"
              />

              <Textarea
                isRequired
                name="message"
                label="Your message"
                labelPlacement="outside"
                placeholder="Write your message here..."
                minRows={5}
                variant="bordered"
                radius="lg"
              />

              <div className="flex w-full flex-col justify-between gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center">
                <p className="max-w-xs text-xs leading-5 text-slate-400">
                  By submitting this form, you agree to be contacted
                  regarding your inquiry.
                </p>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-blue-600 px-7 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 sm:w-auto"
                  endContent={<FiSend />}
                >
                  Send message
                </Button>
              </div>
            </Form>
          </div>

          {/* Help sidebar */}
          <div className="space-y-5">
            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-xl shadow-blue-600/15 sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-2xl">
                <FiHeadphones />
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Need a little help?
              </h3>

              <p className="mt-3 text-sm leading-6 text-blue-100">
                Whether it's an order update, product question, or
                something else, we're happy to point you in the right
                direction.
              </p>

              <a
                href="mailto:support@example.com"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 transition-colors hover:bg-blue-50"
              >
                Contact support
                <FiArrowUpRight className="text-base" />
              </a>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-xl text-amber-600">
                <FiClock />
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                Business hours
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                We're available during our regular support hours.
              </p>

              <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-500">Saturday – Thursday</span>
                  <span className="font-semibold text-slate-800">
                    9 AM – 6 PM
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-500">Friday</span>
                  <span className="font-semibold text-slate-800">
                    Closed
                  </span>
                </div>
              </div>

              <p className="mt-4 text-xs leading-5 text-slate-400">
                Business hours shown are sample details. Update them to
                match your actual support schedule.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-8 flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-6 text-center sm:flex-row sm:gap-3">
          <FiMessageCircle className="text-xl text-blue-600" />
          <p className="text-sm text-slate-500">
            Still have questions? We're just a message away.
            <span className="ml-1 font-semibold text-slate-800">
              We'd love to help.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
