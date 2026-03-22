// ============================================================
// header.js — AirdropLab (Desktop unchanged + Mobile rows)
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

          <!-- DESKTOP (md+) -->
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
          <!-- КОНЕЦ DESKTOP -->

          <!-- MOBILE (<md): строка 1 — Лого + Авторизация -->
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
            <div class="flex items-center gap-1.5" id="mobAuthWrap">
              <div id="mobLoggedOutView">
                <button onclick="typeof openLoginModal==='function'&&openLoginModal()"
                  style="display:flex;align-items:center;gap:5px;padding:6px 12px;background:linear-gradient(135deg,#0891b2,#2563eb);border:none;border-radius:10px;color:white;font-size:12px;font-weight:700;cursor:pointer;">
                  <i class="fas fa-sign-in-alt"></i>
                  <span data-translate="login">Вход</span>
                </button>
              </div>
              <div id="mobLoggedInView" style="display:none;align-items:center;gap:6px;" class="flex">
                <div style="position:relative;flex-shrink:0;cursor:pointer;"
                  onclick="var d=document.getElementById('userAvatarWrapper');if(d)d.click();" title="Профиль">
                  <div style="position:absolute;inset:-2px;background:linear-gradient(135deg,#22d3ee,#3b82f6);border-radius:50%;filter:blur(4px);opacity:0.5;"
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

          <!-- MOBILE: строка 2 — Статистика -->
          <div class="flex md:hidden mob-stats-row overflow-x-auto">
            <div class="mob-stat-item" onclick="typeof filterProjects==='function'&&filterProjects('active')">
              <span class="mob-stat-num" style="color:#34d399;" id="mobStatActive">0</span>
              <span class="mob-stat-lbl" data-translate="active">Акт.</span>
            </div>
            <div class="mob-stat-item" onclick="typeof filterProjects==='function'&&filterProjects('today')">
              <span class="mob-stat-num" style="color:#22d3ee;" id="mobStatToday">0</span>
              <span class="mob-stat-lbl" data-translate="new">Нов.</span>
            </div>
            <div class="mob-stat-item" onclick="typeof filterProjects==='function'&&filterProjects('favorites')">
              <span class="mob-stat-num" style="color:#fb923c;" id="mobStatFavorites">0</span>
              <span class="mob-stat-lbl" data-translate="in_work">Раб.</span>
            </div>
            <div class="mob-stat-item" onclick="typeof filterProjects==='function'&&filterProjects('completed')">
              <span class="mob-stat-num" style="color:#60a5fa;" id="mobStatCompleted">0</span>
              <span class="mob-stat-lbl" data-translate="done">Гот.</span>
            </div>
          </div>

          <!-- MOBILE: строка 3 — Действия -->
          <div class="flex md:hidden flex-wrap gap-1.5 mob-actions-row items-center">
            <button id="mobClaimBtn" onclick="window.openClaimModal&&window.openClaimModal()"
              style="position:relative;display:flex;align-items:center;gap:4px;padding:5px 10px;
                     background:rgba(8,145,178,0.2);border:1px solid rgba(34,211,238,0.3);
                     border-radius:10px;color:#22d3ee;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap;">
              🧪 <span id="mobClaimSpan" style="font-size:11px;" data-translate="claim_btn_label">Клейм</span>
            </button>

            <button onclick="typeof showNotifications==='function'&&showNotifications()"
              style="position:relative;padding:6px 9px;color:#94a3b8;background:transparent;
                     border:1px solid rgba(71,85,105,0.3);border-radius:10px;cursor:pointer;font-size:14px;">
              <i class="fas fa-bell"></i>
              <span id="mobNotifBadge"
                style="display:none;position:absolute;top:-4px;right:-4px;min-width:15px;height:15px;
                       background:linear-gradient(135deg,#ef4444,#f97316);border-radius:999px;
                       font-size:8px;font-weight:700;color:white;align-items:center;justify-content:center;padding:0 2px;"></span>
            </button>

            <button id="mobFeedbackBtn" onclick="typeof openFeedbackListModal==='function'&&openFeedbackListModal()"
              style="display:none;position:relative;padding:6px 9px;color:#94a3b8;background:transparent;
                     border:1px solid rgba(71,85,105,0.3);border-radius:10px;cursor:pointer;font-size:14px;">
              <i class="fas fa-comment-dots"></i>
              <span id="mobFeedbackBadge"
                style="display:none;position:absolute;top:-4px;right:-4px;min-width:15px;height:15px;
                       background:linear-gradient(135deg,#8b5cf6,#ec4899);border-radius:999px;
                       font-size:8px;font-weight:700;color:white;align-items:center;justify-content:center;padding:0 2px;"></span>
            </button>

            <button onclick="typeof toggleLang==='function'&&toggleLang()" id="mobLangBtn"
              style="display:flex;align-items:center;gap:5px;padding:5px 10px;border-radius:10px;
                     border:1px solid rgba(239,68,68,0.3);background:rgba(239,68,68,0.1);
                     cursor:pointer;font-size:11px;font-weight:700;color:#fff;white-space:nowrap;">
              <span class="mob-lang-flag" style="font-size:1rem;"></span>
              <span class="mob-lang-text">ENG</span>
            </button>

            <button id="mobAddBtn" onclick="typeof openAddModal==='function'&&openAddModal()"
              style="display:none;align-items:center;gap:4px;padding:5px 10px;
                     background:linear-gradient(135deg,#0891b2,#2563eb);border:none;
                     border-radius:8px;color:white;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;" class="flex">
              <i class="fas fa-flask"></i>
              <span data-translate="new_test">Добавить</span>
            </button>

            <div id="mobAdminBtns" style="display:none;" class="flex gap-1 items-center flex-wrap">
              <button onclick="typeof openStats==='function'&&openStats()" class="admin-action-btn admin-btn-orange" style="padding:5px 8px;font-size:11px;"><i class="fas fa-chart-pie"></i></button>
              <button onclick="typeof migrateToFirestore==='function'&&migrateToFirestore()" class="admin-action-btn admin-btn-purple" style="padding:5px 8px;font-size:11px;"><i class="fas fa-cloud-upload-alt"></i></button>
              <button onclick="typeof exportAllData==='function'&&exportAllData()" class="admin-action-btn admin-btn-emerald" style="padding:5px 8px;font-size:11px;"><i class="fas fa-file-export"></i></button>
              <button onclick="typeof openDeletedProjects==='function'&&openDeletedProjects()" class="admin-action-btn admin-btn-red" style="padding:5px 8px;font-size:11px;"><i class="fas fa-trash-restore"></i></button>
            </div>
          </div>
          <!-- КОНЕЦ MOBILE -->

        </div>
      </header>

      <!-- CryptoRank Ticker -->
      <div style="background:rgba(11,15,25,0.95);border-bottom:1px solid rgba(51,65,85,0.5);
                  backdrop-filter:blur(12px);overflow:hidden;max-width:100vw;box-sizing:border-box;">
        <div style="max-width:min(1600px,100%);margin:0 auto;padding:3px 16px;overflow:hidden;box-sizing:border-box;">
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
              <div class="al-nav-group">
                <button class="al-nav-btn" onclick="alNavToggle(this)">
                  <i class="fas fa-bolt" style="color:#22d3ee;"></i>
                  <span data-translate="menu_activities">Активности</span>
                  <i class="fas fa-chevron-down al-nav-arrow"></i>
                </button>
                <div class="al-nav-dropdown">
                  <a href="index.html" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-layer-group"></i><span data-translate="all_projects">Все активности</span></a>
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item"><i class="fas fa-parachute-box"></i><span data-translate="airdrops_lotteries">Аирдропы и розыгрыши</span></a>
                  <a href="faucet.html" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-faucet"></i><span data-translate="faucets">Краны</span></a>
                  <a href="index.html?filter=mainnet" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-network-wired"></i><span data-translate="mainnets">Мейннеты</span></a>
                  <a href="index.html?filter=testnet" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-flask"></i><span data-translate="testnets">Тестнеты</span></a>
                </div>
              </div>

              <!-- Гайды -->
              <div class="al-nav-group">
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
              <div class="al-nav-group">
                <button class="al-nav-btn" onclick="alNavToggle(this)">
                  <i class="fas fa-users" style="color:#34d399;"></i>
                  <span data-translate="menu_community">Сообщество</span>
                  <i class="fas fa-chevron-down al-nav-arrow"></i>
                </button>
                <div class="al-nav-dropdown">
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item"><i class="fas fa-comments"></i><span data-translate="chat">Чат</span></a>
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item"><i class="fas fa-trophy"></i><span data-translate="leaderboard">Таблица лидеров</span></a>
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item"><i class="fas fa-share-alt"></i><span data-translate="referrals">Рефералы</span></a>
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item"><i class="fas fa-comments-dollar"></i><span data-translate="forum">Форум</span></a>
                </div>
              </div>

              <!-- Календарь -->
              <div class="al-nav-group">
                <button class="al-nav-btn" onclick="alNavToggle(this)">
                  <i class="fas fa-calendar-alt" style="color:#fbbf24;"></i>
                  <span data-translate="menu_calendar">Календарь</span>
                  <i class="fas fa-chevron-down al-nav-arrow"></i>
                </button>
                <div class="al-nav-dropdown">
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item al-nav-item-accent"><i class="fas fa-calendar-check"></i><span data-translate="all_events">Все события</span></a>
                  <div class="al-nav-divider"></div>
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item"><i class="fas fa-hourglass-end" style="color:#f87171;"></i><span data-translate="deadlines">Дедлайны</span></a>
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item"><i class="fas fa-rocket" style="color:#fbbf24;"></i>TGE / <span data-translate="listings">Листинги</span></a>
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item"><i class="fas fa-star" style="color:#22d3ee;"></i><span data-translate="project_events">События проектов</span></a>
                </div>
              </div>

              <!-- Биржи -->
              <div class="al-nav-group">
                <button class="al-nav-btn" onclick="alNavToggle(this)">
                  <i class="fas fa-chart-bar" style="color:#a78bfa;"></i>
                  <span data-translate="menu_exchanges">Биржи</span>
                  <i class="fas fa-chevron-down al-nav-arrow"></i>
                </button>
                <div class="al-nav-dropdown">
                  <a href="https://www.binance.com/ru" target="_blank" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-circle" style="color:#f0b90b;font-size:8px;"></i>Binance</a>
                  <a href="https://www.bybit.com/ru-RU/" target="_blank" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-circle" style="color:#f7a600;font-size:8px;"></i>Bybit</a>
                  <a href="https://www.mexc.com/ru-RU" target="_blank" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-circle" style="color:#2354e6;font-size:8px;"></i>MEXC</a>
                  <a href="https://www.bitget.com/ru/" target="_blank" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-circle" style="color:#00f0ff;font-size:8px;"></i>Bitget</a>
                  <a href="https://bingx.com/ru-ru/" target="_blank" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-circle" style="color:#1890ff;font-size:8px;"></i>BingX</a>
                  <a href="https://www.lbank.com/" target="_blank" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-circle" style="color:#ff5722;font-size:8px;"></i>LBank</a>
                  <a href="https://www.bitmart.com/" target="_blank" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-circle" style="color:#0096ff;font-size:8px;"></i>Bitmart</a>
                  <div class="al-nav-divider"></div>
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item al-nav-item-accent"><i class="fas fa-th-list"></i><span data-translate="all_exchanges">Все биржи</span></a>
                </div>
              </div>

              <!-- Новости -->
              <div class="al-nav-group">
                <button class="al-nav-btn" onclick="alNavToggle(this)">
                  <i class="fas fa-newspaper" style="color:#f87171;"></i>
                  <span data-translate="menu_news">Новости</span>
                  <i class="fas fa-chevron-down al-nav-arrow"></i>
                </button>
                <div class="al-nav-dropdown">
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item"><i class="fas fa-coins"></i><span data-translate="crypto_news">Криптовалютные новости</span></a>
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item"><i class="fas fa-chart-line"></i><span data-translate="analytics_news">Новости аналитики</span></a>
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item"><i class="fas fa-robot"></i><span data-translate="ai_news">Новости AI</span></a>
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item"><i class="fab fa-bitcoin"></i><span data-translate="bitcoin_news">Новости Bitcoin</span></a>
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item"><i class="fas fa-water"></i><span data-translate="defi_news">Новости DeFi</span></a>
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item"><i class="fas fa-gamepad"></i><span data-translate="gamefi_news">Новости GameFi / Metaverse</span></a>
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item"><i class="fas fa-rocket"></i><span data-translate="ido_news">Новости IDO/ICO/IFO/IEO</span></a>
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item"><i class="fas fa-image"></i><span data-translate="nft_news">Новости NFT</span></a>
                </div>
              </div>

              <!-- Инструменты -->
              <div class="al-nav-group">
                <button class="al-nav-btn" onclick="alNavToggle(this)">
                  <i class="fas fa-tools" style="color:#fbbf24;"></i>
                  <span data-translate="menu_tools">Инструменты</span>
                  <i class="fas fa-chevron-down al-nav-arrow"></i>
                </button>
                <div class="al-nav-dropdown">
                  <a href="faucet.html" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-faucet"></i><span data-translate="faucets">Краны (Faucets)</span></a>
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item"><i class="fas fa-calculator"></i><span data-translate="gas_calculator">Калькулятор газа</span></a>
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item"><i class="fas fa-exchange-alt"></i><span data-translate="bridges">Бриджи</span></a>
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item"><i class="fas fa-shield-alt"></i><span data-translate="wallet_checker">Проверка кошелька</span></a>
                </div>
              </div>

              <!-- Обучение -->
              <div class="al-nav-group">
                <button class="al-nav-btn" onclick="alNavToggle(this)">
                  <i class="fas fa-graduation-cap" style="color:#60a5fa;"></i>
                  <span data-translate="menu_learning">Обучение</span>
                  <i class="fas fa-chevron-down al-nav-arrow"></i>
                </button>
                <div class="al-nav-dropdown">
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item"><i class="fas fa-book-open"></i><span data-translate="what_is_airdrop">Что такое аирдроп</span></a>
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item"><i class="fas fa-wallet"></i><span data-translate="how_setup_wallet">Как настроить кошелёк</span></a>
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item"><i class="fas fa-shield-virus"></i><span data-translate="crypto_security">Безопасность в крипте</span></a>
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item"><i class="fas fa-question-circle"></i>FAQ</a>
                </div>
              </div>

            </div>
          </div>
        </nav>
      </div>

      <!-- ═══════════════════════════════════════════════
           COMING SOON MODAL — профессиональный дизайн
           ═══════════════════════════════════════════════ -->
      <div id="comingSoonModal"
           style="display:none;position:fixed;inset:0;z-index:10000;
                  align-items:center;justify-content:center;padding:16px;"
           onclick="closeComingSoon(event)">

        <!-- Backdrop -->
        <div style="position:absolute;inset:0;background:rgba(2,6,23,0.92);backdrop-filter:blur(24px);"></div>

        <!-- Card -->
        <div onclick="event.stopPropagation()"
             style="position:relative;width:100%;max-width:480px;
                    background:linear-gradient(145deg,rgba(11,15,35,0.99),rgba(17,24,50,0.99));
                    border:1px solid rgba(34,211,238,0.25);border-radius:28px;
                    box-shadow:0 0 0 1px rgba(34,211,238,0.08),
                               0 32px 80px rgba(0,0,0,0.8),
                               0 0 80px rgba(34,211,238,0.08);
                    overflow:hidden;animation:csModalIn 0.35s cubic-bezier(0.34,1.56,0.64,1);">

          <!-- Верхний градиентный блик -->
          <div style="position:absolute;top:0;left:0;right:0;height:1px;
                      background:linear-gradient(90deg,transparent,rgba(34,211,238,0.6),rgba(139,92,246,0.6),transparent);"></div>

          <!-- Фоновое свечение -->
          <div style="position:absolute;top:-60px;left:50%;transform:translateX(-50%);
                      width:300px;height:300px;border-radius:50%;
                      background:radial-gradient(circle,rgba(34,211,238,0.06) 0%,transparent 70%);
                      pointer-events:none;"></div>

          <div style="padding:40px 36px 36px;">

            <!-- Иконка-спутник -->
            <div style="display:flex;justify-content:center;margin-bottom:28px;">
              <div style="position:relative;width:88px;height:88px;">
                <!-- Пульсирующие кольца -->
                <div class="cs-ring cs-ring-1"></div>
                <div class="cs-ring cs-ring-2"></div>
                <div class="cs-ring cs-ring-3"></div>
                <!-- Основной круг -->
                <div style="position:absolute;inset:0;border-radius:50%;
                            background:linear-gradient(145deg,rgba(34,211,238,0.15),rgba(139,92,246,0.15));
                            border:1.5px solid rgba(34,211,238,0.3);
                            display:flex;align-items:center;justify-content:center;
                            backdrop-filter:blur(8px);">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- Спутник тело -->
                    <rect x="16" y="16" width="8" height="8" rx="1.5" fill="url(#satGrad)" opacity="0.9"/>
                    <!-- Солнечные панели левая -->
                    <rect x="5" y="17.5" width="9" height="5" rx="1" fill="#22d3ee" opacity="0.7"/>
                    <line x1="6" y1="19" x2="13" y2="19" stroke="rgba(34,211,238,0.4)" stroke-width="0.5"/>
                    <line x1="6" y1="21" x2="13" y2="21" stroke="rgba(34,211,238,0.4)" stroke-width="0.5"/>
                    <!-- Солнечные панели правая -->
                    <rect x="26" y="17.5" width="9" height="5" rx="1" fill="#22d3ee" opacity="0.7"/>
                    <line x1="27" y1="19" x2="34" y2="19" stroke="rgba(34,211,238,0.4)" stroke-width="0.5"/>
                    <line x1="27" y1="21" x2="34" y2="21" stroke="rgba(34,211,238,0.4)" stroke-width="0.5"/>
                    <!-- Антенна -->
                    <line x1="20" y1="16" x2="20" y2="10" stroke="#a78bfa" stroke-width="1.5" stroke-linecap="round"/>
                    <circle cx="20" cy="9" r="2" fill="#a78bfa" opacity="0.8">
                      <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.5s" repeatCount="indefinite"/>
                    </circle>
                    <!-- Сигнальные дуги -->
                    <path d="M23 7 Q27 9 25 13" stroke="#22d3ee" stroke-width="1" fill="none" stroke-linecap="round" opacity="0.6">
                      <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite"/>
                    </path>
                    <path d="M25 5 Q31 8 28 15" stroke="#22d3ee" stroke-width="0.8" fill="none" stroke-linecap="round" opacity="0.4">
                      <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" begin="0.3s" repeatCount="indefinite"/>
                    </path>
                    <defs>
                      <linearGradient id="satGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#22d3ee"/>
                        <stop offset="100%" stop-color="#8b5cf6"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Бейдж статуса -->
            <div style="display:flex;justify-content:center;margin-bottom:16px;">
              <div style="display:inline-flex;align-items:center;gap:6px;
                          padding:4px 12px;border-radius:999px;
                          background:rgba(34,211,238,0.08);
                          border:1px solid rgba(34,211,238,0.2);">
                <span style="width:6px;height:6px;border-radius:50%;background:#22d3ee;
                             box-shadow:0 0 8px #22d3ee;animation:csBlink 1.4s infinite;display:inline-block;"></span>
                <span style="font-size:11px;font-weight:700;color:#22d3ee;letter-spacing:0.08em;text-transform:uppercase;">В разработке</span>
              </div>
            </div>

            <!-- Заголовок -->
            <h2 style="text-align:center;font-size:26px;font-weight:800;
                       color:#f1f5f9;margin:0 0 10px;line-height:1.2;
                       text-shadow:0 2px 16px rgba(34,211,238,0.2);" data-translate="menu_in_development">
              Раздел скоро откроется
            </h2>

            <!-- Подзаголовок -->
            <p style="text-align:center;color:#64748b;font-size:14px;
                      margin:0 0 28px;line-height:1.6;" data-translate="menu_coming_soon">
              Мы уже работаем над этим разделом.<br>Подпишитесь — мы уведомим вас в момент запуска.
            </p>

            <!-- Разделитель -->
            <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(34,211,238,0.15),transparent);margin-bottom:24px;"></div>

            <!-- Что будет -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:28px;">
              <div style="padding:12px 14px;border-radius:12px;
                          background:rgba(34,211,238,0.04);border:1px solid rgba(34,211,238,0.1);
                          display:flex;align-items:center;gap:10px;">
                <div style="width:28px;height:28px;border-radius:8px;flex-shrink:0;
                            background:rgba(34,211,238,0.12);display:flex;align-items:center;justify-content:center;">
                  <i class="fas fa-bolt" style="color:#22d3ee;font-size:11px;"></i>
                </div>
                <span style="color:#94a3b8;font-size:12px;line-height:1.3;">Актуальная информация</span>
              </div>
              <div style="padding:12px 14px;border-radius:12px;
                          background:rgba(139,92,246,0.04);border:1px solid rgba(139,92,246,0.1);
                          display:flex;align-items:center;gap:10px;">
                <div style="width:28px;height:28px;border-radius:8px;flex-shrink:0;
                            background:rgba(139,92,246,0.12);display:flex;align-items:center;justify-content:center;">
                  <i class="fas fa-tools" style="color:#a78bfa;font-size:11px;"></i>
                </div>
                <span style="color:#94a3b8;font-size:12px;line-height:1.3;">Интерактивные инструменты</span>
              </div>
              <div style="padding:12px 14px;border-radius:12px;
                          background:rgba(236,72,153,0.04);border:1px solid rgba(236,72,153,0.1);
                          display:flex;align-items:center;gap:10px;">
                <div style="width:28px;height:28px;border-radius:8px;flex-shrink:0;
                            background:rgba(236,72,153,0.12);display:flex;align-items:center;justify-content:center;">
                  <i class="fas fa-users" style="color:#ec4899;font-size:11px;"></i>
                </div>
                <span style="color:#94a3b8;font-size:12px;line-height:1.3;">Сообщество и чаты</span>
              </div>
              <div style="padding:12px 14px;border-radius:12px;
                          background:rgba(251,191,36,0.04);border:1px solid rgba(251,191,36,0.1);
                          display:flex;align-items:center;gap:10px;">
                <div style="width:28px;height:28px;border-radius:8px;flex-shrink:0;
                            background:rgba(251,191,36,0.12);display:flex;align-items:center;justify-content:center;">
                  <i class="fas fa-star" style="color:#fbbf24;font-size:11px;"></i>
                </div>
                <span style="color:#94a3b8;font-size:12px;line-height:1.3;">Ранний доступ</span>
              </div>
            </div>

            <!-- Кнопка уведомления -->
            <div id="csNotifyArea" style="margin-bottom:16px;">
              <!-- Рендерится через JS -->
            </div>

            <!-- Кнопка закрыть -->
            <button onclick="closeComingSoon()"
              style="width:100%;padding:12px;border-radius:12px;
                     background:transparent;border:1px solid rgba(71,85,105,0.3);
                     color:#64748b;font-size:14px;font-weight:500;cursor:pointer;
                     transition:all 0.2s;"
              onmouseover="this.style.borderColor='rgba(34,211,238,0.3)';this.style.color='#94a3b8';"
              onmouseout="this.style.borderColor='rgba(71,85,105,0.3)';this.style.color='#64748b';"
              data-translate="close">
              Закрыть
            </button>

          </div>
        </div>
      </div>

      <style>
        /* ── Coming Soon Modal ── */
        @keyframes csModalIn {
          from { opacity:0; transform:scale(0.88) translateY(20px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes csBlink {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.3; transform:scale(0.8); }
        }
        @keyframes csRingPulse {
          0%   { transform:scale(1); opacity:0.5; }
          100% { transform:scale(2.2); opacity:0; }
        }
        .cs-ring {
          position:absolute; top:50%; left:50%;
          transform:translate(-50%,-50%);
          border-radius:50%;
          border:1px solid rgba(34,211,238,0.35);
          animation:csRingPulse 2.4s ease-out infinite;
          pointer-events:none;
        }
        .cs-ring-1 { width:88px; height:88px; animation-delay:0s; }
        .cs-ring-2 { width:88px; height:88px; animation-delay:0.8s; }
        .cs-ring-3 { width:88px; height:88px; animation-delay:1.6s; }

        /* ── Navigation ── */
        #site-nav-wrapper { position:relative; z-index:9000; }
        #site-nav ::-webkit-scrollbar { display:none; }
        .al-nav-dropdown::-webkit-scrollbar { width:4px; }
        .al-nav-dropdown::-webkit-scrollbar-track { background:transparent; }
        .al-nav-dropdown::-webkit-scrollbar-thumb { background:rgba(34,211,238,0.25);border-radius:2px; }

        .al-nav-group { position:relative; display:inline-block; vertical-align:top; }

        .al-nav-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 14px; background: transparent; border: none;
          color: #94a3b8; font-size: 13px; font-weight: 500;
          cursor: pointer; white-space: nowrap;
          transition: color 0.2s, background 0.2s;
          font-family: 'Inter', sans-serif;
          vertical-align: top;
          position: relative;
        }
        .al-nav-btn:hover, .al-nav-btn.al-nav-open {
          color: #f1f5f9;
          background: rgba(34,211,238,0.06);
        }
        .al-nav-arrow { font-size:9px; margin-left:2px; transition:transform 0.2s; }
        .al-nav-btn.al-nav-open .al-nav-arrow { transform:rotate(180deg); }

        /* ─── КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ: position:fixed, CSS управляет позицией ─── */
        .al-nav-dropdown {
          display: none;
          position: absolute;
          min-width: 280px; /* увеличена ширина */
          background: rgba(11,15,30,0.99);
          border: 1px solid rgba(34,211,238,0.2);
          border-radius: 12px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(34,211,238,0.05);
          backdrop-filter: blur(20px);
          z-index: 999999; /* очень высокий для поверх ВСЕХ элементов */
          padding: 6px 0;
          animation: alNavFadeIn 0.15s ease;
          /* убрали max-height и overflow-y для отображения полного меню */
        }
        .al-nav-dropdown.al-open { display:block; }

        @keyframes alNavFadeIn {
          from { opacity:0; transform:translateY(-4px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .al-nav-item {
          display:flex; align-items:center; gap:10px;
          padding:9px 16px; color:#94a3b8; font-size:13px;
          text-decoration:none; transition:all 0.15s; white-space:nowrap;
        }
        .al-nav-item i { width:14px; text-align:center; font-size:12px; color:#475569; flex-shrink:0; }
        .al-nav-item:hover { background:rgba(34,211,238,0.07); color:#f1f5f9; }
        .al-nav-item:hover i { color:#22d3ee; }
        .al-nav-item-accent { color:#22d3ee !important; font-weight:600; }
        .al-nav-divider { height:1px; background:rgba(255,255,255,0.06); margin:4px 0; }
      </style>
    `;

    // Скрываем статистику на неглавных страницах
    var isMainPage = window.location.pathname.endsWith('index.html')
                  || window.location.pathname.endsWith('/')
                  || window.location.pathname === '';
    if (!isMainPage) {
      var ds = document.querySelector('.flex.gap-5.text-sm');
      var ms = document.querySelector('.mob-stats-row');
      if (ds) ds.style.display = 'none';
      if (ms) ms.style.display = 'none';
    }

    // CryptoRank script
    var crScript = document.createElement('script');
    crScript.src = 'https://cryptorank.io/widget/marquee.js';
    document.body.appendChild(crScript);

    setTimeout(function () {
      if (typeof updateLanguageButton === 'function') updateLanguageButton();
      if (typeof updateAllTranslations === 'function') updateAllTranslations();
    }, 0);

    // Рендер кнопки уведомлений в модале
    function renderNotifyBtn() {
      var area = document.getElementById('csNotifyArea');
      if (!area) return;
      var subscribed = localStorage.getItem('al_cs_notify') === '1';
      if (subscribed) {
        area.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;gap:8px;'
          + 'padding:12px;border-radius:12px;background:rgba(52,211,153,0.08);'
          + 'border:1px solid rgba(52,211,153,0.2);">'
          + '<i class="fas fa-check-circle" style="color:#34d399;font-size:16px;"></i>'
          + '<span style="color:#34d399;font-size:13px;font-weight:600;">Вы подписаны — уведомим при запуске!</span>'
          + '</div>';
      } else {
        area.innerHTML = '<button id="csNotifyBtn" onclick="window.csRequestNotify()"'
          + ' style="width:100%;padding:13px;border-radius:12px;cursor:pointer;'
          + 'background:linear-gradient(135deg,rgba(34,211,238,0.15),rgba(139,92,246,0.15));'
          + 'border:1px solid rgba(34,211,238,0.3);color:#f1f5f9;'
          + 'font-size:14px;font-weight:600;transition:all 0.2s;'
          + 'display:flex;align-items:center;justify-content:center;gap:8px;"'
          + ' onmouseover="this.style.background=\'linear-gradient(135deg,rgba(34,211,238,0.25),rgba(139,92,246,0.25))\';'
          + 'this.style.borderColor=\'rgba(34,211,238,0.5)\';"'
          + ' onmouseout="this.style.background=\'linear-gradient(135deg,rgba(34,211,238,0.15),rgba(139,92,246,0.15))\';'
          + 'this.style.borderColor=\'rgba(34,211,238,0.3)\';">'
          + '<i class="fas fa-satellite-dish" style="color:#22d3ee;"></i>'
          + '<span>Уведомить меня о запуске</span>'
          + '</button>';
      }
    }

    window.csRequestNotify = function() {
      var btn = document.getElementById('csNotifyBtn');
      if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin" style="color:#22d3ee;"></i><span>Подключаемся...</span>';
        btn.disabled = true;
      }
      function markSubscribed() {
        localStorage.setItem('al_cs_notify', '1');
        setTimeout(renderNotifyBtn, 400);
      }
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then(function(p) {
          if (p === 'granted') {
            new Notification('AirdropLab', {
              body: 'Вы подписаны! Уведомим при запуске раздела 🚀',
              icon: '/favicon.ico'
            });
          }
          markSubscribed();
        }).catch(markSubscribed);
      } else {
        setTimeout(markSubscribed, 600);
      }
    };

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
          .observe(from, { childList:true, characterData:true, subtree:true });
      });

      // 2. Auth state — ИСПРАВЛЕНО: убраны setTimeout и setInterval внутри syncAuth
      var deskIn  = document.getElementById('loggedInView');
      var mobIn   = document.getElementById('mobLoggedInView');
      var mobOut  = document.getElementById('mobLoggedOutView');
      var deskAva = document.getElementById('userAvatar');
      var mobAva  = document.getElementById('mobUserAvatar');

      function syncAuth() {
        var isIn = deskIn && !deskIn.classList.contains('hidden');
        if (mobIn)  mobIn.style.display  = isIn ? 'flex' : 'none';
        if (mobOut) mobOut.style.display = isIn ? 'none' : 'block';
        if (deskAva && mobAva && deskAva.src) mobAva.src = deskAva.src;
      }
      if (deskIn)  new MutationObserver(syncAuth).observe(deskIn,  { attributes:true, attributeFilter:['class','style'] });
      if (deskAva) new MutationObserver(function(){ if (mobAva) mobAva.src = deskAva.src; })
                     .observe(deskAva, { attributes:true, attributeFilter:['src'] });
      syncAuth();
      
      // Дополнительная проверка каждые 500мс на случай проблем с синхронизацией
      // setInterval(syncAuth, 500); // ЗАКОММЕНТИРОВАНО - вызывает бесконечный цикл

      // 3. Feedback panel
      var deskFP     = document.getElementById('generalFeedbackPanel');
      var mobFBtn    = document.getElementById('mobFeedbackBtn');
      var deskFBadge = document.getElementById('feedbackBadge');
      var mobFBadge  = document.getElementById('mobFeedbackBadge');

      function syncFeedback() {
        var vis = deskFP && !deskFP.classList.contains('hidden');
        if (mobFBtn) mobFBtn.style.display = vis ? 'block' : 'none';
      }
      function syncFBadge() {
        if (!deskFBadge || !mobFBadge) return;
        var hidden = deskFBadge.classList.contains('hidden');
        mobFBadge.style.display = hidden ? 'none' : 'flex';
        if (!hidden) mobFBadge.textContent = deskFBadge.textContent;
      }
      if (deskFP)     new MutationObserver(syncFeedback).observe(deskFP,     { attributes:true, attributeFilter:['class','style'] });
      if (deskFBadge) new MutationObserver(syncFBadge).observe(deskFBadge,   { attributes:true, attributeFilter:['class'], childList:true, subtree:true });
      syncFeedback(); syncFBadge();

      // 4. Notification badge
      var deskNBadge = document.getElementById('notificationBadge');
      var mobNBadge  = document.getElementById('mobNotifBadge');
      function syncNBadge() {
        if (!deskNBadge || !mobNBadge) return;
        var hidden = deskNBadge.classList.contains('hidden');
        mobNBadge.style.display = hidden ? 'none' : 'flex';
        if (!hidden) mobNBadge.textContent = deskNBadge.textContent;
      }
      if (deskNBadge) new MutationObserver(syncNBadge).observe(deskNBadge, { attributes:true, attributeFilter:['class'], childList:true, subtree:true });
      syncNBadge();

      // 5. Admin panel
      var deskAdmin = document.getElementById('adminPanel');
      var mobAdd    = document.getElementById('mobAddBtn');
      var mobBtns   = document.getElementById('mobAdminBtns');
      function syncAdmin() {
        var vis = deskAdmin && deskAdmin.style.display !== 'none' && deskAdmin.style.display !== '';
        if (mobAdd)  mobAdd.style.display  = vis ? 'flex' : 'none';
        if (mobBtns) mobBtns.style.display = vis ? 'flex' : 'none';
      }
      if (deskAdmin) new MutationObserver(syncAdmin).observe(deskAdmin, { attributes:true, attributeFilter:['style'] });
      syncAdmin();

      // 6. Lang button
      var deskLang    = document.getElementById('langBtn');
      var mobLangBtn  = document.getElementById('mobLangBtn');
      var mobLangFlag = document.querySelector('.mob-lang-flag');
      var mobLangText = document.querySelector('.mob-lang-text');
      function syncLang() {
        if (!deskLang) return;
        var flag = deskLang.querySelector('.lang-flag');
        var text = deskLang.querySelector('.lang-text');
        if (mobLangFlag && flag) mobLangFlag.textContent = flag.textContent;
        if (mobLangText && text) mobLangText.textContent = text.textContent;
        if (mobLangBtn) {
          var active = deskLang.classList.contains('lang-active');
          mobLangBtn.style.background   = active ? 'rgba(34,197,94,0.2)'  : 'rgba(239,68,68,0.1)';
          mobLangBtn.style.borderColor  = active ? 'rgba(34,197,94,0.5)'  : 'rgba(239,68,68,0.3)';
        }
      }
      if (deskLang) new MutationObserver(syncLang).observe(deskLang, { attributes:true, subtree:true, childList:true, characterData:true });
      setTimeout(syncLang, 200);
      setTimeout(syncLang, 600);

      // 7. Claim button
      var deskClaim = document.getElementById('headerClaimBtn');
      var mobClaim  = document.getElementById('mobClaimBtn');
      function syncClaimBtn() {
        if (!deskClaim || !mobClaim) return;
        var txt = deskClaim.textContent || '';
        var isClaimed = deskClaim.disabled
          || /\d+:\d{2}/.test(txt)
          || txt.toLowerCase().includes('сброс')
          || txt.toLowerCase().includes('reset');
        if (isClaimed) {
          var lbl = (window.currentLang === 'en') ? 'Claimed' : 'Готово';
          mobClaim.innerHTML = '🔒 <span style="font-size:11px;">' + lbl + '</span>';
          mobClaim.style.background   = 'rgba(71,85,105,0.2)';
          mobClaim.style.borderColor  = 'rgba(71,85,105,0.35)';
          mobClaim.style.color        = '#64748b';
        } else {
          var lbl = (window.currentLang === 'en') ? 'Claim' : 'Клейм';
          mobClaim.innerHTML = '🧪 <span style="font-size:11px;">' + lbl + '</span>';
          mobClaim.style.background   = 'rgba(8,145,178,0.2)';
          mobClaim.style.borderColor  = 'rgba(34,211,238,0.3)';
          mobClaim.style.color        = '#22d3ee';
        }
        mobClaim.onclick = function() { if (window.openClaimModal) window.openClaimModal(); };
      }
      if (deskClaim) new MutationObserver(syncClaimBtn).observe(deskClaim, { childList:true, subtree:true, attributes:true, characterData:true });
      // setInterval(syncClaimBtn, 5000); // ЗАКОММЕНТИРОВАНО - вызывает цикл
      syncClaimBtn();

      // Рендер кнопки уведомлений после установки всех наблюдателей
      renderNotifyBtn();
    }

    setTimeout(setupObservers, 200);

    // Header height CSS variable
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

// ════════════════════════════════════════════════════
// Очистка проблемных данных Firebase
// ════════════════════════════════════════════════════
window.cleanupFirebaseData = function() {
  try {
    // Очистка problematic localStorage данных
    localStorage.removeItem('firestore_online_state_firestore/[DEFAULT]/testnet-hub/');
    localStorage.removeItem('firestore_sequence_number_firestore/[DEFAULT]/testnet-hub/');
    localStorage.removeItem('firestore_clients_firestore/[DEFAULT]/testnet-hub/_z544aLk2APXdIYf6ZrzE');
    localStorage.removeItem('firestore_targets_firestore/[DEFAULT]/testnet-hub/_2');
    localStorage.removeItem('firestore_targets_firestore/[DEFAULT]/testnet-hub/_4');
    
    // Остановка всех активных Firebase соединений
    if (window.firebase && window.firebase.firestore) {
      console.log('Очистка Firebase данных...');
    }
    
    console.log('Firebase данные очищены');
  } catch (error) {
    console.log('Ошибка при очистке:', error);
  }
};

// Автоматическая очистка при загрузке если есть проблемы
if (localStorage.getItem('firestore_online_state_firestore/[DEFAULT]/testnet-hub/')) {
  console.log('Обнаружены проблемные Firebase данные - выполняю очистку');
  cleanupFirebaseData();
  location.reload(true);
}

// ════════════════════════════════════════════════════
// Navigation toggle — ИСПРАВЛЕНО: position:fixed без scrollTop
// ════════════════════════════════════════════════════
window.alNavToggle = function(btn) {
  var group = btn.closest('.al-nav-group');
  
  // Убеждаемся что у группы есть ID для поиска
  if (!group.id) {
    group.id = 'al-nav-group-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }
  
  var dropdown = group.querySelector('.al-nav-dropdown');
  
  // Если меню не найдено в группе, ищем его в body по data-parent-id
  if (!dropdown) {
    // Ищем меню в body которое принадлежит этой группе
    dropdown = document.querySelector('[data-parent-id="' + group.id + '"]');
  }
  
  // Если все еще не найдено, выходим
  if (!dropdown) return;
  
  var isOpen = dropdown.classList.contains('al-open');

  // Закрыть все открытые
  document.querySelectorAll('.al-nav-dropdown.al-open').forEach(function(d) {
    d.classList.remove('al-open');
    // Ищем родительскую группу по ID
    var parentId = d.getAttribute('data-parent-id');
    if (parentId) {
      var parentGroup = document.getElementById(parentId);
      if (parentGroup) {
        var b = parentGroup.querySelector('.al-nav-btn');
        if (b) b.classList.remove('al-nav-open');
      }
    }
  });

  if (!isOpen) {
    var rect = btn.getBoundingClientRect();
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    // Сохраняем ссылку на родительскую группу перед перемещением
    var parentGroup = dropdown.closest('.al-nav-group') || group;
    
    // Перемещаем меню в body чтобы избежать ограничений родителя
    document.body.appendChild(dropdown);
    
    // Сохраняем ID родительской группы в атрибуте меню
    dropdown.setAttribute('data-parent-id', parentGroup.id);
    
    // position:fixed - координаты относительно вьюпорта
    dropdown.style.position = 'fixed';
    dropdown.style.top  = (rect.bottom + 2) + 'px';
    dropdown.style.left = rect.left + 'px';
    dropdown.style.width = rect.width + 'px'; // устанавливаем ширину равную кнопке
    dropdown.classList.add('al-open');
    btn.classList.add('al-nav-open');
  }
};

// Закрытие по клику вне меню
document.addEventListener('click', function(e) {
  if (!e.target.closest('.al-nav-group')) {
    document.querySelectorAll('.al-nav-dropdown.al-open').forEach(function(d) {
      d.classList.remove('al-open');
      // Ищем родительскую группу по ID
      var parentId = d.getAttribute('data-parent-id');
      if (parentId) {
        var parentGroup = document.getElementById(parentId);
        if (parentGroup) {
          var b = parentGroup.querySelector('.al-nav-btn');
          if (b) b.classList.remove('al-nav-open');
        }
      }
    });
  }
});

// Обновление позиции при скролле (fixed - пересчитываем по вьюпорту)
window.addEventListener('scroll', function() {
  document.querySelectorAll('.al-nav-dropdown.al-open').forEach(function(d) {
    // Ищем родительскую группу по ID
    var parentId = d.getAttribute('data-parent-id');
    if (parentId) {
      var parentGroup = document.getElementById(parentId);
      if (parentGroup) {
        var b = parentGroup.querySelector('.al-nav-btn');
        if (b) {
          var rect = b.getBoundingClientRect();
          d.style.top  = (rect.bottom + 2) + 'px';
          d.style.left = rect.left + 'px';
          d.style.width = rect.width + 'px'; // обновляем ширину при скролле
        }
      }
    }
  });
}, { passive: true });

// Закрытие при ресайзе
window.addEventListener('resize', function() {
  document.querySelectorAll('.al-nav-dropdown.al-open').forEach(function(d) {
    d.classList.remove('al-open');
    // Ищем родительскую группу по ID
    var parentId = d.getAttribute('data-parent-id');
    if (parentId) {
      var parentGroup = document.getElementById(parentId);
      if (parentGroup) {
        var b = parentGroup.querySelector('.al-nav-btn');
        if (b) b.classList.remove('al-nav-open');
      }
    }
  });
});

// ════════════════════════════════════════════════════
// Coming Soon Modal
// ════════════════════════════════════════════════════
window.showComingSoon = function() {
  var modal = document.getElementById('comingSoonModal');
  if (!modal) return;
  // Сброс кнопки уведомления при каждом открытии
  var area = document.getElementById('csNotifyArea');
  if (area) {
    var subscribed = localStorage.getItem('al_cs_notify') === '1';
    if (!subscribed) {
      var btn = document.getElementById('csNotifyBtn');
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-satellite-dish" style="color:#22d3ee;"></i><span>Уведомить меня о запуске</span>';
      }
    }
  }
  modal.style.display = 'flex';
};

window.closeComingSoon = function(event) {
  if (event && event.target !== event.currentTarget) return;
  var modal = document.getElementById('comingSoonModal');
  if (modal) modal.style.display = 'none';
};

// Закрытие дропдауна по клику на ссылку внутри него
window.closeAlNav = function(el) {
  var dropdown = el.closest('.al-nav-dropdown');
  if (!dropdown) return;
  dropdown.classList.remove('al-open');
  var btn = dropdown.closest('.al-nav-group').querySelector('.al-nav-btn');
  if (btn) btn.classList.remove('al-nav-open');
};

// Функции для работы с сообщениями (доступны на всех страницах)
window.openFeedbackListModal = function() {
  // Проверяем и создаем модальное окно если нужно
  if (!document.getElementById('feedbackListModal')) {
    createFeedbackModal();
  }
  
  if (!window.currentUser) { 
    if (typeof showToast === 'function') {
      showToast('Войдите');
    } else if (typeof toast === 'function') {
      toast('Войдите');
    }
    if (typeof openLoginModal === 'function') openLoginModal(); 
    return; 
  }
  
  const isAdmin = window.currentUser.uid === "SAkz4mdW9reDaIsvqigCNZhEKJR2";
  const titleContainer = document.querySelector('#feedbackListModal h2');
  const tr = (typeof t === 'function') ? t : (k) => {
    const dict = {
      all_requests: 'Все запросы',
      my_messages: 'Мои сообщения'
    };
    return dict[k] || k;
  };
  if (titleContainer) {
    titleContainer.innerHTML = isAdmin
      ? '<i class="fas fa-shield-alt text-purple-400 mr-2"></i>' + tr('all_requests')
      : '<i class="fas fa-comments text-purple-400 mr-2"></i>' + tr('my_messages');
  }

  const modal = document.getElementById('feedbackListModal');
  if (!modal) return;
  modal.classList.add('active');
  setTimeout(function() {
    if (typeof window.renderFeedbackList === 'function') window.renderFeedbackList();
  }, 100);
};

window.closeFeedbackListModal = function() { 
  const modal = document.getElementById('feedbackListModal');
  if (modal) modal.classList.remove('active'); 
};

// Базовая функция renderFeedbackList для всех страниц
window.renderFeedbackList = function() {
  const container = document.getElementById('feedbacksContainer');
  if (!container) return;

  const isAdmin = window.currentUser && window.currentUser.uid === "SAkz4mdW9reDaIsvqigCNZhEKJR2";
  
  const items = Array.isArray(window.adminFeedbacks) ? window.adminFeedbacks : [];
  if (!items.length) {
    const tr = (typeof t === 'function') ? t : (k) => {
      const dict = { no_messages: 'Нет сообщений' };
      return dict[k] || k;
    };
    container.innerHTML = `
      <div class="text-center py-12 text-slate-500">
        <div class="bg-slate-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-inbox text-2xl text-slate-600"></i>
        </div>
        <p>${tr('no_messages')}</p>
      </div>`;
    return;
  }

  renderFeedbackMessages(items, isAdmin);
};

// Функция для отображения сообщений
function renderFeedbackMessages(feedbacks, isAdmin) {
  const container = document.getElementById('feedbacksContainer');
  if (!container) return;
  
  if (feedbacks.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 text-slate-500">
        <div class="bg-slate-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-inbox text-2xl text-slate-600"></i>
        </div>
        <p class="text-lg font-medium mb-2">У вас пока нет сообщений</p>
        <p class="text-sm text-slate-400">Все ваши отзывы и предложения будут доступны на главной странице</p>
      </div>
    `;
    return;
  }
  
  // Словарь тем
  const categoryLabels = {
    suggestion: '💡 Предложение',
    bug: '🐛 Ошибка',
    question: '❓ Вопрос',
    other: '💬 Другое',
    technical: '🔧 Тех. проблема',
    account: '👤 Аккаунт',
    partnership: '🤝 Партнёрство'
  };

  const list = Array.isArray(window.adminFeedbacks) ? window.adminFeedbacks : [];
  const esc = (typeof window.safeText === 'function')
    ? window.safeText
    : function(s) {
        return String(s || '').replace(/[&<>"']/g, function(ch) {
          return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
        });
      };
  const tr = (typeof t === 'function') ? t : (k) => {
    const dict = {
      support: 'Support'
    };
    return dict[k] || k;
  };

  container.innerHTML = list.map((item) => {
    const messages = item.messages || [];
    const lastMsg = messages[messages.length - 1] || { text: '...', sender: 'unknown' };
    const date = item.createdAt?.toDate() || new Date(item.createdAt || 0);
    const isUnread = isAdmin ? !item.read : !item.userRead;
    const isSupport = item.projectId === '__support__' || item.type === 'support';
    const categoryLabel = item.category ? (categoryLabels[item.category] || item.category) : null;

    let projectName, projectLogo;
    if (isSupport) {
      projectName = tr('support');
      projectLogo = '';
    } else {
      const pr = (window.projects && Array.isArray(window.projects))
        ? window.projects.find(p => p.id === item.projectId)
        : null;
      projectName = (pr && pr.name) || item.projectName || item.projectId || 'Неизвестный проект';
      projectLogo = (pr && (pr.image || pr.logoUrl)) || item.projectLogo || '';
    }

    const openHandler = (typeof window.openFeedbackFromList === 'function')
      ? `onclick="openFeedbackFromList('${String(item.id || '').replace(/'/g, "\\'")}', '${String(item.projectId || '').replace(/'/g, "\\'")}', '${String(projectName || '').replace(/'/g, "\\'")}')"`
      : '';

    return `
      <div class="p-4 bg-slate-800/50 rounded-xl border ${isUnread ? 'border-purple-500/40' : 'border-slate-700/40'} hover:border-purple-500/50 transition cursor-pointer" ${openHandler}>
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-xl bg-slate-700/60 border border-slate-600/40 flex items-center justify-center flex-shrink-0 overflow-hidden">
            ${projectLogo ? `<img src="${projectLogo}" class="w-full h-full object-cover" />` : `<i class="fas fa-comments text-purple-400"></i>`}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-3">
              <div class="min-w-0">
                <div class="text-sm font-bold text-slate-200 truncate">${projectName}</div>
                ${categoryLabel ? `<div class="text-[11px] text-slate-400 mt-0.5">${categoryLabel}</div>` : ''}
              </div>
              <div class="flex items-center gap-2 flex-shrink-0">
                <span class="text-xs text-slate-500">${formatTimeAgo(date)}</span>
                ${isUnread ? `<span class="w-2 h-2 rounded-full bg-purple-400"></span>` : ''}
              </div>
            </div>
            <div class="mt-2 text-sm text-slate-300 break-words">${esc(lastMsg.text)}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  // Обновляем бейдж
  updateFeedbackBadge();
}

// Функция форматирования времени
function formatTimeAgo(date) {
  if (!date) return '';
  const now = new Date();
  const diff = now - date;
  if (diff < 60000) return 'только что';
  if (diff < 3600000) return Math.floor(diff/60000) + ' мин';
  if (diff < 86400000) return Math.floor(diff/3600000) + ' ч';
  if (diff < 604800000) return Math.floor(diff/86400000) + ' дн';
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

// Функция обновления бейджа
function updateFeedbackBadge() {
  if (!window.adminFeedbacks) return;
  const isAdmin = window.currentUser && window.currentUser.uid === "SAkz4mdW9reDaIsvqigCNZhEKJR2";
  const unreadCount = window.adminFeedbacks.filter(f => (isAdmin ? !f.read : !f.userRead)).length;
  const badge = document.getElementById('feedbackBadge');
  const mobBadge = document.getElementById('mobFeedbackBadge');
  
  if (badge) {
    if (unreadCount > 0) {
      badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }
  
  if (mobBadge) {
    if (unreadCount > 0) {
      mobBadge.textContent = unreadCount > 99 ? '99+' : unreadCount;
      mobBadge.style.display = 'block';
    } else {
      mobBadge.style.display = 'none';
    }
  }
}

// Создаем модальное окно для сообщений (доступно на всех страницах)
function createFeedbackModal() {
  console.log('🔧 Creating feedback modal...');
  const modalHTML = `
    <div id="feedbackListModal" class="modal">
      <div class="modal-content modal-large">
        <div class="modal-header">
          <div class="flex justify-between items-center w-full">
            <h2 class="text-xl font-bold flex items-center gap-2">
              <i class="fas fa-comments text-purple-400"></i>
              <span data-translate="feedbacks_list">Отзывы и предложения</span>
            </h2>
            <button onclick="closeFeedbackListModal()" class="text-slate-400 hover:text-white">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
        <div class="modal-body">
          <div id="feedbacksContainer" class="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            <p class="text-slate-500 text-center py-8" data-translate="loading_feedbacks">Загрузка отзывов...</p>
          </div>
        </div>
        <div class="modal-footer">
          <div class="flex justify-center w-full">
            <button onclick="closeFeedbackListModal()" class="bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-lg text-sm" data-translate="close">Закрыть</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Добавляем модальное окно в body если его еще нет
  if (!document.getElementById('feedbackListModal')) {
    console.log('🔧 Adding feedback modal to DOM...');
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    console.log('🔧 Feedback modal added successfully');
  } else {
    console.log('🔧 Feedback modal already exists');
  }
}

// Создаем модальное окно после загрузки DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createFeedbackModal);
} else {
  createFeedbackModal();
}

// Escape закрывает модал
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeComingSoon();
});

// Загрузка сообщений для всех страниц
window.adminFeedbacks = [];
let adminFeedbacksUnsubscribe = null;
let __feedbackInitRetryTimer = null;
let __feedbackInitRetryUid = null;

function initFeedbacksListener(uid) {
  if (adminFeedbacksUnsubscribe) { 
    adminFeedbacksUnsubscribe(); 
    adminFeedbacksUnsubscribe = null; 
  }

  const fx = window.__firestoreExports;
  if (!fx || !window.db || typeof fx.onSnapshot !== 'function') {
    __feedbackInitRetryUid = uid;
    if (!__feedbackInitRetryTimer) {
      __feedbackInitRetryTimer = setTimeout(function() {
        __feedbackInitRetryTimer = null;
        if (__feedbackInitRetryUid) initFeedbacksListener(__feedbackInitRetryUid);
      }, 350);
    }
    return;
  }

  const isAdmin = uid === "SAkz4mdW9reDaIsvqigCNZhEKJR2";

  try {
    let q;
    if (isAdmin) q = fx.query(fx.collection(window.db, "feedbacks"));
    else q = fx.query(fx.collection(window.db, "feedbacks"), fx.where("userId", "==", uid));

    adminFeedbacksUnsubscribe = fx.onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach((d) => {
        items.push({ id: d.id, ...d.data() });
      });

      items.sort((a, b) => (b.createdAt?.toDate() || new Date(b.createdAt || 0)) - (a.createdAt?.toDate() || new Date(a.createdAt || 0)));
      window.adminFeedbacks = items;

      updateFeedbackBadge();

      const listModal = document.getElementById('feedbackListModal');
      if (listModal && listModal.classList.contains('active') && typeof renderFeedbackList === 'function') {
        renderFeedbackList();
      }
    }, (err) => {
      console.error('Feedbacks listener error:', err);
      window.adminFeedbacks = [];
      updateFeedbackBadge();
    });
  } catch(e) {
    console.error('Error init feedback listener:', e);
  }
}

// Инициализация: стартуем слушатель только когда auth реально отдал user
(function initFeedbacksAuthBridgeWithRetry() {
  if (window.__feedbackAuthBridgeInited) return;

  function tryInit() {
    if (window.__feedbackAuthBridgeInited) return true;
    const ax = window.__authExports;
    if (!ax || !window.auth || typeof ax.onAuthStateChanged !== 'function') return false;

    window.__feedbackAuthBridgeInited = true;
    ax.onAuthStateChanged(window.auth, function(user) {
      window.currentUser = user || null;

      var deskFP = document.getElementById('generalFeedbackPanel');
      if (!user) {
        if (deskFP) deskFP.classList.add('hidden');
        window.adminFeedbacks = [];
        updateFeedbackBadge();
        if (adminFeedbacksUnsubscribe) { adminFeedbacksUnsubscribe(); adminFeedbacksUnsubscribe = null; }
        return;
      }

      if (deskFP) deskFP.classList.remove('hidden');
      initFeedbacksListener(user.uid);
    });

    return true;
  }

  if (tryInit()) return;

  // На некоторых страницах (например faucet.html) Firebase globals появляются после загрузки header.js
  let tries = 0;
  const maxTries = 60; // ~15s
  const t = setInterval(function() {
    tries++;
    if (tryInit() || tries >= maxTries) clearInterval(t);
  }, 250);
})();
