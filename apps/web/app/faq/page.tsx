export default function FAQPage() {
  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'You can create an account by clicking on the Sign Up button on the top right corner.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We accept returns within 30 days of purchase. Please ensure the items are in original condition.',
    },
    // Add more FAQs as needed
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <details key={idx} className="border rounded-lg p-4 bg-white shadow-sm">
            <summary className="font-medium cursor-pointer list-none">
              {faq.question}
            </summary>
            <p className="mt-2 text-gray-600">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
