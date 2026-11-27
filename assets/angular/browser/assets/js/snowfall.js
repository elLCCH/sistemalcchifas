(function () {
  var config = window.snowfallConfig;
  if (!config || typeof config.enabled !== 'boolean') {
    console.error('La configuración de la nevada no está disponible o no es válida.');
    return;
  }
  if (!config.enabled) return;
  if (!Array.isArray(config.images) || !config.images.length || config.images.some(function (image) {
    return typeof image !== 'string' || !image.trim();
  })) {
    console.error('La nevada necesita al menos una ruta de imagen válida.');
    return;
  }

  var imageUrls = config.images.map(function (image) {
    return new URL(image, document.currentScript.src).href;
  });
  var failedImages = new Set();
  var maxFlakes = 40;
  var activeFlakes = 0;
  var wrapper = document.createElement('div');
  wrapper.id = 'snowfall-wrapper';
  wrapper.setAttribute('aria-hidden', 'true');
  document.body.appendChild(wrapper);

  function createFlake() {
    if (document.hidden || activeFlakes >= maxFlakes) return;

    var flake = document.createElement('span');
    var image = document.createElement('img');
    var size = 20 + Math.random() * 30;
    var swayDuration = 2500 + Math.random() * 3000;
    flake.className = 'snowfall-flake';
    image.className = 'snowfall-image';
    image.src = imageUrls[Math.floor(Math.random() * imageUrls.length)];
    image.alt = '';
    flake.style.width = size + 'px';
    flake.style.left = Math.random() * 100 + '%';
    flake.style.opacity = 0.5 + Math.random() * 0.5;
    flake.style.animationDuration = (window.innerHeight * 10 + Math.random() * 2000) + 'ms';
    flake.style.setProperty('--snowfall-sway', (15 + Math.random() * 25) + 'px');
    flake.style.setProperty('--snowfall-sway-duration', swayDuration + 'ms');
    flake.style.setProperty('--snowfall-sway-delay', (-Math.random() * swayDuration) + 'ms');
    var glowDuration = 1500 + Math.random() * 2000;
    flake.style.setProperty('--snowfall-glow-duration', glowDuration + 'ms');
    flake.style.setProperty('--snowfall-glow-delay', (-Math.random() * glowDuration) + 'ms');
    activeFlakes++;
    var removed = false;
    function removeFlake() {
      if (removed) return;
      removed = true;
      activeFlakes--;
      flake.remove();
    }
    flake.addEventListener('animationend', function (event) {
      if (event.target === flake && event.animationName === 'snowfall-fall') removeFlake();
    });
    image.addEventListener('error', function () {
      if (!failedImages.has(image.src)) {
        console.error('No se pudo cargar la imagen de la nevada:', image.src);
        failedImages.add(image.src);
      }
      removeFlake();
    }, { once: true });
    flake.appendChild(image);
    wrapper.appendChild(flake);
  }

  function scheduleFlake() {
    createFlake();
    setTimeout(scheduleFlake, 350 + Math.random() * 400);
  }

  scheduleFlake();
})();
