Инструмент для проверки консистентности переводов (RU / ES / TR / EN)

Этот файл содержит:

инструкции по использованию

полный код проверки

вывод пропущенных ключей

вывод лишних ключей

вывод RU‑значений для перевода

безопасную обработку отсутствующего EN

Используется в консоли браузера (Chrome / Edge / Firefox).

🧩 1. Подготовка
Перед запуском проверки вставьте в консоль весь объект переводов:

js
const translations = {
  ru: { /* ... */ },
  es: { /* ... */ },
  tr: { /* ... */ },
  en: { /* ... */ } // если английский отсутствует — можно оставить пустым {}
};
⚠ Если вставить только часть — появится ошибка translations is not defined.

🧩 2. Проверка количества ключей
Этот блок покажет, сколько ключей в каждом языке:

js
const ruKeys = Object.keys(translations.ru);
const esKeys = Object.keys(translations.es);
const trKeys = Object.keys(translations.tr);
const enKeys = Object.keys(translations.en || {}); // безопасно, если EN нет

console.log("RU keys:", ruKeys.length);
console.log("ES keys:", esKeys.length);
console.log("TR keys:", trKeys.length);
console.log("EN keys:", enKeys.length);
🧩 3. Поиск пропущенных ключей (в ES / TR / EN)
js
const missingInEs = ruKeys.filter(k => !esKeys.includes(k));
const missingInTr = ruKeys.filter(k => !trKeys.includes(k));
const missingInEn = ruKeys.filter(k => !enKeys.includes(k));

console.log("❌ Отсутствуют в ES:", missingInEs);
console.log("❌ Отсутствуют в TR:", missingInTr);
console.log("❌ Отсутствуют в EN:", missingInEn);
🧩 4. Поиск лишних ключей (которые есть в ES/TR/EN, но нет в RU)
js
const extraInEs = esKeys.filter(k => !ruKeys.includes(k));
const extraInTr = trKeys.filter(k => !ruKeys.includes(k));
const extraInEn = enKeys.filter(k => !ruKeys.includes(k));

console.log("⚠️ Лишние в ES:", extraInEs);
console.log("⚠️ Лишние в TR:", extraInTr);
console.log("⚠️ Лишние в EN:", extraInEn);
🧩 5. Вывод RU‑значений пропущенных ключей (для перевода)
Этот блок покажет что именно нужно перевести:

js
console.log("=== RU → ES: пропущенные строки ===");
missingInEs.forEach(k => console.log(`${k}:`, translations.ru[k]));

console.log("=== RU → TR: пропущенные строки ===");
missingInTr.forEach(k => console.log(`${k}:`, translations.ru[k]));

console.log("=== RU → EN: пропущенные строки ===");
missingInEn.forEach(k => console.log(`${k}:`, translations.ru[k]));
🧩 6. Полная проверка одним блоком (готово к копированию)
js
// === 1. Собираем ключи ===
const ruKeys = Object.keys(translations.ru);
const esKeys = Object.keys(translations.es);
const trKeys = Object.keys(translations.tr);
const enKeys = Object.keys(translations.en || {});

// === 2. Количество ключей ===
console.log("RU keys:", ruKeys.length);
console.log("ES keys:", esKeys.length);
console.log("TR keys:", trKeys.length);
console.log("EN keys:", enKeys.length);

// === 3. Пропущенные ключи ===
const missingInEs = ruKeys.filter(k => !esKeys.includes(k));
const missingInTr = ruKeys.filter(k => !trKeys.includes(k));
const missingInEn = ruKeys.filter(k => !enKeys.includes(k));

console.log("❌ Отсутствуют в ES:", missingInEs);
console.log("❌ Отсутствуют в TR:", missingInTr);
console.log("❌ Отсутствуют в EN:", missingInEn);

// === 4. Лишние ключи ===
const extraInEs = esKeys.filter(k => !ruKeys.includes(k));
const extraInTr = trKeys.filter(k => !ruKeys.includes(k));
const extraInEn = enKeys.filter(k => !ruKeys.includes(k));

console.log("⚠️ Лишние в ES:", extraInEs);
console.log("⚠️ Лишние в TR:", extraInTr);
console.log("⚠️ Лишние в EN:", extraInEn);

// === 5. RU → значения пропущенных ключей ===
console.log("=== RU → ES: пропущенные строки ===");
missingInEs.forEach(k => console.log(`${k}:`, translations.ru[k]));

console.log("=== RU → TR: пропущенные строки ===");
missingInTr.forEach(k => console.log(`${k}:`, translations.ru[k]));

console.log("=== RU → EN: пропущенные строки ===");
missingInEn.forEach(k => console.log(`${k}:`, translations.ru[k]));
🧩 7. Как пользоваться
Открой браузер → F12 → Console

Вставь объект:

js
const translations = { ru: {...}, es: {...}, tr: {...}, en: {...} };
Вставь полный блок проверки

Смотри:

количество ключей

пропущенные ключи

лишние ключи

RU‑значения для перевода

Переводи только то, что выводится в секциях:

Kod
=== RU → ES: пропущенные строки ===
=== RU → TR: пропущенные строки ===
=== RU → EN: пропущенные строки ===
