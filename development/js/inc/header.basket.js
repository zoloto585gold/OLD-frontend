$('.top-basket__remove').on('click', function (e) {
	e.preventDefault();
	$(this).parent().remove();
});
