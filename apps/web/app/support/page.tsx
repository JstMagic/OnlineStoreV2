export default function SupportPage() {
  const faqs = [
    {
      question: 'What is your return policy?',
      answer:
        'We accept returns within 30 days of delivery. Items must be unused and in original packaging.',
    },
    {
      question: 'How long does shipping take?',
      answer:
        'Orders typically ship within 1–2 business days. Delivery times vary by location, usually 3–7 business days.',
    },
    {
      question: 'How can I track my order?',
      answer:
        'You will receive a confirmation email with a tracking number once your order has shipped.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards, PayPal, and Apple Pay.',
    },
    {
      question: 'Can I change or cancel my order?',
      answer:
        'You can modify or cancel your order within one hour of placing it. After that, please contact our support team.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Support & FAQ</h1>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700">
          Email:{' '}
          <a href="mailto:support@onlinestorev2.example" className="text-blue-600 underline">
            support@onlinestorev2.example
          </a>
        </p>
        <p className="text-gray-700">Phone: (555) 123-4567</p>
        <p className="text-gray-700">Monday – Friday, 9 AM – 5 PM EST</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <summary className="font-medium cursor-pointer list-none">
                {faq.question}
              </summary>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
