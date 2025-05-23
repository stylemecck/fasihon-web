import { FaBoxOpen, FaClock, FaMoneyBillWave, FaShippingFast } from 'react-icons/fa';

const ReturnsExchanges = () => {
  return (
    <div className="min-h-screen bg-gray-50 mt-[8%]">
      {/* Hero Section */}
      <section className="py-20 text-white bg-gray-900">
        <div className="max-w-6xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">Returns & Exchanges</h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-300">
            We make returns and exchanges easy. Here's everything you need to know.
          </p>
        </div>
      </section>

      {/* Policy Overview */}
      <section className="py-16">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-6 text-center bg-white rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <FaClock className="text-4xl text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">30-Day Return Window</h3>
              <p className="text-gray-600">Items must be returned within 30 days of delivery</p>
            </div>

            <div className="p-6 text-center bg-white rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <FaBoxOpen className="text-4xl text-green-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Easy Returns</h3>
              <p className="text-gray-600">Free returns shipping for US orders</p>
            </div>

            <div className="p-6 text-center bg-white rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <FaMoneyBillWave className="text-4xl text-purple-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Quick Refunds</h3>
              <p className="text-gray-600">Refunds processed within 3 business days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Return Process */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <h2 className="mb-8 text-3xl font-bold text-center">How to Return an Item</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="p-4 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Initiate Return</h3>
              <p className="text-gray-600">Start your return through our online portal</p>
            </div>

            <div className="p-4 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
                <span className="text-xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Pack Item</h3>
              <p className="text-gray-600">Include all original packaging and tags</p>
            </div>

            <div className="p-4 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
                <span className="text-xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Ship Back</h3>
              <p className="text-gray-600">Use provided shipping label</p>
            </div>

            <div className="p-4 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
                <span className="text-xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Receive Refund</h3>
              <p className="text-gray-600">Get refund within 3-5 business days</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <h2 className="mb-8 text-3xl font-bold text-center">Common Questions</h2>
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-2 text-lg font-semibold">What items are final sale?</h3>
              <p className="text-gray-600">Underwear, swimwear, and personalized items are final sale. Please see full list in our return policy.</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-2 text-lg font-semibold">How long does an exchange take?</h3>
              <p className="text-gray-600">Exchanges typically take 7-10 business days from when we receive your return.</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-2 text-lg font-semibold">Can I return sale items?</h3>
              <p className="text-gray-600">Yes! Sale items can be returned within 30 days if in original condition.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-white bg-gray-900">
        <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <div className="flex justify-center mb-6">
            <FaShippingFast className="text-4xl text-white" />
          </div>
          <h2 className="mb-4 text-3xl font-bold">Ready to Start Your Return?</h2>
          <p className="mb-8 text-xl text-gray-300">Use our self-service portal to initiate your return or exchange</p>
          <button className="px-8 py-3 font-semibold text-gray-900 transition-colors bg-white rounded-lg hover:bg-gray-100">
            Start Return Process
          </button>
          <p className="mt-4 text-gray-300">Need help? <a href="/contact" className="text-white underline hover:text-gray-200">Contact us</a></p>
        </div>
      </section>

      {/* Policy Details */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto prose">
            <h2 className="mb-4 text-2xl font-bold">Full Return Policy</h2>
            <p className="mb-4 text-gray-600">
              Our policy lasts 30 days from the delivery date. To be eligible for a return,
              your item must be unused and in the same condition that you received it. It must
              also be in the original packaging.
            </p>
            <h3 className="mb-2 text-lg font-semibold">Non-Returnable Items:</h3>
            <ul className="pl-6 mb-4 text-gray-600 list-disc">
              <li>Gift cards</li>
              <li>Downloadable software products</li>
              <li>Personal care items</li>
              <li>Personalized products</li>
            </ul>
            <h3 className="mb-2 text-lg font-semibold">Late or Missing Refunds:</h3>
            <p className="mb-4 text-gray-600">
              If you haven't received a refund yet, first check your bank account again.
              Then contact your credit card company. It may take some time before your
              refund is officially posted.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReturnsExchanges;