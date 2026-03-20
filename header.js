// ============================================================
// header.js — AirdropLab (Fixed Navigation + Auth Sync + Modal)
// ============================================================
(function () {

  function injectHeader() {
    const container = document.getElementById('site-header');
    if (!container) return;

    container.innerHTML = `
      <header class="relative overflow-hidden" style="max-width:100vw;">
        <div class="absolute inset-0 bg-gradient-to-r from-slate-900 via-cyan-900/20 to-slate-900"></div>
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgzNCwyMTEsMjM4LDAuMSkiLz48L3N2Zz4=')] opacity-50"></div>
        <div class="absolute inset-0 backdrop-blur-xl bg-slate-900/85 border-b border-cyan-500/20"></div>

        <div class="relative max-w-[1600px] mx-auto px-4 py-3">

          <!-- ══════════════════════════════════════════════
               DESKTOP (md+): ОРИГИНАЛЬНЫЙ LAYOUT БЕЗ ИЗМЕНЕНИЙ
               ══════════════════════════════════════════════ -->
          <div class="hidden md:flex flex-row justify-between items-center gap-4">

            <!-- Логотип -->
            <div class="flex items-center gap-4">
              <div class="relative group">
                <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"></div>
                <a href="index.html" class="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-400/50 flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-2xl shadow-cyan-500/30 block">
                  <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none">
                    <path d="M9 3h6M12 3v5M8 8l-2 8c-.5 2 1 4 3 4h6c2 0 3.5-2 3-4l-2-8" stroke="url(#gradient1)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="10" cy="14" r="1" fill="#22d3ee" opacity="0.6"><animate attributeName="cy" values="14;12;14" dur="2s" repeatCount="indefinite"/></circle>
                    <circle cx="14" cy="16" r="1" fill="#06b6d4" opacity="0.8"><animate attributeName="cy" values="16;13;16" dur="2.5s" repeatCount="indefinite"/></circle>
                    <circle cx="12" cy="15" r="0.5" fill="#22d3ee"><animate attributeName="cy" values="15;11;15" dur="1.8s" repeatCount="indefinite"/></circle>
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#22d3ee"/>
                        <stop offset="100%" style="stop-color:#06b6d4"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </a>
              </div>
              <a href="index.html" class="group">
                <div class="flex items-center gap-2">
                  <h1 class="text-2xl font-black tracking-tight">
                    <span class="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:via-blue-300 group-hover:to-cyan-200 transition-all">Airdrop</span><span class="text-white group-hover:text-cyan-100 transition-all">Lab</span>
                  </h1>
                  <span class="px-2 py-0.5 bg-cyan-500/20 border border-cyan-400/30 rounded-md text-[10px] font-bold text-cyan-300 uppercase tracking-wider">v2.0</span>
                </div>
                <p class="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2 font-medium">
                  <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-lg shadow-emerald-400/50"></span>
                  </span>
                  <span data-translate="experimental_zone">Экспериментальная зона</span>
                </p>
              </a>
            </div>

            <!-- Статистика -->
            <div class="flex gap-5 text-sm">
              <div class="text-center group cursor-pointer relative" onclick="typeof filterProjects==='function'&&filterProjects('active')">
                <div class="absolute inset-0 bg-emerald-500/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="relative px-3 py-1">
                  <div class="text-2xl font-black bg-gradient-to-br from-emerald-400 to-emerald-600 bg-clip-text text-transparent" id="statActive">0</div>
                  <div class="text-slate-400 text-[10px] uppercase tracking-wider font-bold group-hover:text-emerald-400 transition-colors" data-translate="active">Активных</div>
                </div>
              </div>
              <div class="text-center group cursor-pointer relative" onclick="typeof filterProjects==='function'&&filterProjects('today')">
                <div class="absolute inset-0 bg-cyan-500/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="relative px-3 py-1">
                  <div class="text-2xl font-black bg-gradient-to-br from-cyan-400 to-cyan-600 bg-clip-text text-transparent" id="statToday">0</div>
                  <div class="text-slate-400 text-[10px] uppercase tracking-wider font-bold group-hover:text-cyan-400 transition-colors" data-translate="new">Новых</div>
                </div>
              </div>
              <div class="text-center group cursor-pointer relative" onclick="typeof filterProjects==='function'&&filterProjects('favorites')">
                <div class="absolute inset-0 bg-orange-500/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="relative px-3 py-1">
                  <div class="text-2xl font-black bg-gradient-to-br from-orange-400 to-orange-600 bg-clip-text text-transparent" id="statFavorites">0</div>
                  <div class="text-slate-400 text-[10px] uppercase tracking-wider font-bold group-hover:text-orange-400 transition-colors" data-translate="in_work">В работе</div>
                </div>
              </div>
              <div class="text-center group cursor-pointer relative" onclick="typeof filterProjects==='function'&&filterProjects('completed')">
                <div class="absolute inset-0 bg-blue-500/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="relative px-3 py-1">
                  <div class="text-2xl font-black bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text text-transparent" id="statCompleted">0</div>
                  <div class="text-slate-400 text-[10px] uppercase tracking-wider font-bold group-hover:text-blue-400 transition-colors" data-translate="done">Готово</div>
                </div>
              </div>
            </div>

            <!-- Кнопки справа -->
            <div class="flex gap-2 items-center">
              <button onclick="window.openClaimModal&&window.openClaimModal()" id="headerClaimBtn"
                class="relative flex items-center gap-2 px-3 py-2
                       bg-gradient-to-r from-cyan-600/20 to-blue-600/20
                       hover:from-cyan-600/40 hover:to-blue-600/40
                       border border-cyan-500/30 hover:border-cyan-400/60
                       rounded-xl text-sm text-cyan-400 hover:text-white transition-all group">
                <span class="text-base">🧪</span>
                <span class="hidden sm:inline font-medium text-xs" data-translate="claim_btn_label">Клейм</span>
                <span id="claimDot" class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900 hidden animate-pulse"></span>
              </button>

              <div id="notificationPanel" class="relative">
                <button onclick="typeof showNotifications==='function'&&showNotifications()"
                  class="relative p-2.5 text-slate-400 hover:text-cyan-400 transition-all rounded-xl hover:bg-cyan-500/10 group border border-transparent hover:border-cyan-500/30">
                  <i class="fas fa-bell text-lg group-hover:animate-bounce"></i>
                  <span id="notificationBadge" class="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-xs flex items-center justify-center hidden font-bold shadow-lg shadow-red-500/50 animate-pulse">0</span>
                </button>
              </div>

              <div id="generalFeedbackPanel" class="hidden">
                <button onclick="typeof openFeedbackListModal==='function'&&openFeedbackListModal()"
                  class="relative p-2.5 text-slate-400 hover:text-purple-400 transition-all rounded-xl hover:bg-purple-500/10 group border border-transparent hover:border-purple-500/30">
                  <i class="fas fa-comment-dots text-lg group-hover:animate-bounce"></i>
                  <span id="feedbackBadge" class="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs flex items-center justify-center hidden font-bold shadow-lg shadow-purple-500/50">0</span>
                </button>
              </div>

              <button onclick="typeof toggleLang==='function'&&toggleLang()" id="langBtn"
                class="flex items-center gap-2 px-3 py-2 rounded-lg border transition-all">
                <span class="lang-flag"></span>
                <span class="lang-text">ENG</span>
              </button>

              <div id="adminPanel" class="flex gap-2 items-center border-l border-slate-700/50 pl-3 ml-1" style="display:none;">
                <button onclick="typeof openAddModal==='function'&&openAddModal()"
                  class="px-3 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg text-xs font-bold transition-all hover:scale-105 shadow-lg shadow-cyan-500/30">
                  <i class="fas fa-flask mr-1"></i>
                  <span class="hidden sm:inline" data-translate="new_test">Новый тест</span>
                </button>
                <button onclick="typeof openStats==='function'&&openStats()" class="admin-action-btn admin-btn-orange" data-translate-title="view_stats"><i class="fas fa-chart-pie text-base"></i></button>
                <button onclick="typeof migrateToFirestore==='function'&&migrateToFirestore()" class="admin-action-btn admin-btn-purple" data-translate-title="upload_firebase"><i class="fas fa-cloud-upload-alt text-base"></i></button>
                <button onclick="typeof exportAllData==='function'&&exportAllData()" class="admin-action-btn admin-btn-emerald" data-translate-title="export_json"><i class="fas fa-file-export text-base"></i></button>
                <button onclick="typeof openDeletedProjects==='function'&&openDeletedProjects()" class="admin-action-btn admin-btn-red" data-translate-title="view_deleted"><i class="fas fa-trash-restore text-base"></i></button>
                <span class="px-2.5 py-1 bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-md text-[10px] font-black text-white uppercase">
                  <i class="fas fa-user-shield mr-1"></i>Admin
                </span>
              </div>

              <div id="authPanel" class="flex items-center gap-3 border-l border-slate-700/50 pl-3 ml-1">
                <div id="loggedOutView">
                  <button onclick="typeof openLoginModal==='function'&&openLoginModal()"
                    class="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl text-sm font-bold flex items-center gap-2">
                    <i class="fas fa-sign-in-alt"></i>
                    <span data-translate="login">Вход</span>
                  </button>
                </div>
                <div id="loggedInView" class="hidden flex items-center gap-3">
                  <div class="text-right hidden sm:block cursor-pointer" id="userNameWrapper">
                    <div id="userName" class="text-xs font-bold text-white hover:text-cyan-400 transition-colors">Researcher</div>
                    <div class="text-[10px] text-emerald-400 flex items-center justify-end gap-1.5">
                      <span class="relative flex h-1.5 w-1.5">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                      </span>
                      <span data-translate="in_system">В системе</span>
                    </div>
                  </div>
                  <div class="relative group cursor-pointer" id="userAvatarWrapper">
                    <div class="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <img id="userAvatar" src="" class="relative w-10 h-10 rounded-full object-cover border-2 border-cyan-500/50 group-hover:border-cyan-400 transition-all">
                  </div>
                  <button onclick="typeof logout==='function'&&logout()"
                    class="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all">
                    <i class="fas fa-sign-out-alt"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- КОНЕЦ DESKTOP СЕКЦИИ -->


          <!-- ══════════════════════════════════════════════
               MOBILE (<md): 3 строки
               ══════════════════════════════════════════════ -->

          <!-- Строка 1: Лого + Аутентификация -->
          <div class="flex md:hidden items-center justify-between gap-2">
            <div class="flex items-center gap-2 flex-shrink-0">
              <div class="relative w-9 h-9 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-400/50 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 3h6M12 3v5M8 8l-2 8c-.5 2 1 4 3 4h6c2 0 3.5-2 3-4l-2-8" stroke="#22d3ee" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="10" cy="14" r="1" fill="#22d3ee" opacity="0.6"><animate attributeName="cy" values="14;12;14" dur="2s" repeatCount="indefinite"/></circle>
                  <circle cx="14" cy="16" r="1" fill="#06b6d4" opacity="0.8"><animate attributeName="cy" values="16;13;16" dur="2.5s" repeatCount="indefinite"/></circle>
                </svg>
              </div>
              <h1 style="font-size:17px;font-weight:900;line-height:1;margin:0;">
                <span style="background:linear-gradient(to right,#22d3ee,#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Airdrop</span><span style="color:white;">Lab</span>
              </h1>
            </div>
            <!-- Мобильная авторизация -->
            <div class="flex items-center gap-1.5" id="mobAuthWrap">
              <div id="mobLoggedOutView">
                <button onclick="typeof openLoginModal==='function'&&openLoginModal()"
                  style="display:flex;align-items:center;gap:5px;padding:6px 12px;background:linear-gradient(135deg,#0891b2,#2563eb);border:none;border-radius:10px;color:white;font-size:12px;font-weight:700;cursor:pointer;">
                  <i class="fas fa-sign-in-alt"></i>
                  <span data-translate="login">Вход</span>
                </button>
              </div>
              <div id="mobLoggedInView" style="display:none;align-items:center;gap:6px;" class="flex">
                <div 
                  style="position:relative;flex-shrink:0;cursor:pointer;"
                  onclick="var d=document.getElementById('userAvatarWrapper');if(d)d.click();"
                  title="Профиль">
                  <div style="position:absolute;inset:-2px;background:linear-gradient(135deg,#22d3ee,#3b82f6);border-radius:50%;filter:blur(4px);opacity:0.5;transition:opacity 0.2s;"
                       onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='0.5'"></div>
                  <img id="mobUserAvatar" src="" style="position:relative;width:30px;height:30px;border-radius:50%;object-fit:cover;border:1.5px solid rgba(34,211,238,0.5);">
                  <div style="position:absolute;bottom:-2px;right:-2px;width:12px;height:12px;
                              background:linear-gradient(135deg,#22d3ee,#3b82f6);border-radius:50%;
                              border:1.5px solid #0b0f19;display:flex;align-items:center;justify-content:center;">
                    <i class="fas fa-pen" style="font-size:5px;color:white;"></i>
                  </div>
                </div>
                <button onclick="typeof logout==='function'&&logout()"
                  style="padding:6px 7px;color:#64748b;background:transparent;border:1px solid rgba(71,85,105,0.3);border-radius:8px;cursor:pointer;font-size:13px;">
                  <i class="fas fa-sign-out-alt"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Строка 2: Статистика (scrollable) -->
          <div class="flex md:hidden mob-stats-row overflow-x-auto">
            <div class="mob-stat-item" data-filter="active" onclick="typeof filterProjects==='function'&&filterProjects('active')">
              <span class="mob-stat-num" style="color:#34d399;" id="mobStatActive">0</span>
              <span class="mob-stat-lbl" data-translate="active">Акт.</span>
            </div>
            <div class="mob-stat-item" data-filter="today" onclick="typeof filterProjects==='function'&&filterProjects('today')">
              <span class="mob-stat-num" style="color:#22d3ee;" id="mobStatToday">0</span>
              <span class="mob-stat-lbl" data-translate="new">Нов.</span>
            </div>
            <div class="mob-stat-item" data-filter="favorites" onclick="typeof filterProjects==='function'&&filterProjects('favorites')">
              <span class="mob-stat-num" style="color:#fb923c;" id="mobStatFavorites">0</span>
              <span class="mob-stat-lbl" data-translate="in_work">Раб.</span>
            </div>
            <div class="mob-stat-item" data-filter="completed" onclick="typeof filterProjects==='function'&&filterProjects('completed')">
              <span class="mob-stat-num" style="color:#60a5fa;" id="mobStatCompleted">0</span>
              <span class="mob-stat-lbl" data-translate="done">Гот.</span>
            </div>
          </div>

          <!-- Строка 3: Клейм + Уведомления + Сообщения + Язык + Админ -->
          <div class="flex md:hidden flex-wrap gap-1.5 mob-actions-row items-center">

            <!-- Клейм -->
            <button id="mobClaimBtn" onclick="window.openClaimModal&&window.openClaimModal()"
  style="position:relative;display:flex;align-items:center;gap:4px;padding:5px 10px;
         background:rgba(8,145,178,0.2);border:1px solid rgba(34,211,238,0.3);
         border-radius:10px;color:#22d3ee;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap;">
  🧪 <span id="mobClaimSpan" style="font-size:11px;" data-translate="claim_btn_label">Клейм</span>
</button>

            <!-- Уведомления -->
            <button onclick="typeof showNotifications==='function'&&showNotifications()"
              style="position:relative;padding:6px 9px;color:#94a3b8;
                     background:transparent;border:1px solid rgba(71,85,105,0.3);
                     border-radius:10px;cursor:pointer;font-size:14px;">
              <i class="fas fa-bell"></i>
              <span id="mobNotifBadge"
                style="display:none;position:absolute;top:-4px;right:-4px;min-width:15px;height:15px;
                       background:linear-gradient(135deg,#ef4444,#f97316);border-radius:999px;
                       font-size:8px;font-weight:700;color:white;
                       align-items:center;justify-content:center;padding:0 2px;"></span>
            </button>

            <!-- Сообщения (скрыто до логина, синхронизируется) -->
            <button id="mobFeedbackBtn" onclick="typeof openFeedbackListModal==='function'&&openFeedbackListModal()"
              style="display:none;position:relative;padding:6px 9px;color:#94a3b8;
                     background:transparent;border:1px solid rgba(71,85,105,0.3);
                     border-radius:10px;cursor:pointer;font-size:14px;">
              <i class="fas fa-comment-dots"></i>
              <span id="mobFeedbackBadge"
                style="display:none;position:absolute;top:-4px;right:-4px;min-width:15px;height:15px;
                       background:linear-gradient(135deg,#8b5cf6,#ec4899);border-radius:999px;
                       font-size:8px;font-weight:700;color:white;
                       align-items:center;justify-content:center;padding:0 2px;"></span>
            </button>

            <!-- Язык -->
            <button onclick="typeof toggleLang==='function'&&toggleLang()" id="mobLangBtn"
              style="display:flex;align-items:center;gap:5px;padding:5px 10px;
                     border-radius:10px;border:1px solid rgba(239,68,68,0.3);
                     background:rgba(239,68,68,0.1);cursor:pointer;
                     font-size:11px;font-weight:700;color:#fff;white-space:nowrap;">
              <span class="mob-lang-flag" style="font-size:1rem;"></span>
              <span class="mob-lang-text">ENG</span>
            </button>

            <!-- Кнопка добавления проекта (скрыта до admin) -->
            <button id="mobAddBtn" onclick="typeof openAddModal==='function'&&openAddModal()"
              style="display:none;align-items:center;gap:4px;padding:5px 10px;
                     background:linear-gradient(135deg,#0891b2,#2563eb);border:none;
                     border-radius:8px;color:white;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;" class="flex">
              <i class="fas fa-flask"></i>
              <span data-translate="new_test">Добавить</span>
            </button>

            <!-- Остальные admin кнопки (скрыты до admin) -->
            <div id="mobAdminBtns" style="display:none;" class="flex gap-1 items-center flex-wrap">
              <button onclick="typeof openStats==='function'&&openStats()" class="admin-action-btn admin-btn-orange" style="padding:5px 8px;font-size:11px;">
                <i class="fas fa-chart-pie"></i>
              </button>
              <button onclick="typeof migrateToFirestore==='function'&&migrateToFirestore()" class="admin-action-btn admin-btn-purple" style="padding:5px 8px;font-size:11px;">
                <i class="fas fa-cloud-upload-alt"></i>
              </button>
              <button onclick="typeof exportAllData==='function'&&exportAllData()" class="admin-action-btn admin-btn-emerald" style="padding:5px 8px;font-size:11px;">
                <i class="fas fa-file-export"></i>
              </button>
              <button onclick="typeof openDeletedProjects==='function'&&openDeletedProjects()" class="admin-action-btn admin-btn-red" style="padding:5px 8px;font-size:11px;">
                <i class="fas fa-trash-restore"></i>
              </button>
            </div>

          </div>
          <!-- КОНЕЦ MOBILE СЕКЦИИ -->

        </div>
      </header>

      <!-- CryptoRank Ticker -->
      <div style="background:rgba(11,15,25,0.95);border-bottom:1px solid rgba(51,65,85,0.5);
                  backdrop-filter:blur(12px);overflow:hidden;max-width:100vw;box-sizing:border-box;">
        <div style="max-width:min(1600px,100%);margin:0 auto;padding:3px 16px;
                    overflow:hidden;box-sizing:border-box;">
          <div id="cr-widget-marquee"
               data-coins="bitcoin,ethereum,tether,ripple,cardano"
               data-theme="dark" data-show-symbol="true" data-show-icon="true"
               data-show-period-change="true" data-period-change="24H"
               data-api-url="https://api.cryptorank.io/v0"
               style="max-width:100%;overflow:hidden;box-sizing:border-box;">
            <a href="https://cryptorank.io" target="_blank">Coins by Cryptorank</a>
          </div>
        </div>
      </div>

      <!-- Navigation Bar -->
      <div id="site-nav-wrapper" style="position:relative;z-index:9000;">
      <nav id="site-nav" style="background:rgba(11,15,25,0.98);border-bottom:1px solid rgba(34,211,238,0.12);backdrop-filter:blur(12px);">
        <div style="max-width:min(1600px,100%);margin:0 auto;padding:0 16px;overflow-x:auto;white-space:nowrap;scrollbar-width:none;-webkit-overflow-scrolling:touch;">
          <div style="display:inline-flex;align-items:stretch;gap:0;vertical-align:top;">

            <!-- Активности -->
            <div class="al-nav-group" style="position:relative; display: inline-block; vertical-align: top;">
              <button class="al-nav-btn" onclick="alNavToggle(this)">
                <i class="fas fa-bolt" style="color:#22d3ee;"></i>
                <span data-translate="menu_activities">Активности</span>
                <i class="fas fa-chevron-down al-nav-arrow"></i>
              </button>
              <div class="al-nav-dropdown">
                <a href="index.html" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-layer-group"></i><span data-translate="all_projects">Все активности</span></a>
                <a href="#" onclick="showComingSoon();return false;" class="al-nav-item"><i class="fas fa-parachute-box"></i><span data-translate="airdrops_lotteries">Аирдропы и розыгрыши</span></a>
                <a href="faucet.html" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-faucet"></i><span data-translate="faucets">Краны</span></a>
                <a href="index.html?filter=mainnet" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-network-wired"></i><span data-translate="mainnets">Мейннеты</span></a>
                <a href="index.html?filter=testnet" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-flask"></i><span data-translate="testnets">Тестнеты</span></a>
              </div>
            </div>

            <!-- Гайды -->
            <div class="al-nav-group" style="position:relative; display: inline-block; vertical-align: top;">
              <button class="al-nav-btn" onclick="alNavToggle(this)">
                <i class="fas fa-map-signs" style="color:#22d3ee;"></i>
                <span data-translate="menu_guides">Гайды</span>
                <i class="fas fa-chevron-down al-nav-arrow"></i>
              </button>
              <div class="al-nav-dropdown">
                <a href="guides.html" class="al-nav-item al-nav-item-accent" onclick="closeAlNav(this)"><i class="fas fa-th-large"></i><span data-translate="all_guides">Все гайды</span></a>
                <div class="al-nav-divider"></div>
                <a href="guides/Arc/Arc_Testnet_by_Circle.html" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-circle" style="color:#22d3ee;font-size:8px;"></i>Arc Testnet</a>
                <a href="guides/Tempo/Tempo_Testnet.html" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-circle" style="color:#a78bfa;font-size:8px;"></i>Tempo Testnet</a>
                <a href="guides/Robinhood/robinhood-chain.html" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-circle" style="color:#34d399;font-size:8px;"></i>Robinhood Chain</a>
              </div>
            </div>

            <!-- Сообщество -->
            <div class="al-nav-group" style="position:relative; display: inline-block; vertical-align: top;">
              <button class="al-nav-btn" onclick="alNavToggle(this)">
                <i class="fas fa-users" style="color:#34d399;"></i>
                <span data-translate="menu_community">Сообщество</span>
                <i class="fas fa-chevron-down al-nav-arrow"></i>
              </button>
              <div class="al-nav-dropdown">
                <a href="#" onclick="showComingSoon();return false;" class="al-nav-item"><i class="fas fa-comments"></i><span data-translate="chat">Чат</span></a>
                <a href="#" onclick="showComingSoon();return false;" class="al-nav-item"><i class="fas fa-trophy"></i><span data-translate="leaderboard">Таблица лидеров</span></a>
                <a href="#" onclick="showComingSoon();return false;" class="al-nav-item"><i class="fas fa-share-alt"></i><span data-translate="referrals">Рефералы</span></a>
                <a href="#" onclick="showComingSoon();return false;" class="al-nav-item"><i class="fas fa-comments-dollar"></i><span data-translate="forum">Форум</span></a>
              </div>
            </div>

            <!-- Календарь -->
            <div class="al-nav-group" style="position:relative; display: inline-block; vertical-align: top;">
              <button class="al-nav-btn" onclick="alNavToggle(this)">
                <i class="fas fa-calendar-alt" style="color:#fbbf24;"></i>
                <span data-translate="menu_calendar">Календарь</span>
                <i class="fas fa-chevron-down al-nav-arrow"></i>
              </button>
              <div class="al-nav-dropdown">
                <a href="#" onclick="showComingSoon();return false;" class="al-nav-item al-nav-item-accent"><i class="fas fa-calendar-check"></i><span data-translate="all_events">Все события</span></a>
                <div class="al-nav-divider"></div>
                <a href="#" onclick="showComingSoon();return false;" class="al-nav-item"><i class="fas fa-hourglass-end" style="color:#f87171;"></i><span data-translate="deadlines">Дедлайны</span></a>
                <a href="#" onclick="showComingSoon();return false;" class="al-nav-item"><i class="fas fa-rocket" style="color:#fbbf24;"></i>TGE / <span data-translate="listings">Листинги</span></a>
                <a href="#" onclick="showComingSoon();return false;" class="al-nav-item"><i class="fas fa-star" style="color:#22d3ee;"></i><span data-translate="project_events">События проектов</span></a>
              </div>
            </div>

            <!-- Биржи -->
            <div class="al-nav-group" style="position:relative; display: inline-block; vertical-align: top;">
              <button class="al-nav-btn" onclick="alNavToggle(this)">
                <i class="fas fa-chart-bar" style="color:#a78bfa;"></i>
                <span data-translate="menu_exchanges">Биржи</span>
                <i class="fas fa-chevron-down al-nav-arrow"></i>
              </button>
              <div class="al-nav-dropdown">
                <a href="https://www.binance.com/ru" target="_blank" class="al-nav-item"><i class="fas fa-circle" style="color:#f0b90b;font-size:8px;"></i>Binance</a>
                <a href="https://www.bybit.com/ru-RU/" target="_blank" class="al-nav-item"><i class="fas fa-circle" style="color:#f7a600;font-size:8px;"></i>Bybit</a>
                <a href="https://www.mexc.com/ru-RU" target="_blank" class="al-nav-item"><i class="fas fa-circle" style="color:#2354e6;font-size:8px;"></i>MEXC</a>
                <a href="https://www.bitget.com/ru/" target="_blank" class="al-nav-item"><i class="fas fa-circle" style="color:#00f0ff;font-size:8px;"></i>Bitget</a>
                <a href="https://bingx.com/ru-ru/" target="_blank" class="al-nav-item"><i class="fas fa-circle" style="color:#1890ff;font-size:8px;"></i>BingX</a>
                <a href="https://www.lbank.com/" target="_blank" class="al-nav-item"><i class="fas fa-circle" style="color:#ff5722;font-size:8px;"></i>LBank</a>
                <a href="https://www.bitmart.com/" target="_blank" class="al-nav-item"><i class="fas fa-circle" style="color:#0096ff;font-size:8px;"></i>Bitmart</a>
                <div class="al-nav-divider"></div>
                <a href="#" onclick="showComingSoon();return false;" class="al-nav-item al-nav-item-accent"><i class="fas fa-th-list"></i><span data-translate="all_exchanges">Все биржи</span></a>
              </div>
            </div>

            <!-- Новости -->
            <div class="al-nav-group" style="position:relative; display: inline-block; vertical-align: top;">
              <button class="al-nav-btn" onclick="alNavToggle(this)">
                <i class="fas fa-newspaper" style="color:#f87171;"></i>
                <span data-translate="menu_news">Новости</span>
                <i class="fas fa-chevron-down al-nav-arrow"></i>
              </button>
              <div class="al-nav-dropdown">
                <a href="#" onclick="showComingSoon();return false;" class="al-nav-item"><i class="fas fa-coins"></i><span data-translate="crypto_news">Криптовалютные новости</span></a>
                <a href="#" onclick="showComingSoon();return false;" class="al-nav-item"><i class="fas fa-chart-line"></i><span data-translate="analytics_news">Новости аналитики</span></a>
                <a href="#" onclick="showComingSoon();return false;" class="al-nav-item"><i class="fas fa-robot"></i><span data-translate="ai_news">Новости AI</span></a>
                <a href="#" onclick="showComingSoon();return false;" class="al-nav-item"><i class="fab fa-bitcoin"></i><span data-translate="bitcoin_news">Новости Bitcoin</span></a>
                <a href="#" onclick="showComingSoon();return false;" class="al-nav-item"><i class="fas fa-water"></i><span data-translate="defi_news">Новости DeFi</span></a>
                <a href="#" onclick="showComingSoon();return false;" class="al-nav-item"><i class="fas fa-gamepad"></i><span data-translate="gamefi_news">Новости GameFi / Metaverse</span></a>
                <a href="#" onclick="showComingSoon();return false;" class="al-nav-item"><i class="fas fa-rocket"></i><span data-translate="ido_news">Новости IDO/ICO/IFO/IEO</span></a>
                <a href="#" onclick="showComingSoon();return false;" class="al-nav-item"><i class="fas fa-image"></i><span data-translate="nft_news">Новости NFT</span></a>
              </div>
            </div>

            <!-- Инструменты -->
            <div class="al-nav-group" style="position:relative; display: inline-block; vertical-align: top;">
              <button class="al-nav-btn" onclick="alNavToggle(this)">
                <i class="fas fa-tools" style="color:#fbbf24;"></i>
                <span data-translate="menu_tools">Инструменты</span>
                <i class="fas fa-chevron-down al-nav-arrow"></i>
              </button>
              <div class="al-nav-dropdown">
                <a href="faucet.html" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-faucet"></i><span data-translate="faucets">Краны (Faucets)</span></a>
                <a href="#" onclick="showComingSoon();return false;" class="al-nav-item"><i class="fas fa-calculator"></i><span data-translate="gas_calculator">Калькулятор газа</span></a>
                <a href="#" onclick="showComingSoon();return false;" class="al-nav-item"><i class="fas fa-exchange-alt"></i><span data-translate="bridges">Бриджи</span></a>
                <a href="#" onclick="showComingSoon();return false;" class="al-nav-item"><i class="fas fa-shield-alt"></i><span data-translate="wallet_checker">Проверка кошелька</span></a>
              </div>
            </div>

            <!-- Обучение -->
            <div class="al-nav-group" style="position:relative; display: inline-block; vertical-align: top;">
              <button class="al-nav-btn" onclick="alNavToggle(this)">
                <i class="fas fa-graduation-cap" style="color:#60a5fa;"></i>
                <span data-translate="menu_learning">Обучение</span>
                <i class="fas fa-chevron-down al-nav-arrow"></i>
              </button>
              <div class="al-nav-dropdown">
                <a href="#" onclick="showComingSoon();return false;" class="al-nav-item"><i class="fas fa-book-open"></i><span data-translate="what_is_airdrop">Что такое аирдроп</span></a>
                <a href="#" onclick="showComingSoon();return false;" class="al-nav-item"><i class="fas fa-wallet"></i><span data-translate="how_setup_wallet">Как настроить кошелёк</span></a>
                <a href="#" onclick="showComingSoon();return false;" class="al-nav-item"><i class="fas fa-shield-virus"></i><span data-translate="crypto_security">Безопасность в крипте</span></a>
                <a href="#" onclick="showComingSoon();return false;" class="al-nav-item"><i class="fas fa-question-circle"></i>FAQ</a>
              </div>
            </div>

          </div>
        </div>
      </nav>
      </div>

      <!-- Coming Soon Modal (PROFESSIONAL VERSION) -->
      <div id="comingSoonModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(16px);z-index:10000;align-items:center;justify-content:center;" onclick="closeComingSoon(event)">
        <div style="background:linear-gradient(145deg,rgba(15,23,42,0.98),rgba(30,41,59,0.98));border:2px solid rgba(34,211,238,0.3);border-radius:24px;padding:48px;max-width:460px;text-align:center;position:relative;animation:modalPopIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);box-shadow:0 25px 80px rgba(34,211,238,0.25),0 0 120px rgba(34,211,238,0.08);" onclick="event.stopPropagation()">
          <div style="position:absolute;inset:0;border-radius:24px;background:linear-gradient(145deg,rgba(34,211,238,0.08),rgba(139,92,246,0.08));pointer-events:none;"></div>
          
          <!-- Animated Icon Container -->
          <div style="position:absolute;top:-40px;left:50%;transform:translateX(-50%);width:80px;height:80px;background:linear-gradient(145deg,#22d3ee,#8b5cf6);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 15px 40px rgba(34,211,238,0.5);animation:float 4s ease-in-out infinite;">
            <div style="width:64px;height:64px;background:rgba(15,23,42,0.95);border-radius:50%;display:flex;align-items:center;justify-content:center;">
              <i class="fas fa-rocket" style="font-size:28px;color:#22d3ee;animation:rocketGlow 2s ease-in-out infinite;"></i>
            </div>
          </div>
          
          <div style="position:relative;margin-top:30px;">
            <!-- Status Dots -->
            <div style="display:flex;justify-content:center;gap:10px;margin-bottom:24px;">
              <div style="width:12px;height:12px;background:linear-gradient(45deg,rgba(34,211,238,0.4),rgba(34,211,238,0.8));border-radius:50%;animation:pulse 2.5s infinite;box-shadow:0 0 16px rgba(34,211,238,0.5);"></div>
              <div style="width:12px;height:12px;background:linear-gradient(45deg,rgba(139,92,246,0.4),rgba(139,92,246,0.8));border-radius:50%;animation:pulse 2.5s infinite 0.3s;box-shadow:0 0 16px rgba(139,92,246,0.5);"></div>
              <div style="width:12px;height:12px;background:linear-gradient(45deg,rgba(236,72,153,0.4),rgba(236,72,153,0.8));border-radius:50%;animation:pulse 2.5s infinite 0.6s;box-shadow:0 0 16px rgba(236,72,153,0.5);"></div>
            </div>
            
            <h2 style="font-size:28px;font-weight:800;color:#f1f5f9;margin:0 0 16px;text-shadow:0 2px 20px rgba(34,211,238,0.2);" data-translate="menu_in_development">Раздел в разработке</h2>
            <p style="color:#cbd5e1;margin:0 0 28px;font-size:15px;line-height:1.6;" data-translate="menu_coming_soon">Мы активно работаем над этим разделом. Скоро здесь появятся новые возможности!</p>
            
            <!-- Progress Card -->
            <div style="background:linear-gradient(135deg,rgba(34,211,238,0.08),rgba(139,92,246,0.08));border:1px solid rgba(34,211,238,0.15);border-radius:16px;padding:20px;margin-bottom:28px;">
              <div style="display:flex;align-items:center;gap:12px;color:#22d3ee;font-size:14px;margin-bottom:12px;">
                <i class="fas fa-info-circle" style="font-size:18px;animation:infoPulse 2s infinite;"></i>
                <span style="font-weight:600;" data-translate="under_construction">Статус разработки</span>
              </div>
              <div style="display:flex;gap:8px;margin-bottom:12px;">
                <div style="flex:1;height:6px;background:rgba(71,85,105,0.5);border-radius:3px;">
                  <div style="height:100%;width:35%;background:linear-gradient(90deg,#22d3ee,#8b5cf6);border-radius:3px;animation:progressBar 2s ease-in-out infinite;"></div>
                </div>
              </div>
              <div style="text-align:left;color:#94a3b8;font-size:13px;line-height:1.7;">
                <div style="margin-bottom:8px;display:flex;align-items:center;gap:8px;">
                  <i class="fas fa-check-circle" style="color:#22d3ee;"></i>
                  <span>Улучшение функционала</span>
                </div>
                <div style="margin-bottom:8px;display:flex;align-items:center;gap:8px;">
                  <i class="fas fa-check-circle" style="color:#8b5cf6;"></i>
                  <span>Интеграция новых инструментов</span>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                  <i class="fas fa-clock" style="color:#fbbf24;"></i>
                  <span>Ожидается: Q1-Q2 2025</span>
                </div>
              </div>
            </div>
            
            <div style="display:flex;gap:12px;justify-content:center;">
              <button onclick="closeComingSoon()" style="padding:14px 44px;background:linear-gradient(135deg,#22d3ee,#8b5cf6);border:none;border-radius:12px;color:white;font-size:15px;font-weight:600;cursor:pointer;transition:all 0.3s;box-shadow:0 8px 32px rgba(34,211,238,0.3);" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 12px 40px rgba(34,211,238,0.4)';" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 8px 32px rgba(34,211,238,0.3)';" data-translate="close">Понятно</button>
              <button onclick="window.open('https://t.me/airdroplab','_blank')" style="padding:14px 28px;background:transparent;border:2px solid rgba(34,211,238,0.25);border-radius:12px;color:#22d3ee;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.3s;" onmouseover="this.style.background='rgba(34,211,238,0.08)';this.style.borderColor='rgba(34,211,238,0.4)';" onmouseout="this.style.background='transparent';this.style.borderColor='rgba(34,211,238,0.25)';">Telegram</button>
            </div>
          </div>
        </div>
      </div>

      <style>
        @keyframes modalPopIn {
          from { opacity:0; transform:scale(0.8) translateY(30px); }
          to { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(3deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity:0.4; transform:scale(1); }
          50% { opacity:1; transform:scale(1.2); }
        }
        @keyframes rocketGlow {
          0%, 100% { color:#22d3ee; text-shadow:0 0 16px rgba(34,211,238,0.6); }
          50% { color:#8b5cf6; text-shadow:0 0 24px rgba(139,92,246,0.6); }
        }
        @keyframes infoPulse {
          0%, 100% { transform:scale(1); }
          50% { transform:scale(1.1); }
        }
        @keyframes progressBar {
          0%, 100% { width:35%; }
          50% { width:65%; }
        }
        
        #site-nav-wrapper { position: relative; z-index: 9000; }
        #site-nav ::-webkit-scrollbar { display: none; }
        .al-nav-dropdown::-webkit-scrollbar { width: 6px; }
        .al-nav-dropdown::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        .al-nav-dropdown::-webkit-scrollbar-thumb { background: rgba(34,211,238,0.3); border-radius: 3px; }
        .al-nav-dropdown::-webkit-scrollbar-thumb:hover { background: rgba(34,211,238,0.5); }
        
        .al-nav-group { position: relative; display: inline-block; vertical-align: top; }
        .al-nav-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 14px; background: transparent; border: none;
          color: #94a3b8; font-size: 13px; font-weight: 500;
          cursor: pointer; white-space: nowrap;
          border-bottom: 2px solid transparent;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
          font-family: 'Inter', sans-serif;
          vertical-align: top;
        }
        .al-nav-btn:hover, .al-nav-btn.al-nav-open {
          color: #f1f5f9;
          background: rgba(34,211,238,0.06);
          border-bottom-color: #22d3ee;
        }
        .al-nav-arrow { font-size: 9px; margin-left: 2px; transition: transform 0.2s; }
        .al-nav-btn.al-nav-open .al-nav-arrow { transform: rotate(180deg); }
        
        /* DROPDOWN FIXED POSITION */
        .al-nav-dropdown {
          display: none;
          position: absolute;
          min-width: 220px;
          background: rgba(11,15,30,0.99);
          border: 1px solid rgba(34,211,238,0.2);
          border-top: none;
          border-radius: 0 0 12px 12px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(34,211,238,0.05);
          backdrop-filter: blur(20px);
          z-index: 9999;
          padding: 6px 0;
          animation: alNavFadeIn 0.15s ease;
          /* FIXED POSITION BELOW BUTTON */
          left: 0;
          top: calc(100% + 2px);
        }
        .al-nav-dropdown.al-open { display: block; }
        @keyframes alNavFadeIn {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        
        .al-nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 16px; color: #94a3b8; font-size: 13px;
          text-decoration: none; transition: all 0.15s;
          white-space: nowrap;
        }
        .al-nav-item i { width: 14px; text-align: center; font-size: 12px; color: #64748b; flex-shrink:0; }
        .al-nav-item:hover { background: rgba(34,211,238,0.08); color: #f1f5f9; }
        .al-nav-item:hover i { color: #22d3ee; }
        .al-nav-item-accent { color: #22d3ee !important; font-weight: 600; }
        .al-nav-divider { height: 1px; background: rgba(255,255,255,0.07); margin: 4px 0; }
      </style>
    `;

    // Скрываем статистику на неглавных страницах
    var isMainPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '';
    var desktopStats = document.querySelector('.flex.gap-5.text-sm');
    var mobileStats = document.querySelector('.mob-stats-row');
    
    if (!isMainPage) {
      if (desktopStats) desktopStats.style.display = 'none';
      if (mobileStats) mobileStats.style.display = 'none';
    }
    
    // CryptoRank
    const crScript = document.createElement('script');
    crScript.src = 'https://cryptorank.io/widget/marquee.js';
    document.body.appendChild(crScript);

    setTimeout(function () {
      if (typeof updateLanguageButton === 'function') updateLanguageButton();
      if (typeof updateAllTranslations === 'function') updateAllTranslations();
    }, 0);

    // ── MutationObserver синхронизации ──
    function setupObservers() {

      // 1. Статистика
      [['statActive','mobStatActive'],['statToday','mobStatToday'],
       ['statFavorites','mobStatFavorites'],['statCompleted','mobStatCompleted']
      ].forEach(function(p) {
        var from = document.getElementById(p[0]);
        var to   = document.getElementById(p[1]);
        if (!from || !to) return;
        to.textContent = from.textContent;
        new MutationObserver(function() { to.textContent = from.textContent; })
          .observe(from, { childList: true, characterData: true, subtree: true });
      });

      // 2. Auth state (CRITICAL FIX for login display)
      var deskIn   = document.getElementById('loggedInView');
      var mobIn    = document.getElementById('mobLoggedInView');
      var mobOut   = document.getElementById('mobLoggedOutView');
      var deskAva  = document.getElementById('userAvatar');
      var mobAva   = document.getElementById('mobUserAvatar');
      var deskOut  = document.getElementById('loggedOutView');
      
      function syncAuth() {
        var isIn = deskIn && !deskIn.classList.contains('hidden');
        // Принудительно проверяем состояние
        if (isIn) {
          if (mobIn)  mobIn.style.display  = 'flex';
          if (mobOut) mobOut.style.display = 'none';
          if (deskOut) deskOut.style.display = 'none';
          deskIn.classList.remove('hidden');
        } else {
          if (mobIn)  mobIn.style.display  = 'none';
          if (mobOut) mobOut.style.display = 'block';
          if (deskOut) deskOut.style.display = 'block';
          deskIn.classList.add('hidden');
        }
        if (deskAva && mobAva && deskAva.src) mobAva.src = deskAva.src;
      }
      
      if (deskIn) new MutationObserver(syncAuth).observe(deskIn, { attributes: true, attributeFilter: ['class','style'] });
      if (deskOut) new MutationObserver(function(){ if (deskIn && !deskOut.classList.contains('hidden')) { if(deskIn)deskIn.classList.add('hidden'); syncAuth(); }}).observe(deskOut, { attributes: true, attributeFilter: ['class','style'] });
      if (deskAva) new MutationObserver(function(){ if (mobAva && deskAva.src) mobAva.src = deskAva.src; })
        .observe(deskAva, { attributes: true, attributeFilter: ['src'] });
      
      // Запускаем проверку при каждой загрузке
      syncAuth();
      
      // Дополнительная проверка каждые 2 секунды
      setInterval(syncAuth, 2000);
    }

    setTimeout(setupObservers, 300);

    // ── Header height CSS variable ──
    function syncHeaderHeight() {
      var h = document.getElementById('site-header');
      if (h) document.documentElement.style.setProperty('--header-h', h.offsetHeight + 'px');
    }
    var headerEl = document.getElementById('site-header');
    if (headerEl) {
      if (window.ResizeObserver) {
        new ResizeObserver(syncHeaderHeight).observe(headerEl);
      } else {
                [100, 500, 1500].forEach(function(t) { setTimeout(syncHeaderHeight, t); });
      }
    }
    window.addEventListener('resize', syncHeaderHeight);
    setTimeout(syncHeaderHeight, 0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHeader);
  } else {
    injectHeader();
  }

})();

