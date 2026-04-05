// language.js - система перевода интерфейса
const translations = {
  ru: {
    // ============ COMMON UI ACTIONS ============
    close_btn: 'Закрыть',
    delete_btn: 'Удалить',
    cancel_btn: 'Отмена',
    save_btn: 'Сохранить',
    
    // ============ BASIC UI ============
    loading: 'ЗАГРУЗКА ЛАБОРАТОРИИ...',
    experimental_zone: 'Экспериментальная зона',
    admin_mode: 'Режим редактирования',
    active: 'Активных',
    new: 'Новых',
    in_work: 'В работе',
    done: 'Готово',
    new_test: 'Новый тест',
    admin: 'Admin',
    login: 'Вход',
    login_btn: 'Войти',
    in_system: 'В системе',
    filters: 'Фильтры',
    all_projects: 'Все проекты',
    unvisited: 'Не посещённые',
    today: 'Сегодня',
    yesterday: 'Вчера',
    active_filter: 'Активные',
    daily_filter: 'Ежедневные',
    favorites: 'Избранное',
    completed: 'Завершённые',
    archive: 'Архив',
    categories: 'Категории',
    all: 'Все',
    all_categories: 'Все категории',
    search_placeholder: 'Поиск проектов...',
    
    // ============ HEADER MENU ============
    menu_activities: 'Активности',
    menu_guides: 'Гайды',
    menu_community: 'Сообщество',
    menu_calendar: 'Календарь',
    menu_exchanges: 'Биржи',
    menu_news: 'Новости',
    menu_tools: 'Инструменты',
    menu_games: 'Игры',
    menu_learning: 'Обучение',
    menu_in_development: 'Раздел находится в разработке',
    menu_coming_soon: 'Скоро появится!',
    
    // ============ HEADER SPECIFIC UI ============
    version_label: 'v2.0',
    default_user_name: 'Researcher',
    admin_badge_label: 'Admin',
    profile_tooltip: 'Профиль',
    crypto_ticker_attribution: 'Coins by Cryptorank',
    
    // ============ ADMIN BUTTONS TOOLTIPS ============
    btn_statistics: 'Статистика',
    btn_upload: 'Загрузить',
    btn_export: 'Экспорт',
    btn_deleted: 'Удалённые',
    btn_edit_mode: 'Режим редактирования',
    btn_show_hidden: 'Показать скрытые',
    btn_export_faucets: 'Экспорт кранов',
    btn_import_faucets: 'Импорт кранов',
    btn_mode: 'Режим',
    btn_import: 'Импорт',
    
    // ============ COMING SOON MODAL ============
    coming_soon_status: 'В разработке',
    coming_soon_title: 'Раздел скоро откроется',
    coming_soon_subtitle: 'Мы уже работаем над этим разделом.<br>Подпишитесь — мы уведомим вас в момент запуска.',
    coming_soon_feature_1: 'Актуальная информация',
    coming_soon_feature_2: 'Интерактивные инструменты',
    coming_soon_feature_3: 'Сообщество и чаты',
    coming_soon_feature_4: 'Ранний доступ',
    coming_soon_notify_btn: 'Уведомить меня о запуске',
    coming_soon_connecting: 'Подключаемся...',
    coming_soon_subscribed: 'Вы подписаны — уведомим при запуске!',
    coming_soon_notification_title: 'AirdropLab',
    coming_soon_notification_body: 'Вы подписаны! Уведомим при запуске раздела ',
    coming_soon_close: 'Закрыть',
    all_projects: 'Все активности',
    airdrops_lotteries: 'Аирдропы и розыгрыши',
    faucets: 'Краны',
    mainnets: 'Мейннеты',
    testnets: 'Тестнеты',
    all_guides: 'Все гайды',
    chat: 'Чат',
    leaderboard: 'Таблица лидеров',
    referrals: 'Рефералы',
    forum: 'Форум',
    all_events: 'Все события',
    deadlines: 'Дедлайны',
    listings: 'Листинги',
    project_events: 'События проектов',
    all_exchanges: 'Все биржи',
    crypto_news: 'Криптовалютные новости',
    analytics_news: 'Новости аналитики',
    ai_news: 'Новости AI',
    bitcoin_news: 'Новости Bitcoin',
    defi_news: 'Новости DeFi',
    gamefi_news: 'Новости GameFi / Metaverse',
    ido_news: 'Новости IDO/ICO/IFO/IEO',
    nft_news: 'Новости NFT',
    gas_calculator: 'Калькулятор газа',
    bridges: 'Бриджи',
    wallet_checker: 'Проверка кошелька',
    what_is_airdrop: 'Что такое аирдроп',
    how_setup_wallet: 'Как настроить кошелёк',
    crypto_security: 'Безопасность в крипте',
    per_page: 'На странице:',
    by_added_date:    '📅 По дате добавления',
    by_activity_date: '🔄 По дате активности',
    date_day:   'День',
    date_month: 'Мес.',
    date_year:  'Год',
    by_priority: '⭐ По приоритету',
    by_name: '🔤 По названию',
    info_click_project: 'Нажмите на название проекта для подробной информации или на "Гайд" для выполнения.',
    guest_warning: 'Вы не вошли в аккаунт. Избранное и выполненные задания сохраняются только в этом браузере.',
    loading_projects: 'Загрузка проектов...',
    nothing_found: 'Ничего не найдено',
    reset_filters: 'Сбросить фильтры',
    active_research: 'Активные исследования',
    go_to_guide: 'Перейти к гайду',
    guide: 'Гайд',
    website: 'Website',
    status_active: 'Active',
    status_soon: 'Soon',
    status_ended: 'Ended',
    daily: 'Daily',
    high_priority: 'High',
    completed_badge: 'Готово',
    last_click_today: 'сегодня',
    last_click_yesterday: 'вчера',
    about_project: 'О проекте',
    activities: 'Активности',
    activities_not_added: 'Активности не добавлены.',
    added: 'Добавлено:',
    start: 'Начать',
    click: 'Клик',
    end: 'Завершить',
    resume: 'Возобновить',
    new_activity: 'NEW',
    ended_activity: 'Ended',

    // ============ ADMIN / PROJECT FORM ============
    add_project: 'Добавить проект',
    edit_project: 'Редактировать проект',
    project_name: 'Название проекта *',
    project_categories: 'Категории проекта',
    new_category_placeholder: 'Новая категория...',
    logo_url: 'URL Логотипа',
    guide_url: 'Ссылка на гайд',
    cryptorank_url: 'Ссылка на CryptoRank',
    twitter_url: 'Twitter проекта',
    referral_link: 'Реферальная ссылка',
    short_desc: 'Краткое описание',
    status: 'Статус',
    last_updated: 'Дата обновления',
    has_daily_quests: 'Есть ежедневные квесты',
    project_activities: 'Активности проекта',
    add_activity: 'Добавить активность',
    no_activities: 'Активности еще не добавлены.',
    activity_name: 'Название активности *',
    activity_date: 'Дата активности (начало)',
    activity_end_date: 'Дата окончания (автозавершение)',
    detailed_desc: 'Подробное описание',
    instructions_placeholder: 'Инструкция по выполнению...',
    save: 'Сохранить',
    delete: 'Удалить',

    // ============ AUTH ============
    login_title: 'Вход',
    google: 'Google',
    twitter: 'Twitter',
    or_email: 'ИЛИ EMAIL',
    email: 'Email',
    password: 'Пароль',
    register: 'Регистрация',

    // ============ FEEDBACK / MESSAGES ============
    feedback: 'Отзыв',
    my_messages: 'Мои сообщения',
    all_requests: 'Все обращения',
    suggestion: '💡 Предложение',
    bug: '🐛 Ошибка',
    question: '❓ Вопрос',
    other: '💬 Другое',
    message_placeholder: 'Опишите суть обращения...',
    send: 'Отправить',
    close: 'Закрыть',
    no_messages: 'Нет сообщений',
    your_answer: 'Ваш ответ',
    reply_placeholder: 'Напишите ответ...',
    chat_support: 'Чат с поддержкой',
    chat_user: 'Чат с пользователем',
    chat_with_user: 'Чат с пользователем',
    chat_with_support: 'Чат с поддержкой',
    feedbacks_list: 'Отзывы и предложения',
    my_suggestions: 'Мои предложения',
    edit_mode: 'Режим редакт.',
    add_faucet: 'Добавить кран',
    to_top: 'Наверх',
    hide: 'Скрыть',
    loading_chat: 'Загрузка переписки...',
    loading_feedbacks: 'Загрузка отзывов...',
    topic: 'Тема обращения',
    message: 'Сообщение',
    start_new_feedback: 'Начните новое обращение',
    confirm_delete_chat: 'Удалить переписку?',
    delete_feedback: 'Удалить',
    you: 'Вы',
    support: 'Поддержка',
    user: 'Пользователь',
    all_feedbacks: 'Все обращения',

    // ============ NOTIFICATIONS ============
    notifications: 'Уведомления',
    no_notifications: 'Нет уведомлений',
    mark_read: 'Отметить',
    jackpot_win: 'Джекпот',
    wheel_of_fortune: 'Колесо фортуны',
    info: 'Информация',
    success: 'Успех',
    important: 'Важно',
    promo: 'Акция',
    referral_program: 'Реферальная программа',
    system: 'Система',
    notifications_mark_read: 'Прочитать все',
    notifications_clear_all: 'Очистить все',
    loading_notifications: 'Загрузка уведомлений',

    // ============ ADMIN TOOLS ============
    view_stats: 'Посмотреть статистику',
    upload_firebase: 'Загрузить данные в базу',
    export_json: 'Экспортировать все данные',
    view_deleted: 'Просмотреть удаленные',
    deleted_projects: 'Удаленные проекты',
    restore: 'Восстановить',
    delete_permanent: 'Удалить навсегда',

    // ============ TOAST MESSAGES ============
    task_completed: 'Задача завершена!',
    task_uncompleted: 'Отмечено как незавершённое',
    added_favorites: 'Добавлено!',
    removed_favorites: 'Удалено',
    login_required: 'Войдите',
    link_not_found: 'Ссылка не найдена',
    saved: 'Сохранено!',
    deleted: 'Удалено',
    restored: 'Восстановлен!',
    error_occurred: 'Ошибка',
    exported: 'Экспортировано',
    uploaded: 'Загружено',
    enter_message: 'Введите сообщение',
    enter_name: 'Введите название',
    confirm_delete: 'Переместить в архив?',
    confirm_restore: 'Восстановить проект?',
    enter_link: 'Вставьте ссылку',
    no_access: 'Нет доступа',
    only_admin: 'Только для админа',
    copied: 'Скопировано!',

    // ============ HERO ============
    hero_title: 'Лаборатория Крипто-Возможностей',
    hero_subtitle: 'AirdropLab - это ваш центр для исследования, тестирования и участия в самых перспективных аирдропах.',
    start_research: 'Начать исследование',
    collapse_hero: 'Свернуть приветствие',
    expand_hero: 'Развернуть приветствие',

    // ============ COMMON ============
    yes: 'Да',
    no: 'Нет',
    ok: 'ОК',
    back: 'Назад',
    preview: 'Просмотр',
    view: 'Посмотреть',
    edit: 'Редактировать',
    no_description: 'Нет описания',
    leave_feedback: 'Оставить отзыв',
    last_activity_date: 'Дата последней активности',
    mark_complete: 'Завершить',
    add_favorites: 'Избранное',
    deleted_count: 'Удаленных',
    no_deleted_projects: 'Нет удаленных проектов',
    new_category: 'Новая категория...',
    project: 'Проект',
    account_not_specified: 'Не указано',

    // ============ SUPPORT ============
    support_title: 'Служба поддержки',
    my_support_requests: 'Мои обращения',
    all_support_requests: 'Все обращения в поддержку',
    no_support_requests: 'Нет обращений в поддержку',
    start_support_request: 'Опишите вашу проблему — мы ответим в течение 24 часов',
    support_message_placeholder: 'Опишите вашу проблему подробно...',
    cat_technical: 'Техническая проблема',
    cat_account: 'Проблема с аккаунтом',

    // ============ FOOTER — BRAND ============
    footer_tagline: 'Лаборатория крипто-возможностей',
    footer_tagline_desc: 'Исследуем, тестируем и помогаем участвовать в самых перспективных аирдропах и тестнетах.',
    footer_live: 'Live',
    footer_updated: 'Обновлено',

    // ============ FOOTER — QUICK LINKS ============
    footer_quick_links: 'Быстрые ссылки',
    footer_home: 'Главная',
    footer_projects: 'Проекты',
    footer_guides: 'Гайды',
    footer_support: 'Поддержка',

    // ============ FOOTER — ACCOUNT SECTION ============
    footer_account_title: 'Личный кабинет',
    footer_my_account: 'Мой аккаунт',
    footer_faq: 'FAQ',
    footer_language: 'Язык',
    footer_active_users: 'активных',
    footer_projects_count: 'проектов',

    // ============ FOOTER — LEGAL ============
    footer_legal_title: 'Юридическая информация',
    footer_documents: 'Документы',
    footer_terms: 'Условия использования',
    footer_privacy: 'Политика конфиденциальности',
    footer_cookies: 'Политика cookies',
    footer_disclaimer: 'Отказ от ответственности',
    footer_contacts: 'Контакты',
    footer_worldwide: 'Worldwide (Remote)',

    // ============ FOOTER — NEWSLETTER ============
    footer_newsletter_title: 'Подписаться на обновления',
    footer_newsletter_desc: 'Получайте уведомления о новых аирдропах и тестнетах',
    footer_email_placeholder: 'Ваш email',
    footer_subscribe_btn: 'Подписаться',
    footer_privacy_note: 'Мы уважаем вашу конфиденциальность. Отписаться можно в любой момент.',
    footer_already_subscribed: 'Уже подписаны ✓',
    footer_thanks: 'Спасибо! ✓',
    footer_subscribed_toast: 'Подписка оформлена!',
    footer_already_toast: 'Этот email уже подписан!',
    footer_error_toast: 'Ошибка. Попробуйте позже.',
    footer_invalid_email: 'Введите корректный email',
    footer_sending: 'Отправка...',

    // ============ FOOTER — BOTTOM BAR ============
    footer_rights: 'Все права защищены.',
    footer_made_with: 'Сделано с',
    footer_love: 'любовью к крипте',
    footer_back_to_top: 'Наверх',
    footer_mobile_terms: 'Условия',
    footer_mobile_privacy: 'Приватность',

    // ============ FOOTER — NEWSLETTER MODAL ============
    newsletter_success_title: 'Подписка оформлена!',
    newsletter_success_desc: 'Вы будете получать уведомления о новых аирдропах и важных обновлениях.',

    // ============ FOOTER — SUPPORT MODAL ============
    footer_support_title: 'Служба поддержки',
    footer_support_subtitle: 'Мы ответим на ваш вопрос в течение 24 часов',
    footer_support_category: 'Тема обращения *',
    footer_support_select: 'Выберите категорию',
    footer_support_technical: '🔧 Техническая проблема',
    footer_support_account: '👤 Проблема с аккаунтом',
    footer_support_project: '📋 Вопрос о проекте',
    footer_support_suggestion: '💡 Предложение',
    footer_support_partnership: '🤝 Партнёрство',
    footer_support_other: '💬 Другое',
    footer_support_name: 'Ваше имя',
    footer_support_email: 'Email *',
    footer_support_subject: 'Заголовок *',
    footer_support_subject_placeholder: 'Краткое описание проблемы',
    footer_support_message: 'Подробное описание *',
    footer_support_message_placeholder: 'Опишите вашу проблему подробно...',
    footer_support_submit: 'Отправить обращение',
    footer_support_sent: 'Обращение отправлено! Ответим в течение 24 часов.',
    footer_support_login: 'Войдите в аккаунт!',
    footer_support_error: 'Ошибка отправки',
    footer_support_sending: 'Отправка...',

    // ============ FOOTER — FAQ MODAL ============
    footer_faq_title: 'Часто задаваемые вопросы',
    footer_faq_subtitle: 'Ответы на популярные вопросы о AirdropLab',
    footer_faq_not_found: 'Не нашли ответ?',
    footer_faq_contact: 'Свяжитесь с нашей службой поддержки',
    footer_faq_write: 'Написать в поддержку',

    // ============ FAQ — QUESTIONS & ANSWERS ============
    faq_q1: 'Как начать участвовать в аирдропах?',
    faq_a1: 'Зарегистрируйтесь на AirdropLab, выберите интересующий проект из списка и следуйте инструкциям в гайде. Выполняйте задания и следите за обновлениями.',
    faq_q2: 'Что такое тестнет и зачем в нем участвовать?',
    faq_a2: 'Тестнет - это тестовая сеть блокчейна до его запуска в основной сети. Участие в тестнетах позволяет получить токены проекта бесплатно, которые могут стать ценными при запуске mainnet.',
    faq_q3: 'Как не попасть на скам-проект?',
    faq_a3: 'Мы проверяем все проекты перед добавлением, но всегда проводите собственное исследование. Не вводите приватные ключи, не отправляйте ETH на неизвестные адреса и не доверяйте проектам без аудита безопасности.',
    faq_q4: 'Почему проект не отображается в списке?',
    faq_a4: 'Проект может быть в архиве (завершен), находиться на модерации или быть удален. Также убедитесь, что вы используете правильные фильтры в боковой панели.',
    faq_q5: 'Как получить помощь по проекту?',
    faq_a5: 'Используйте раздел "Поддержка" в футере или оставьте отзыв на странице конкретного проекта. Наша команда отвечает в течение 24 часов.',
    faq_q6: 'Можно ли добавить свой проект?',
    faq_a6: 'Да, вы можете предложить проект через форму обратной связи или написав в Telegram. Мы рассмотрим все предложения.',

    // ============ FOOTER — GUIDES MODAL ============
    footer_guides_title: 'Гайды',
    footer_guides_subtitle: 'Пошаговые инструкции по участию в тестнетах',
    footer_guide_active: 'Активен',
    footer_guide_go: 'Перейти к гайду',
    footer_guide_lock: 'Для доступа к гайдам необходимо выполнить задания на главной странице',

    // ============ FOOTER — GUIDES DATA ============
    guide_arc_desc: 'Тестнет от Circle — создателей USDC',
    guide_tempo_desc: 'L2 решение от MetaStreet',
    guide_robinhood_desc: 'Тестнет от Robinhood — известного брокера',
    guide_difficulty_easy: 'Легко',
    guide_difficulty_medium: 'Средне',
    guide_difficulty_hard: 'Сложно',

    // ============ FOOTER — ACCOUNT MODAL ============
    footer_account_manage: 'Управление профилем и настройками',
    footer_account_not_logged: 'Вход не выполнен',
    footer_account_login_desc: 'Войдите в аккаунт для управления профилем',
    footer_account_firstname: 'Имя',
    footer_account_lastname: 'Фамилия',
    footer_account_username: 'Никнейм',
    footer_account_telegram: 'Telegram',
    footer_account_birthdate: 'Дата рождения',
    footer_account_gender: 'Пол',
    footer_account_male: 'Мужской',
    footer_account_female: 'Женский',
    footer_account_other_gender: 'Другое',
    footer_account_country: 'Страна',
    footer_account_bio: 'О себе',
    footer_account_bio_placeholder: 'Расскажите о себе...',
    footer_account_cancel: 'Отмена',
    footer_account_save: 'Сохранить',
    footer_account_saved: 'Профиль сохранён!',
    footer_account_saved_local: 'Профиль сохранён локально',
    footer_account_photo: 'Фото обновлено!',

footer_solana_placeholder: 'Ваш Solana адрес...',
footer_evm_hint: '(Ethereum, BSC, Polygon...)',
footer_evm_label: 'EVM адрес',
footer_solana_label: 'Solana адрес',
    // ============ FOOTER — ACCOUNT EXTRA FIELDS ============
    footer_address: 'адрес',
    footer_solana_placeholder: 'Ваш Solana адрес...',
    footer_crypto_wallets: 'Крипто-адреса',
    footer_social_networks: 'Социальные сети',
    account_select_country: 'Выберите страну или введите...',
    account_country_other_input: 'Введите название страны',
    account_crypto_addresses: 'Крипто-адреса',
    account_evm_address: 'EVM адрес',
    account_evm_hint: '(Ethereum, BSC, Polygon...)',
    account_sol_address: 'Solana адрес',
    account_sol_placeholder: 'Ваш Solana адрес...',
    account_social_networks: 'Социальные сети',
    account_city: 'Город',
    account_city_placeholder: 'Ваш город',

    // ============ FOOTER — LEGAL MODALS ============
    footer_legal_updated: 'Обновлено:',
    footer_legal_close: 'Закрыть',
    legal_terms_title: 'Условия использования',
    legal_privacy_title: 'Политика конфиденциальности',
    legal_cookie_title: 'Политика использования Cookies',
    legal_disclaimer_title: 'Отказ от ответственности',
    legal_updated_date: '07 марта 2026',
    legal_close_btn: 'Закрыть',

    // ============ REFERRAL PROGRAM ============
    account_ref_program: 'Реферальная программа',
    account_your_ref_code: 'Ваш реф. код',
    account_invited_count: 'Приглашено',
    account_people_short: 'чел.',
    account_invited_by: 'Вас пригласил:',
    account_enter_ref_code: 'Ввести реферальный код',
    account_apply: 'Применить',
    account_ref_bonus_text: 'За каждого приглашённого вы получите',
    account_ref_bonus_amount: '+25 Reagents',
    account_generating: 'Генерация...',
    account_invited_label: 'чел.',
    invited_by_label: 'Вас пригласил:',
    ref_code_input_placeholder: 'AL-XXXXXX',
    ref_code_copied: 'Реферальный код скопирован!',
    copy_failed: 'Не удалось скопировать',
    ref_wrong_format: 'Неверный формат кода (AL-XXXXXX)',
    ref_login_required: 'Войдите в аккаунт',
    ref_not_found: 'Код не найден',
    ref_own_code: 'Нельзя использовать свой код',
    ref_applied: '🧪 Код применён! +50 Reagents вам и +25 пригласившему!',
    ref_error: 'Ошибка: ',

    // ============ REAGENTS ============
    reagents_title: 'Reagents',
    reagents_section_title: 'Reagents',
    reagents_rgt_unit: 'RGT',
    account_balance_label: 'Ваш баланс',
    account_streak_label: 'Стрик',
    account_days_short: 'дней',
    account_get_reagents: 'Получить Reagents',

    // ============ CLAIM MODAL ============
    claim_title: 'Ежедневные Reagents',
    claim_updated_utc: 'Обновляется в 00:00 UTC',
    claim_loading: 'Загрузка...',
    claim_error_close: 'Закрыть',
    claim_balance_label: 'Ваш баланс',
    claim_streak_label: 'Стрик',
    claim_streak_broken_title: 'Стрик сброшен!',
    claim_streak_broken_desc: 'Вы пропустили день. Начинаем заново!',
    claim_week_progress: 'Прогресс недели',
    claim_until_bonus: 'До бонуса за {days} дней',
    claim_days_left: '{days} дн.',
    claim_today_reward: 'Сегодня вы получите',
    claim_streak_will_be: 'Стрик станет:',
    claim_get_btn: 'Получить Reagents',
    claim_claiming: 'Получение...',
    claim_already_title: 'Уже получено!',
    claim_next_at: 'Следующий клейм откроется в',
    claim_rewards_table: 'Таблица наград за стрики',
    claim_after_60: 'После 60 дней: каждые 30 дней +100 RGT к бонусу',
    claim_close_btn: 'Закрыть',
    claim_success_title: 'Reagents получены!',
    claim_streak_reset: 'Стрик сброшен — начинаем заново!',
    claim_credited: 'Начислено',
    claim_reagents_unit: 'Reagents',
    claim_next_claim: 'Следующий клейм:',
    claim_great_btn: 'Отлично!',
    claim_time_left: 'Осталось: {h}ч {m}мин',
    claim_reset_in: 'сброс через',
    claim_balance_short: 'Баланс',
    claim_streak_short: 'Стрик',
    claim_to_bonus_short: 'До бонуса',
// ============ REAGENTS — ДОПОЛНИТЕЛЬНЫЕ КЛЮЧИ ============
claim_login_required: 'Войдите в аккаунт',
claim_load_error: 'Не удалось загрузить данные',
claim_firebase_error: 'Firebase не готов',
claim_status_error: 'Не удалось получить статус',
claim_bonus_word: 'бонус',
claim_days_unit: 'дн.',
streak_months_suffix: 'месяцев!',
claim_btn_label: 'Клейм',
claim_btn_tooltip_available: 'Получить ежедневные Reagents',
claim_btn_tooltip_cooldown: 'Следующий клейм в 00:00 UTC',
    // ============ WEEK DAYS ============
    week_mon: 'Пн',
    week_tue: 'Вт',
    week_wed: 'Ср',
    week_thu: 'Чт',
    week_fri: 'Пт',
    week_sat: 'Сб',
    week_sun: 'Вс',

    // ============ STREAK BONUS LABELS ============
    streak_week: '🔥 Неделя!',
    streak_month: '⚡ Месяц!',
    streak_2months: '💎 2 месяца!',
    streak_quarter: '👑 Квартал!',
    streak_4months: '🌟 4 месяца!',
    streak_5months: '🚀 5 месяцев!',
    streak_halfyear: '🏆 Полгода!',

    // ============ SUPPORT FORM (FOOTER) ============
    support_form_title: 'Служба поддержки',
    support_form_subtitle: 'Мы ответим в течение 24 часов',
    support_select_category: 'Выберите категорию',
    support_cat_technical: '🔧 Техническая проблема',
    support_cat_account: '👤 Проблема с аккаунтом',
    support_cat_project: '📋 Вопрос о проекте',
    support_cat_suggestion: '💡 Предложение',
    support_cat_partnership: '🤝 Партнёрство',
    support_cat_other: '💬 Другое',
    support_your_name: 'Ваше имя',
    support_subject_label: 'Заголовок',
    support_subject_placeholder: 'Краткое описание',
    support_desc_label: 'Описание',
    support_desc_placeholder: 'Опишите вашу проблему подробно...',
    support_cancel: 'Отмена',
    support_submit: 'Отправить',
    support_sending_text: 'Отправка...',
    support_sent_ok: 'Обращение отправлено! Ответим в течение 24 часов.',
    support_need_login: 'Войдите в аккаунт для отправки обращения',
    support_select_cat_warn: 'Выберите категорию обращения',
    support_send_error: 'Ошибка отправки. Попробуйте позже.',

    // ============ SUPPORT TICKET ============
    ticket_sending: 'Отправка...',
    ticket_sent: 'Обращение отправлено!',
    ticket_error: 'Ошибка отправки',
    ticket_submit_btn: 'Отправить обращение',

    // ============ NOTIFICATIONS PAGE ============
    notif_title: 'Уведомления',
    notif_clear_all: 'Очистить все',
    notif_empty_title: 'Нет уведомлений',
    notif_empty_desc: 'Уведомления о новых аирдропах появятся здесь',
    notif_mark_read: 'Прочитано',
    time_just_now: 'только что',
    time_min_ago: 'мин назад',
    time_hour_ago: 'ч назад',
    time_day_ago: 'дн назад',

    // ============ AVATAR UPLOAD ============
    avatar_too_large: 'Файл слишком большой (макс 2MB)',
    avatar_uploading: 'Загрузка фото...',
    avatar_local_only: 'Фото (только локально)',

    // ============ TUTORIALS ============
    tutorials_toast: 'Туториалы доступны в разделе проектов',

    // ============ FOOTER TOASTS ============
    footer_scroll_top_toast: 'Наверх',
    footer_language_changed: 'Язык изменён',

    // ============ COUNTRY PICKER ============
    country_manual_input: 'Введите название страны',
    // ============ MLM РЕФЕРАЛЬНАЯ СИСТЕМА ============
ref_already_used: 'Вы уже использовали реферальный код',
passive_income_title: 'Пассивный доход от рефералов',
passive_invited: 'Приглашено',
passive_total_earned: 'Заработано',
passive_pending: 'Ожидает',
passive_next_payout: 'Следующая выплата',
passive_paid_this_week: 'Выплачено на этой неделе',
passive_days_left: 'Через {days} дн. (пн UTC)',
passive_no_pending: 'Нет накопленного дохода',
passive_levels_title: 'Структура процентов',
passive_level: 'Уровень',
passive_payout_schedule: 'Выплата каждый понедельник в 00:00 UTC',
passive_payout_toast: 'Пассивный доход начислен',
passive_credited_to_upstream: 'Начислено вышестоящим по цепочке:',

    // ============ FAUCETS PAGE ============
    faucets_title: 'Краны <span style="color:#22d3ee;">(Faucets)</span>',
    faucets_updated: 'Обновлено',
    faucets_free: 'Бесплатных',
    faucets_paid: 'Платных',
    faucets_testnets: 'Тестнеты',
    faucets_mainnets: 'Мейннеты',
    faucets_filter_free: 'Бесплатные',
    faucets_filter_paid: 'Платные',
    faucets_filter_testnet: 'Тестнеты',
    faucets_filter_mainnet: 'Мейннеты',
    faucets_sort_name: '🔤 По названию',
    faucets_sort_popularity: '🔥 По популярности',
    faucets_sort_rating: '⭐ По рейтингу',
    faucets_sort_new: '🆕 По новизне',
    faucets_search_placeholder: 'Поиск по сети или токену...',
    faucets_suggest_btn: 'Предложить кран',
    faucets_suggest_title: 'Предложить новый кран',
    faucets_suggest_ph_link: 'https://faucet.example.com',
    faucets_suggest_hint: 'Предложения попадают в модерацию. После одобрения кран появится в списке.',
    faucets_login_hint: 'Вход нужен для избранного и рейтингов.',
    faucets_rating_title: 'Рейтинг крана',
    faucets_rating_hint: 'Оценка доступна всем зарегистрированным пользователям. 0 = плохо, 10 = отлично.',
    faucets_tips_title: 'Советы',
    faucets_tip_1: 'Используй отдельный кошелёк для тестнетов — это безопаснее',
    faucets_tip_2: 'Тестнет-токены не имеют реальной ценности, но активность может учитываться для аирдропа',
    faucets_tip_3: 'Некоторые краны требуют минимальный mainnet-баланс для верификации',
    faucets_tip_4_prefix: 'Отмечай прогресс в',
    faucets_tip_4_link: 'AirdropLab трекере',
    faucets_admin_add: 'Добавить кран',
    faucets_admin_edit_mode: 'Режим редакт.',
    faucets_admin_moderation: 'Модерация предложений',
    faucets_admin_pending_title: 'Предложения (pending)',
    faucets_admin_seed: 'Залить базу',
    faucets_admin_hidden: 'Скрытые',
    faucets_admin_show_hidden: 'Показать скрытые',
    filter_hidden: 'Скрытые',
    filter_all: 'Все',
    filter_free: 'Бесплатные',
    filter_paid: 'Платные',
    filter_testnet: 'Тестнеты',
    filter_mainnet: 'Мейннеты',
    filter_favorites: 'Избранное',
    filter_my_suggestions: 'Мои предложения',
    filter_suggestions: 'Предложения',
    faucets_storage_firestore: 'Данные хранятся в Firestore',
    faucets_field_name: 'Название сети *',
    faucets_field_token: 'Токен *',
    faucets_field_desc: 'Описание',
    faucets_field_links: 'Ссылки (по одной в строке) *',
    faucets_field_logo: 'Логотип (URL)',
    faucets_field_type: 'Тип',
    faucets_field_net: 'Сеть',
    faucets_field_reward: 'Награда (необязательно)',
    faucets_field_cooldown: 'Кулдаун',
    faucets_field_tags: 'Теги (через запятую)',
    faucets_ph_name: 'Например: Ethereum Sepolia',
    faucets_ph_token: 'Например: ETH, BTC, SOL',
    faucets_ph_desc: 'Краткое описание крана',
    faucets_ph_links: 'https://faucet.example.com\nhttps://another.example.com',
    faucets_ph_logo: 'https://.../logo.png',
    faucets_ph_reward: '0.5 ETH/день',
    faucets_ph_cooldown: '24ч',
    faucets_ph_tags: 'airdrop, hot, multi',
    faucets_type_free: 'Бесплатный',
    faucets_type_paid: 'Платный',
    faucets_net_testnet: 'Тестнет',
    faucets_net_mainnet: 'Мейннет',

    // ============ DYNAMIC MESSAGES ============
    login_prompt: 'Войдите',
    notify_subscribed_text: 'Вы подписаны — уведомим при запуске!',
    notify_me_on_launch: 'Уведомить меня о запуске',
    connecting_status: 'Подключаемся...',
    notify_subscribed_notification: 'Вы подписаны! Уведомим при запуске раздела 🚀',
    claim_label: 'Клейм',
    claimed_label: 'Готово',
    faucets_exported: 'Экспортировано {count} кранов!',
    faucets_imported_firebase: 'Импортировано {count} кранов в Firebase!',
    faucets_saved_local_firebase_error: 'Сохранено локально {count} кранов. Ошибка Firebase: {error}',
    faucets_imported_local: 'Импортировано {count} кранов локально',
    faucets_imported_localstorage: 'Импортировано {count} кранов в localStorage',
    export_error: 'Ошибка экспорта: {error}',
    import_error: 'Ошибка импорта: {error}',
    no_export_data: 'Нет данных для экспорта',
    no_faucet_export_data: 'Нет данных для экспорта ни в Firebase, ни в localStorage',
    invalid_faucet_format: 'Некорректный формат данных - ожидается массив кранов',
    firebase_unavailable: 'Firebase недоступен',
    firebase_functions_unavailable: 'Firebase функции недоступны',
    guides_export_message: 'Экспорт данных гайдов...',
    guides_import_message: 'Импорт данных гайдов...',
    invalid_json_format: 'Неверный формат JSON. Ожидается массив проектов или объект с полем "projects"',
    no_projects_in_file: 'В файле нет проектов',
    firebase_not_initialized: 'Firebase не инициализирован',
    loading_projects_modal: 'Загрузка {count} проектов...',
    projects_imported_success: '✅ Успешно импортировано {count} проектов!',
    projects_migrated_firebase: 'Мигрировано {count} проектов в Firebase!',
    migrating_projects: 'Миграция {count} проектов...',
    no_migration_data: 'Нет данных для миграции',
    projects_exported: 'Экспортировано {count} проектов',
    
    // ============ CATEGORY LABELS ============
    category_suggestion: '💡 Предложение',
    category_bug: '🐛 Ошибка',
    category_question: '❓ Вопрос',
    category_other: '💬 Другое',
    category_technical: '🔧 Тех. проблема',
    category_technical_full: '🔧 Техническая проблема',
    category_account: '👤 Аккаунт',
    category_account_full: '👤 Проблема с аккаунтом',
    category_partnership: '🤝 Партнёрство',
    
    // ============ TIME FORMATTING ============
    time_just_now: 'только что',
    time_minutes_short: 'мин',
    time_hours_short: 'ч',
    time_days_short: 'дн',
    
    // ============ FEEDBACK MESSAGES ============
    no_messages_yet: 'У вас пока нет сообщений',
    feedback_hint: 'Все ваши отзывы и предложения будут доступны на главной странице',
    user_default_name: 'Пользователь',
    support_label: 'Поддержка',
    user_label: 'Пользователь',
    you_label: 'Вы',
    project_label: 'Проект: ',
    support_label_chat: 'Support',
  },

  tr: {
    // ============ COMMON UI ACTIONS ============
    close_btn: 'Kapat',
    delete_btn: 'Sil',
    cancel_btn: 'İptal',
    save_btn: 'Kaydet',

    // ============ BASIC UI ============
    loading: 'LABORATUVAR YÜKLENİYOR...',
    experimental_zone: 'Deneysel Alan',
    admin_mode: 'Düzenleme Modu',
    active: 'Aktif',
    new: 'Yeni',
    in_work: 'Çalışmada',
    done: 'Tamamlandı',
    new_test: 'Yeni test',
    admin: 'Admin',
    login: 'Giriş',
    login_btn: 'Giriş Yap',
    in_system: 'Sistemde',
    filters: 'Filtreler',
    all_projects: 'Tüm projeler',
    unvisited: 'Ziyaret edilmemiş',
    today: 'Bugün',
    yesterday: 'Dün',
    active_filter: 'Aktif',
    daily_filter: 'Günlük',
    favorites: 'Favoriler',
    completed: 'Tamamlananlar',
    archive: 'Arşiv',
    categories: 'Kategoriler',
    all: 'Tümü',
    all_categories: 'Tüm kategoriler',
    search_placeholder: 'Projelerde ara...',

    // ============ HEADER MENU ============
    menu_activities: 'Aktiviteler',
    menu_guides: 'Rehberler',
    menu_community: 'Topluluk',
    menu_calendar: 'Takvim',
    menu_exchanges: 'Borsalar',
    menu_news: 'Haberler',
    menu_tools: 'Araçlar',
    menu_games: 'Oyunlar',
    menu_learning: 'Öğrenme',
    menu_in_development: 'Bu bölüm geliştiriliyor',
    menu_coming_soon: 'Yakında!',

    // ============ HEADER SPECIFIC UI ============
    version_label: 'v2.0',
    default_user_name: 'Araştırmacı',
    admin_badge_label: 'Admin',
    profile_tooltip: 'Profil',
    crypto_ticker_attribution: 'Veriler: Cryptorank',

    // ============ ADMIN BUTTONS TOOLTIPS ============
    btn_statistics: 'İstatistikler',
    btn_upload: 'Yükle',
    btn_export: 'Dışa aktar',
    btn_deleted: 'Silinenler',
    btn_edit_mode: 'Düzenleme modu',
    btn_show_hidden: 'Gizlenenleri göster',
    btn_export_faucets: 'Faucet dışa aktar',
    btn_import_faucets: 'Faucet içe aktar',
    btn_mode: 'Mod',
    btn_import: 'İçe aktar',

    // ============ COMING SOON MODAL ============
    coming_soon_status: 'Geliştiriliyor',
    coming_soon_title: 'Bölüm yakında açılacak',
    coming_soon_subtitle: 'Bu bölüm üzerinde çalışıyoruz.<br>Yayınlandığında sizi bilgilendireceğiz.',
    coming_soon_feature_1: 'Güncel bilgiler',
    coming_soon_feature_2: 'Etkileşimli araçlar',
    coming_soon_feature_3: 'Topluluk ve sohbetler',
    coming_soon_feature_4: 'Erken erişim',
    coming_soon_notify_btn: 'Beni bilgilendir',
    coming_soon_connecting: 'Bağlanıyor...',
    coming_soon_subscribed: 'Abone oldunuz — yayınlandığında bildireceğiz!',
    coming_soon_notification_title: 'AirdropLab',
    coming_soon_notification_body: 'Abone oldunuz! Bölüm yayınlandığında sizi bilgilendireceğiz: ',
    coming_soon_close: 'Kapat',

    all_projects: 'Tüm aktiviteler',
    airdrops_lotteries: 'Airdroplar ve çekilişler',
    faucets: 'Faucetler',
    mainnets: 'Mainnetler',
    testnets: 'Testnetler',
    all_guides: 'Tüm rehberler',
    chat: 'Sohbet',
    leaderboard: 'Liderlik tablosu',
    referrals: 'Referanslar',
    forum: 'Forum',
    all_events: 'Tüm etkinlikler',
    deadlines: 'Son tarihler',
    listings: 'Listelemeler',
    project_events: 'Proje etkinlikleri',
    all_exchanges: 'Tüm borsalar',
    crypto_news: 'Kripto haberleri',
    analytics_news: 'Analiz haberleri',
    ai_news: 'Yapay zeka haberleri',
    bitcoin_news: 'Bitcoin haberleri',
    defi_news: 'DeFi haberleri',
    gamefi_news: 'GameFi / Metaverse haberleri',
    ido_news: 'IDO/ICO/IFO/IEO haberleri',
    nft_news: 'NFT haberleri',
    gas_calculator: 'Gas hesaplayıcı',
    bridges: 'Köprüler',
    wallet_checker: 'Cüzdan kontrolü',
    what_is_airdrop: 'Airdrop nedir?',
    how_setup_wallet: 'Cüzdan nasıl kurulur?',
    crypto_security: 'Kripto güvenliği',
    per_page: 'Sayfa başına:',
    by_added_date: '📅 Eklenme tarihine göre',
    by_activity_date: '🔄 Aktivite tarihine göre',
    date_day: 'Gün',
    date_month: 'Ay',
    date_year: 'Yıl',
    by_priority: '⭐ Önceliğe göre',
    by_name: '🔤 İsme göre',
    info_click_project: 'Proje adına tıklayarak detayları görebilir veya "Rehber" ile görevi yapabilirsiniz.',
    guest_warning: 'Giriş yapmadınız. Favoriler ve tamamlanan görevler yalnızca bu tarayıcıda saklanır.',
    loading_projects: 'Projeler yükleniyor...',
    nothing_found: 'Hiçbir şey bulunamadı',
    reset_filters: 'Filtreleri sıfırla',
    active_research: 'Aktif araştırmalar',
    go_to_guide: 'Rehbere git',
    guide: 'Rehber',
    website: 'Website',
    status_active: 'Aktif',
    status_soon: 'Yakında',
    status_ended: 'Bitti',
    daily: 'Günlük',
    high_priority: 'Yüksek',
    completed_badge: 'Tamamlandı',
    last_click_today: 'bugün',
    last_click_yesterday: 'dün',
    // ============ ADMIN / PROJECT FORM ============
    add_project: 'Proje Ekle',
    edit_project: 'Projeyi Düzenle',
    project_name: 'Proje Adı *',
    project_categories: 'Proje Kategorileri',
    new_category_placeholder: 'Yeni kategori...',
    logo_url: 'Logo URL’si',
    guide_url: 'Rehber bağlantısı',
    cryptorank_url: 'CryptoRank bağlantısı',
    twitter_url: 'Projenin Twitter’ı',
    referral_link: 'Referans bağlantısı',
    short_desc: 'Kısa açıklama',
    status: 'Durum',
    last_updated: 'Güncellenme tarihi',
    has_daily_quests: 'Günlük görevler var',
    project_activities: 'Proje Aktiviteleri',
    add_activity: 'Aktivite Ekle',
    no_activities: 'Henüz aktivite eklenmedi.',
    activity_name: 'Aktivite Adı *',
    activity_date: 'Aktivite Başlangıç Tarihi',
    activity_end_date: 'Bitiş Tarihi (otomatik kapanış)',
    detailed_desc: 'Detaylı açıklama',
    instructions_placeholder: 'Görev talimatları...',
    save: 'Kaydet',
    delete: 'Sil',

    // ============ AUTH ============
    login_title: 'Giriş Yap',
    google: 'Google',
    twitter: 'Twitter',
    or_email: 'VEYA EMAIL',
    email: 'Email',
    password: 'Şifre',
    register: 'Kayıt Ol',

    // ============ FEEDBACK / MESSAGES ============
    feedback: 'Geri Bildirim',
    my_messages: 'Mesajlarım',
    all_requests: 'Tüm başvurular',
    suggestion: '💡 Öneri',
    bug: '🐛 Hata',
    question: '❓ Soru',
    other: '💬 Diğer',
    message_placeholder: 'Başvurunun içeriğini açıklayın...',
    send: 'Gönder',
    close: 'Kapat',
    no_messages: 'Mesaj yok',
    your_answer: 'Cevabınız',
    reply_placeholder: 'Cevabı yazın...',
    chat_support: 'Destek Sohbeti',
    chat_user: 'Kullanıcı Sohbeti',
    chat_with_user: 'Kullanıcı ile Sohbet Et',
    chat_with_support: 'Destek ile Sohbet Et',
    feedbacks_list: 'Geri Bildirimler ve Öneriler',
    my_suggestions: 'Önerilerim',
    edit_mode: 'Düzenleme Modu',
    add_faucet: 'Faucet Ekle',
    to_top: 'Yukarı',
    hide: 'Gizle',
    loading_chat: 'Sohbet yükleniyor...',
    loading_feedbacks: 'Geri bildirimler yükleniyor...',
    topic: 'Başvuru Konusu',
    message: 'Mesaj',
    start_new_feedback: 'Yeni Başvuru Başlat',
    confirm_delete_chat: 'Sohbet silinsin mi?',
    delete_feedback: 'Sil',
    you: 'Siz',
    support: 'Destek',
    user: 'Kullanıcı',
    all_feedbacks: 'Tüm Başvurular',

    // ============ NOTIFICATIONS ============
    notifications: 'Bildirimler',
    no_notifications: 'Bildirim yok',
    mark_read: 'Okundu olarak işaretle',
    jackpot_win: 'Jackpot Kazanımı',
    wheel_of_fortune: 'Şans Çarkı',
    info: 'Bilgi',
    success: 'Başarılı',
    important: 'Önemli',
    promo: 'Promosyon',
    referral_program: 'Referal Programı',
    system: 'Sistem',
    notifications_mark_read: 'Tümünü oku',
    notifications_clear_all: 'Tümünü temizle',
    loading_notifications: 'Bildirimler yükleniyor',

    // ============ ADMIN TOOLS ============
    view_stats: 'İstatistikleri Görüntüle',
    upload_firebase: 'Veritabanına Veri Yükle',
    export_json: 'Tüm Veriyi Dışa Aktar',
    view_deleted: 'Silinmişleri Görüntüle',
    deleted_projects: 'Silinmiş Projeler',
    restore: 'Geri Yükle',
    delete_permanent: 'Kalıcı Olarak Sil',

    // ============ TOAST MESSAGES ============
    task_completed: 'Görev tamamlandı!',
    task_uncompleted: 'Tamamlanmamış olarak işaretlendi',
    added_favorites: 'Eklendi!',
    removed_favorites: 'Kaldırıldı!',
    login_required: 'Lütfen giriş yapın',
    link_not_found: 'Bağlantı bulunamadı',
    saved: 'Kaydedildi!',
    deleted: 'Silindi!',
    restored: 'Geri yüklendi!',
    error_occurred: 'Hata oluştu',
    exported: 'Dışa aktarıldı!',
    uploaded: 'Yüklendi!',
    enter_message: 'Mesaj girin',
    enter_name: 'İsim girin',
    confirm_delete: 'Arşive taşınsın mı?',
    confirm_restore: 'Proje geri yüklensin mi?',
    enter_link: 'Bağlantı ekleyin',
    no_access: 'Erişim yok',
    only_admin: 'Sadece admin',
    copied: 'Kopyalandı!',
    // ============ HERO ============
    hero_title: 'Kripto Fırsatları Laboratuvarı',
    hero_subtitle: 'AirdropLab — en umut vadeden airdropları araştırmak, test etmek ve katılmak için merkezinizdir.',
    start_research: 'Araştırmaya Başla',
    collapse_hero: 'Karşılama mesajını gizle',
    expand_hero: 'Karşılama mesajını göster',

    // ============ COMMON ============
    yes: 'Evet',
    no: 'Hayır',
    ok: 'Tamam',
    back: 'Geri',
    preview: 'Önizleme',
    view: 'Görüntüle',
    edit: 'Düzenle',
    no_description: 'Açıklama yok',
    leave_feedback: 'Geri bildirim bırak',
    last_activity_date: 'Son aktivite tarihi',
    mark_complete: 'Tamamla',
    add_favorites: 'Favorilere ekle',
    deleted_count: 'Silinenler',
    no_deleted_projects: 'Silinen proje yok',
    new_category: 'Yeni kategori...',
    project: 'Proje',
    account_not_specified: 'Belirtilmedi',

    // ============ SUPPORT ============
    support_title: 'Destek Hizmeti',
    my_support_requests: 'Destek taleplerim',
    all_support_requests: 'Tüm destek talepleri',
    no_support_requests: 'Destek talebi yok',
    start_support_request: 'Sorununuzu açıklayın — 24 saat içinde yanıt vereceğiz',
    support_message_placeholder: 'Sorununuzu detaylı açıklayın...',
    cat_technical: 'Teknik sorun',
    cat_account: 'Hesap sorunu',

    // ============ FOOTER — BRAND ============
    footer_tagline: 'Kripto fırsatları laboratuvarı',
    footer_tagline_desc: 'En umut vadeden airdrop ve testnetleri araştırıyor, test ediyor ve katılmanıza yardımcı oluyoruz.',
    footer_live: 'Canlı',
    footer_updated: 'Güncellendi',

    // ============ FOOTER — QUICK LINKS ============
    footer_quick_links: 'Hızlı bağlantılar',
    footer_home: 'Ana Sayfa',
    footer_projects: 'Projeler',
    footer_guides: 'Rehberler',
    footer_support: 'Destek',

    // ============ FOOTER — ACCOUNT SECTION ============
    footer_account_title: 'Hesap',
    footer_my_account: 'Hesabım',
    footer_faq: 'SSS',
    footer_language: 'Dil',
    footer_active_users: 'aktif',
    footer_projects_count: 'proje',

    // ============ FOOTER — LEGAL ============
    footer_legal_title: 'Yasal Bilgiler',
    footer_documents: 'Belgeler',
    footer_terms: 'Kullanım Şartları',
    footer_privacy: 'Gizlilik Politikası',
    footer_cookies: 'Çerez Politikası',
    footer_disclaimer: 'Sorumluluk Reddi',
    footer_contacts: 'İletişim',
    footer_worldwide: 'Worldwide (Uzaktan)',

    // ============ FOOTER — NEWSLETTER ============
    footer_newsletter_title: 'Güncellemelere abone ol',
    footer_newsletter_desc: 'Yeni airdrop ve testnet bildirimlerini alın',
    footer_email_placeholder: 'Email adresiniz',
    footer_subscribe_btn: 'Abone Ol',
    footer_privacy_note: 'Gizliliğinize saygı duyuyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.',
    footer_already_subscribed: 'Zaten abonesiniz ✓',
    footer_thanks: 'Teşekkürler! ✓',
    footer_subscribed_toast: 'Abonelik tamamlandı!',
    footer_already_toast: 'Bu email zaten kayıtlı!',
    footer_error_toast: 'Hata. Daha sonra tekrar deneyin.',
    footer_invalid_email: 'Geçerli bir email girin',
    footer_sending: 'Gönderiliyor...',

    // ============ FOOTER — BOTTOM BAR ============
    footer_rights: 'Tüm hakları saklıdır.',
    footer_made_with: 'Hazırlandı',
    footer_love: 'kripto sevgisiyle',
    footer_back_to_top: 'Yukarı',
    footer_mobile_terms: 'Şartlar',
    footer_mobile_privacy: 'Gizlilik',

    // ============ FOOTER — NEWSLETTER MODAL ============
    newsletter_success_title: 'Abonelik tamamlandı!',
    newsletter_success_desc: 'Yeni airdrop ve önemli güncellemeler hakkında bildirim alacaksınız.',

    // ============ FOOTER — SUPPORT MODAL ============
    footer_support_title: 'Destek Hizmeti',
    footer_support_subtitle: 'Sorunuza 24 saat içinde yanıt vereceğiz',
    footer_support_category: 'Başvuru kategorisi *',
    footer_support_select: 'Kategori seçin',
    footer_support_technical: '🔧 Teknik sorun',
    footer_support_account: '👤 Hesap sorunu',
    footer_support_project: '📋 Proje hakkında soru',
    footer_support_suggestion: '💡 Öneri',
    footer_support_partnership: '🤝 İş birliği',
    footer_support_other: '💬 Diğer',
    footer_support_name: 'Adınız',
    footer_support_email: 'Email *',
    footer_support_subject: 'Konu *',
    footer_support_subject_placeholder: 'Sorunun kısa açıklaması',
    footer_support_message: 'Detaylı açıklama *',
    footer_support_message_placeholder: 'Sorununuzu detaylı açıklayın...',
    footer_support_submit: 'Başvuruyu Gönder',
    footer_support_sent: 'Başvuru gönderildi! 24 saat içinde yanıt vereceğiz.',
    footer_support_login: 'Lütfen giriş yapın!',
    footer_support_error: 'Gönderim hatası',
    footer_support_sending: 'Gönderiliyor...',

    // ============ FOOTER — FAQ MODAL ============
    footer_faq_title: 'Sık Sorulan Sorular',
    footer_faq_subtitle: 'AirdropLab hakkında sık sorulan sorular',
    footer_faq_not_found: 'Cevabı bulamadınız mı?',
    footer_faq_contact: 'Destek ekibimizle iletişime geçin',
    footer_faq_write: 'Desteğe yaz',
    // ============ FAQ — QUESTIONS & ANSWERS ============
    faq_q1: 'Airdroplara nasıl başlanır?',
    faq_a1: 'AirdropLab’a kayıt olun, listeden bir proje seçin ve rehberdeki adımları izleyin. Görevleri tamamlayın ve güncellemeleri takip edin.',

    faq_q2: 'Testnet nedir ve neden katılmalıyım?',
    faq_a2: 'Testnet, bir blockchain’in ana ağdan önceki deneme sürümüdür. Katılım, proje tokenlarını ücretsiz kazanma fırsatı sağlar ve ana ağ çıktığında değer kazanabilirler.',

    faq_q3: 'Dolandırıcılık projelerinden nasıl kaçınırım?',
    faq_a3: 'Tüm projeleri eklemeden önce kontrol ediyoruz, ancak yine de kendi araştırmanızı yapın. Özel anahtar paylaşmayın, bilinmeyen adreslere ETH göndermeyin ve güvenlik denetimi olmayan projelere dikkat edin.',

    faq_q4: 'Bir proje neden listede görünmüyor?',
    faq_a4: 'Proje arşivlenmiş, moderasyonda veya silinmiş olabilir. Ayrıca sol menüdeki filtrelerin doğru olduğundan emin olun.',

    faq_q5: 'Bir proje hakkında nasıl yardım alabilirim?',
    faq_a5: 'Alt menüdeki “Destek” bölümünü kullanabilir veya proje sayfasında yorum bırakabilirsiniz. Ekibimiz 24 saat içinde yanıt verir.',

    faq_q6: 'Kendi projemi ekleyebilir miyim?',
    faq_a6: 'Evet, öneri formu üzerinden veya Telegram’dan proje önerebilirsiniz. Tüm önerileri inceliyoruz.',

    // ============ FOOTER — GUIDES MODAL ============
    footer_guides_title: 'Rehberler',
    footer_guides_subtitle: 'Testnetlere katılmak için adım adım talimatlar',
    footer_guide_active: 'Aktif',
    footer_guide_go: 'Rehbere Git',
    footer_guide_lock: 'Rehberlere erişmek için ana sayfadaki görevleri tamamlamanız gerekir',

    // ============ FOOTER — GUIDES DATA ============
    guide_arc_desc: 'Circle testneti — USDC’nin geliştiricileri',
    guide_tempo_desc: 'MetaStreet’in L2 çözümü',
    guide_robinhood_desc: 'Robinhood testneti — bilinen broker',
    guide_difficulty_easy: 'Kolay',
    guide_difficulty_medium: 'Orta',
    guide_difficulty_hard: 'Zor',

    // ============ FOOTER — ACCOUNT MODAL ============
    footer_account_manage: 'Profil ve ayarları yönet',
    footer_account_not_logged: 'Giriş yapılmadı',
    footer_account_login_desc: 'Profilinizi yönetmek için giriş yapın',
    footer_account_firstname: 'Ad',
    footer_account_lastname: 'Soyad',
    footer_account_username: 'Kullanıcı adı',
    footer_account_telegram: 'Telegram',
    footer_account_birthdate: 'Doğum tarihi',
    footer_account_gender: 'Cinsiyet',
    footer_account_male: 'Erkek',
    footer_account_female: 'Kadın',
    footer_account_other_gender: 'Diğer',
    footer_account_country: 'Ülke',
    footer_account_bio: 'Hakkınızda',
    footer_account_bio_placeholder: 'Kendinizden bahsedin...',
    footer_account_cancel: 'İptal',
    footer_account_save: 'Kaydet',
    footer_account_saved: 'Profil kaydedildi!',
    footer_account_saved_local: 'Profil yerel olarak kaydedildi',
    footer_account_photo: 'Fotoğraf güncellendi!',

    footer_solana_placeholder: 'Solana adresiniz...',
    footer_evm_hint: '(Ethereum, BSC, Polygon...)',
    footer_evm_label: 'EVM Adresi',
    footer_solana_label: 'Solana Adresi',

    // ============ FOOTER — ACCOUNT EXTRA FIELDS ============
    footer_address: 'adres',
    footer_crypto_wallets: 'Kripto adresleri',
    footer_social_networks: 'Sosyal ağlar',
    account_select_country: 'Bir ülke seçin veya yazın...',
    account_country_other_input: 'Ülke adını girin',
    account_crypto_addresses: 'Kripto adresleri',
    account_evm_address: 'EVM Adresi',
    account_evm_hint: '(Ethereum, BSC, Polygon...)',
    account_sol_address: 'Solana Adresi',
    account_sol_placeholder: 'Solana adresiniz...',
    account_social_networks: 'Sosyal ağlar',
    account_city: 'Şehir',
    account_city_placeholder: 'Şehriniz',

    // ============ FOOTER — LEGAL MODALS ============
    footer_legal_updated: 'Güncellendi:',
    footer_legal_close: 'Kapat',
    legal_terms_title: 'Kullanım Şartları',
    legal_privacy_title: 'Gizlilik Politikası',
    legal_cookie_title: 'Çerez Politikası',
    legal_disclaimer_title: 'Sorumluluk Reddi',
    legal_updated_date: '07 Mart 2026',
    legal_close_btn: 'Kapat',
    // ============ REFERRAL PROGRAM ============
    account_ref_program: 'Referans Programı',
    account_your_ref_code: 'Referans Kodunuz',
    account_invited_count: 'Davet edilenler',
    account_people_short: 'kişi',
    account_invited_by: 'Sizi davet eden:',
    account_enter_ref_code: 'Referans kodu girin',
    account_apply: 'Uygula',
    account_ref_bonus_text: 'Her davet için alacağınız ödül',
    account_ref_bonus_amount: '+25 Reagents',
    account_generating: 'Oluşturuluyor...',
    account_invited_label: 'kişi',
    invited_by_label: 'Sizi davet eden:',
    ref_code_input_placeholder: 'AL-XXXXXX',
    ref_code_copied: 'Kod kopyalandı!',
    copy_failed: 'Kopyalanamadı',
    ref_wrong_format: 'Hatalı format (AL-XXXXXX)',
    ref_login_required: 'Lütfen giriş yapın',
    ref_not_found: 'Kod bulunamadı',
    ref_own_code: 'Kendi kodunuzu kullanamazsınız',
    ref_applied: '🧪 Kod uygulandı! Sana +50, davet edene +25 Reagents.',
    ref_error: 'Hata: ',

    // ============ REAGENTS ============
    reagents_title: 'Reagents',
    reagents_section_title: 'Reagents',
    reagents_rgt_unit: 'RGT',
    account_balance_label: 'Bakiyeniz',
    account_streak_label: 'Seri',
    account_days_short: 'gün',
    account_get_reagents: 'Reagents Al',

    // ============ CLAIM MODAL ============
    claim_title: 'Günlük Reagents',
    claim_updated_utc: '00:00 UTC’de yenilenir',
    claim_loading: 'Yükleniyor...',
    claim_error_close: 'Kapat',
    claim_balance_label: 'Bakiye',
    claim_streak_label: 'Seri',
    claim_streak_broken_title: 'Seri sıfırlandı!',
    claim_streak_broken_desc: 'Bir günü kaçırdınız. Seri yeniden başlatıldı.',
    claim_week_progress: 'Haftalık ilerleme',
    claim_until_bonus: 'Bonusa kalan: {days} gün',
    claim_days_left: '{days} gün',
    claim_today_reward: 'Bugünkü ödül',
    claim_streak_will_be: 'Yeni seri:',
    claim_get_btn: 'Reagents Al',
    claim_claiming: 'Alınıyor...',
    claim_already_title: 'Bugün zaten alındı!',
    claim_next_at: 'Sonraki alma zamanı:',
    claim_rewards_table: 'Seri ödül tablosu',
    claim_after_60: '60 günden sonra: her 30 günde +100 RGT ek ödül',
    claim_close_btn: 'Kapat',
    claim_success_title: 'Reagents alındı!',
    claim_streak_reset: 'Seri sıfırlandı — yeniden başlıyoruz',
    claim_credited: 'Yüklendi',
    claim_reagents_unit: 'Reagents',
    claim_next_claim: 'Sonraki alma:',
    claim_great_btn: 'Harika!',
    claim_time_left: 'Kalan: {h}sa {m}dk',
    claim_reset_in: 'sıfırlanma:',
    claim_balance_short: 'Bakiye',
    claim_streak_short: 'Seri',
    claim_to_bonus_short: 'Bonusa kalan',

    // ============ REAGENTS — EXTRA KEYS ============
    claim_login_required: 'Lütfen giriş yapın',
    claim_load_error: 'Veriler yüklenemedi',
    claim_firebase_error: 'Firebase hazır değil',
    claim_status_error: 'Durum alınamadı',
    claim_bonus_word: 'bonus',
    claim_days_unit: 'gün',
    streak_months_suffix: 'ay!',
    claim_btn_label: 'Al',
    claim_btn_tooltip_available: 'Günlük Reagents al',
    claim_btn_tooltip_cooldown: 'Sonraki alma 00:00 UTC’de',

    // ============ WEEK DAYS ============
    week_mon: 'Pzt',
    week_tue: 'Sal',
    week_wed: 'Çar',
    week_thu: 'Per',
    week_fri: 'Cum',
    week_sat: 'Cmt',
    week_sun: 'Paz',

    // ============ STREAK BONUS LABELS ============
    streak_week: '🔥 Hafta!',
    streak_month: '⚡ Ay!',
    streak_2months: '💎 2 Ay!',
    streak_quarter: '👑 Çeyrek!',
    streak_4months: '🌟 4 Ay!',
    streak_5months: '🚀 5 Ay!',
    streak_halfyear: '🏆 Yarım Yıl!',

    // ============ SUPPORT FORM (FOOTER) ============
    support_form_title: 'Destek Hizmeti',
    support_form_subtitle: '24 saat içinde yanıt vereceğiz',
    support_select_category: 'Kategori seçin',
    support_cat_technical: '🔧 Teknik sorun',
    support_cat_account: '👤 Hesap sorunu',
    support_cat_project: '📋 Proje hakkında soru',
    support_cat_suggestion: '💡 Öneri',
    support_cat_partnership: '🤝 İş birliği',
    support_cat_other: '💬 Diğer',
    support_your_name: 'Adınız',
    about_project: 'Proje hakkında',
activities: 'Aktiviteler',
activities_not_added: 'Aktiviteler henüz eklenmedi.',
added: 'Eklendi:',
start: 'Başlat',
click: 'Tıkla',
end: 'Bitir',
resume: 'Devam et',
new_activity: 'Yeni',
ended_activity: 'Tamamlandı',

support_subject_label: 'Başlık',
support_subject_placeholder: 'Kısa açıklama',
support_desc_label: 'Açıklama',
support_desc_placeholder: 'Sorununuzu ayrıntılı açıklayın...',
support_cancel: 'İptal',
support_submit: 'Gönder',
support_sending_text: 'Gönderiliyor...',
support_sent_ok: 'Talebiniz gönderildi! 24 saat içinde yanıt vereceğiz.',
support_need_login: 'Talep göndermek için giriş yapın',
support_select_cat_warn: 'Kategori seçin',
support_send_error: 'Gönderim hatası. Daha sonra tekrar deneyin.',

ticket_sending: 'Gönderiliyor...',
ticket_sent: 'Talep gönderildi!',
ticket_error: 'Gönderim hatası',
ticket_submit_btn: 'Talep gönder',

notif_title: 'Bildirimler',
notif_clear_all: 'Tümünü temizle',
notif_empty_title: 'Bildirim yok',
notif_empty_desc: 'Yeni airdroplar buraya düşecek',
notif_mark_read: 'Okundu',

time_just_now: 'az önce',
time_min_ago: 'dk önce',
time_hour_ago: 's önce',
time_day_ago: 'g önce',

avatar_too_large: 'Dosya çok büyük (maks 2MB)',
avatar_uploading: 'Fotoğraf yükleniyor...',
avatar_local_only: 'Foto (yalnızca yerel)',

tutorials_toast: 'Eğitimler proje bölümünde mevcut',
footer_scroll_top_toast: 'Yukarı',
footer_language_changed: 'Dil değiştirildi',
country_manual_input: 'Ülke adını girin',

ref_already_used: 'Bu referans kodunu zaten kullandınız',

passive_income_title: 'Referanslardan pasif gelir',
passive_invited: 'Davet edilen',
passive_total_earned: 'Kazanılan',
passive_pending: 'Beklemede',
passive_next_payout: 'Sonraki ödeme',
passive_paid_this_week: 'Bu hafta ödenen',
passive_days_left: '{days} gün sonra (Pzt UTC)',
passive_no_pending: 'Bekleyen gelir yok',
passive_levels_title: 'Yüzde yapısı',
passive_level: 'Seviye',
passive_payout_schedule: 'Her pazartesi 00:00 UTC’de ödeme',
passive_payout_toast: 'Pasif gelir yatırıldı',
passive_credited_to_upstream: 'Üst seviyelere aktarıldı:',

faucets_title: 'Faucetler <span style="color:#22d3ee;">(Kranlar)</span>',
faucets_updated: 'Güncellendi',
faucets_free: 'Ücretsiz',
faucets_paid: 'Ücretli',
faucets_testnets: 'Testnetler',
faucets_mainnets: 'Mainnetler',

faucets_filter_free: 'Ücretsiz',
faucets_filter_paid: 'Ücretli',
faucets_filter_testnet: 'Testnet',
faucets_filter_mainnet: 'Mainnet',

faucets_sort_name: '🔤 İsme göre',
faucets_sort_popularity: '🔥 Popülerliğe göre',
faucets_sort_rating: '⭐ Puanlamaya göre',
faucets_sort_new: '🆕 Yenilere göre',

faucets_search_placeholder: 'Ağ veya token ara...',
faucets_suggest_btn: 'Faucet öner',
faucets_suggest_title: 'Yeni faucet öner',
faucets_suggest_ph_link: 'https://faucet.example.com',
faucets_suggest_hint: 'Öneriler moderasyona gider. Onaylanınca listede görünür.',
faucets_login_hint: 'Favoriler ve puanlama için giriş yapın.',

faucets_rating_title: 'Faucet puanı',
faucets_rating_hint: '0 = kötü, 10 = mükemmel. Tüm kullanıcılar oy verebilir.',

faucets_tips_title: 'İpuçları',
faucets_tip_1: 'Testnetler için ayrı cüzdan kullan — daha güvenli',
faucets_tip_2: 'Testnet tokenları gerçek değer taşımaz, ancak aktivite airdrop için sayılabilir',
faucets_tip_3: 'Bazı faucetler doğrulama için minimum mainnet bakiyesi ister',
faucets_tip_4_prefix: 'İlerlemeni işaretle:',
faucets_tip_4_link: 'AirdropLab takipçisi',

faucets_admin_add: 'Faucet ekle',
faucets_admin_edit_mode: 'Düzenleme modu',
faucets_admin_moderation: 'Öneri moderasyonu',
faucets_admin_pending_title: 'Bekleyen öneriler',
faucets_admin_seed: 'Veri yükle',
faucets_admin_hidden: 'Gizli',
faucets_admin_show_hidden: 'Gizlileri göster',

filter_hidden: 'Gizli',
filter_all: 'Tümü',
filter_free: 'Ücretsiz',
filter_paid: 'Ücretli',
filter_testnet: 'Testnet',
filter_mainnet: 'Mainnet',
filter_favorites: 'Favoriler',
filter_my_suggestions: 'Önerilerim',
filter_suggestions: 'Öneriler',

faucets_storage_firestore: 'Veriler Firestore’da saklanır',

faucets_field_name: 'Ağ adı *',
faucets_field_token: 'Token *',
faucets_field_desc: 'Açıklama',
faucets_field_links: 'Bağlantılar (her satıra bir tane) *',
faucets_field_logo: 'Logo (URL)',
faucets_field_type: 'Tür',
faucets_field_net: 'Ağ',
faucets_field_reward: 'Ödül (isteğe bağlı)',
faucets_field_cooldown: 'Cooldown',
faucets_field_tags: 'Etiketler (virgülle)',

faucets_ph_name: 'Örn: Ethereum Sepolia',
faucets_ph_token: 'Örn: ETH, BTC, SOL',
faucets_ph_desc: 'Faucet kısa açıklaması',
faucets_ph_links: 'https://faucet.example.com',
faucets_ph_logo: 'https://.../logo.png',
faucets_ph_reward: '0.5 ETH/gün',
faucets_ph_cooldown: '24s',
faucets_ph_tags: 'airdrop, hot, multi',

faucets_type_free: 'Ücretsiz',
faucets_type_paid: 'Ücretli',
faucets_net_testnet: 'Testnet',
faucets_net_mainnet: 'Mainnet',

login_prompt: 'Giriş yapın',
notify_subscribed_text: 'Abone oldunuz — yayınlandığında bildireceğiz!',
notify_me_on_launch: 'Yayınlandığında bildir',
connecting_status: 'Bağlanıyor...',
notify_subscribed_notification: 'Abone oldunuz! Bölüm açıldığında haber vereceğiz 🚀',

claim_label: 'Talep et',
claimed_label: 'Tamamlandı',

faucets_exported: '{count} faucet dışa aktarıldı!',
faucets_imported_firebase: '{count} faucet Firebase’e aktarıldı!',
faucets_saved_local_firebase_error: '{count} faucet yerel olarak kaydedildi. Firebase hatası: {error}',
faucets_imported_local: '{count} faucet yerel olarak içe aktarıldı',
faucets_imported_localstorage: '{count} faucet localStorage’a aktarıldı',

export_error: 'Dışa aktarma hatası: {error}',
import_error: 'İçe aktarma hatası: {error}',
no_export_data: 'Dışa aktarılacak veri yok',
no_faucet_export_data: 'Firebase veya localStorage’da dışa aktarılacak veri yok',
invalid_faucet_format: 'Geçersiz veri formatı — faucet dizisi bekleniyor',
firebase_unavailable: 'Firebase kullanılamıyor',
firebase_functions_unavailable: 'Firebase fonksiyonları kullanılamıyor',

guides_export_message: 'Rehber verileri dışa aktarılıyor...',
guides_import_message: 'Rehber verileri içe aktarılıyor...',
invalid_json_format: 'Geçersiz JSON formatı. Proje dizisi veya "projects" alanı bekleniyor',
no_projects_in_file: 'Dosyada proje yok',
firebase_not_initialized: 'Firebase başlatılmadı',

loading_projects_modal: '{count} proje yükleniyor...',
projects_imported_success: '✅ {count} proje başarıyla içe aktarıldı!',
projects_migrated_firebase: '{count} proje Firebase’e taşındı!',
migrating_projects: '{count} proje taşınıyor...',
no_migration_data: 'Taşınacak veri yok',
projects_exported: '{count} proje dışa aktarıldı',

category_suggestion: '💡 Öneri',
category_bug: '🐛 Hata',
category_question: '❓ Soru',
category_other: '💬 Diğer',
category_technical: '🔧 Teknik sorun',
category_technical_full: '🔧 Teknik problem',
category_account: '👤 Hesap',
category_account_full: '👤 Hesap problemi',
category_partnership: '🤝 İş birliği',

time_minutes_short: 'dk',
time_hours_short: 'sa',
time_days_short: 'gün',

no_messages_yet: 'Henüz mesajınız yok',
feedback_hint: 'Tüm geri bildirimleriniz ana sayfada görünecek',
user_default_name: 'Kullanıcı',

support_label: 'Destek',
user_label: 'Kullanıcı',
you_label: 'Siz',
project_label: 'Proje:',
support_label_chat: 'Destek',
},


  es: {
    // ============ COMMON UI ACTIONS ============
    close_btn: 'Cerrar',
    delete_btn: 'Eliminar',
    cancel_btn: 'Cancelar',
    save_btn: 'Guardar',

    // ============ BASIC UI ============
    loading: 'CARGANDO LABORATORIO...',
    experimental_zone: 'Zona experimental',
    admin_mode: 'Modo de edición',
    active: 'Activos',
    new: 'Nuevos',
    in_work: 'En progreso',
    done: 'Listo',
    new_test: 'Nueva prueba',
    admin: 'Admin',
    login: 'Inicio de sesión',
    login_btn: 'Entrar',
    in_system: 'En el sistema',
    filters: 'Filtros',
    all_projects: 'Todos los proyectos',
    unvisited: 'No visitados',
    today: 'Hoy',
    yesterday: 'Ayer',
    active_filter: 'Activos',
    daily_filter: 'Diarios',
    favorites: 'Favoritos',
    completed: 'Completados',
    archive: 'Archivo',
    categories: 'Categorías',
    all: 'Todos',
    all_categories: 'Todas las categorías',
    search_placeholder: 'Buscar proyectos...',

    // ============ HEADER MENU ============
    menu_activities: 'Actividades',
    menu_guides: 'Guías',
    menu_community: 'Comunidad',
    menu_calendar: 'Calendario',
    menu_exchanges: 'Exchanges',
    menu_news: 'Noticias',
    menu_tools: 'Herramientas',
    menu_games: 'Juegos',
    menu_learning: 'Aprendizaje',
    menu_in_development: 'La sección está en desarrollo',
    menu_coming_soon: '¡Próximamente!',

    // ============ HEADER SPECIFIC UI ============
    version_label: 'v2.0',
    default_user_name: 'Investigador',
    admin_badge_label: 'Admin',
    profile_tooltip: 'Perfil',
    crypto_ticker_attribution: 'Monedas por Cryptorank',

    // ============ ADMIN BUTTONS TOOLTIPS ============
    btn_statistics: 'Estadísticas',
    btn_upload: 'Subir',
    btn_export: 'Exportar',
    btn_deleted: 'Eliminados',
    btn_edit_mode: 'Modo de edición',
    btn_show_hidden: 'Mostrar ocultos',
    btn_export_faucets: 'Exportar faucets',
    btn_import_faucets: 'Importar faucets',
    btn_mode: 'Modo',
    btn_import: 'Importar',

    // ============ COMING SOON MODAL ============
    coming_soon_status: 'En desarrollo',
    coming_soon_title: 'La sección se abrirá pronto',
    coming_soon_subtitle: 'Ya estamos trabajando en esta sección.<br>Suscríbete y te avisaremos cuando se lance.',
    coming_soon_feature_1: 'Información actualizada',
    coming_soon_feature_2: 'Herramientas interactivas',
    coming_soon_feature_3: 'Comunidad y chats',
    coming_soon_feature_4: 'Acceso anticipado',
    coming_soon_notify_btn: 'Notificarme al lanzamiento',
    coming_soon_connecting: 'Conectando...',
    coming_soon_subscribed: '¡Estás suscrito! Te avisaremos al lanzamiento.',
    coming_soon_notification_title: 'AirdropLab',
    coming_soon_notification_body: '¡Estás suscrito! Te avisaremos cuando se lance la sección ',
    coming_soon_close: 'Cerrar',

    all_projects: 'Todas las actividades',
    airdrops_lotteries: 'Airdrops y sorteos',
    faucets: 'Faucets',
    mainnets: 'Mainnets',
    testnets: 'Testnets',
    all_guides: 'Todas las guías',
    chat: 'Chat',
    leaderboard: 'Tabla de líderes',
    referrals: 'Referidos',
    forum: 'Foro',
    all_events: 'Todos los eventos',
    deadlines: 'Fechas límite',
    listings: 'Listados',
    project_events: 'Eventos del proyecto',
    all_exchanges: 'Todos los exchanges',
    crypto_news: 'Noticias de criptomonedas',
    analytics_news: 'Noticias de análisis',
    ai_news: 'Noticias de IA',
    bitcoin_news: 'Noticias de Bitcoin',
    defi_news: 'Noticias DeFi',
    gamefi_news: 'Noticias GameFi / Metaverso',
    ido_news: 'Noticias IDO/ICO/IFO/IEO',
    nft_news: 'Noticias NFT',
    gas_calculator: 'Calculadora de gas',
    bridges: 'Puentes',
    wallet_checker: 'Verificador de wallet',
    what_is_airdrop: '¿Qué es un airdrop?',
    how_setup_wallet: 'Cómo configurar una wallet',
    crypto_security: 'Seguridad en cripto',
    per_page: 'Por página:',
    by_added_date: '📅 Por fecha de añadido',
    by_activity_date: '🔄 Por fecha de actividad',
    date_day: 'Día',
    date_month: 'Mes',
    date_year: 'Año',
    by_priority: '⭐ Por prioridad',
    by_name: '🔤 Por nombre',
    info_click_project: 'Haz clic en el nombre del proyecto para ver más información o en "Guía" para realizarlo.',
    guest_warning: 'No has iniciado sesión. Los favoritos y tareas completadas se guardan solo en este navegador.',
    loading_projects: 'Cargando proyectos...',
    nothing_found: 'No se encontró nada',
    reset_filters: 'Restablecer filtros',
    active_research: 'Investigaciones activas',
    go_to_guide: 'Ir a la guía',
    guide: 'Guía',
    website: 'Website',
    status_active: 'Activo',
    status_soon: 'Pronto',
    status_ended: 'Finalizado',
    daily: 'Diario',
    high_priority: 'Alta',
    completed_badge: 'Listo',
    last_click_today: 'hoy',
    last_click_yesterday: 'ayer',
    // ============ ADMIN / PROJECT FORM ============
    add_project: 'Agregar proyecto',
    edit_project: 'Editar proyecto',
    project_name: 'Nombre del proyecto *',
    project_categories: 'Categorías del proyecto',
    new_category_placeholder: 'Nueva categoría...',
    logo_url: 'URL del logo',
    guide_url: 'Enlace a la guía',
    cryptorank_url: 'Enlace a CryptoRank',
    twitter_url: 'Twitter del proyecto',
    referral_link: 'Enlace de referido',
    short_desc: 'Descripción corta',
    status: 'Estado',
    last_updated: 'Fecha de actualización',
    has_daily_quests: 'Tiene misiones diarias',
    project_activities: 'Actividades del proyecto',
    add_activity: 'Agregar actividad',
    no_activities: 'Aún no se han agregado actividades.',
    activity_name: 'Nombre de la actividad *',
    activity_date: 'Fecha de inicio',
    activity_end_date: 'Fecha de finalización (auto-cierre)',
    detailed_desc: 'Descripción detallada',
    instructions_placeholder: 'Instrucciones para completar...',
    save: 'Guardar',
    delete: 'Eliminar',

    // ============ AUTH ============
    login_title: 'Inicio de sesión',
    google: 'Google',
    twitter: 'Twitter',
    or_email: 'O EMAIL',
    email: 'Email',
    password: 'Contraseña',
    register: 'Registro',

    // ============ FEEDBACK / MESSAGES ============
    feedback: 'Comentario',
    my_messages: 'Mis mensajes',
    all_requests: 'Todas las solicitudes',
    suggestion: '💡 Sugerencia',
    bug: '🐛 Error',
    question: '❓ Pregunta',
    other: '💬 Otro',
    message_placeholder: 'Describe tu solicitud...',
    send: 'Enviar',
    close: 'Cerrar',
    no_messages: 'No hay mensajes',
    your_answer: 'Tu respuesta',
    reply_placeholder: 'Escribe una respuesta...',
    chat_support: 'Chat con soporte',
    chat_user: 'Chat con usuario',
    chat_with_user: 'Chat con el usuario',
    chat_with_support: 'Chat con soporte',
    feedbacks_list: 'Comentarios y sugerencias',
    my_suggestions: 'Mis sugerencias',
    edit_mode: 'Modo edición',
    add_faucet: 'Agregar faucet',
    to_top: 'Arriba',
    hide: 'Ocultar',
    loading_chat: 'Cargando chat...',
    loading_feedbacks: 'Cargando comentarios...',
    topic: 'Tema de la solicitud',
    message: 'Mensaje',
    start_new_feedback: 'Iniciar nueva solicitud',
    confirm_delete_chat: '¿Eliminar conversación?',
    delete_feedback: 'Eliminar',
    you: 'Tú',
    support: 'Soporte',
    user: 'Usuario',
    all_feedbacks: 'Todas las solicitudes',

    // ============ NOTIFICATIONS ============
    notifications: 'Notificaciones',
    no_notifications: 'Sin notificaciones',
    mark_read: 'Marcar como leído',
    jackpot_win: 'Ganador del Jackpot',
    wheel_of_fortune: 'Rueda de la Fortuna',
    info: 'Información',
    success: 'Éxito',
    important: 'Importante',
    promo: 'Promoción',
    referral_program: 'Programa de Referidos',
    system: 'Sistema',
    notifications_mark_read: 'Marcar todas como leídas',
    notifications_clear_all: 'Limpiar todas',
    loading_notifications: 'Cargando notificaciones',

    // ============ ADMIN TOOLS ============
    view_stats: 'Ver estadísticas',
    upload_firebase: 'Subir datos a la base',
    export_json: 'Exportar todos los datos',
    view_deleted: 'Ver eliminados',
    deleted_projects: 'Proyectos eliminados',
    restore: 'Restaurar',
    delete_permanent: 'Eliminar permanentemente',

    // ============ TOAST MESSAGES ============
    task_completed: '¡Tarea completada!',
    task_uncompleted: 'Marcado como incompleto',
    added_favorites: '¡Agregado!',
    removed_favorites: 'Eliminado',
    login_required: 'Inicia sesión',
    link_not_found: 'Enlace no encontrado',
    saved: 'Guardado',
    deleted: 'Eliminado',
    restored: 'Restaurado',
    error_occurred: 'Error',
    exported: 'Exportado',
    uploaded: 'Subido',
    enter_message: 'Ingresa un mensaje',
    enter_name: 'Ingresa un nombre',
    confirm_delete: '¿Mover al archivo?',
    confirm_restore: '¿Restaurar proyecto?',
    enter_link: 'Ingresa un enlace',
    no_access: 'Sin acceso',
    only_admin: 'Solo para administradores',
    copied: '¡Copiado!',
    // ============ HERO ============
    hero_title: 'Laboratorio de Oportunidades Cripto',
    hero_subtitle: 'AirdropLab es tu centro para investigar, probar y participar en los airdrops más prometedores.',
    start_research: 'Iniciar investigación',
    collapse_hero: 'Ocultar bienvenida',
    expand_hero: 'Mostrar bienvenida',

    // ============ COMMON ============
    yes: 'Sí',
    no: 'No',
    ok: 'OK',
    back: 'Atrás',
    preview: 'Vista previa',
    view: 'Ver',
    edit: 'Editar',
    no_description: 'Sin descripción',
    leave_feedback: 'Dejar comentario',
    last_activity_date: 'Fecha de última actividad',
    mark_complete: 'Completar',
    add_favorites: 'Favoritos',
    deleted_count: 'Eliminados',
    no_deleted_projects: 'No hay proyectos eliminados',
    new_category: 'Nueva categoría...',
    project: 'Proyecto',
    account_not_specified: 'No especificado',

    // ============ SUPPORT ============
    support_title: 'Soporte técnico',
    my_support_requests: 'Mis solicitudes',
    all_support_requests: 'Todas las solicitudes de soporte',
    no_support_requests: 'No hay solicitudes de soporte',
    start_support_request: 'Describe tu problema — responderemos dentro de 24 horas',
    support_message_placeholder: 'Describe tu problema en detalle...',
    cat_technical: 'Problema técnico',
    cat_account: 'Problema con la cuenta',

    // ============ FOOTER — BRAND ============
    footer_tagline: 'Laboratorio de oportunidades cripto',
    footer_tagline_desc: 'Investigamos, probamos y ayudamos a participar en los airdrops y testnets más prometedores.',
    footer_live: 'En vivo',
    footer_updated: 'Actualizado',

    // ============ FOOTER — QUICK LINKS ============
    footer_quick_links: 'Enlaces rápidos',
    footer_home: 'Inicio',
    footer_projects: 'Proyectos',
    footer_guides: 'Guías',
    footer_support: 'Soporte',

    // ============ FOOTER — ACCOUNT SECTION ============
    footer_account_title: 'Cuenta personal',
    footer_my_account: 'Mi cuenta',
    footer_faq: 'FAQ',
    footer_language: 'Idioma',
    footer_active_users: 'activos',
    footer_projects_count: 'proyectos',

    // ============ FOOTER — LEGAL ============
    footer_legal_title: 'Información legal',
    footer_documents: 'Documentos',
    footer_terms: 'Términos de uso',
    footer_privacy: 'Política de privacidad',
    footer_cookies: 'Política de cookies',
    footer_disclaimer: 'Descargo de responsabilidad',
    footer_contacts: 'Contactos',
    footer_worldwide: 'Worldwide (Remoto)',

    // ============ FOOTER — NEWSLETTER ============
    footer_newsletter_title: 'Suscribirse a las actualizaciones',
    footer_newsletter_desc: 'Recibe notificaciones sobre nuevos airdrops y testnets',
    footer_email_placeholder: 'Tu email',
    footer_subscribe_btn: 'Suscribirse',
    footer_privacy_note: 'Respetamos tu privacidad. Puedes darte de baja en cualquier momento.',
    footer_already_subscribed: 'Ya estás suscrito ✓',
    footer_thanks: '¡Gracias! ✓',
    footer_subscribed_toast: '¡Suscripción completada!',
    footer_already_toast: 'Este email ya está suscrito',
    footer_error_toast: 'Error. Intenta más tarde.',
    footer_invalid_email: 'Ingresa un email válido',
    footer_sending: 'Enviando...',

    // ============ FOOTER — BOTTOM BAR ============
    footer_rights: 'Todos los derechos reservados.',
    footer_made_with: 'Hecho con',
    footer_love: 'amor por las criptos',
    footer_back_to_top: 'Arriba',
    footer_mobile_terms: 'Términos',
    footer_mobile_privacy: 'Privacidad',

    // ============ FOOTER — NEWSLETTER MODAL ============
    newsletter_success_title: '¡Suscripción completada!',
    newsletter_success_desc: 'Recibirás notificaciones sobre nuevos airdrops y actualizaciones importantes.',

    // ============ FOOTER — SUPPORT MODAL ============
    footer_support_title: 'Soporte técnico',
    footer_support_subtitle: 'Responderemos a tu pregunta dentro de 24 horas',
    footer_support_category: 'Tema de la solicitud *',
    footer_support_select: 'Selecciona una categoría',
    footer_support_technical: '🔧 Problema técnico',
    footer_support_account: '👤 Problema con la cuenta',
    footer_support_project: '📋 Pregunta sobre un proyecto',
    footer_support_suggestion: '💡 Sugerencia',
    footer_support_partnership: '🤝 Colaboración',
    footer_support_other: '💬 Otro',
    footer_support_name: 'Tu nombre',
    footer_support_email: 'Email *',
    footer_support_subject: 'Asunto *',
    footer_support_subject_placeholder: 'Descripción breve del problema',
    footer_support_message: 'Descripción detallada *',
    footer_support_message_placeholder: 'Describe tu problema en detalle...',
    footer_support_submit: 'Enviar solicitud',
    footer_support_sent: '¡Solicitud enviada! Responderemos dentro de 24 horas.',
    footer_support_login: '¡Inicia sesión en tu cuenta!',
    footer_support_error: 'Error al enviar',
    footer_support_sending: 'Enviando...',

    // ============ FOOTER — FAQ MODAL ============
    footer_faq_title: 'Preguntas frecuentes',
    footer_faq_subtitle: 'Respuestas a preguntas populares sobre AirdropLab',
    footer_faq_not_found: '¿No encontraste la respuesta?',
    footer_faq_contact: 'Contacta a nuestro soporte',
    footer_faq_write: 'Escribir al soporte',
    // ============ FAQ — QUESTIONS & ANSWERS ============
    faq_q1: '¿Cómo empezar a participar en airdrops?',
    faq_a1: 'Regístrate en AirdropLab, elige un proyecto de la lista y sigue las instrucciones de la guía. Completa las tareas y mantente atento a las actualizaciones.',
    
    faq_q2: '¿Qué es un testnet y por qué participar?',
    faq_a2: 'Un testnet es una red de prueba del blockchain antes de su lanzamiento en mainnet. Participar permite obtener tokens del proyecto de forma gratuita, que pueden tener valor cuando se lance la red principal.',
    
    faq_q3: '¿Cómo evitar proyectos scam?',
    faq_a3: 'Verificamos todos los proyectos antes de agregarlos, pero siempre realiza tu propia investigación. No ingreses claves privadas, no envíes ETH a direcciones desconocidas y evita proyectos sin auditoría de seguridad.',
    
    faq_q4: '¿Por qué un proyecto no aparece en la lista?',
    faq_a4: 'El proyecto puede estar archivado, en moderación o eliminado. También verifica que estés usando los filtros correctos en la barra lateral.',
    
    faq_q5: '¿Cómo obtener ayuda sobre un proyecto?',
    faq_a5: 'Usa la sección "Soporte" en el pie de página o deja un comentario en la página del proyecto. Nuestro equipo responde dentro de 24 horas.',
    
    faq_q6: '¿Puedo agregar mi propio proyecto?',
    faq_a6: 'Sí, puedes proponer un proyecto mediante el formulario de comentarios o escribiendo en Telegram. Revisamos todas las propuestas.',

    // ============ FOOTER — GUIDES MODAL ============
    footer_guides_title: 'Guías',
    footer_guides_subtitle: 'Instrucciones paso a paso para participar en testnets',
    footer_guide_active: 'Activo',
    footer_guide_go: 'Ir a la guía',
    footer_guide_lock: 'Para acceder a las guías debes completar las tareas en la página principal',

    // ============ FOOTER — GUIDES DATA ============
    guide_arc_desc: 'Testnet de Circle — creadores de USDC',
    guide_tempo_desc: 'Solución L2 de MetaStreet',
    guide_robinhood_desc: 'Testnet de Robinhood — broker reconocido',
    guide_difficulty_easy: 'Fácil',
    guide_difficulty_medium: 'Medio',
    guide_difficulty_hard: 'Difícil',

    // ============ FOOTER — ACCOUNT MODAL ============
    footer_account_manage: 'Administrar perfil y configuración',
    footer_account_not_logged: 'Sesión no iniciada',
    footer_account_login_desc: 'Inicia sesión para administrar tu perfil',
    footer_account_firstname: 'Nombre',
    footer_account_lastname: 'Apellido',
    footer_account_username: 'Usuario',
    footer_account_telegram: 'Telegram',
    footer_account_birthdate: 'Fecha de nacimiento',
    footer_account_gender: 'Género',
    footer_account_male: 'Masculino',
    footer_account_female: 'Femenino',
    footer_account_other_gender: 'Otro',
    footer_account_country: 'País',
    footer_account_bio: 'Sobre ti',
    footer_account_bio_placeholder: 'Cuéntanos sobre ti...',
    footer_account_cancel: 'Cancelar',
    footer_account_save: 'Guardar',
    footer_account_saved: '¡Perfil guardado!',
    footer_account_saved_local: 'Perfil guardado localmente',
    footer_account_photo: '¡Foto actualizada!',

    footer_solana_placeholder: 'Tu dirección de Solana...',
    footer_evm_hint: '(Ethereum, BSC, Polygon...)',
    footer_evm_label: 'Dirección EVM',
    footer_solana_label: 'Dirección Solana',

    // ============ FOOTER — ACCOUNT EXTRA FIELDS ============
    footer_address: 'dirección',
    footer_crypto_wallets: 'Direcciones cripto',
    footer_social_networks: 'Redes sociales',
    account_select_country: 'Selecciona o escribe un país...',
    account_country_other_input: 'Ingresa el nombre del país',
    account_crypto_addresses: 'Direcciones cripto',
    account_evm_address: 'Dirección EVM',
    account_evm_hint: '(Ethereum, BSC, Polygon...)',
    account_sol_address: 'Dirección Solana',
    account_sol_placeholder: 'Tu dirección de Solana...',
    account_social_networks: 'Redes sociales',
    account_city: 'Ciudad',
    account_city_placeholder: 'Tu ciudad',

    // ============ FOOTER — LEGAL MODALS ============
    footer_legal_updated: 'Actualizado:',
    footer_legal_close: 'Cerrar',
    legal_terms_title: 'Términos de uso',
    legal_privacy_title: 'Política de privacidad',
    legal_cookie_title: 'Política de cookies',
    legal_disclaimer_title: 'Descargo de responsabilidad',
    legal_updated_date: '07 de marzo de 2026',
    legal_close_btn: 'Cerrar',
    // ============ REFERRAL PROGRAM ============
    account_ref_program: 'Programa de referidos',
    account_your_ref_code: 'Tu código de referido',
    account_invited_count: 'Invitados',
    account_people_short: 'pers.',
    account_invited_by: 'Te invitó:',
    account_enter_ref_code: 'Ingresar código de referido',
    account_apply: 'Aplicar',
    account_ref_bonus_text: 'Por cada invitado recibirás',
    account_ref_bonus_amount: '+25 Reagents',
    account_generating: 'Generando...',
    account_invited_label: 'pers.',
    invited_by_label: 'Te invitó:',
    ref_code_input_placeholder: 'AL-XXXXXX',
    ref_code_copied: '¡Código copiado!',
    copy_failed: 'No se pudo copiar',
    ref_wrong_format: 'Formato incorrecto (AL-XXXXXX)',
    ref_login_required: 'Inicia sesión',
    ref_not_found: 'Código no encontrado',
    ref_own_code: 'No puedes usar tu propio código',
    ref_applied: '🧪 ¡Código aplicado! +50 Reagents para ti y +25 para quien te invitó.',
    ref_error: 'Error: ',

    // ============ REAGENTS ============
    reagents_title: 'Reagents',
    reagents_section_title: 'Reagents',
    reagents_rgt_unit: 'RGT',
    account_balance_label: 'Tu balance',
    account_streak_label: 'Racha',
    account_days_short: 'días',
    account_get_reagents: 'Obtener Reagents',

    // ============ CLAIM MODAL ============
    claim_title: 'Reagents diarios',
    claim_updated_utc: 'Se actualiza a las 00:00 UTC',
    claim_loading: 'Cargando...',
    claim_error_close: 'Cerrar',
    claim_balance_label: 'Tu balance',
    claim_streak_label: 'Racha',
    claim_streak_broken_title: '¡Racha reiniciada!',
    claim_streak_broken_desc: 'Saltaste un día. ¡Empezamos de nuevo!',
    claim_week_progress: 'Progreso semanal',
    claim_until_bonus: 'Faltan {days} días para el bono',
    claim_days_left: '{days} días',
    claim_today_reward: 'Hoy recibirás',
    claim_streak_will_be: 'La racha será:',
    claim_get_btn: 'Obtener Reagents',
    claim_claiming: 'Obteniendo...',
    claim_already_title: '¡Ya reclamado!',
    claim_next_at: 'El próximo reclamo estará disponible en',
    claim_rewards_table: 'Tabla de recompensas por rachas',
    claim_after_60: 'Después de 60 días: cada 30 días +100 RGT adicionales',
    claim_close_btn: 'Cerrar',
    claim_success_title: '¡Reagents recibidos!',
    claim_streak_reset: 'Racha reiniciada — empezamos de nuevo',
    claim_credited: 'Acreditado',
    claim_reagents_unit: 'Reagents',
    claim_next_claim: 'Próximo reclamo:',
    claim_great_btn: '¡Genial!',
    claim_time_left: 'Restante: {h}h {m}min',
    claim_reset_in: 'reinicio en',
    claim_balance_short: 'Balance',
    claim_streak_short: 'Racha',
    claim_to_bonus_short: 'Para el bono',

    // ============ REAGENTS — EXTRA KEYS ============
    claim_login_required: 'Inicia sesión',
    claim_load_error: 'No se pudieron cargar los datos',
    claim_firebase_error: 'Firebase no está listo',
    claim_status_error: 'No se pudo obtener el estado',
    claim_bonus_word: 'bono',
    claim_days_unit: 'días',
    streak_months_suffix: 'meses!',
    claim_btn_label: 'Reclamar',
    claim_btn_tooltip_available: 'Obtener Reagents diarios',
    claim_btn_tooltip_cooldown: 'Próximo reclamo a las 00:00 UTC',

    // ============ WEEK DAYS ============
    week_mon: 'Lun',
    week_tue: 'Mar',
    week_wed: 'Mié',
    week_thu: 'Jue',
    week_fri: 'Vie',
    week_sat: 'Sáb',
    week_sun: 'Dom',

    // ============ STREAK BONUS LABELS ============
    streak_week: '🔥 ¡Semana!',
    streak_month: '⚡ ¡Mes!',
    streak_2months: '💎 ¡2 meses!',
    streak_quarter: '👑 ¡Trimestre!',
    streak_4months: '🌟 ¡4 meses!',
    streak_5months: '🚀 ¡5 meses!',
    streak_halfyear: '🏆 ¡Medio año!',

    // ============ SUPPORT FORM (FOOTER) ============
    support_form_title: 'Soporte técnico',
    support_form_subtitle: 'Responderemos dentro de 24 horas',
    support_select_category: 'Selecciona una categoría',
    support_cat_technical: '🔧 Problema técnico',
    support_cat_account: '👤 Problema con la cuenta',
    support_cat_project: '📋 Pregunta sobre un proyecto',
    support_cat_suggestion: '💡 Sugerencia',
    support_cat_partnership: '🤝 Colaboración',
    support_cat_other: '💬 Otro',
    support_your_name: 'Tu nombre',
    about_project: 'Sobre el proyecto',
activities: 'Actividades',
activities_not_added: 'Las actividades aún no han sido añadidas.',
added: 'Añadido:',
start: 'Iniciar',
click: 'Clic',
end: 'Finalizar',
resume: 'Reanudar',
new_activity: 'Nuevo',
ended_activity: 'Finalizado',

support_subject_label: 'Título',
support_subject_placeholder: 'Descripción breve',
support_desc_label: 'Descripción',
support_desc_placeholder: 'Describa su problema en detalle...',
support_cancel: 'Cancelar',
support_submit: 'Enviar',
support_sending_text: 'Enviando...',
support_sent_ok: 'La solicitud ha sido enviada. Responderemos dentro de 24 horas.',
support_need_login: 'Inicie sesión para enviar una solicitud',
support_select_cat_warn: 'Seleccione una categoría',
support_send_error: 'Error al enviar. Intente más tarde.',

ticket_sending: 'Enviando...',
ticket_sent: 'Solicitud enviada!',
ticket_error: 'Error al enviar',
ticket_submit_btn: 'Enviar solicitud',

notif_title: 'Notificaciones',
notif_clear_all: 'Limpiar todo',
notif_empty_title: 'Sin notificaciones',
notif_empty_desc: 'Las notificaciones sobre nuevos airdrops aparecerán aquí',
notif_mark_read: 'Leído',

time_just_now: 'justo ahora',
time_min_ago: 'min atrás',
time_hour_ago: 'h atrás',
time_day_ago: 'd atrás',

avatar_too_large: 'Archivo demasiado grande (máx 2MB)',
avatar_uploading: 'Subiendo foto...',
avatar_local_only: 'Foto (solo local)',

tutorials_toast: 'Los tutoriales están disponibles en la sección de proyectos',
footer_scroll_top_toast: 'Arriba',
footer_language_changed: 'Idioma cambiado',
country_manual_input: 'Ingrese el nombre del país',

ref_already_used: 'Ya has usado un código de referido',

passive_income_title: 'Ingreso pasivo por referidos',
passive_invited: 'Invitados',
passive_total_earned: 'Ganado',
passive_pending: 'Pendiente',
passive_next_payout: 'Próximo pago',
passive_paid_this_week: 'Pagado esta semana',
passive_days_left: 'En {days} días (lun UTC)',
passive_no_pending: 'No hay ingresos acumulados',
passive_levels_title: 'Estructura de porcentajes',
passive_level: 'Nivel',
passive_payout_schedule: 'Pago cada lunes a las 00:00 UTC',
passive_payout_toast: 'Ingreso pasivo acreditado',
passive_credited_to_upstream: 'Acreditado a los superiores:',

faucets_title: 'Faucets <span style="color:#22d3ee;">(Grifos)</span>',
faucets_updated: 'Actualizado',
faucets_free: 'Gratis',
faucets_paid: 'De pago',
faucets_testnets: 'Testnets',
faucets_mainnets: 'Mainnets',

faucets_filter_free: 'Gratis',
faucets_filter_paid: 'De pago',
faucets_filter_testnet: 'Testnet',
faucets_filter_mainnet: 'Mainnet',

faucets_sort_name: '🔤 Por nombre',
faucets_sort_popularity: '🔥 Por popularidad',
faucets_sort_rating: '⭐ Por calificación',
faucets_sort_new: '🆕 Más nuevos',

faucets_search_placeholder: 'Buscar por red o token...',
faucets_suggest_btn: 'Sugerir faucet',
faucets_suggest_title: 'Sugerir nuevo faucet',
faucets_suggest_ph_link: 'https://faucet.example.com',
faucets_suggest_hint: 'Las sugerencias pasan por moderación. Tras aprobarse, aparecerán en la lista.',
faucets_login_hint: 'Inicie sesión para favoritos y calificaciones.',

faucets_rating_title: 'Calificación del faucet',
faucets_rating_hint: '0 = malo, 10 = excelente. Todos los usuarios registrados pueden votar.',

faucets_tips_title: 'Consejos',
faucets_tip_1: 'Use una billetera separada para testnets — es más seguro',
faucets_tip_2: 'Los tokens de testnet no tienen valor real, pero la actividad puede contar para un airdrop',
faucets_tip_3: 'Algunos faucets requieren un saldo mínimo en mainnet para verificación',
faucets_tip_4_prefix: 'Marca tu progreso en',
faucets_tip_4_link: 'el rastreador de AirdropLab',

faucets_admin_add: 'Agregar faucet',
faucets_admin_edit_mode: 'Modo edición',
faucets_admin_moderation: 'Moderación de sugerencias',
faucets_admin_pending_title: 'Sugerencias pendientes',
faucets_admin_seed: 'Cargar base',
faucets_admin_hidden: 'Ocultos',
faucets_admin_show_hidden: 'Mostrar ocultos',

filter_hidden: 'Ocultos',
filter_all: 'Todos',
filter_free: 'Gratis',
filter_paid: 'De pago',
filter_testnet: 'Testnet',
filter_mainnet: 'Mainnet',
filter_favorites: 'Favoritos',
filter_my_suggestions: 'Mis sugerencias',
filter_suggestions: 'Sugerencias',

faucets_storage_firestore: 'Los datos se almacenan en Firestore',

faucets_field_name: 'Nombre de la red *',
faucets_field_token: 'Token *',
faucets_field_desc: 'Descripción',
faucets_field_links: 'Enlaces (uno por línea) *',
faucets_field_logo: 'Logo (URL)',
faucets_field_type: 'Tipo',
faucets_field_net: 'Red',
faucets_field_reward: 'Recompensa (opcional)',
faucets_field_cooldown: 'Cooldown',
faucets_field_tags: 'Etiquetas (separadas por comas)',

faucets_ph_name: 'Ej: Ethereum Sepolia',
faucets_ph_token: 'Ej: ETH, BTC, SOL',
faucets_ph_desc: 'Descripción breve del faucet',
faucets_ph_links: 'https://faucet.example.com',
faucets_ph_logo: 'https://.../logo.png',
faucets_ph_reward: '0.5 ETH/día',
faucets_ph_cooldown: '24h',
faucets_ph_tags: 'airdrop, hot, multi',

faucets_type_free: 'Gratis',
faucets_type_paid: 'De pago',
faucets_net_testnet: 'Testnet',
faucets_net_mainnet: 'Mainnet',

login_prompt: 'Inicie sesión',
notify_subscribed_text: '¡Estás suscrito! Te avisaremos en el lanzamiento.',
notify_me_on_launch: 'Notificarme al lanzamiento',
connecting_status: 'Conectando...',
notify_subscribed_notification: '¡Suscripción confirmada! Te avisaremos cuando se abra la sección 🚀',

claim_label: 'Reclamar',
claimed_label: 'Completado',

faucets_exported: '{count} faucets exportados!',
faucets_imported_firebase: '{count} faucets importados a Firebase!',
faucets_saved_local_firebase_error: '{count} faucets guardados localmente. Error de Firebase: {error}',
faucets_imported_local: '{count} faucets importados localmente',
faucets_imported_localstorage: '{count} faucets importados a localStorage',

export_error: 'Error de exportación: {error}',
import_error: 'Error de importación: {error}',
no_export_data: 'No hay datos para exportar',
no_faucet_export_data: 'No hay datos para exportar ni en Firebase ni en localStorage',
invalid_faucet_format: 'Formato inválido — se esperaba un arreglo de faucets',
firebase_unavailable: 'Firebase no disponible',
firebase_functions_unavailable: 'Funciones de Firebase no disponibles',

guides_export_message: 'Exportando datos de guías...',
guides_import_message: 'Importando datos de guías...',
invalid_json_format: 'Formato JSON inválido. Se esperaba un arreglo de proyectos o un objeto con "projects"',
no_projects_in_file: 'No hay proyectos en el archivo',
firebase_not_initialized: 'Firebase no está inicializado',

loading_projects_modal: 'Cargando {count} proyectos...',
projects_imported_success: '✅ {count} proyectos importados con éxito!',
projects_migrated_firebase: '{count} proyectos migrados a Firebase!',
migrating_projects: 'Migrando {count} proyectos...',
no_migration_data: 'No hay datos para migrar',
projects_exported: '{count} proyectos exportados',

category_suggestion: '💡 Sugerencia',
category_bug: '🐛 Error',
category_question: '❓ Pregunta',
category_other: '💬 Otro',
category_technical: '🔧 Problema técnico',
category_technical_full: '🔧 Problema técnico',
category_account: '👤 Cuenta',
category_account_full: '👤 Problema con la cuenta',
category_partnership: '🤝 Colaboración',

time_minutes_short: 'min',
time_hours_short: 'h',
time_days_short: 'd',

no_messages_yet: 'Aún no tienes mensajes',
feedback_hint: 'Todos tus comentarios estarán disponibles en la página principal',
user_default_name: 'Usuario',

support_label: 'Soporte',
user_label: 'Usuario',
you_label: 'Tú',
project_label: 'Proyecto:',
support_label_chat: 'Soporte',
},

  en: {
    // ============ MAIN UI ============
    loading: 'LOADING LABORATORY...',
    experimental_zone: 'Experimental Zone',
    admin_mode: 'Admin Mode',
    active: 'Active',
    new: 'New',
    in_work: 'In Progress',
    done: 'Done',
    new_test: 'New Test',
    admin: 'Admin',
    login: 'Login',
    login_btn: 'Login',
    in_system: 'Online',
    filters: 'Filters',
    all_projects: 'All Projects',
    unvisited: 'Unvisited',
    today: 'Today',
    yesterday: 'Yesterday',
    active_filter: 'Active',
    daily_filter: 'Daily',
    favorites: 'Favorites',
    completed: 'Completed',
    archive: 'Archive',
    categories: 'Categories',
    all: 'All',
    all_categories: 'All categories',
    search_placeholder: 'Search projects...',
    
    // ============ HEADER MENU ============
    menu_activities: 'Activities',
    menu_guides: 'Guides',
    menu_community: 'Community',
    menu_calendar: 'Calendar',
    menu_exchanges: 'Exchanges',
    menu_news: 'News',
    menu_tools: 'Tools',
    menu_games: 'Games',
    menu_learning: 'Learning',
    menu_in_development: 'This section is under development',
    menu_coming_soon: 'Coming soon!',
    
    // ============ HEADER SPECIFIC UI ============
    version_label: 'v2.0',
    default_user_name: 'Researcher',
    admin_badge_label: 'Admin',
    profile_tooltip: 'Profile',
    crypto_ticker_attribution: 'Coins by Cryptorank',
    
    // ============ ADMIN BUTTONS TOOLTIPS ============
    btn_statistics: 'Statistics',
    btn_upload: 'Upload',
    btn_export: 'Export',
    btn_deleted: 'Deleted',
    btn_edit_mode: 'Edit Mode',
    btn_show_hidden: 'Show Hidden',
    btn_export_faucets: 'Export Faucets',
    btn_import_faucets: 'Import Faucets',
    btn_mode: 'Mode',
    btn_import: 'Import',
    close_btn: 'Close',
    delete_btn: 'Delete',
    cancel_btn: 'Cancel',
    save_btn: 'Save',
    
    // ============ COMING SOON MODAL ============
    coming_soon_status: 'In Development',
    coming_soon_title: 'Section will open soon',
    coming_soon_subtitle: 'We are already working on this section.<br>Subscribe — we will notify you at the moment of launch.',
    coming_soon_feature_1: 'Current information',
    coming_soon_feature_2: 'Interactive tools',
    coming_soon_feature_3: 'Community and chats',
    coming_soon_feature_4: 'Early access',
    coming_soon_notify_btn: 'Notify me on launch',
    coming_soon_connecting: 'Connecting...',
    coming_soon_subscribed: 'You are subscribed — we will notify you at launch!',
    coming_soon_notification_title: 'AirdropLab',
    coming_soon_notification_body: 'You are subscribed! We will notify you when the section launches 🚀',
    coming_soon_close: 'Close',
    all_projects: 'All Activities',
    airdrops_lotteries: 'Airdrops & Giveaways',
    faucets: 'Faucets',
    mainnets: 'Mainnets',
    testnets: 'Testnets',
    all_guides: 'All Guides',
    chat: 'Chat',
    leaderboard: 'Leaderboard',
    referrals: 'Referrals',
    forum: 'Forum',
    all_events: 'All Events',
    deadlines: 'Deadlines',
    listings: 'Listings',
    project_events: 'Project Events',
    all_exchanges: 'All Exchanges',
    crypto_news: 'Cryptocurrency News',
    analytics_news: 'Analytics News',
    ai_news: 'AI News',
    bitcoin_news: 'Bitcoin News',
    defi_news: 'DeFi News',
    gamefi_news: 'GameFi / Metaverse News',
    ido_news: 'IDO/ICO/IFO/IEO News',
    nft_news: 'NFT News',
    gas_calculator: 'Gas Calculator',
    bridges: 'Bridges',
    wallet_checker: 'Wallet Checker',
    what_is_airdrop: 'What is airdrop',
    how_setup_wallet: 'How to setup wallet',
    crypto_security: 'Crypto security',
    
    per_page: 'Per page:',
    by_added_date:    '📅 By date added',
    by_activity_date: '🔄 By activity date',
    date_day:   'Day',
    date_month: 'Mo.',
    date_year:  'Year',
    by_priority: '⭐ By priority',
    by_name: '🔤 By name',
    info_click_project: 'Click on the project name for details or "Guide" to start.',
    guest_warning: 'You are not logged in. Favorites and completed tasks are saved only in this browser.',
    loading_projects: 'Loading projects...',
    nothing_found: 'Nothing found',
    reset_filters: 'Reset filters',
    active_research: 'Active Research',
    go_to_guide: 'Go to Guide',
    guide: 'Guide',
    website: 'Website',
    status_active: 'Active',
    status_soon: 'Soon',
    status_ended: 'Ended',
    daily: 'Daily',
    high_priority: 'High',
    completed_badge: 'Done',
    last_click_today: 'today',
    last_click_yesterday: 'yesterday',
    about_project: 'About',
    activities: 'Activities',
    activities_not_added: 'No activities added.',
    added: 'Added:',
    start: 'Start',
    click: 'Click',
    end: 'End',
    resume: 'Resume',
    new_activity: 'NEW',
    ended_activity: 'ENDED',

    // ============ ADMIN / PROJECT FORM ============
    add_project: 'Add Project',
    edit_project: 'Edit Project',
    project_name: 'Project Name *',
    project_categories: 'Project Categories',
    new_category_placeholder: 'New category...',
    logo_url: 'Logo URL',
    guide_url: 'Guide Link',
    cryptorank_url: 'CryptoRank Link',
    twitter_url: 'Project Twitter',
    referral_link: 'Referral Link',
    short_desc: 'Short Description',
    status: 'Status',
    last_updated: 'Update Date',
    has_daily_quests: 'Has daily quests',
    project_activities: 'Project Activities',
    add_activity: 'Add Activity',
    no_activities: 'No activities added yet.',
    activity_name: 'Activity Name *',
    activity_date: 'Activity Date (start)',
    activity_end_date: 'End Date (auto-complete)',
    detailed_desc: 'Detailed Description',
    instructions_placeholder: 'Instructions...',
    save: 'Save',
    delete: 'Delete',

    // ============ AUTH ============
    login_title: 'Login',
    google: 'Google',
    twitter: 'Twitter',
    or_email: 'OR EMAIL',
    email: 'Email',
    password: 'Password',
    register: 'Register',

    // ============ FEEDBACK / MESSAGES ============
    feedback: 'Feedback',
    my_messages: 'My Messages',
    all_requests: 'All Requests',
    suggestion: '💡 Suggestion',
    bug: '🐛 Bug',
    question: '❓ Question',
    other: '💬 Other',
    message_placeholder: 'Describe your issue...',
    send: 'Send',
    close: 'Close',
    no_messages: 'No messages',
    your_answer: 'Your Answer',
    reply_placeholder: 'Write a reply...',
    chat_support: 'Support Chat',
    chat_user: 'User Chat',
    chat_with_user: 'Chat with User',
    chat_with_support: 'Support Chat',
    feedbacks_list: 'Feedback & Suggestions',
    my_suggestions: 'My Suggestions',
    edit_mode: 'Edit mode',
    add_faucet: 'Add faucet',
    to_top: 'Top',
    hide: 'Hide',
    loading_chat: 'Loading chat...',
    loading_feedbacks: 'Loading feedbacks...',
    topic: 'Topic',
    message: 'Message',
    start_new_feedback: 'Start new conversation',
    confirm_delete_chat: 'Delete chat?',
    delete_feedback: 'Delete',
    you: 'You',
    support: 'Support',
    user: 'User',
    all_feedbacks: 'All Requests',

    // ============ NOTIFICATIONS ============
    notifications: 'Notifications',
    no_notifications: 'No notifications',
    mark_read: 'Mark as read',
    jackpot_win: 'Jackpot Winner',
    wheel_of_fortune: 'Wheel of Fortune',
    info: 'Information',
    success: 'Success',
    important: 'Important',
    promo: 'Promotion',
    referral_program: 'Referral Program',
    system: 'System',
    notifications_mark_read: 'Mark all as read',
    notifications_clear_all: 'Clear all',
    loading_notifications: 'Loading notifications',

    // ============ ADMIN TOOLS ============
    view_stats: 'View Statistics',
    upload_firebase: 'Upload to Database',
    export_json: 'Export All Data',
    view_deleted: 'View Deleted',
    deleted_projects: 'Deleted Projects',
    restore: 'Restore',
    delete_permanent: 'Delete Forever',

    // ============ TOAST MESSAGES ============
    task_completed: 'Task completed!',
    task_uncompleted: 'Marked as incomplete',
    added_favorites: 'Added!',
    removed_favorites: 'Removed',
    login_required: 'Please login',
    link_not_found: 'Link not found',
    saved: 'Saved!',
    deleted: 'Deleted',
    restored: 'Restored!',
    error_occurred: 'Error',
    exported: 'Exported',
    uploaded: 'Uploaded',
    enter_message: 'Enter message',
    enter_name: 'Enter name',
    confirm_delete: 'Move to archive?',
    confirm_restore: 'Restore project?',
    enter_link: 'Insert link',
    no_access: 'No access',
    only_admin: 'Admin only',
    copied: 'Copied!',

    // ============ HERO ============
    hero_title: 'Crypto Opportunities Laboratory',
    hero_subtitle: 'AirdropLab is your hub for researching, testing, and participating in the most promising airdrops.',
    start_research: 'Start Research',
    collapse_hero: 'Collapse Welcome',
    expand_hero: 'Expand Welcome',

    // ============ COMMON ============
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    back: 'Back',
    preview: 'Preview',
    view: 'View',
    edit: 'Edit',
    no_description: 'No description',
    leave_feedback: 'Leave feedback',
    last_activity_date: 'Last activity date',
    mark_complete: 'Mark complete',
    add_favorites: 'Add to favorites',
    deleted_count: 'Deleted',
    no_deleted_projects: 'No deleted projects',
    new_category: 'New category...',
    project: 'Project',
    account_not_specified: 'Not specified',

    // ============ SUPPORT ============
    support_title: 'Support Center',
    my_support_requests: 'My Requests',
    all_support_requests: 'All Support Requests',
    no_support_requests: 'No support requests',
    start_support_request: 'Describe your issue — we will respond within 24 hours',
    support_message_placeholder: 'Describe your issue in detail...',
    cat_technical: 'Technical Issue',
    cat_account: 'Account Problem',

    // ============ FOOTER — BRAND ============
    footer_tagline: 'Crypto Opportunities Laboratory',
    footer_tagline_desc: 'We research, test and help participate in the most promising airdrops and testnets.',
    footer_live: 'Live',
    footer_updated: 'Updated',

    // ============ FOOTER — QUICK LINKS ============
    footer_quick_links: 'Quick Links',
    footer_home: 'Home',
    footer_projects: 'Projects',
    footer_guides: 'Guides',
    footer_support: 'Support',

    // ============ FOOTER — ACCOUNT SECTION ============
    footer_account_title: 'My Account',
    footer_my_account: 'My Account',
    footer_faq: 'FAQ',
    footer_language: 'Language',
    footer_active_users: 'active',
    footer_projects_count: 'projects',

    // ============ FOOTER — LEGAL ============
    footer_legal_title: 'Legal Information',
    footer_documents: 'Documents',
    footer_terms: 'Terms of Service',
    footer_privacy: 'Privacy Policy',
    footer_cookies: 'Cookie Policy',
    footer_disclaimer: 'Disclaimer',
    footer_contacts: 'Contacts',
    footer_worldwide: 'Worldwide (Remote)',

    // ============ FOOTER — NEWSLETTER ============
    footer_newsletter_title: 'Subscribe to Updates',
    footer_newsletter_desc: 'Get notified about new airdrops and testnets',
    footer_email_placeholder: 'Your email',
    footer_subscribe_btn: 'Subscribe',
    footer_privacy_note: 'We respect your privacy. Unsubscribe at any time.',
    footer_already_subscribed: 'Already subscribed ✓',
    footer_thanks: 'Thank you! ✓',
    footer_subscribed_toast: 'Subscribed successfully!',
    footer_already_toast: 'This email is already subscribed!',
    footer_error_toast: 'Error. Please try again.',
    footer_invalid_email: 'Please enter a valid email',
    footer_sending: 'Sending...',

    // ============ FOOTER — BOTTOM BAR ============
    footer_rights: 'All rights reserved.',
    footer_made_with: 'Made with',
    footer_love: 'love for crypto',
    footer_back_to_top: 'Back to top',
    footer_mobile_terms: 'Terms',
    footer_mobile_privacy: 'Privacy',

    // ============ FOOTER — NEWSLETTER MODAL ============
    newsletter_success_title: 'Subscribed!',
    newsletter_success_desc: 'You will receive notifications about new airdrops and important updates.',

    // ============ FOOTER — SUPPORT MODAL ============
    footer_support_title: 'Support Center',
    footer_support_subtitle: 'We will answer your question within 24 hours',
    footer_support_category: 'Subject *',
    footer_support_select: 'Select category',
    footer_support_technical: '🔧 Technical Issue',
    footer_support_account: '👤 Account Problem',
    footer_support_project: '📋 Project Question',
    footer_support_suggestion: '💡 Suggestion',
    footer_support_partnership: '🤝 Partnership',
    footer_support_other: '💬 Other',
    footer_support_name: 'Your Name',
    footer_support_email: 'Email *',
    footer_support_subject: 'Subject *',
    footer_support_subject_placeholder: 'Brief description of the issue',
    footer_support_message: 'Detailed Description *',
    footer_support_message_placeholder: 'Describe your issue in detail...',
    footer_support_submit: 'Submit Request',
    footer_support_sent: 'Request submitted! We will respond within 24 hours.',
    footer_support_login: 'Please log in!',
    footer_support_error: 'Submission error',
    footer_support_sending: 'Sending...',

    // ============ FOOTER — FAQ MODAL ============
    footer_faq_title: 'Frequently Asked Questions',
    footer_faq_subtitle: 'Answers to popular questions about AirdropLab',
    footer_faq_not_found: "Didn't find an answer?",
    footer_faq_contact: 'Contact our support team',
    footer_faq_write: 'Write to Support',

    // ============ FAQ — QUESTIONS & ANSWERS ============
    faq_q1: 'How to start participating in airdrops?',
    faq_a1: 'Register on AirdropLab, select a project from the list and follow the guide instructions. Complete tasks and track updates.',
    faq_q2: 'What is a testnet and why participate?',
    faq_a2: 'A testnet is a test blockchain network before its mainnet launch. Participating in testnets allows you to earn project tokens for free, which may become valuable at mainnet launch.',
    faq_q3: 'How to avoid scam projects?',
    faq_a3: 'We verify all projects before adding them, but always do your own research. Never enter private keys, never send ETH to unknown addresses, and never trust projects without a security audit.',
    faq_q4: 'Why is a project not showing in the list?',
    faq_a4: 'The project may be archived (completed), under moderation, or deleted. Also make sure you are using the correct filters in the sidebar.',
    faq_q5: 'How to get help with a project?',
    faq_a5: 'Use the "Support" section in the footer or leave feedback on the specific project page. Our team responds within 24 hours.',
    faq_q6: 'Can I add my own project?',
    faq_a6: 'Yes, you can suggest a project through the feedback form or by writing to Telegram. We will review all suggestions.',

    // ============ FOOTER — GUIDES MODAL ============
    footer_guides_title: 'Guides',
    footer_guides_subtitle: 'Step-by-step instructions for participating in testnets',
    footer_guide_active: 'Active',
    footer_guide_go: 'Go to Guide',
    footer_guide_lock: 'Complete tasks on the main page to access guides',

    // ============ FOOTER — GUIDES DATA ============
    guide_arc_desc: 'Testnet by Circle — creators of USDC',
    guide_tempo_desc: 'L2 solution by MetaStreet',
    guide_robinhood_desc: 'Testnet by Robinhood — well-known broker',
    guide_difficulty_easy: 'Easy',
    guide_difficulty_medium: 'Medium',
    guide_difficulty_hard: 'Hard',

    // ============ FOOTER — ACCOUNT MODAL ============
    footer_account_manage: 'Manage profile and settings',
    footer_account_not_logged: 'Not Logged In',
    footer_account_login_desc: 'Log in to manage your profile',
    footer_account_firstname: 'First Name',
    footer_account_lastname: 'Last Name',
    footer_account_username: 'Username',
    footer_account_telegram: 'Telegram',
    footer_account_birthdate: 'Date of Birth',
    footer_account_gender: 'Gender',
    footer_account_male: 'Male',
    footer_account_female: 'Female',
    footer_account_other_gender: 'Other',
    footer_account_country: 'Country',
    footer_account_bio: 'About Me',
    footer_account_bio_placeholder: 'Tell us about yourself...',
    footer_account_cancel: 'Cancel',
    footer_account_save: 'Save',
    footer_account_saved: 'Profile saved!',
    footer_account_saved_local: 'Profile saved locally',
    footer_account_photo: 'Photo updated!',

footer_solana_placeholder: 'Your Solana address...',
footer_evm_hint: '(Ethereum, BSC, Polygon...)',
footer_evm_label: 'EVM Address',
footer_solana_label: 'Solana Address',
    // ============ FOOTER — ACCOUNT EXTRA FIELDS ============
    footer_address: 'address',
    footer_solana_placeholder: 'Your Solana address...',
    footer_crypto_wallets: 'Crypto Addresses',
    footer_social_networks: 'Social Networks',
    account_select_country: 'Select or type country...',
    account_country_other_input: 'Enter country name',
    account_crypto_addresses: 'Crypto Addresses',
    account_evm_address: 'EVM Address',
    account_evm_hint: '(Ethereum, BSC, Polygon...)',
    account_sol_address: 'Solana Address',
    account_sol_placeholder: 'Your Solana address...',
    account_social_networks: 'Social Networks',
    account_city: 'City',
    account_city_placeholder: 'Your city',

    // ============ FOOTER — LEGAL MODALS ============
    footer_legal_updated: 'Updated:',
    footer_legal_close: 'Close',
    legal_terms_title: 'Terms of Service',
    legal_privacy_title: 'Privacy Policy',
    legal_cookie_title: 'Cookie Policy',
    legal_disclaimer_title: 'Disclaimer',
    legal_updated_date: 'March 07, 2026',
    legal_close_btn: 'Close',

    // ============ REFERRAL PROGRAM ============
    account_ref_program: 'Referral Program',
    account_your_ref_code: 'Your referral code',
    account_invited_count: 'Invited',
    account_people_short: 'people',
    account_invited_by: 'Invited by:',
    account_enter_ref_code: 'Enter referral code',
    account_apply: 'Apply',
    account_ref_bonus_text: 'You get',
    account_ref_bonus_amount: '+25 Reagents',
    account_generating: 'Generating...',
    account_invited_label: 'people',
    invited_by_label: 'Invited by:',
    ref_code_input_placeholder: 'AL-XXXXXX',
    ref_code_copied: 'Referral code copied!',
    copy_failed: 'Copy failed',
    ref_wrong_format: 'Invalid code format (AL-XXXXXX)',
    ref_login_required: 'Please log in',
    ref_not_found: 'Code not found',
    ref_own_code: 'Cannot use your own code',
    ref_applied: '🧪 Code applied! +50 Reagents for you and +25 for referrer!',
    ref_error: 'Error: ',

    // ============ REAGENTS ============
    reagents_title: 'Reagents',
    reagents_section_title: 'Reagents',
    reagents_rgt_unit: 'RGT',
    account_balance_label: 'Your balance',
    account_streak_label: 'Streak',
    account_days_short: 'days',
    account_get_reagents: 'Claim Reagents',

    // ============ CLAIM MODAL ============
    claim_title: 'Daily Reagents',
    claim_updated_utc: 'Resets at 00:00 UTC',
    claim_loading: 'Loading...',
    claim_error_close: 'Close',
    claim_balance_label: 'Your balance',
    claim_streak_label: 'Streak',
    claim_streak_broken_title: 'Streak reset!',
    claim_streak_broken_desc: 'You missed a day. Starting over!',
    claim_week_progress: 'Weekly progress',
    claim_until_bonus: 'Until {days}-day bonus',
    claim_days_left: '{days} days',
    claim_today_reward: 'Today you will receive',
    claim_streak_will_be: 'Streak will become:',
    claim_get_btn: 'Claim Reagents',
    claim_claiming: 'Claiming...',
    claim_already_title: 'Already claimed!',
    claim_next_at: 'Next claim opens at',
    claim_rewards_table: 'Streak reward table',
    claim_after_60: 'After 60 days: every 30 days +100 RGT bonus',
    claim_close_btn: 'Close',
    claim_success_title: 'Reagents claimed!',
    claim_streak_reset: 'Streak reset — starting over!',
    claim_credited: 'Credited',
    claim_reagents_unit: 'Reagents',
    claim_next_claim: 'Next claim:',
    claim_great_btn: 'Great!',
    claim_time_left: 'Left: {h}h {m}m',
    claim_reset_in: 'reset in',
    claim_balance_short: 'Balance',
    claim_streak_short: 'Streak',
    claim_to_bonus_short: 'To bonus',
// ============ REAGENTS — EXTRA KEYS ============
claim_login_required: 'Please log in',
claim_load_error: 'Failed to load data',
claim_firebase_error: 'Firebase not ready',
claim_status_error: 'Failed to get status',
claim_bonus_word: 'bonus',
claim_days_unit: 'd.',
streak_months_suffix: 'months!',
claim_btn_label: 'Claim',
claim_btn_tooltip_available: 'Claim daily Reagents',
claim_btn_tooltip_cooldown: 'Next claim at 00:00 UTC',
    // ============ WEEK DAYS ============
    week_mon: 'Mon',
    week_tue: 'Tue',
    week_wed: 'Wed',
    week_thu: 'Thu',
    week_fri: 'Fri',
    week_sat: 'Sat',
    week_sun: 'Sun',

    // ============ STREAK BONUS LABELS ============
    streak_week: '🔥 One Week!',
    streak_month: '⚡ One Month!',
    streak_2months: '💎 2 Months!',
    streak_quarter: '👑 Quarter!',
    streak_4months: '🌟 4 Months!',
    streak_5months: '🚀 5 Months!',
    streak_halfyear: '🏆 Half Year!',

    // ============ SUPPORT FORM (FOOTER) ============
    support_form_title: 'Support Center',
    support_form_subtitle: 'We will respond within 24 hours',
    support_select_category: 'Select category',
    support_cat_technical: '🔧 Technical Issue',
    support_cat_account: '👤 Account Problem',
    support_cat_project: '📋 Project Question',
    support_cat_suggestion: '💡 Suggestion',
    support_cat_partnership: '🤝 Partnership',
    support_cat_other: '💬 Other',
    support_your_name: 'Your Name',
    support_subject_label: 'Subject',
    support_subject_placeholder: 'Brief description',
    support_desc_label: 'Description',
    support_desc_placeholder: 'Describe your issue in detail...',
    support_cancel: 'Cancel',
    support_submit: 'Send',
    support_sending_text: 'Sending...',
    support_sent_ok: 'Request submitted! We will respond within 24 hours.',
    support_need_login: 'Please log in to submit a request',
    support_select_cat_warn: 'Please select a category',
    support_send_error: 'Submission error. Please try again.',

    // ============ SUPPORT TICKET ============
    ticket_sending: 'Sending...',
    ticket_sent: 'Request submitted!',
    ticket_error: 'Submission error',
    ticket_submit_btn: 'Submit Request',

    // ============ NOTIFICATIONS PAGE ============
    notif_title: 'Notifications',
    notif_clear_all: 'Clear all',
    notif_empty_title: 'No notifications',
    notif_empty_desc: 'Notifications about new airdrops will appear here',
    notif_mark_read: 'Mark as read',
    time_just_now: 'just now',
    time_min_ago: 'min ago',
    time_hour_ago: 'h ago',
    time_day_ago: 'd ago',

    // ============ AVATAR UPLOAD ============
    avatar_too_large: 'File too large (max 2MB)',
    avatar_uploading: 'Uploading photo...',
    avatar_local_only: 'Photo (local only)',

    // ============ TUTORIALS ============
    tutorials_toast: 'Tutorials are available in the projects section',

    // ============ FOOTER TOASTS ============
    footer_scroll_top_toast: 'Back to top',
    footer_language_changed: 'Language changed',

    // ============ COUNTRY PICKER ============
    country_manual_input: 'Enter country name',
    // ============ MLM REFERRAL SYSTEM ============
ref_already_used: 'You have already used a referral code',
passive_income_title: 'Passive referral income',
passive_invited: 'Invited',
passive_total_earned: 'Earned',
passive_pending: 'Pending',
passive_next_payout: 'Next payout',
passive_paid_this_week: 'Paid this week',
passive_days_left: 'In {days} d. (Mon UTC)',
passive_no_pending: 'No pending income',
passive_levels_title: 'Percent structure',
passive_level: 'Level',
passive_payout_schedule: 'Payout every Monday at 00:00 UTC',
passive_payout_toast: 'Passive income credited',
passive_credited_to_upstream: 'Credited to upstream chain:',

    // ============ FAUCETS PAGE ============
    faucets_title: 'Faucets <span style="color:#22d3ee;">(Faucets)</span>',
    faucets_updated: 'Updated',
    faucets_free: 'Free',
    faucets_paid: 'Paid',
    faucets_testnets: 'Testnets',
    faucets_mainnets: 'Mainnets',
    faucets_filter_free: 'Free',
    faucets_filter_paid: 'Paid',
    faucets_filter_testnet: 'Testnets',
    faucets_filter_mainnet: 'Mainnets',
    faucets_sort_name: '🔤 By name',
    faucets_sort_popularity: '🔥 By popularity',
    faucets_sort_rating: '⭐ By rating',
    faucets_sort_new: '🆕 By newest',
    faucets_search_placeholder: 'Search by network or token...',
    faucets_suggest_btn: 'Suggest faucet',
    faucets_suggest_title: 'Suggest a new faucet',
    faucets_suggest_ph_link: 'https://faucet.example.com',
    faucets_suggest_hint: 'Suggestions go to moderation. After approval the faucet will appear in the list.',
    faucets_login_hint: 'Login is required for favorites and ratings.',
    faucets_rating_title: 'Faucet rating',
    faucets_rating_hint: 'Rating is available to all registered users. 0 = bad, 10 = great.',
    faucets_tips_title: 'Tips',
    faucets_tip_1: 'Use a separate wallet for testnets — it is safer',
    faucets_tip_2: 'Testnet tokens have no real value, but activity may count for airdrops',
    faucets_tip_3: 'Some faucets require a minimum mainnet balance for verification',
    faucets_tip_4_prefix: 'Track progress in',
    faucets_tip_4_link: 'AirdropLab tracker',
    faucets_admin_add: 'Add faucet',
    faucets_admin_edit_mode: 'Edit mode',
    faucets_admin_moderation: 'Moderate suggestions',
    faucets_admin_pending_title: 'Suggestions (pending)',
    faucets_admin_seed: 'Seed database',
    faucets_admin_hidden: 'Hidden',
    faucets_admin_show_hidden: 'Show hidden',
    filter_hidden: 'Hidden',
    filter_all: 'All',
    filter_free: 'Free',
    filter_paid: 'Paid',
    filter_testnet: 'Testnets',
    filter_mainnet: 'Mainnets',
    filter_favorites: 'Favorites',
    filter_my_suggestions: 'My Suggestions',
    filter_suggestions: 'Suggestions',
    faucets_storage_firestore: 'Data is stored in Firestore',
    faucets_field_name: 'Network name *',
    faucets_field_token: 'Token *',
    faucets_field_desc: 'Description',
    faucets_field_links: 'Links (one per line) *',
    faucets_field_logo: 'Logo (URL)',
    faucets_field_type: 'Type',
    faucets_field_net: 'Network',
    faucets_field_reward: 'Reward (optional)',
    faucets_field_cooldown: 'Cooldown',
    faucets_field_tags: 'Tags (comma separated)',
    faucets_ph_name: 'Example: Ethereum Sepolia',
    faucets_ph_token: 'Example: ETH, BTC, SOL',
    faucets_ph_desc: 'Short faucet description',
    faucets_ph_links: 'https://faucet.example.com\nhttps://another.example.com',
    faucets_ph_logo: 'https://.../logo.png',
    faucets_ph_reward: '0.5 ETH/day',
    faucets_ph_cooldown: '24h',
    faucets_ph_tags: 'airdrop, hot, multi',
    faucets_type_free: 'Free',
    faucets_type_paid: 'Paid',
    faucets_net_testnet: 'Testnet',
    faucets_net_mainnet: 'Mainnet',

    // ============ DYNAMIC MESSAGES ============
    login_prompt: 'Login',
    notify_subscribed_text: 'You are subscribed — we will notify you at launch!',
    notify_me_on_launch: 'Notify me on launch',
    connecting_status: 'Connecting...',
    notify_subscribed_notification: 'You are subscribed! We will notify you when the section launches 🚀',
    claim_label: 'Claim',
    claimed_label: 'Done',
    faucets_exported: 'Exported {count} faucets!',
    faucets_imported_firebase: 'Imported {count} faucets to Firebase!',
    faucets_saved_local_firebase_error: 'Saved {count} faucets locally. Firebase error: {error}',
    faucets_imported_local: 'Imported {count} faucets locally',
    faucets_imported_localstorage: 'Imported {count} faucets to localStorage',
    export_error: 'Export error: {error}',
    import_error: 'Import error: {error}',
    no_export_data: 'No data to export',
    no_faucet_export_data: 'No data to export in Firebase or localStorage',
    invalid_faucet_format: 'Incorrect data format - array of faucets expected',
    firebase_unavailable: 'Firebase is unavailable',
    firebase_functions_unavailable: 'Firebase functions are unavailable',
    guides_export_message: 'Exporting guides data...',
    guides_import_message: 'Importing guides data...',
    invalid_json_format: 'Invalid JSON format. Array of projects or object with "projects" field expected',
    no_projects_in_file: 'No projects in file',
    firebase_not_initialized: 'Firebase not initialized',
    loading_projects_modal: 'Loading {count} projects...',
    projects_imported_success: '✅ Successfully imported {count} projects!',
    projects_migrated_firebase: 'Migrated {count} projects to Firebase!',
    migrating_projects: 'Migrating {count} projects...',
    no_migration_data: 'No data to migrate',
    projects_exported: 'Exported {count} projects',
    
    // ============ CATEGORY LABELS ============
    category_suggestion: '💡 Suggestion',
    category_bug: '🐛 Bug',
    category_question: '❓ Question',
    category_other: '💬 Other',
    category_technical: '🔧 Tech. Issue',
    category_technical_full: '🔧 Technical Problem',
    category_account: '👤 Account',
    category_account_full: '👤 Account Problem',
    category_partnership: '🤝 Partnership',
    
    // ============ TIME FORMATTING ============
    time_just_now: 'just now',
    time_minutes_short: 'min',
    time_hours_short: 'h',
    time_days_short: 'd',
    
    // ============ FEEDBACK MESSAGES ============
    no_messages_yet: 'You have no messages yet',
    feedback_hint: 'All your feedback and suggestions will be available on the main page',
    user_default_name: 'User',
    support_label: 'Support',
    user_label: 'User',
    you_label: 'You',
    project_label: 'Project: ',
    support_label_chat: 'Support',
  }
};

