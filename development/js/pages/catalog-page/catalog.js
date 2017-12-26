$(document).ready(function(){

  // Асинхронная загрузка изображений каталога

  function imgLoad() {
    var asyncimg = document.getElementsByClassName('img-async');
            
    for (var i=0; i < asyncimg.length; i++) {
      asyncimg[i].src = asyncimg[i].getAttribute('data-src');
            
      // remove the attribute
      asyncimg[i].removeAttribute('data-src');
    }
  }

  imgLoad();

  $('.catalog-item-ecommerce').mouseenter(function(){
    var self = $(this);
    var imgCount = self.find('.catalog-hoverBlock__galleryList li').length;
    var widthBlock = 100/imgCount;
    if(self.find('.catalog-hoverBlock__galleryHoverList div').length === 0 && imgCount > 1){
      self.find('.catalog-hoverBlock__galleryScroll').addClass('is-active');
      self.find('.catalog-hoverBlock__galleryScroll div').css({'width': widthBlock+'%'});
      for(var i = 0; i < imgCount; i++){
        var D = $('<div>')
          .css({'width': widthBlock+'%', 'left': (i*widthBlock)+'%'})
          .mouseenter(function(){
            var index = $(this).index() + 1;
            self.find('.catalog-hoverBlock__galleryList li').removeClass('is-active');
  				  self.find('.catalog-hoverBlock__galleryList li:nth-of-type('+index+')').addClass('is-active');
            self.find('.catalog-hoverBlock__galleryScroll div').css({'left': widthBlock+'%', 'left': ((index-1)*widthBlock)+'%'});
  				})
          .mouseleave(function() {

          });
        self.find('.catalog-hoverBlock__galleryHoverList').append(D);
      }
    }
  });
});
