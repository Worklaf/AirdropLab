// ============================================================
// header.js — AirdropLab (fixed nav dropdown + pro modal + auth sync)
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

          <!-- DESKTOP -->
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
                    <span class="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">Airdrop</span><span class="text-white">Lab</span>
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
                  <div class="text-slate-400 text-[10px] uppercase tracking-wider font-bold" data-translate="active">Активных</div>
                </div>
              </div>
              <div class="text-center group cursor-pointer relative" onclick="typeof filterProjects==='function'&&filterProjects('today')">
                <div class="absolute inset-0 bg-cyan-500/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="relative px-3 py-1">
                  <div class="text-2xl font-black bg-gradient-to-br from-cyan-400 to-cyan-600 bg-clip-text text-transparent" id="statToday">0</div>
                  <div class="text-slate-400 text-[10px] uppercase tracking-wider font-bold" data-translate="new">Новых</div>
                </div>
              </div>
              <div class="text-center group cursor-pointer relative" onclick="typeof filterProjects==='function'&&filterProjects('favorites')">
                <div class="absolute inset-0 bg-orange-500/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="relative px-3 py-1">
                  <div class="text-2xl font-black bg-gradient-to-br from-orange-400 to-orange-600 bg-clip-text text-transparent" id="statFavorites">0</div>
                  <div class="text-slate-400 text-[10px] uppercase tracking-wider font-bold" data-translate="in_work">В работе</div>
                </div>
              </div>
              <div class="text-center group cursor-pointer relative" onclick="typeof filterProjects==='function'&&filterProjects('completed')">
                <div class="absolute inset-0 bg-blue-500/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="relative px-3 py-1">
                  <div class="text-2xl font-black bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text text-transparent" id="statCompleted">0</div>
                  <div class="text-slate-400 text-[10px] uppercase tracking-wider font-bold" data-translate="done">Готово</div>
                </div>
              </div>
            </div>

            <!-- Кнопки справа -->
            <div class="flex gap-2 items-center">
              <button onclick="window.openClaimModal&&window.openClaimModal()" id="headerClaimBtn"
                class="relative flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-xl text-sm text-cyan-400 transition-all">
                <span class="text-base">🧪</span>
                <span class="hidden sm:inline font-medium text-xs" data-translate="claim_btn_label">Клейм</span>
                <span id="claimDot" class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900 hidden animate-pulse"></span>
              </button>

              <div id="notificationPanel" class="relative">
                <button onclick="typeof showNotifications==='function'&&showNotifications()"
                  class="relative p-2.5 text-slate-400 hover:text-cyan-400 transition-all rounded-xl hover:bg-cyan-500/10 group border border-transparent hover:border-cyan-500/30">
                  <i class="fas fa-bell text-lg"></i>
                  <span id="notificationBadge" class="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-xs flex items-center justify-center hidden font-bold shadow-lg shadow-red-500/50 animate-pulse">0</span>
                </button>
              </div>

              <div id="generalFeedbackPanel" class="hidden">
                <button onclick="typeof openFeedbackListModal==='function'&&openFeedbackListModal()"
                  class="relative p-2.5 text-slate-400 hover:text-purple-400 transition-all rounded-xl hover:bg-purple-500/10 group border border-transparent hover:border-purple-500/30">
                  <i class="fas fa-comment-dots text-lg"></i>
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
                  class="px-3 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-xs font-bold transition-all">
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
                    class="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-sm font-bold flex items-center gap-2">
                    <i class="fas fa-sign-in-alt"></i>
                    <span data-translate="login">Вход</span>
                  </button>
                </div>
                <div id="loggedInView" class="hidden flex items-center gap-3">
                  <div class="text-right hidden sm:block cursor-pointer" id="userNameWrapper">
                    <div id="userName" class="text-xs font-bold text-white">Researcher</div>
                    <div class="text-[10px] text-emerald-400 flex items-center justify-end gap-1.5">
                      <span class="relative flex h-1.5 w-1.5">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                      </span>
                      <span data-translate="in_system">В системе</span>
                    </div>
                  </div>
                  <div class="relative group cursor-pointer" id="userAvatarWrapper">
                    <div class="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-50 transition-opacity"></div>
                    <img id="userAvatar" src="" class="relative w-10 h-10 rounded-full object-cover border-2 border-cyan-500/50 transition-all">
                  </div>
                  <button onclick="typeof logout==='function'&&logout()"
                    class="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all">
                    <i class="fas fa-sign-out-alt"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- MOBILE -->
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
                  <i class="fas fa-sign-in-alt"></i><span data-translate="login">Вход</span>
                </button>
              </div>
              <div id="mobLoggedInView" style="display:none;align-items:center;gap:6px;" class="flex">
                <div style="position:relative;flex-shrink:0;cursor:pointer;"
                     onclick="var d=document.getElementById('userAvatarWrapper');if(d)d.click();" title="Профиль">
                  <div style="position:absolute;inset:-2px;background:linear-gradient(135deg,#22d3ee,#3b82f6);border-radius:50%;filter:blur(4px);opacity:0.5;"></div>
                  <img id="mobUserAvatar" src="" style="position:relative;width:30px;height:30px;border-radius:50%;object-fit:cover;border:1.5px solid rgba(34,211,238,0.5);">
                </div>
                <button onclick="typeof logout==='function'&&logout()"
                  style="padding:6px 7px;color:#64748b;background:transparent;border:1px solid rgba(71,85,105,0.3);border-radius:8px;cursor:pointer;font-size:13px;">
                  <i class="fas fa-sign-out-alt"></i>
                </button>
              </div>
            </div>
          </div>

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

          <div class="flex md:hidden flex-wrap gap-1.5 mob-actions-row items-center">
            <button id="mobClaimBtn" onclick="window.openClaimModal&&window.openClaimModal()"
              style="position:relative;display:flex;align-items:center;gap:4px;padding:5px 10px;background:rgba(8,145,178,0.2);border:1px solid rgba(34,211,238,0.3);border-radius:10px;color:#22d3ee;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap;">
              🧪 <span id="mobClaimSpan" style="font-size:11px;" data-translate="claim_btn_label">Клейм</span>
            </button>

            <button onclick="typeof showNotifications==='function'&&showNotifications()"
              style="position:relative;padding:6px 9px;color:#94a3b8;background:transparent;border:1px solid rgba(71,85,105,0.3);border-radius:10px;cursor:pointer;font-size:14px;">
              <i class="fas fa-bell"></i>
              <span id="mobNotifBadge" style="display:none;position:absolute;top:-4px;right:-4px;min-width:15px;height:15px;background:linear-gradient(135deg,#ef4444,#f97316);border-radius:999px;font-size:8px;font-weight:700;color:white;align-items:center;justify-content:center;padding:0 2px;"></span>
            </button>

            <button id="mobFeedbackBtn" onclick="typeof openFeedbackListModal==='function'&&openFeedbackListModal()"
              style="display:none;position:relative;padding:6px 9px;color:#94a3b8;background:transparent;border:1px solid rgba(71,85,105,0.3);border-radius:10px;cursor:pointer;font-size:14px;">
              <i class="fas fa-comment-dots"></i>
              <span id="mobFeedbackBadge" style="display:none;position:absolute;top:-4px;right:-4px;min-width:15px;height:15px;background:linear-gradient(135deg,#8b5cf6,#ec4899);border-radius:999px;font-size:8px;font-weight:700;color:white;align-items:center;justify-content:center;padding:0 2px;"></span>
            </button>

            <button onclick="typeof toggleLang==='function'&&toggleLang()" id="mobLangBtn"
              style="display:flex;align-items:center;gap:5px;padding:5px 10px;border-radius:10px;border:1px solid rgba(239,68,68,0.3);background:rgba(239,68,68,0.1);cursor:pointer;font-size:11px;font-weight:700;color:#fff;white-space:nowrap;">
              <span class="mob-lang-flag" style="font-size:1rem;"></span>
              <span class="mob-lang-text">ENG</span>
            </button>

            <button id="mobAddBtn" onclick="typeof openAddModal==='function'&&openAddModal()"
              style="display:none;align-items:center;gap:4px;padding:5px 10px;background:linear-gradient(135deg,#0891b2,#2563eb);border:none;border-radius:8px;color:white;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;" class="flex">
              <i class="fas fa-flask"></i><span data-translate="new_test">Добавить</span>
            </button>

            <div id="mobAdminBtns" style="display:none;" class="flex gap-1 items-center flex-wrap">
              <button onclick="typeof openStats==='function'&&openStats()" class="admin-action-btn admin-btn-orange" style="padding:5px 8px;font-size:11px;"><i class="fas fa-chart-pie"></i></button>
              <button onclick="typeof migrateToFirestore==='function'&&migrateToFirestore()" class="admin-action-btn admin-btn-purple" style="padding:5px 8px;font-size:11px;"><i class="fas fa-cloud-upload-alt"></i></button>
              <button onclick="typeof exportAllData==='function'&&exportAllData()" class="admin-action-btn admin-btn-emerald" style="padding:5px 8px;font-size:11px;"><i class="fas fa-file-export"></i></button>
              <button onclick="typeof openDeletedProjects==='function'&&openDeletedProjects()" class="admin-action-btn admin-btn-red" style="padding:5px 8px;font-size:11px;"><i class="fas fa-trash-restore"></i></button>
            </div>
          </div>
        </div>
      </header>

      <!-- CryptoRank -->
      <div style="background:rgba(11,15,25,0.95);border-bottom:1px solid rgba(51,65,85,0.5);backdrop-filter:blur(12px);overflow:hidden;max-width:100vw;box-sizing:border-box;">
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

      <!-- NAV -->
      <div id="site-nav-wrapper" style="position:relative;z-index:9000;">
        <nav id="site-nav" style="background:rgba(11,15,25,0.98);border-bottom:1px solid rgba(34,211,238,0.12);backdrop-filter:blur(12px);">
          <div style="max-width:min(1600px,100%);margin:0 auto;padding:0 16px;overflow-x:auto;white-space:nowrap;scrollbar-width:none;-webkit-overflow-scrolling:touch;">
            <div style="display:inline-flex;align-items:stretch;gap:0;vertical-align:top;">

              <div class="al-nav-group">
                <button class="al-nav-btn" onclick="alNavToggle(this)">
                  <i class="fas fa-bolt" style="color:#22d3ee;"></i>
                  <span data-translate="menu_activities">Активности</span>
                  <i class="fas fa-chevron-down al-nav-arrow"></i>
                </button>
                <div class="al-nav-dropdown">
                  <a href="index.html" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-layer-group"></i><span data-translate="all_projects">Все активности</span></a>
                  <a href="#" onclick="showComingSoon('Аирдропы и розыгрыши');return false;" class="al-nav-item"><i class="fas fa-parachute-box"></i><span data-translate="airdrops_lotteries">Аирдропы и розыгрыши</span></a>
                  <a href="faucet.html" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-faucet"></i><span data-translate="faucets">Краны</span></a>
                  <a href="index.html?filter=mainnet" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-network-wired"></i><span data-translate="mainnets">Мейннеты</span></a>
                  <a href="index.html?filter=testnet" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-flask"></i><span data-translate="testnets">Тестнеты</span></a>
                </div>
              </div>

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

              <div class="al-nav-group">
                <button class="al-nav-btn" onclick="alNavToggle(this)">
                  <i class="fas fa-users" style="color:#34d399;"></i>
                  <span data-translate="menu_community">Сообщество</span>
                  <i class="fas fa-chevron-down al-nav-arrow"></i>
                </button>
                <div class="al-nav-dropdown">
                  <a href="#" onclick="showComingSoon('Чат сообщества');return false;" class="al-nav-item"><i class="fas fa-comments"></i><span data-translate="chat">Чат</span></a>
                  <a href="#" onclick="showComingSoon('Таблица лидеров');return false;" class="al-nav-item"><i class="fas fa-trophy"></i><span data-translate="leaderboard">Таблица лидеров</span></a>
                  <a href="#" onclick="showComingSoon('Реферальная система');return false;" class="al-nav-item"><i class="fas fa-share-alt"></i><span data-translate="referrals">Рефералы</span></a>
                  <a href="#" onclick="showComingSoon('Форум');return false;" class="al-nav-item"><i class="fas fa-comments-dollar"></i><span data-translate="forum">Форум</span></a>
                </div>
              </div>

              <div class="al-nav-group">
                <button class="al-nav-btn" onclick="alNavToggle(this)">
                  <i class="fas fa-calendar-alt" style="color:#fbbf24;"></i>
                  <span data-translate="menu_calendar">Календарь</span>
                  <i class="fas fa-chevron-down al-nav-arrow"></i>
                </button>
                <div class="al-nav-dropdown">
                  <a href="#" onclick="showComingSoon('Календарь событий');return false;" class="al-nav-item al-nav-item-accent"><i class="fas fa-calendar-check"></i><span data-translate="all_events">Все события</span></a>
                  <div class="al-nav-divider"></div>
                  <a href="#" onclick="showComingSoon('Дедлайны');return false;" class="al-nav-item"><i class="fas fa-hourglass-end" style="color:#f87171;"></i><span data-translate="deadlines">Дедлайны</span></a>
                  <a href="#" onclick="showComingSoon('TGE / Листинги');return false;" class="al-nav-item"><i class="fas fa-rocket" style="color:#fbbf24;"></i>TGE / <span data-translate="listings">Листинги</span></a>
                  <a href="#" onclick="showComingSoon('События проектов');return false;" class="al-nav-item"><i class="fas fa-star" style="color:#22d3ee;"></i><span data-translate="project_events">События проектов</span></a>
                </div>
              </div>

              <div class="al-nav-group">
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
                  <a href="#" onclick="showComingSoon('Каталог бирж');return false;" class="al-nav-item al-nav-item-accent"><i class="fas fa-th-list"></i><span data-translate="all_exchanges">Все биржи</span></a>
                </div>
              </div>

              <div class="al-nav-group">
                <button class="al-nav-btn" onclick="alNavToggle(this)">
                  <i class="fas fa-newspaper" style="color:#f87171;"></i>
                  <span data-translate="menu_news">Новости</span>
                  <i class="fas fa-chevron-down al-nav-arrow"></i>
                </button>
                <div class="al-nav-dropdown">
                  <a href="#" onclick="showComingSoon('Криптовалютные новости');return false;" class="al-nav-item"><i class="fas fa-coins"></i><span data-translate="crypto_news">Криптовалютные новости</span></a>
                  <a href="#" onclick="showComingSoon('Новости аналитики');return false;" class="al-nav-item"><i class="fas fa-chart-line"></i><span data-translate="analytics_news">Новости аналитики</span></a>
                  <a href="#" onclick="showComingSoon('Новости AI');return false;" class="al-nav-item"><i class="fas fa-robot"></i><span data-translate="ai_news">Новости AI</span></a>
                  <a href="#" onclick="showComingSoon('Новости Bitcoin');return false;" class="al-nav-item"><i class="fab fa-bitcoin"></i><span data-translate="bitcoin_news">Новости Bitcoin</span></a>
                  <a href="#" onclick="showComingSoon('Новости DeFi');return false;" class="al-nav-item"><i class="fas fa-water"></i><span data-translate="defi_news">Новости DeFi</span></a>
                  <a href="#" onclick="showComingSoon('Новости GameFi / Metaverse');return false;" class="al-nav-item"><i class="fas fa-gamepad"></i><span data-translate="gamefi_news">Новости GameFi / Metaverse</span></a>
                  <a href="#" onclick="showComingSoon('Новости IDO/ICO/IFO/IEO');return false;" class="al-nav-item"><i class="fas fa-rocket"></i><span data-translate="ido_news">Новости IDO/ICO/IFO/IEO</span></a>
                  <a href="#" onclick="showComingSoon('Новости NFT');return false;" class="al-nav-item"><i class="fas fa-image"></i><span data-translate="nft_news">Новости NFT</span></a>
                </div>
              </div>

              <div class="al-nav-group">
                <button class="al-nav-btn" onclick="alNavToggle(this)">
                  <i class="fas fa-tools" style="color:#fbbf24;"></i>
                  <span data-translate="menu_tools">Инструменты</span>
                  <i class="fas fa-chevron-down al-nav-arrow"></i>
                </button>
                <div class="al-nav-dropdown">
                  <a href="faucet.html" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-faucet"></i><span data-translate="faucets">Краны (Faucets)</span></a>
                  <a href="#" onclick="showComingSoon('Калькулятор газа');return false;" class="al-nav-item"><i class="fas fa-calculator"></i><span data-translate="gas_calculator">Калькулятор газа</span></a>
                  <a href="#" onclick="showComingSoon('Бриджи');return false;" class="al-nav-item"><i class="fas fa-exchange-alt"></i><span data-translate="bridges">Бриджи</span></a>
                  <a href="#" onclick="showComingSoon('Проверка кошелька');return false;" class="al-nav-item"><i class="fas fa-shield-alt"></i><span data-translate="wallet_checker">Проверка кошелька</span></a>
                </div>
              </div>

              <div class="al-nav-group">
                <button class="al-nav-btn" onclick="alNavToggle(this)">
                  <i class="fas fa-graduation-cap" style="color:#60a5fa;"></i>
                  <span data-translate="menu_learning">Обучение</span>
                  <i class="fas fa-chevron-down al-nav-arrow"></i>
                </button>
                <div class="al-nav-dropdown">
                  <a href="#" onclick="showComingSoon('Что такое аирдроп');return false;" class="al-nav-item"><i class="fas fa-book-open"></i><span data-translate="what_is_airdrop">Что такое аирдроп</span></a>
                  <a href="#" onclick="showComingSoon('Как настроить кошелёк');return false;" class="al-nav-item"><i class="fas fa-wallet"></i><span data-translate="how_setup_wallet">Как настроить кошелёк</span></a>
                  <a href="#" onclick="showComingSoon('Безопасность в крипте');return false;" class="al-nav-item"><i class="fas fa-shield-virus"></i><span data-translate="crypto_security">Безопасность в крипте</span></a>
                  <a href="#" onclick="showComingSoon('FAQ');return false;" class="al-nav-item"><i class="fas fa-question-circle"></i>FAQ</a>
                </div>
              </div>

            </div>
          </div>
        </nav>
      </div>

      <!-- PRO Coming Soon Modal -->
      <div id="comingSoonModal" style="display:none;position:fixed;inset:0;background:rgba(2,6,23,0.82);backdrop-filter:blur(14px);z-index:12000;align-items:center;justify-content:center;padding:20px;" onclick="closeComingSoon(event)">
        <div style="position:relative;width:min(560px,100%);background:linear-gradient(160deg,rgba(15,23,42,0.96),rgba(30,41,59,0.96));border:1px solid rgba(56,189,248,0.35);border-radius:24px;padding:28px;box-shadow:0 25px 80px rgba(0,0,0,.55),0 0 0 1px rgba(34,211,238,.06);" onclick="event.stopPropagation()">
          <div style="position:absolute;inset:0;border-radius:24px;background:radial-gradient(ellipse at top right,rgba(34,211,238,.15),transparent 45%),radial-gradient(ellipse at bottom left,rgba(139,92,246,.14),transparent 50%);pointer-events:none;"></div>

          <div style="position:relative;display:flex;align-items:center;gap:14px;margin-bottom:18px;">
            <div style="width:56px;height:56px;border-radius:16px;background:linear-gradient(135deg,#22d3ee,#6366f1);display:flex;align-items:center;justify-content:center;box-shadow:0 10px 25px rgba(34,211,238,.35);">
              <i class="fas fa-satellite-dish" style="font-size:24px;color:#fff;"></i>
            </div>
            <div>
              <div style="display:inline-flex;align-items:center;gap:8px;padding:4px 10px;border-radius:999px;background:rgba(34,211,238,.12);border:1px solid rgba(34,211,238,.28);color:#67e8f9;font-size:11px;font-weight:700;letter-spacing:.4px;text-transform:uppercase;">Coming Soon</div>
              <h3 id="comingSoonTitle" style="margin:8px 0 0;color:#e2e8f0;font-size:22px;font-weight:800;line-height:1.25;">Раздел в разработке</h3>
            </div>
          </div>

          <p style="position:relative;margin:0 0 16px;color:#94a3b8;font-size:14px;line-height:1.6;">
            Мы готовим этот раздел и добавим его в ближайших релизах.
            Когда он станет доступен, вы получите уведомление в приложении.
          </p>

          <div style="position:relative;background:rgba(15,23,42,.55);border:1px solid rgba(148,163,184,.2);border-radius:14px;padding:12px 14px;margin-bottom:18px;">
            <div style="display:flex;align-items:center;gap:10px;color:#cbd5e1;font-size:13px;">
              <i class="fas fa-bell" style="color:#22d3ee;"></i>
              <span id="comingSoonNotifyText">Хотите напоминание? Нажмите «Уведомить меня».</span>
            </div>
          </div>

          <div style="position:relative;display:flex;gap:10px;flex-wrap:wrap;">
            <button id="comingSoonNotifyBtn" onclick="requestComingSoonNotify()"
              style="padding:11px 16px;border:none;border-radius:12px;background:linear-gradient(135deg,#06b6d4,#3b82f6);color:#fff;font-size:13px;font-weight:700;cursor:pointer;">
              <i class="fas fa-bell mr-1"></i> Уведомить меня
            </button>
            <button onclick="closeComingSoon()"
              style="padding:11px 16px;border:1px solid rgba(148,163,184,.35);border-radius:12px;background:transparent;color:#e2e8f0;font-size:13px;font-weight:700;cursor:pointer;">
              Понятно
            </button>
          </div>
        </div>
      </div>

      <style>
        #site-nav-wrapper { position: relative; z-index: 9000; }
        #site-nav ::-webkit-scrollbar { display: none; }

        .al-nav-group { position: static; display: inline-block; vertical-align: top; }
        .al-nav-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 14px; background: transparent; border: none;
          color: #94a3b8; font-size: 13px; font-weight: 500;
          cursor: pointer; white-space: nowrap;
          border-bottom: 2px solid transparent;
          transition: color .2s, border-color .2s, background .2s;
          font-family: 'Inter', sans-serif;
          vertical-align: top;
        }
        .al-nav-btn:hover, .al-nav-btn.al-nav-open {
          color: #f1f5f9; background: rgba(34,211,238,.06); border-bottom-color: #22d3ee;
        }
        .al-nav-arrow { font-size: 9px; margin-left: 2px; transition: transform .2s; }
        .al-nav-btn.al-nav-open .al-nav-arrow { transform: rotate(180deg); }

        /* FIX: dropdown fixed under tab + over everything */
        .al-nav-dropdown {
          display: none;
          position: fixed;
          min-width: 220px;
          width: max-content;
          max-width: min(360px, calc(100vw - 16px));
          background: rgba(11,15,30,0.99);
          border: 1px solid rgba(34,211,238,0.2);
          border-radius: 0 0 12px 12px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(34,211,238,0.05);
          backdrop-filter: blur(20px);
          z-index: 11000;
          padding: 6px 0;
          animation: alNavFadeIn .15s ease;
          max-height: 60vh;
          overflow-y: auto;
        }
        .al-nav-dropdown.al-open { display: block; }

        .al-nav-dropdown::-webkit-scrollbar { width: 6px; }
        .al-nav-dropdown::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        .al-nav-dropdown::-webkit-scrollbar-thumb { background: rgba(34,211,238,0.3); border-radius: 3px; }

        @keyframes alNavFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .al-nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 16px; color: #94a3b8; font-size: 13px;
          text-decoration: none; transition: all .15s; white-space: nowrap;
        }
        .al-nav-item i { width: 14px; text-align: center; font-size: 12px; color: #64748b; flex-shrink:0; }
        .al-nav-item:hover { background: rgba(34,211,238,0.08); color: #f1f5f9; }
        .al-nav-item:hover i { color: #22d3ee; }
        .al-nav-item-accent { color: #22d3ee !important; font-weight: 600; }
        .al-nav-divider { height: 1px; background: rgba(255,255,255,0.07); margin: 4px 0; }
      </style>
    `;

    // Скрытие статистики на страницах кроме главной
    var isMainPage =
      window.location.pathname.endsWith('index.html') ||
      window.location.pathname.endsWith('/') ||
      window.location.pathname === '';

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

    function setupObservers() {
      // 1) Stats sync
      [['statActive','mobStatActive'],['statToday','mobStatToday'],['statFavorites','mobStatFavorites'],['statCompleted','mobStatCompleted']]
        .forEach(function (p) {
          var from = document.getElementById(p[0]);
          var to = document.getElementById(p[1]);
          if (!from || !to) return;
          to.textContent = from.textContent;
          new MutationObserver(function () { to.textContent = from.textContent; })
            .observe(from, { childList: true, characterData: true, subtree: true });
        });

      // 2) Auth sync (FIX)
      var deskIn = document.getElementById('loggedInView');
      var deskOut = document.getElementById('loggedOutView');
      var mobIn = document.getElementById('mobLoggedInView');
      var mobOut = document.getElementById('mobLoggedOutView');
      var deskAva = document.getElementById('userAvatar');
      var mobAva = document.getElementById('mobUserAvatar');
      var userName = document.getElementById('userName');
      var authPanel = document.getElementById('authPanel');

      function isHidden(el) {
        if (!el) return true;
        if (el.classList.contains('hidden')) return true;
        var st = window.getComputedStyle(el);
        return st.display === 'none' || st.visibility === 'hidden';
      }

      function getFirebaseUserSafe() {
        try {
          if (window.auth && window.auth.currentUser) return window.auth.currentUser;
        } catch (e) {}
        try {
          if (window.firebase && window.firebase.auth && window.firebase.auth().currentUser) {
            return window.firebase.auth().currentUser;
          }
        } catch (e) {}
        return null;
      }

      function syncAuth() {
        var inVisible = deskIn && !isHidden(deskIn);
        var outVisible = deskOut && !isHidden(deskOut);
        var isIn = inVisible || (deskOut ? !outVisible : false);

        // fallback from firebase user
        var fbUser = getFirebaseUserSafe();
        if (fbUser) {
          isIn = true;

          // мягко чинит desktop view если внешняя логика не успела
          if (deskIn && deskOut && isHidden(deskIn)) {
            deskIn.classList.remove('hidden');
            deskOut.classList.add('hidden');
          }
          if (userName && fbUser.displayName) userName.textContent = fbUser.displayName;
          if (deskAva && fbUser.photoURL) deskAva.src = fbUser.photoURL;
        }

        if (mobIn) mobIn.style.display = isIn ? 'flex' : 'none';
        if (mobOut) mobOut.style.display = isIn ? 'none' : 'block';
        if (deskAva && mobAva && deskAva.src) mobAva.src = deskAva.src;
      }

      if (authPanel) {
        new MutationObserver(syncAuth).observe(authPanel, {
          attributes: true,
          subtree: true,
          childList: true,
          attributeFilter: ['class', 'style', 'src']
        });
      }
      if (deskIn) new MutationObserver(syncAuth).observe(deskIn, { attributes: true, attributeFilter: ['class','style'] });
      if (deskOut) new MutationObserver(syncAuth).observe(deskOut, { attributes: true, attributeFilter: ['class','style'] });
      if (deskAva) new MutationObserver(syncAuth).observe(deskAva, { attributes: true, attributeFilter: ['src'] });

      [0, 120, 400, 900, 1600].forEach(function (t) { setTimeout(syncAuth, t); });
      window.forceHeaderAuthSync = syncAuth;

      // 3) Feedback sync
      var deskFP = document.getElementById('generalFeedbackPanel');
      var mobFBtn = document.getElementById('mobFeedbackBtn');
      var deskFBadge = document.getElementById('feedbackBadge');
      var mobFBadge = document.getElementById('mobFeedbackBadge');

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
      if (deskFP) new MutationObserver(syncFeedback).observe(deskFP, { attributes: true, attributeFilter: ['class','style'] });
      if (deskFBadge) new MutationObserver(syncFBadge).observe(deskFBadge, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true });
      syncFeedback(); syncFBadge();

      // 4) Notification badge sync
      var deskNBadge = document.getElementById('notificationBadge');
      var mobNBadge = document.getElementById('mobNotifBadge');
      function syncNBadge() {
        if (!deskNBadge || !mobNBadge) return;
        var hidden = deskNBadge.classList.contains('hidden');
        mobNBadge.style.display = hidden ? 'none' : 'flex';
        if (!hidden) mobNBadge.textContent = deskNBadge.textContent;
      }
      if (deskNBadge) new MutationObserver(syncNBadge).observe(deskNBadge, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true });
      syncNBadge();

      // 5) Admin sync
      var deskAdmin = document.getElementById('adminPanel');
      var mobAdd = document.getElementById('mobAddBtn');
      var mobBtns = document.getElementById('mobAdminBtns');
      function syncAdmin() {
        var vis = deskAdmin && deskAdmin.style.display !== 'none' && deskAdmin.style.display !== '';
        if (mobAdd) mobAdd.style.display = vis ? 'flex' : 'none';
        if (mobBtns) mobBtns.style.display = vis ? 'flex' : 'none';
      }
      if (deskAdmin) new MutationObserver(syncAdmin).observe(deskAdmin, { attributes: true, attributeFilter: ['style'] });
      syncAdmin();

      // 6) Lang sync
      var deskLang = document.getElementById('langBtn');
      var mobLangBtn = document.getElementById('mobLangBtn');
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
          mobLangBtn.style.background = active ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.1)';
          mobLangBtn.style.borderColor = active ? 'rgba(34,197,94,0.5)' : 'rgba(239,68,68,0.3)';
        }
      }
      if (deskLang) new MutationObserver(syncLang).observe(deskLang, { attributes: true, subtree: true, childList: true, characterData: true });
      setTimeout(syncLang, 150);
      setTimeout(syncLang, 500);

      // 7) Claim sync
      var deskClaim = document.getElementById('headerClaimBtn');
      var mobClaim = document.getElementById('mobClaimBtn');

      function syncClaimBtn() {
        if (!deskClaim || !mobClaim) return;
        var txt = (deskClaim.textContent || '').toLowerCase();
        var isClaimed = deskClaim.disabled || /\\d+:\\d{2}/.test(txt) || txt.includes('сброс') || txt.includes('reset');

        if (isClaimed) {
          var lbl1 = (window.currentLang === 'en') ? 'Claimed' : 'Готово';
          mobClaim.innerHTML = '🔒 <span style="font-size:11px;">' + lbl1 + '</span>';
          mobClaim.style.background = 'rgba(71,85,105,0.2)';
          mobClaim.style.borderColor = 'rgba(71,85,105,0.35)';
          mobClaim.style.color = '#64748b';
        } else {
          var lbl2 = (window.currentLang === 'en') ? 'Claim' : 'Клейм';
          mobClaim.innerHTML = '🧪 <span id="mobClaimSpan" style="font-size:11px;" data-translate="claim_btn_label">' + lbl2 + '</span>';
          mobClaim.style.background = 'rgba(8,145,178,0.2)';
          mobClaim.style.borderColor = 'rgba(34,211,238,0.3)';
          mobClaim.style.color = '#22d3ee';
        }
      }

      if (deskClaim) {
        new MutationObserver(syncClaimBtn).observe(deskClaim, {
          childList: true, subtree: true, attributes: true, characterData: true
        });
      }
      setInterval(syncClaimBtn, 5000);
      syncClaimBtn();
    }

    setTimeout(setupObservers, 150);

    // Header height var
    function syncHeaderHeight() {
      var h = document.getElementById('site-header');
      if (h) document.documentElement.style.setProperty('--header-h', h.offsetHeight + 'px');
    }
    var headerEl = document.getElementById('site-header');
    if (headerEl) {
      if (window.ResizeObserver) {
        new ResizeObserver(syncHeaderHeight).observe(headerEl);
      } else {
        [100, 500, 1500].forEach(function (t) { setTimeout(syncHeaderHeight, t); });
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

/* -------------------------
   NAV dropdown positioning (FIXED)
------------------------- */
function closeAllAlNav() {
  document.querySelectorAll('.al-nav-dropdown.al-open').forEach(function (d) {
    d.classList.remove('al-open');
    var b = d.closest('.al-nav-group')?.querySelector('.al-nav-btn');
    if (b) b.classList.remove('al-nav-open');
  });
}

function positionAlDropdown(btn, dropdown) {
  if (!btn || !dropdown) return;

  var rect = btn.getBoundingClientRect();
  var top = Math.round(rect.bottom + 4);
  var left = Math.round(rect.left);
  var minW = Math.max(220, Math.round(rect.width));

  dropdown.style.position = 'fixed';
  dropdown.style.top = top + 'px';
  dropdown.style.left = left + 'px';
  dropdown.style.minWidth = minW + 'px';
  dropdown.style.maxHeight = Math.max(180, Math.round(window.innerHeight - top - 12)) + 'px';

  // корректируем выход за правый край
  var dr = dropdown.getBoundingClientRect();
  var pad = 8;
  if (dr.right > window.innerWidth - pad) {
    left = Math.max(pad, Math.round(window.innerWidth - dr.width - pad));
    dropdown.style.left = left + 'px';
  }
  if (left < pad) dropdown.style.left = pad + 'px';
}

window.alNavToggle = function (btn) {
  var group = btn.closest('.al-nav-group');
  var dropdown = group ? group.querySelector('.al-nav-dropdown') : null;
  if (!dropdown) return;

  var isOpen = dropdown.classList.contains('al-open');
  closeAllAlNav();

  if (!isOpen) {
    dropdown.classList.add('al-open');
    btn.classList.add('al-nav-open');

    positionAlDropdown(btn, dropdown);
    requestAnimationFrame(function () { positionAlDropdown(btn, dropdown); });
  }
};

window.closeAlNav = function (el) {
  var dropdown = el ? el.closest('.al-nav-dropdown') : null;
  if (dropdown) dropdown.classList.remove('al-open');
  var btn = dropdown ? dropdown.closest('.al-nav-group')?.querySelector('.al-nav-btn') : null;
  if (btn) btn.classList.remove('al-nav-open');
};

document.addEventListener('click', function (e) {
  if (!e.target.closest('.al-nav-group')) closeAllAlNav();
});

window.addEventListener('scroll', function () {
  document.querySelectorAll('.al-nav-dropdown.al-open').forEach(function (d) {
    var btn = d.closest('.al-nav-group')?.querySelector('.al-nav-btn');
    if (btn) positionAlDropdown(btn, d);
  });
}, { passive: true });

window.addEventListener('resize', function () {
  document.querySelectorAll('.al-nav-dropdown.al-open').forEach(function (d) {
    var btn = d.closest('.al-nav-group')?.querySelector('.al-nav-btn');
    if (btn) positionAlDropdown(btn, d);
  });
});

/* -------------------------
   Coming Soon modal
------------------------- */
window.showComingSoon = function (sectionName) {
  var modal = document.getElementById('comingSoonModal');
  var title = document.getElementById('comingSoonTitle');
  var notifyText = document.getElementById('comingSoonNotifyText');
  var notifyBtn = document.getElementById('comingSoonNotifyBtn');

  if (title) title.textContent = sectionName ? (sectionName + ' — в разработке') : 'Раздел в разработке';
  if (notifyText) notifyText.textContent = 'Хотите напоминание? Нажмите «Уведомить меня». Когда раздел выйдет — пришлём уведомление.';
  if (notifyBtn) {
    notifyBtn.disabled = false;
    notifyBtn.textContent = '🔔 Уведомить меня';
    notifyBtn.style.opacity = '1';
  }
  if (modal) modal.style.display = 'flex';
};

window.closeComingSoon = function (event) {
  if (event && event.target !== event.currentTarget) return;
  var modal = document.getElementById('comingSoonModal');
  if (modal) modal.style.display = 'none';
};

window.requestComingSoonNotify = async function () {
  var notifyText = document.getElementById('comingSoonNotifyText');
  var notifyBtn = document.getElementById('comingSoonNotifyBtn');

  try {
    localStorage.setItem('al_coming_soon_notify', '1');

    if ('Notification' in window && Notification.permission === 'default') {
      try { await Notification.requestPermission(); } catch (e) {}
    }

    if (notifyText) notifyText.textContent = 'Отлично! Вы подписаны на уведомление о запуске этого раздела.';
    if (notifyBtn) {
      notifyBtn.textContent = '✅ Подписка активна';
      notifyBtn.disabled = true;
      notifyBtn.style.opacity = '.75';
    }
  } catch (e) {
    if (notifyText) notifyText.textContent = 'Не удалось сохранить подписку в браузере. Попробуйте ещё раз.';
  }
};

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeComingSoon();
    closeAllAlNav();
  }
});
