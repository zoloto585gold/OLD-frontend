http://joxi.ru/ZrJe4WYHp63bAj

## Комментарии(PIMPRED-9)

 1. В css/less каскад использовать (!)очень-очень-очень редко и при использовании less-код с каскадом обязательно делать в отдельном файле, этот файл именовать по маске "блок-родитель__дочерний-блок.less"(два нижних подчеркивания в названии файла указывают на то, что в нем используется каскад вида ".блок-родитель  .дочерний-блок { ... }"), например файл "parent-block__child-block.less" должен содержать такой код:
 ```
 .parent-block {


 	.child-block {
 		// свойства, которые нужно переписать
 	}
 }
 ```
 Для (пере)стилизации css идущего с jQuery-плагинами отдельный подход(пункт 2)



 2. При (пере)стилизации сторонних плагинов/блоков(jQuery-плагины) создавать отдельный less-файл, который именуется "контекст-блок__название-плагина.less"
 "контекст-блок"(контейнер) - это БЭМ-блок родителя, внутри которого(с ним и его внутренними блоками и/или элементами) нужно сделать какие-то манипуляции, которые должны применться только в этом "контекст-блоке" и нигде больше
 "название-плагина" - тот как данный плагин/фича/либа официально называется, например "jsScrollPane", "Fotorama", "inputmask", ...
 Рабочий пример, когда для содержимого БЭМ-блока "tags" необходимо добавить стлизацию скролла, используется jQuery-плагин "jsScrollPane", тогда файл в котором будет производиться стлизация(локализация) будет называться так: "tags__jsScrollPane.less" и содержать внутри себя только стили(css-свойства), которые переписывают стандартные стили "jsScrollPane" в контексте(в рамках) БЭМ-блока "tags", например содержимое файла "tags__jsScrollPane.less" может быть таким:
 ```
 .tags {


	.jspDrag {
		background: #e8e8e8;
		border: 1px solid #d1d1d1;
		border-radius:3px;
		border-bottom: none;
		left: 1px;
		width: 9px;
	}


	.jspTrack {
		z-index:1;
		background: #f5f5f5;
	}


	.jspHorizontalBar{
		height: 5px;
	}


	.jspVerticalBar,
	.jspHorizontalBar {
		background: none;
	}
}
 ```
 (!Важно) разделять на два файла стилизацию непосредствено самого блока(по дизайн-макету) и (до)стилизацию, которую нужно сделать непосредственно со стилями внешнего плагина/библиотеки, т.е. чтобы при отключении стилей связанных с плагином данный блок был максимально похож на свое изображение в дизайн-макете(конечно за исключением тех визуальных частей/эффектов для которых и пондабился данный плагин)



 3. В less-файлах использовать теги-селекторы разрешается в reset/normalize-файле и в блоках, где используется динамически создаваемый("копирайтерский") текст, в остальных случаях использовать теги как селекторы не допускается.









## Действия по рефакторингу
### 1. В разметку блока внести изменения(html):
```
<div class="tags  tags--bottom">
	<div class="tags__list  js-scroll-touch">
		<a class="tags__item" href="/catalog/yuvelirnye_izdeliya/kolca/serdechki/">Кольца сердечки </a>
		<a class="tags__item" href="/catalog/yuvelirnye_izdeliya/kolca/s-zhivotnymi/">Кольца с животными / Анималистика</a>
		<a class="tags__item" href="/catalog/yuvelirnye_izdeliya/kolca/malinki/">Кольца малинкиа</a>
		<a class="tags__item" href="/catalog/yuvelirnye_izdeliya/kolca/trend/">Кольца тренд</a>
	</div>
</div>
```



### 2. В файле "development/less/layout/uikit/tags.less" внести изменения:
```
.tags {


	@media @touch {
		white-space: nowrap;
	}

	&__list {
		@media @touch {
			height: 50px;
		}
	}


	&--bottom{
		margin-bottom: 30px;
	}


	&__item {
		position: relative;
		display: inline-block;
		padding: 0 10px;
		margin: 0 5px 10px 0;

		background: #fff;
		border: 1px solid #e8e8e8;
		border-radius: 3px;

		white-space: nowrap;
		line-height: 30px;


		&:hover{
			border: 1px solid #ed3939;
		}
	}
}
```

### 3. Файл "development/less/layout/uikit/scroll-touch.less" переименовать в "development/less/layout/uikit/tags__jsScrollPane.less" с таким содержимым:
```
.tags {


	.js-scroll-pane {
		overflow: auto;
		width: 100%;
	}


	.jspDrag {
		background: #e8e8e8;
		border: 1px solid #d1d1d1;
		border-radius:3px;
		border-bottom: none;
		left: 1px;
		width: 9px;
	}


	.jspTrack {
		z-index:1;
		background: #f5f5f5;
	}


	.jspHorizontalBar{
		height: 5px;
	}


	.jspVerticalBar,
	.jspHorizontalBar {
		background: none;
	}
}
```