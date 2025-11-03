export const metadata = {
  title: "Privacy Policy | BrightSide",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center px-4 py-12 bg-gradient-to-b from-white to-neutral-50">
      <div className="w-full max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-neutral-500">Last Updated: 20th October 2025</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8 space-y-8">
          <div className="prose prose-neutral max-w-none">
            <p className="text-neutral-700 leading-relaxed">
              Juicy Labs Ltd ("Brightside," "we," "us," or "our") operates the Brightside mobile application (the "App"), 
              the website <a href="https://brightside.gg" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://brightside.gg</a>, and related services (collectively, the "Services")
            </p>
            <p className="text-neutral-700 leading-relaxed">
              This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use the Services.
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-900">1. Information We Collect</h2>
            <p className="text-neutral-700 leading-relaxed">
              We collect information you provide directly and information collected automatically:
            </p>
            
            <div className="ml-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">User Provided Data:</h3>
                <p className="text-neutral-700 leading-relaxed">
                  Information you provide when contacting support or communicating with us, such as your name, email 
                  address, and any details shared in your message. We may also collect optional information through survey 
                  responses or feature-feedback forms submitted within the App or website.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Automatically Collected Data:</h3>
                <p className="text-neutral-700 leading-relaxed">
                  We collect certain information automatically when you use the Services, including device identifiers, IP 
                  address, browser or operating system version, performance logs, and aggregated usage analytics (e.g., 
                  feature usage, crash reports, and error diagnostics).
                </p>
                <p className="text-neutral-700 leading-relaxed mt-2">
                  This information helps us monitor functionality, maintain security, and improve the App.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-900">2. How We Use Your Information</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              We use your information to:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="text-neutral-700 leading-relaxed">• Provide, operate, and maintain the Services</li>
              <li className="text-neutral-700 leading-relaxed">• Improve performance, reliability, and user experience</li>
              <li className="text-neutral-700 leading-relaxed">• Communicate with you about updates, features, or support requests</li>
              <li className="text-neutral-700 leading-relaxed">• Monitor and prevent misuse or unauthorised access</li>
              <li className="text-neutral-700 leading-relaxed">• Analyse usage trends to improve overall design and functionality</li>
              <li className="text-neutral-700 leading-relaxed">• Comply with our legal and regulatory obligations under UK law</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed mt-4">
              We do not use your data for automated decision making or marketing without your consent.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-900">3. How We Share Your Information</h2>
            <p className="text-neutral-700 leading-relaxed font-semibold">
              We do not sell or rent your personal data.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              We share information only as necessary with:
            </p>
            <ul className="space-y-3 ml-6">
              <li className="text-neutral-700 leading-relaxed">
                <strong>Service Providers:</strong> third-party hosting, analytics, and communication partners that assist in App 
                operation, bound by contractual confidentiality and data-protection obligations.
              </li>
              <li className="text-neutral-700 leading-relaxed">
                <strong>Analytics and Hosting Partners:</strong> for performance monitoring, data security, and infrastructure reliability.
              </li>
              <li className="text-neutral-700 leading-relaxed">
                <strong>Legal or Regulatory Authorities:</strong> when required by applicable law, court order, or to protect our 
                legal rights and user safety.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-900">4. Cookies & Similar Technologies</h2>
            <p className="text-neutral-700 leading-relaxed">
              We use cookies and local storage to enable essential functionality such as login sessions, language 
              preferences, and crash reporting.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              We may also use analytics tools to understand aggregate usage patterns.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              You can disable cookies or local storage via your device or browser settings; however, doing so may 
              affect certain features of the App.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-900">5. Data Retention</h2>
            <p className="text-neutral-700 leading-relaxed">
              We retain personal data only as long as necessary to fulfil the purposes outlined in this Policy or as 
              required by law.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              Support correspondence and analytics data are typically retained for up to 24 months before being 
              anonymised or deleted.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-900">6. Your Choices and Rights</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              Under UK data-protection law (UK GDPR), you have the right to:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="text-neutral-700 leading-relaxed">• Request access to the personal data we hold about you</li>
              <li className="text-neutral-700 leading-relaxed">• Request correction or deletion of inaccurate or outdated information</li>
              <li className="text-neutral-700 leading-relaxed">• Object to or restrict certain processing activities</li>
              <li className="text-neutral-700 leading-relaxed">• Withdraw consent at any time (where applicable)</li>
            </ul>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
              <p className="text-neutral-700 leading-relaxed">
                To exercise these rights, contact{' '}
                <a href="mailto:admin@brightside.gg" className="text-blue-600 hover:underline font-semibold">
                  admin@brightside.gg
                </a>
              </p>
              <p className="text-neutral-700 leading-relaxed mt-2">
                We will respond in accordance with UK GDPR timelines.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-900">7. Security</h2>
            <p className="text-neutral-700 leading-relaxed">
              We implement technical and organisational safeguards such as encryption in transit, secure hosting, and 
              access-control measures to protect your information.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              However, no system is completely secure, and you are responsible for safeguarding your device and credentials.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-900">8. International Transfers</h2>
            <p className="text-neutral-700 leading-relaxed">
              Your data may be stored or processed on servers located outside the United Kingdom.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              When we transfer data internationally, we apply appropriate safeguards such as Standard Contractual 
              Clauses or equivalent mechanisms recognised under UK data protection law.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-900">9. Children's Privacy</h2>
            <p className="text-neutral-700 leading-relaxed">
              The Services are not intended for individuals under 18 years old.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              We do not knowingly collect personal data from minors.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              If we learn that data has been inadvertently collected from a minor, we will delete it promptly.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-900">10. Changes to This Policy</h2>
            <p className="text-neutral-700 leading-relaxed">
              We may update this Privacy Policy at any time.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              When we do, we will revise the "Last Updated" date at the top of this page.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              Continued use of the Services after any changes constitutes your acceptance of the updated Policy.
            </p>
          </section>

          <section className="bg-neutral-50 rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Contact Us</h2>
            <p className="text-neutral-700 leading-relaxed mb-2">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="text-neutral-700 leading-relaxed">
              <a href="mailto:admin@brightside.gg" className="text-blue-600 hover:underline font-semibold">
                admin@brightside.gg
              </a>
            </p>
            <p className="text-neutral-700 leading-relaxed mt-2">
              Juicy Labs Ltd
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}