// Текущий язык
let currentLang = localStorage.getItem('airdropLabLang') || 'ru';

// Функция перевода
function t(key) {
  return translations[currentLang]?.[key] || translations['ru'][key] || key;
}

// Инициализация при загрузке страницы
function initializeLanguage() {
  // Устанавливаем язык в HTML
  document.documentElement.lang = currentLang;
  
  // Обновляем интерфейс
  updateAllTranslations();
  updateLanguageButton();
  
  // Обновляем глобальную переменную
  window.currentLang = currentLang;
  
  console.log('Language initialized:', currentLang);
  
  // Загружаем проекты с небольшой задержкой чтобы все функции были доступны
  setTimeout(() => {
    if (currentLang === 'en') {
      loadProjectsFromJSON('projects_en');
    } else if (currentLang === 'tr') {
      loadProjectsFromJSON('projects_tr');
    } else if (currentLang === 'es') {
      loadProjectsFromJSON('projects_es');
    } else {
      // Для русского языка сбрасываем на Firebase
      if (window.resetToDefaultDataSource) {
        window.resetToDefaultDataSource();
      }
    }
  }, 500);
}

// Вызываем инициализацию при загрузке страницы
document.addEventListener('DOMContentLoaded', initializeLanguage);

// Также вызываем если DOM уже загружен
if (document.readyState !== 'loading') {
  initializeLanguage();
}

