document.getElementById('drop-area').addEventListener('click', function() {
    document.getElementById('fileElem').click();
});

document.getElementById('drop-area').addEventListener('dragover', function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.classList.add('hover');
});

document.getElementById('drop-area').addEventListener('dragleave', function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.classList.remove('hover');
});

document.getElementById('drop-area').addEventListener('drop', function(e) {
    e.preventDefault();
    e.stopPropagation();
    let dt = e.dataTransfer;
    let files = dt.files;
    handleFiles(files);
});

function handleFiles(files) {
    for (let i = 0, len = files.length; i < len; i++) {
        if (validateImage(files[i])) {
            // Процесс загрузки файла
            console.log('File name: ' + files[i].name);
        }
    }
}

function validateImage(image) {
    // Проверка типа файла и размера
    return true;
}