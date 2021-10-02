## This app allows user to multiply JSON file (security device, object) for next importing to CASL Cloud. In other words, it saves user's time

### npm i

### npm i -g pkg

Create .exe file with settings, provided in package.json:

### pkg .

Create .exe file with default settings:

### pkg index.js

Призначення: Для множення даних JSON файлу при імпорті в CASL Cloud. 

Наприклад, при перенесенні бази даних з Дунай-21 на CASL Cloud вам необхідно створити 100 схожих об'єктів Дунай-128.

Для того, щоб не вносити всі дані вручну, можна скористатися даною програмою.

Як користуватися:
  1) В ПЦС CASL Cloud створити та експортувати JSON файл з ОДНІЄЮ сущністю (зв'язка, ппк або об'єкт)
  2) Даний файл скопіювати в папку "json_input" і перейменувавти в "sample.json"
  3) Запустити програму "casl-json-import-multiplier-win.exe", вказати число, на яке помножити даний об'єкт
  4) Новостворений файл "output_x.json" х папки "json_output" імпортувати в CASL Cloud
  5) Буде створено вказана кількість нових об'єктів, які далі необхідно вручну модифікувати (назви шлейфів, об'єктів, приміщень...)