// Установить язык
function setLanguage(lang) {
  if (translations[lang]) {
    currentLang = lang;
    localStorage.setItem('airdropLabLang', lang);
    document.documentElement.lang = lang;
    updateAllTranslations();
    
    // Загружаем проекты для соответствующего языка
    if (lang === 'en') {
      loadProjectsFromJSON('projects_en');
    } else if (lang === 'tr') {
      loadProjectsFromJSON('projects_tr');
    } else if (lang === 'es') {
      loadProjectsFromJSON('projects_es');
    } else {
      // Сбрасываем на источник по умолчанию для русского языка
      if (window.resetToDefaultDataSource) {
        window.resetToDefaultDataSource();
      }
    }
    
    updateLanguageButton();
    
    // Обновляем глобальную переменную
    window.currentLang = currentLang;

    // Вызываем перезагрузку кранов с новыми переводами
    if (typeof window.reloadFaucetsWithNewLanguage === 'function') {
      window.reloadFaucetsWithNewLanguage();
    }
    
    // Обновляем видимость полей редактирования
    if (typeof window.updateEditFieldsVisibility === 'function') {
      window.updateEditFieldsVisibility();
    }
    
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
    return true;
  }
  return false;
}


// Загрузка проектов из JSON файла для конкретного языка
async function loadProjectsFromJSON(langCode) {
  console.log(`Loading ${langCode} projects...`);
  try {
    const response = await fetch(`./data/${langCode}.json`);
    if (response.ok) {
      const data = await response.json();
      if (data.projects && window.setEnglishProjectsData) {
        window.setEnglishProjectsData(data.projects);
        console.log(`Successfully loaded ${data.projects.length} ${langCode} projects`);
      }
    } else {
      console.log(`${langCode} projects file not found`);
    }
  } catch (e) {
    console.log(`Error loading ${langCode} projects:`, e);
  }
}

