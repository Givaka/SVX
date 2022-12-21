document.addEventListener('DOMContentLoaded', () => {

  const mask = (dataValue, options) => { // создаем универсальную функцию
    const elements = document.querySelectorAll(`[data-mask="${dataValue}"]`) // ищем поля ввода по селектору с переданным значением data-атрибута
    if (!elements) return // если таких полей ввода нет, прерываем функцию

    elements.forEach(el => { // для каждого из полей ввода
      IMask(el, options) // инициализируем плагин imask для необходимых полей ввода с переданными параметрами маски
    })
  }

  // Используем наше функцию mask для разных типов масок

  // Маска для номера телефона
  mask('phone', {
    mask: '+{7} (000) 000-00-00',
    lazy: false
  })

  // Маска гос. номера
  mask('car-number',{
    mask: 's 000 ss 00[0]',
    blocks: {
      s:{
        mask: IMask.MaskedEnum,
        // Маска включает в себя как написание на кириллице так и на латинеце 
        enum: ['А', 'В', 'Е', 'К', 'М', 'Н', 'О', 'Р', 'С', 'Т', 'У', 'Х',
                'A', 'B', 'E', 'K', 'M', 'H', 'O', 'P', 'C', 'T', 'Y', 'X']
      }
    }
  })
})
