
import React, { useMemo } from 'react';

const ContactView: React.FC = () => {
  // Encoded to prevent scraping - decoded client-side
  const email = useMemo(() => {
    const encoded = 'aGVsbG9AYnJhbmRvbndvb2RpbmcuY29t'; // base64
    return atob(encoded);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 animate-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-8">
        <h2 className="text-4xl md:text-6xl technical-mono tracking-tighter lowercase">contact me</h2>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed technical-mono max-w-xl">
          Think i fit the profile for an opportunity? <br />
          Like my sideckick Markus? <br />
          Get in touch through one of the links below!
        </p>

        <div className="pt-8 flex flex-col gap-3">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 technical-mono hover:text-primary transition-colors underline underline-offset-4 decoration-gray-200 dark:decoration-white/10"
          >
            Email →
          </a>
          <a
            href="https://linkedin.com/in/brandonwooding"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 technical-mono hover:text-primary transition-colors underline underline-offset-4 decoration-gray-200 dark:decoration-white/10"
          >
            LinkedIn →
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactView;
