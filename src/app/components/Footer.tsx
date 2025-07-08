import React from 'react';

const Footer = () => (
  <footer className="mt-16 py-8 text-center text-gray-500 dark:text-gray-400 border-t border-white/20 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-4">
      <p className="mb-2">&copy; {new Date().getFullYear()} AI NFT Generator. All rights reserved.</p>
      <p className="text-sm">Made with <span className="text-pink-500">&#10084;&#65039;</span> by AmirHossein Qafari</p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-2 text-sm">
        <a href="https://github.com/qafariamirhossein" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
          <svg width="16" height="16" fill="currentColor" className="inline" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/amirhossein-qafari/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
          <svg width="16" height="16" fill="currentColor" className="inline" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.521-1.248-1.342-1.248-.822 0-1.358.54-1.358 1.248 0 .694.52 1.248 1.327 1.248h.015zm4.908 8.212h2.4V9.359c0-.215.016-.43.08-.584.176-.43.576-.877 1.248-.877.88 0 1.232.662 1.232 1.634v4.862h2.4V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.015a5.6 5.6 0 0 1 .015-.025V6.169h-2.4c.03.7 0 7.225 0 7.225z"/></svg>
          LinkedIn
        </a>
        <a href="https://t.me/amirDev82" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
          <svg width="16" height="16" fill="currentColor" className="inline" viewBox="0 0 16 16"><path d="M16 3.038c0-.53-.42-.96-.94-.96H.94C.42 2.078 0 2.508 0 3.038v9.924c0 .53.42.96.94.96h14.12c.52 0 .94-.43.94-.96V3.038zM6.5 11.5l-3-3 1.06-1.06L6.5 9.38l4.44-4.44L12 6l-5.5 5.5z"/></svg>
          Telegram
        </a>
        <span className="flex items-center gap-1">
          <svg width="16" height="16" fill="currentColor" className="inline" viewBox="0 0 16 16"><path d="M3.654 1.328a.678.678 0 0 1 .58-.326h7.532c.24 0 .464.127.58.326l2.29 3.978c.12.208.12.464 0 .672l-2.29 3.978a.678.678 0 0 1-.58.326H4.234a.678.678 0 0 1-.58-.326L1.364 5.978a.678.678 0 0 1 0-.672l2.29-3.978zM8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/></svg>
          +98 930 064 6780
        </span>
        <span className="flex items-center gap-1">
          <svg width="16" height="16" fill="currentColor" className="inline" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14.5A6.5 6.5 0 1 1 8 1.5a6.5 6.5 0 0 1 0 13z"/><circle cx="8" cy="8" r="2.5"/></svg>
          Iran - Tehran
        </span>
      </div>
    </div>
  </footer>
);

export default Footer; 