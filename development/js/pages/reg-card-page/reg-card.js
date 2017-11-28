$(document).ready(function(){
  $('.checkBonusCard__nav button').click(function(){
    var self = $(this);
    $(this).siblings().removeClass('is-active');
    $(this).addClass('is-active');
    if(self.index() === 0){
      $('.checkBonusCard__column[data-type="phone"]').hide();
      $('.checkBonusCard__column[data-type="number"]').show();
    } else {
      $('.checkBonusCard__column[data-type="phone"]').show();
      $('.checkBonusCard__column[data-type="number"]').hide();
    }
  });
});