// Сохраняем старую функцию для совместимости
async function loadEnglishProjects() {
  return loadProjectsFromJSON('projects_en');
}

// Обновление всех переводов на странице
function updateAllTranslations() {
  // Переводы для элементов с data-translate
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    const translated = t(key);
    if (translated && translated !== key) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translated;
      } else if (el.tagName === 'OPTION') {
        el.textContent = translated;
      } else {
        el.innerHTML = translated;
      }
    }
  });
  // Обновление "Проект:" в модальном окне feedback
const projectLabel = document.getElementById('feedbackProjectLabel');
if (projectLabel) {
  projectLabel.textContent = t('project') + ': ';
}
  // Переводы для title атрибутов
  document.querySelectorAll('[data-translate-title]').forEach(el => {
    const key = el.getAttribute('data-translate-title');
    const translated = t(key);
    if (translated && translated !== key) el.setAttribute('title', translated);
  });
  
  updateLanguageButton();
  
  // Перерисовываем проекты с новыми переводами
  if (typeof window.applyFilters === 'function') {
    window.applyFilters();
  }
  // Обновляем переводы футера
if (typeof window.updateFooterTranslations === 'function') {
    window.updateFooterTranslations();
}
// Обновляем динамические элементы в модальном окне Coming Soon
if (typeof window.updateComingSoonTranslations === 'function') {
    window.updateComingSoonTranslations();
}
  // Обновляем динамические модальные окна
  updateFeedbackModalTranslations();
  updateDateFilterMonths();
}

