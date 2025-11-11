// // src/components/Footer.jsx
// import React from 'react';

// export default function Footer({
//   siteName = 'CleanCity',
//   description,
//   links = [],
// }) {
//   const year = new Date().getFullYear();

//   return (
//     <footer className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
//       <div className="max-w-7xl mx-auto px-6 md:px-8 py-10 md:py-16">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* Logo & Description */}
//           <div className="space-y-4">
//             <a href="/" className="flex items-center gap-3">
//               <svg
//                 className="w-10 h-10 rounded-full p-1 bg-green-600 text-white flex-shrink-0"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 aria-hidden="true"
//               >
//                 <path
//                   d="M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
//                   fill="currentColor"
//                 />
//                 <path
//                   d="M7.5 12.5L10 15l6-8.5"
//                   stroke="white"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//               <span className="text-xl font-semibold tracking-tight">
//                 {siteName}
//               </span>
//             </a>
//             <p className="text-sm leading-relaxed">
//               {description ??
//                 'A smart, community-driven cleanliness and issue reporting platform where users can report local problems, contribute to cleanup efforts, and help build a cleaner environment together.'}
//             </p>

//             {/* Social Icons */}
//             <div className="flex items-center gap-3">
//               <a
//                 href="#"
//                 aria-label="X (formerly Twitter)"
//                 className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition"
//               >
//                 <svg
//                   className="w-5 h-5"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M3 3h4l4 6 4-6h4l-6 8 6 10h-4l-4-6-4 6H3l6-9z" />
//                 </svg>
//               </a>
//               <a
//                 href="#"
//                 aria-label="Facebook"
//                 className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition"
//               >
//                 <svg
//                   className="w-5 h-5"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M22 12a10 10 0 10-11.5 9.9v-7H8.9v-3h1.6V9.4c0-1.6 1-2.6 2.5-2.6.7 0 1.3.1 1.8.2v2h-1c-.8 0-1 .5-1 1.1V12h2.1l-.3 3h-1.8v7A10 10 0 0022 12z" />
//                 </svg>
//               </a>
//               <a
//                 href="#"
//                 aria-label="Instagram"
//                 className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition"
//               >
//                 <svg
//                   className="w-5 h-5"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.8A4.2 4.2 0 1016.2 13 4.2 4.2 0 0012 8.8zM18.5 7a1 1 0 11-1 1 1 1 0 011-1z" />
//                 </svg>
//               </a>
//             </div>
//           </div>

//           {/* Useful Links */}
//           <div>
//             <h3 className="text-sm font-semibold mb-4">Useful Links</h3>
//             <ul className="space-y-2 text-sm">
//               {(links.length
//                 ? links
//                 : [
//                     { text: 'Home', href: '/' },
//                     { text: 'All Issues', href: '/allissues' },
//                     { text: 'Add Issue', href: '/addissues' },
//                     { text: 'My Issues', href: '/myissues' },
//                     { text: 'My Contributions', href: '/contribution' },
//                   ]
//               ).map((l, idx) => (
//                 <li key={idx}>
//                   <a
//                     href={l.href}
//                     className="hover:underline hover:text-green-600 dark:hover:text-green-400"
//                   >
//                     {l.text}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-sm font-semibold mb-4">Contact</h3>
//             <address className="not-italic text-sm space-y-2">
//               <div>Community Cleanliness Portal</div>
//               <div>Jessore Sadar, Bangladesh</div>
//               <div>
//                 Phone:{' '}
//                 <a href="tel:01818777856" className="hover:underline">
//                   01818-777856
//                 </a>
//               </div>
//               <div>
//                 Email:{' '}
//                 <a
//                   href="mailto:hakimcolor777@gmail.com"
//                   className="hover:underline"
//                 >
//                   hakimcolor777@gmail.com
//                 </a>
//               </div>
//             </address>
//           </div>

//           {/* Community Stats / CTA */}
//           <div>
//             <h3 className="text-sm font-semibold mb-4">Community</h3>
//             <div className="grid grid-cols-3 gap-3 text-center">
//               <div className="p-3 bg-white/60 dark:bg-white/5 rounded-lg">
//                 <div className="text-lg font-bold">1.2k</div>
//                 <div className="text-xs">Registered</div>
//               </div>
//               <div className="p-3 bg-white/60 dark:bg-white/5 rounded-lg">
//                 <div className="text-lg font-bold">320</div>
//                 <div className="text-xs">Resolved</div>
//               </div>
//               <div className="p-3 bg-white/60 dark:bg-white/5 rounded-lg">
//                 <div className="text-lg font-bold">56</div>
//                 <div className="text-xs">Ongoing</div>
//               </div>
//             </div>

//             <div className="mt-4">
//               <a
//                 href="/volunteer"
//                 className="inline-block mt-3 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-500 transition"
//               >
//                 Join Clean Drive
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Footer Bottom */}
//         <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-6">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//             <p className="text-sm">
//               © {year} {siteName}. All rights reserved.
//             </p>

//             <div className="flex items-center gap-4 text-sm">
//               <a href="/terms" className="hover:underline">
//                 Terms
//               </a>
//               <a href="/privacy" className="hover:underline">
//                 Privacy
//               </a>
//               <a href="/contact" className="hover:underline">
//                 Contact
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

import React from 'react';
import { Link } from 'react-router-dom'; // ✅ যোগ করো

export default function Footer({
  siteName = 'CleanCity',
  description,
  links = [],
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 mt-96 text-gray-800 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            {/* ✅ এখানে <a> এর জায়গায় <Link> */}
            <Link to="/" className="flex items-center gap-3">
              <svg
                className="w-10 h-10 rounded-full p-1 bg-green-600 text-white flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                  fill="currentColor"
                />
                <path
                  d="M7.5 12.5L10 15l6-8.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xl font-semibold tracking-tight">
                {siteName}
              </span>
            </Link>

            <p className="text-sm leading-relaxed">
              {description ??
                'A smart, community-driven cleanliness and issue reporting platform...'}
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              {(links.length
                ? links
                : [
                    { text: 'Home', href: '/' },
                    { text: 'All Issues', href: '/allissues' },
                    { text: 'Add Issue', href: '/addissues' },
                    { text: 'My Issues', href: '/myissues' },
                    { text: 'My Contributions', href: '/contribution' },
                  ]
              ).map((l, idx) => (
                <li key={idx}>
                  {/* ✅ এখানে <a> এর বদলে <Link> */}
                  <Link
                    to={l.href}
                    className="hover:underline hover:text-green-600 dark:hover:text-green-400"
                  >
                    {l.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Bottom */}
          <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm">
                © {year} {siteName}. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <Link to="/terms" className="hover:underline">
                  Terms
                </Link>
                <Link to="/privacy" className="hover:underline">
                  Privacy
                </Link>
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
