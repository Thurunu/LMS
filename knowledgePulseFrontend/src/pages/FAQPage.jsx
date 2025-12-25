import { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
} from "lucide-react";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer:
        'To enroll, open the course page and click the "Enroll Now" button. For free courses enrollment is immediate; for paid courses you will complete checkout first. After enrolling you can access the course from "My Courses".',
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit and debit cards as well as PayPal. Payments are processed securely by our payment provider (e.g., Stripe) — we do not store your full card details on our servers.",
    },
    {
      question: "Can I get a refund if I am not satisfied?",
      answer:
        "Our refund policy typically allows refunds within 14 days of purchase provided you have not completed more than 20% of the course. Some instructors or promotions may have different rules — check the course page for details or contact support.",
    },
    {
      question: "Do courses include a certificate of completion?",
      answer:
        "Many courses offer a completion certificate which you can download from your profile after finishing. Some specialist or verified certificates may require additional verification — check the specific course details.",
    },
    {
      question: "How do I update my profile or account details?",
      answer:
        'Go to the "Student Profile" page to update your name, phone number, address and other personal details. For billing information, visit the billing settings where you can manage saved payment methods.',
    },
    {
      question: "How can I judge the quality of a course or instructor?",
      answer:
        "We display student ratings, reviews and an instructor bio on each course page. Watch the preview videos and read recent reviews to assess quality before enrolling.",
    },
    {
      question: "Are there prerequisites for courses?",
      answer:
        "If a course requires prior knowledge or tools, prerequisites will be listed on the course page. Beginners will generally find many courses with no required background.",
    },
    {
      question: "How do I contact support if something goes wrong?",
      answer:
        'Use the "Help" or "Contact Us" link in the footer to submit a ticket, or email support@yourdomain.com. Include your account email and a clear description of the issue so we can assist quickly.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        {/* Decorative Icons */}
        <div className="absolute top-8 left-8 text-[#1D6E61]">
          <div className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center">
            <HelpCircle className="w-10 h-10" />
          </div>
        </div>

        <div className="absolute top-8 right-8 text-[#EAB141]">
          <div className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center">
            <MessageCircle className="w-10 h-10" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#1D6E61]/10 text-[#1D6E61] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            Help Center
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-[#1D6E61]">Frequently Asked</span>
            <br />
            <span className="text-[#EAB141]">Questions</span>
          </h1>

          <p className="text-gray-600 text-lg italic max-w-2xl mx-auto">
            Find answers to common questions about our platform, courses, and
            services. Can't find what you're looking for? Contact our support
            team.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* FAQ Card Container */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`border-2 rounded-xl overflow-hidden transition-all duration-300 ${
                    openIndex === index
                      ? "border-[#1D6E61] shadow-lg"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? -1 : index)
                    }
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-lg pr-4 text-gray-800">
                      {faq.question}
                    </span>
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        openIndex === index
                          ? "bg-[#1D6E61] text-white rotate-180"
                          : "bg-gray-100 text-[#1D6E61]"
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      openIndex === index
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    <div className="px-6 pb-6 text-gray-700 leading-relaxed border-t pt-6">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support Card */}
          <div className="mt-8 bg-gradient-to-r from-[#1D6E61] to-[#2F3F3F] rounded-3xl shadow-xl p-8 text-white">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
              <p className="text-gray-200 mb-6 italic">
                Can't find the answer you're looking for? Our support team is
                here to help.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-[#EAB141] text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all inline-flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
