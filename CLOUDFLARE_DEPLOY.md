# 🚀 Развертывание на Cloudflare Pages

## 📋 Шаги для деплоя:

### 1. Подготовка репозитория
```bash
# Удалить секреты из Git (если еще не сделали)
git rm --cached config.js
git rm --cached .env
git rm --cached config_new.js

# Добавить продакшен файлы
git add config.prod.js
git add config.cloudflare.js
git add config.js.example
git add .env.example
git add SETUP.md
git add CLOUDFLARE_DEPLOY.md

# Закоммитить
git commit -m "🔒 Add Cloudflare production configs"
git push
```

### 2. Настройка Cloudflare Pages
1. Зайти в Cloudflare Dashboard → Pages
2. Connect to Git → выбрать ваш репозиторий
3. Build settings:
   - Framework preset: None
   - Build command: (пусто)
   - Build output directory: /

### 3. Environment Variables
В Settings → Environment variables добавить:
```
CF_API_KEY = ваш_api_ключ
CF_AUTH_DOMAIN = ваш_домен.firebaseapp.com
CF_PROJECT_ID = ваш_project_id
CF_STORAGE_BUCKET = ваш_bucket
CF_MESSAGING_SENDER_ID = ваш_sender_id
CF_APP_ID = ваш_app_id
ADMIN_UID = ваш_admin_uid
```

### 4. Выбор конфигурации
**Простой вариант (рекомендуется):**
- Раскомментировать `config.prod.js` в index.html
- Закомментировать `config.js`

**Продвинутый вариант:**
- Использовать `config.cloudflare.js`
- Настроить Environment Variables

### 5. Деплой
Нажать "Deploy site" - автоматический деплой!

## 🔒 Результат:
- ✅ Секреты не в Git
- ✅ Сайт работает на вашем домене
- ✅ Безопасность через Environment Variables