// Обновляем переводы в модальных окнах feedback
// Обновление переводов в модальных окнах feedback
function updateFeedbackModalTranslations() {
  // Обновляем форму нового обращения
  const feedbackTextPlaceholder = document.getElementById('feedbackText');
  if (feedbackTextPlaceholder) {
    feedbackTextPlaceholder.placeholder = t('message_placeholder');
  }
  
  const replyInput = document.getElementById('feedbackUserReplyText');
  if (replyInput) {
    replyInput.placeholder = t('reply_placeholder');
  }
}

// Обновляем отображение кнопки языка
function updateLanguageButton() {
  const deskLang = document.getElementById('langBtn');
  const mobLangBtn = document.getElementById('mobLangBtn');
  
  if (deskLang) {
    const flag = deskLang.querySelector('.lang-flag');
    const text = deskLang.querySelector('.lang-text');
    
    // Обновляем флаг - заменяем классы
    if (flag) {
      // Удаляем все классы флагов
      flag.className = flag.className.replace(/fi-\w+/g, '');
      // Добавляем новый класс флага
      flag.classList.add('fi', getLanguageFlag(currentLang));
    }
    
    // Обновляем текст
    if (text) text.textContent = currentLang.toUpperCase();
  }
  
  if (mobLangBtn) {
    const mobFlag = mobLangBtn.querySelector('.mob-lang-flag');
    const mobText = mobLangBtn.querySelector('.mob-lang-text');
    
    // Обновляем флаг - заменяем классы
    if (mobFlag) {
      // Удаляем все классы флагов
      mobFlag.className = mobFlag.className.replace(/fi-\w+/g, '');
      // Добавляем новый класс флага
      mobFlag.classList.add('fi', getLanguageFlag(currentLang));
    }
    
    // Обновляем текст
    if (mobText) mobText.textContent = currentLang.toUpperCase();
  }
}

