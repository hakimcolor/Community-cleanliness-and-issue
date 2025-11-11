import React from 'react';

const Terms = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-black dark:text-gray-400">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-green-700 dark:text-green-400 text-center sm:text-left">
        Terms & Conditions
      </h1>

      <p className="mb-6 text-base sm:text-lg leading-relaxed">
        Welcome to <strong>CleanCity</strong>! By accessing or using our website
        and services, you agree to comply with and be bound by the following
        terms and conditions. Please read them carefully before using our
        platform.
      </p>

      {/* Section 1 */}
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">
          1. Acceptance of Terms
        </h2>
        <p className="text-base sm:text-lg leading-relaxed">
          By using <strong>CleanCity</strong>, you confirm that you are at least
          13 years old and that you agree to these Terms & Conditions. If you do
          not agree, please do not use our website or mobile application.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">
          2. User Responsibilities
        </h2>
        <ul className="list-disc list-inside space-y-2 text-base sm:text-lg leading-relaxed">
          <li>You agree to use the platform only for lawful purposes.</li>
          <li>
            You must not post or report false, misleading, or harmful
            information.
          </li>
          <li>
            You are responsible for maintaining the confidentiality of your
            account credentials.
          </li>
          <li>
            Any misuse of the platform may lead to account suspension or
            permanent ban.
          </li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">
          3. Reporting & Content Policy
        </h2>
        <p className="text-base sm:text-lg leading-relaxed">
          When submitting issues or reports, ensure the information is accurate,
          respectful, and does not violate anyone’s rights. Offensive or
          fraudulent submissions will be removed immediately.
        </p>
      </section>

      {/* Section 4 */}
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">
          4. Privacy & Data Usage
        </h2>
        <p className="text-base sm:text-lg leading-relaxed">
          Your privacy is very important to us. We collect only necessary
          information to improve our services. For more details, please review
          our{' '}
          <a href="/privacy" className="text-green-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">
          5. Limitation of Liability
        </h2>
        <p className="text-base sm:text-lg leading-relaxed">
          <strong>CleanCity</strong> is not responsible for any damages, data
          loss, or issues arising from the use of our platform. We strive to
          maintain accurate information but do not guarantee error-free content.
        </p>
      </section>

      {/* Section 6 */}
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">
          6. Changes to Terms
        </h2>
        <p className="text-base sm:text-lg leading-relaxed">
          We may update these Terms & Conditions from time to time. Updates will
          take effect immediately upon posting on this page. Please check this
          page regularly for any changes.
        </p>
      </section>

      {/* Section 7 */}
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">
          7. Contact Information
        </h2>
        <p className="text-base sm:text-lg leading-relaxed">
          If you have any questions about these Terms, please contact us at:{' '}
          <a
            href="mailto:hakimcolor777@gmail.com"
            className="text-green-600 hover:underline"
          >
            hakimcolor777@gmail.com
          </a>
        </p>
      </section>

      {/* Footer note */}
      <p className="mt-12 text-sm sm:text-base text-gray-500 dark:text-gray-400 text-center sm:text-left">
        Last updated: November 10, 2025
      </p>
    </div>
  );
};

export default Terms;
