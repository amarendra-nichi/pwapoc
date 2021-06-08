importScripts("/pwapoc/precache-manifest.613c18b1c73c367e3dd6724ee49af7db.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/* eslint-disable no-undef */
//The new installed service worker replaces the old service worker immediately
self.skipWaiting();
// self.clientsClaim();

//Test workbox
// eslint-disable-next-line no-undef
if (workbox) {
    console.log('Workbox is loaded');
} else {
    console.log('Workbox did not loaded');
}

workbox.core.setCacheNameDetails({ prefix: "pwa-project" });
// These lines are responsible for precaching static resources. Using 'generateSW'(zero config), these lines would be added automatically to the serviceworker. 
// __precacheManifest is the list of resources you want to precache. It will be generated and imported automatically by workbox during build time 
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});



const bgSyncPlugin = new workbox.backgroundSync.Plugin('dashboardr-queue');

const networkOnlyStrategy = new workbox.strategies.NetworkOnly({
  plugins: [bgSyncPlugin],
});
const networkFirstStrategy = new workbox.strategies.NetworkFirst({
  plugins: [bgSyncPlugin],
});
workbox.routing.registerRoute(
  /https:\/\/ap\.kanbei\.co\.jp\/api\/login/,
  args => {
    console.log('API hit');
    return networkOnlyStrategy.handle(args);
  },
  'POST'
);

// Here is where we apply our customization for the api
// all the api request wich starts with this pattern(first parameter) will use CacheFirst strategy for caching
// workbox.routing.registerRoute(
// /https:\/\/get\.geojs\.io\/v1\/ip\/country\.json/,
// new  workbox.strategies.CacheFirst()
// );
workbox.routing.registerRoute(
    /https:\/\/mng\.kanbei\.develop\.groony\.jp\/api\/master\/readall\/m_client_company_size_info/,
    new  workbox.strategies.CacheFirst()
    );

workbox.routing.registerRoute(
    /https:\/\/ap\.kanbei\.co\.jp\/api\/master\/readdata\/m_client_company_size_info/,
    args => {
      console.log('API hit2');
      return networkFirstStrategy.handle(args);
    },
    'POST'
    );   
    workbox.routing.registerRoute(
      /https:\/\/mng\.\kanbei\.develop\.groony\.jp\/api\/master\/update\/m_client_base_info/,
      args => {
        console.log('API hit3', args);
        return networkFirstStrategy.handle(args);
      },
      'POST'
      );     