// ── NAVIGATION DROPDOWN TOGGLE ──
window.alNavToggle = function(btn) {
  var group = btn.closest('.al-nav-group');
  if (!group) return;
  var dropdown = group.querySelector('.al-nav-dropdown');
  if (!dropdown) return;
  
  var isOpen = dropdown.classList.contains('al-open');

  document.querySelectorAll('.al-nav-dropdown.al-open').forEach(function(d) {
    d.classList.remove('al-open');
    var b = d.closest('.al-nav-group').querySelector('.al-nav-btn');
    if (b) b.classList.remove('al-nav-open');
  });

  if (!isOpen) {
    dropdown.classList.add('al-open');
    btn.classList.add('al-nav-open');
    // Фиксируем позицию относительно viewport
    setTimeout(function() {
      var rect = btn.getBoundingClientRect();
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      dropdown.style.position = 'fixed';
      dropdown.style.top = (rect.bottom + scrollTop) + 'px';
      dropdown.style.left = rect.left + 'px';
    }, 10);
  }
};

document.addEventListener('click', function(e) {
  if (!e.target.closest('.al-nav-group')) {
    document.querySelectorAll('.al-nav-dropdown.al-open').forEach(function(d) {
      d.classList.remove('al-open');
      var b = d.closest('.al-nav-group').querySelector('.al-nav-btn');
      if (b) b.classList.remove('al-nav-open');
    });
  }
});