// Функция получения флага языка
function getLanguageFlag(lang) {
  const flags = {
    'ru': 'fi-ua',
    'en': 'fi-gb', 
    'tr': 'fi-tr',
    'es': 'fi-es'
  };
  return flags[lang] || 'fi-ua';
}

// Переключение языка
window.toggleLang = function() {
  if (currentLang === 'ru') {
    setLanguage('en');
  } else {
    setLanguage('ru');
    // Сбрасываем на источник по умолчанию для русского языка
    if (window.resetToDefaultDataSource) {
      window.resetToDefaultDataSource();
    }
  }
};

// Функция для установки английских данных проектов
window.setEnglishProjectsData = function(englishProjects) {
  if (englishProjects && Array.isArray(englishProjects)) {
    window.englishProjectsData = englishProjects;
    console.log('English data saved:', englishProjects.length, 'projects');
  }
};

// Функция для сброса на источник по умолчанию
window.resetToDefaultDataSource = function() {
  if (window.resetToDefaultDataSourceInternal) {
    window.resetToDefaultDataSourceInternal();
  }
};

// Функция для перевода (доступна глобально)
window.t = t;

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
  document.documentElement.lang = currentLang;
  updateLanguageButton();
  
  if (currentLang === 'en') {
    loadEnglishProjects();
  }
});
// Обновляем месяцы в фильтре дат без полной перестройки
function updateDateFilterMonths() {
  const monthEl = document.getElementById('dateFilterMonth');
  const dayEl   = document.getElementById('dateFilterDay');
  const yearEl  = document.getElementById('dateFilterYear');

  const monthsRu = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];
  const monthsEn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const months = currentLang === 'en' ? monthsEn : monthsRu;

  if (monthEl) {
    const saved = monthEl.value;
    // Обновляем только текст опций 1-12
    monthEl.querySelectorAll('option:not([value=""])').forEach((opt, i) => {
      if (months[i]) opt.textContent = months[i];
    });
    // Placeholder переведётся через data-translate, но обновим и здесь
    const placeholder = monthEl.querySelector('option[value=""]');
    if (placeholder) placeholder.textContent = t('date_month');
    monthEl.value = saved;
  }

  // Placeholder для дня и года
  if (dayEl) {
    const ph = dayEl.querySelector('option[value=""]');
    if (ph) ph.textContent = t('date_day');
  }
  if (yearEl) {
    const ph = yearEl.querySelector('option[value=""]');
    if (ph) ph.textContent = t('date_year');
  }
}
// Экспорт глобальных переменных
window.currentLang = currentLang;
window.translations = translations;
window.setLanguage = setLanguage;
