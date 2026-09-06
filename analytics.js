// Vercel Web Analytics initialization for vanilla HTML/JS projects
(function() {
  // Initialize the analytics queue
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  
  // Load the Vercel Analytics script
  var script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  
  // Append to document head
  var firstScript = document.getElementsByTagName('script')[0];
  if (firstScript && firstScript.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  } else {
    document.head.appendChild(script);
  }
})();
