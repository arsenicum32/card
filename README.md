Текущий адрес API: http://filenox.ru

Для того чтобы счетчик считал посещения и среднее время на сайте необходимо
поставить скрипт в body :

```html
<script>

var stime = 0;

window.onload = function(){
  $.get('http://ms.filenox.ru/open/' + USER_ID )
  setInterval( function(){ stime++ } , 1000 )
}
window.onbeforeunload = function(){
  $.get('http://ms.filenox.ru/leave/' + USER_ID + '?stime=' + stime )
}
</script>

```

Где USER_ID - уникальный id пользователя

Для того, чтобы считать колличество сформированных отчетов и загрузок необходимо
установить следующие запросы в handle кнопок:

```js
$(BUTTON_ID_FORM).on('click', function(){
  // что-то делаем с отчетом
  // затем отправляем данные
  $.get('http://ms.filenox.ru/form/' + USER_ID)
})

$(BUTTON_ID_LOAD).on('click', function(){
  // что-то делаем с отчетом
  // затем отправляем данные
  $.get('http://ms.filenox.ru/load/' + USER_ID)
})
```

где BUTTON_ID_FORM и BUTTON_ID_LOAD соответствующие кнопки для формирования и загрузки отчета

Все запросы на червер делаются через GET!