window.addEventListener('scroll', function() {
  document.querySelectorAll('.al-nav-dropdown.al-open').forEach(function(d) {
    var b = d.closest('.al-nav-group').querySelector('.al-nav-btn');
    if (b) {
      var rect = b.getBoundingClientRect();
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      d.style.top = (rect.bottom + scrollTop) + 'px';
      d.style.left = rect.left + 'px';
    }
  });
}, { passive: true });

window.addEventListener('resize', function() {
  document.querySelectorAll('.al-nav-dropdown.al-open').forEach(function(d) {
    d.classList.remove('al-open');
    var b = d.closest('.al-nav-group').querySelector('.al-nav-btn');
    if (b) b.classList.remove('al-nav-open');
  });
});

// ── COMING SOON MODAL FUNCTIONS ──
window.showComingSoon = function() {
  var modal = document.getElementById('comingSoonModal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Блокируем скролл фона
  }
};

window.closeComingSoon = function(event) {
  if (event && event.target !== event.currentTarget) return;
  var modal = document.getElementById('comingSoonModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Возвращаем скролл
  }
};

window.closeAlNav = function(el) {
  var dropdown = el.closest('.al-nav-dropdown');
  if (dropdown) {
    dropdown.classList.remove('al-open');
    var btn = dropdown.closest('.al-nav-group').querySelector('.al-nav-btn');
    if (btn) btn.classList.remove('al-nav-open');
  }
};

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeComingSoon();
    document.querySelectorAll('.al-nav-dropdown.al-open').forEach(function(d) {
      d.classList.remove('al-open');
      var b = d.closest('.al-nav-group').querySelector('.al-nav-btn');
      if (b) b.classList.remove('al-nav-open');
    });
  }
});
