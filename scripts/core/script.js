// Onload
document.addEventListener("DOMContentLoaded", function() {

	var elements = document.querySelectorAll('.logoAction');
	elements.forEach(function(element) {
		element.onclick = function() {
			document.location = '/';
		};
	});
	
	//checkLogin()
  
  // Ленивая загрузка для <img> с использованием IntersectionObserver
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }

  // Ленивая загрузка на основе размера элемента
  var lazyImagesBasedOnElementSize = document.querySelectorAll('.lazy-js');

  lazyImagesBasedOnElementSize.forEach(function(img) {
    var src = img.getAttribute('data-src');
    var newSrc;

    // Используйте getBoundingClientRect для определения размера элемента
    var elementWidth = img.getBoundingClientRect().width;

    // Определите условия для выбора разрешения изображения на основе ширины элемента
    if (elementWidth < 240) {
      newSrc = src.replace('imgs/', 'imgs/low/');
    } else if (elementWidth < 512) {
      newSrc = src.replace('imgs/', 'imgs/medium/');
    } else {
      newSrc = src.replace('imgs/', 'imgs/high/');
    }

    img.style.backgroundImage = 'url(' + newSrc + ')';
  });
});


// Анимации

function startShakeAnimation() {
  const elements = document.querySelectorAll('.shake');

  elements.forEach(element => {
    element.classList.add('shake-animation');
  });

  // Устанавливаем таймер на 3 секунды для остановки анимации
  setTimeout(() => {
    elements.forEach(element => {
      element.classList.remove('shake-animation');
    });
  }, 500);
}

// Служебные

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=0'
}

function findParam(key) {
    var finded = document.cookie.split('; ').find(cookie => cookie.trim().startsWith(key+'='));
	if (finded!=undefined) {
		return finded.split('=')[1].replaceAll('"','')
	}
}

function exit () {
	eraseCookie("token")
	document.location='/'
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}