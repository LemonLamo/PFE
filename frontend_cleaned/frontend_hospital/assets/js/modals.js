(function () {
    var modalButtons = document.querySelectorAll('[data-toggle="modal"]');
    modalButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var dest = button.attributes.getNamedItem('data-target').value;
            var modal = document.querySelector(dest);
            if (modal.classList.contains('hidden'))
                modal.classList.remove('hidden');
            else{
                modal.classList.add('hidden');
            }
        });
    });

    var closeButtons = document.querySelectorAll('[data-dismiss="modal"]');
    closeButtons.forEach(function (button) {
        console.log(button)
        button.addEventListener('click', function () {
            var dest = button.attributes.getNamedItem('data-target').value;
            var modal = document.querySelector(dest);
            modal.classList.add('hidden');
        });
    });
});