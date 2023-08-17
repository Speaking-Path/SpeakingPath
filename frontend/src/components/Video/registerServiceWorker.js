// 현재 호스트가 localhost인지 여부를 확인하는 변수
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

// 서비스워커 등록하는 역할
export default function register() {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    // process.env.PUBLIC_URL 기준으로 현재 페이지의 url과 비교하기 위해 사용
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
    if (publicUrl.origin !== window.location.origin) {
      // 서비스 워커를 등록하는데 사용하는 url이 현재 페이지의 url과 다른 경우
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
      return;
    }

    // 페이지가 로드되었을 때 실행되는 이벤트 리스너
    window.addEventListener('load', () => {
      // 서비스 워커 파일의 url
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // localhost인 경우, 서비스 워커가 여전히 존재하는지 확인하고 없을 경우 페이지를 다시 로드
        // This is running on localhost. Lets check if a service worker still exists or not.
        checkValidServiceWorker(swUrl);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        // 서비스 워커와 PWA 문서에 대한 정보를 출력
        navigator.serviceWorker.ready.then(() => {
          // console.log(
          //   'This web app is being served cache-first by a service ' +
          //     'worker. To learn more, visit https://goo.gl/SC7cgQ'
          // );
        });
      } else {
        // Is not local host. Just register service worker
        // 서비스 워커를 등록
        registerValidSW(swUrl);
      }
    });
  }
}

// 실제로 서비스워커를 등록하는 역할
function registerValidSW(swUrl) {
  navigator.serviceWorker
    // swUrl을 기준으로 서비스 워커를 등록
    .register(swUrl)
    // 성공하면
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the old content will have been purged and
              // the fresh content will have been added to the cache.
              // It's the perfect time to display a "New content is
              // available; please refresh." message in your web app.
              // console.log('New content is available; please refresh.');
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              // console.log('Content is cached for offline use.');
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

// 서비스 워커가 유효한지 확인하고, 없을 경우 페이지를 다시 로드
function checkValidServiceWorker(swUrl) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      if (
        response.status === 404 ||
        response.headers.get('content-type').indexOf('javascript') === -1
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}
// 서비스 워커 해제
export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
