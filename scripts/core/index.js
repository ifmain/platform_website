// Функция для скрытия элементов
function hideElementsByClass(className) {
    // Находим все элементы с указанным классом
    const elements = document.querySelectorAll('.' + className);
    // Устанавливаем свойство hidden для каждого элемента
    elements.forEach(element => {
        element.hidden = true;
    });
}


// Функция для показа элементов (удаления свойства display)
function showElementsByClass(className) {
    const elements = document.querySelectorAll('.' + className);
    elements.forEach(element => {
        element.hidden = false;
    });
}


function hideAll() {
  const elems = document.querySelectorAll('.list-pl-elem');
  elems.forEach(elem => {
    const itemText = elem.innerText.toLowerCase().replaceAll(' ','-');
	hideElementsByClass('content-block-'+itemText)
  })
}

function choseVisible(elem_save) {
  const elems = document.querySelectorAll('.list-pl-elem');
  elems.forEach(elem => {
    const itemText = 'content-block-'+elem.innerText.toLowerCase().replaceAll(' ','-');
	if (elem_save==itemText) {
		showElementsByClass(elem_save)
	} else {
		hideElementsByClass(itemText)
	}
  })
}


function choseTab(elem) {
	e=document.getElementById('label-tab').innerText=elem;
	switch (elem) {
      case 'Assistants': 
		choseVisible('content-block-assistants')
		document.getElementById('create-btn').hidden=false;
		break;
      
	  case 'Text generation':
		choseVisible('content-block-text-generation')
		document.getElementById('create-btn').hidden=true;
		break;
      
	  case 'Embeddings':
		choseVisible('content-block-embeddings')
		document.getElementById('create-btn').hidden=true;
		break;
      
	  case 'Image generation':
		choseVisible('content-block-image-generation')
		document.getElementById('create-btn').hidden=true;
		break;
      
	  case 'Text to speech':
		choseVisible('content-block-text-to-speech')
		document.getElementById('create-btn').hidden=true;
		break;
      
	  case 'Speech to text':
		choseVisible('content-block-image-speech-to-text')
		document.getElementById('create-btn').hidden=true;
		break;
      
	  case 'Moderation':
		choseVisible('content-block-moderation')
		document.getElementById('create-btn').hidden=true;
		break;
	}
}


document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('menu-chose-mode'); // Находим контейнер меню
  menu.addEventListener('click', function(e) { // Добавляем обработчик события клика на весь контейнер
    const target = e.target; // Получаем целевой элемент, на который был совершён клик
    const isListElem = target.classList.contains('list-pl-elem') || target.closest('.list-pl-elem'); // Проверяем, что клик был либо непосредственно на элементе списка, либо на одном из его потомков
	
	
    if (isListElem) {
      const elems = this.querySelectorAll('.list-pl-elem'); // Находим все элементы списка
      elems.forEach(elem => {
        elem.classList.remove('pl-elem-active'); // Удаляем класс активности у всех элементов
      });

      if(target.classList.contains('list-pl-elem')) {
          target.classList.add('pl-elem-active'); // Добавляем класс активности к элементу, на который был совершён клик
	      choseTab(target.innerText)
	  } else {
          // Если клик был совершён не непосредственно на элементе списка, но внутри его, добавляем класс активности его родительскому элементу
          target.closest('.list-pl-elem').classList.add('pl-elem-active');
		  choseTab(target.innerText)
      }
    }
  });
});




document.addEventListener('DOMContentLoaded', function() {
    const selectElements = document.querySelectorAll('select.sp2');

    const adjustSelectWidth = (select) => {
        // Создаём временный элемент для измерения ширины текста
        const tempElement = document.createElement('span');
        tempElement.style.visibility = 'hidden'; // Скрываем элемент
        tempElement.style.position = 'absolute'; // Убираем из потока, чтобы не влиял на другие элементы
        tempElement.style.whiteSpace = 'nowrap'; // Убедимся, что текст не переносится
        document.body.appendChild(tempElement); // Добавляем элемент в DOM

        // Получаем текст выбранного варианта
        const text = select.options[select.selectedIndex].text;
        tempElement.textContent = text;

        // Измеряем ширину и устанавливаем её для select, учитывая padding
        const padding = 40; // Значение padding можно подобрать под ваш дизайн
        select.style.width = `${tempElement.offsetWidth*0.8 + padding}px`;

        // Удаляем временный элемент
        document.body.removeChild(tempElement);
    };

    // Применяем функцию к каждому элементу select при загрузке страницы
    selectElements.forEach(select => {
        adjustSelectWidth(select);
    });

    // Обновляем ширину при изменении выбора
    selectElements.forEach(select => {
        select.addEventListener('change', () => adjustSelectWidth(select));
    });
});
