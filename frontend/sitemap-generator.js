// sitemap-generator.js
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

const links = [
  { url: '/', changefreq: 'daily', priority: 0.9 },
  { url: '/about', changefreq: 'weekly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  // Add other routes here
];

const sitemap = new SitemapStream({ hostname: 'https://mombasacar.co.ke' });
const writeStream = createWriteStream(path.join(__dirname, 'public', 'sitemap.xml'));

sitemap.pipe(writeStream);
links.forEach(link => sitemap.write(link));
sitemap.end();

streamToPromise(sitemap).then(() => {
  console.log('Sitemap created successfully!');
}).catch((err) => {
  console.error('Failed to create sitemap:', err);
});
