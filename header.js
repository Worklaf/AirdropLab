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
              <div class="text-center group cursor-pointer relative" onclick="window.location.href='index.html?filter=active'">
                <div class="absolute inset-0 bg-emerald-500/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="relative px-3 py-1">
                  <div class="text-2xl font-black bg-gradient-to-br from-emerald-400 to-emerald-600 bg-clip-text text-transparent" id="statActive">0</div>
                  <div class="text-slate-400 text-[10px] uppercase tracking-wider font-bold group-hover:text-emerald-400 transition-colors" data-translate="active">Активных</div>
                </div>
              </div>
              <div class="text-center group cursor-pointer relative" onclick="window.location.href='index.html?filter=today'">
                <div class="absolute inset-0 bg-cyan-500/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="relative px-3 py-1">
                  <div class="text-2xl font-black bg-gradient-to-br from-cyan-400 to-cyan-600 bg-clip-text text-transparent" id="statToday">0</div>
                  <div class="text-slate-400 text-[10px] uppercase tracking-wider font-bold group-hover:text-cyan-400 transition-colors" data-translate="new">Новых</div>
                </div>
              </div>
              <div class="text-center group cursor-pointer relative" onclick="window.location.href='index.html?filter=favorites'">
                <div class="absolute inset-0 bg-orange-500/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="relative px-3 py-1">
                  <div class="text-2xl font-black bg-gradient-to-br from-orange-400 to-orange-600 bg-clip-text text-transparent" id="statFavorites">0</div>
                  <div class="text-slate-400 text-[10px] uppercase tracking-wider font-bold group-hover:text-orange-400 transition-colors" data-translate="in_work">В работе</div>
                </div>
              </div>
              <div class="text-center group cursor-pointer relative" onclick="window.location.href='index.html?filter=completed'">
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

              <!-- ДИНАМИЧЕСКИЕ КНОПКИ АДМИНА -->
<div id="adminPanel" class="flex gap-2 items-center border-l border-slate-700/50 pl-3 ml-1" style="display:none;">
<button id="deskAddBtn" onclick="typeof openAddModal==='function'&&openAddModal()"
      class="hidden px-3 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg text-xs font-bold transition-all hover:scale-105 shadow-lg shadow-cyan-500/30">
      <i class="fas fa-flask mr-1"></i> <span data-translate="new_test">Добавить</span>
    </button>
  <div id="desktopAdminButtons" class="flex gap-2 items-center">
    <!-- Кнопки вставляет JS -->
  </div>
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
              <a href="index.html" class="relative w-9 h-9 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-400/50 flex items-center justify-center block">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 3h6M12 3v5M8 8l-2 8c-.5 2 1 4 3 4h6c2 0 3.5-2 3-4l-2-8" stroke="#22d3ee" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="10" cy="14" r="1" fill="#22d3ee" opacity="0.6"><animate attributeName="cy" values="14;12;14" dur="2s" repeatCount="indefinite"/></circle>
                  <circle cx="14" cy="16" r="1" fill="#06b6d4" opacity="0.8"><animate attributeName="cy" values="16;13;16" dur="2.5s" repeatCount="indefinite"/></circle>
                </svg>
              </a>
              <a href="index.html" class="block">
                <h1 style="font-size:17px;font-weight:900;line-height:1;margin:0;">
                  <span style="background:linear-gradient(to right,#22d3ee,#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Airdrop</span><span style="color:white;">Lab</span>
                </h1>
              </a>
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
            <div class="mob-stat-item" onclick="window.location.href='index.html?filter=active'">
              <span class="mob-stat-num" style="color:#34d399;" id="mobStatActive">0</span>
              <span class="mob-stat-lbl" data-translate="active">Акт.</span>
            </div>
            <div class="mob-stat-item" onclick="window.location.href='index.html?filter=today'">
              <span class="mob-stat-num" style="color:#22d3ee;" id="mobStatToday">0</span>
              <span class="mob-stat-lbl" data-translate="new">Нов.</span>
            </div>
            <div class="mob-stat-item" onclick="window.location.href='index.html?filter=favorites'">
              <span class="mob-stat-num" style="color:#fb923c;" id="mobStatFavorites">0</span>
              <span class="mob-stat-lbl" data-translate="in_work">Раб.</span>
            </div>
            <div class="mob-stat-item" onclick="window.location.href='index.html?filter=completed'">
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

            <div id="mobAdminBtns" style="display:flex;" class="flex gap-1 items-center flex-wrap">
              <!-- Кнопки будут добавлены динамически в зависимости от страницы -->
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

              <!-- Игры -->
              <div class="al-nav-group">
                <button class="al-nav-btn" onclick="alNavToggle(this)">
                  <i class="fas fa-dice" style="color:#ec4899;"></i>
                  <span data-translate="menu_games">Игры</span>
                  <i class="fas fa-chevron-down al-nav-arrow"></i>
                </button>
                <div class="al-nav-dropdown">
                  <a href="wheel-of-fortune.html" class="al-nav-item" onclick="closeAlNav(this)"><i class="fas fa-dharmachakra"></i>Wheel of Fortune (RGT)</a>
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item"><i class="fas fa-dice-d20"></i>t('lucky_draw_soon')</a>
                  <a href="#" onclick="showComingSoon();closeAlNav(this);return false;" class="al-nav-item"><i class="fas fa-card-diamonds"></i>t('card_game_soon')</a>
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
                <span style="font-size:11px;font-weight:700;color:#22d3ee;letter-spacing:0.08em;text-transform:uppercase;" data-translate="coming_soon_status">В разработке</span>
              </div>
            </div>

            <!-- Заголовок -->
            <h2 style="text-align:center;font-size:26px;font-weight:800;
                       color:#f1f5f9;margin:0 0 10px;line-height:1.2;
                       text-shadow:0 2px 16px rgba(34,211,238,0.2);" data-translate="coming_soon_title">
              Раздел скоро откроется
            </h2>

            <!-- Подзаголовок -->
            <p style="text-align:center;color:#64748b;font-size:14px;
                      margin:0 0 28px;line-height:1.6;" data-translate="coming_soon_subtitle">
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
                <span style="color:#94a3b8;font-size:12px;line-height:1.3;" data-translate="coming_soon_feature_1">Актуальная информация</span>
              </div>
              <div style="padding:12px 14px;border-radius:12px;
                          background:rgba(139,92,246,0.04);border:1px solid rgba(139,92,246,0.1);
                          display:flex;align-items:center;gap:10px;">
                <div style="width:28px;height:28px;border-radius:8px;flex-shrink:0;
                            background:rgba(139,92,246,0.12);display:flex;align-items:center;justify-content:center;">
                  <i class="fas fa-tools" style="color:#a78bfa;font-size:11px;"></i>
                </div>
                <span style="color:#94a3b8;font-size:12px;line-height:1.3;" data-translate="coming_soon_feature_2">Интерактивные инструменты</span>
              </div>
              <div style="padding:12px 14px;border-radius:12px;
                          background:rgba(236,72,153,0.04);border:1px solid rgba(236,72,153,0.1);
                          display:flex;align-items:center;gap:10px;">
                <div style="width:28px;height:28px;border-radius:8px;flex-shrink:0;
                            background:rgba(236,72,153,0.12);display:flex;align-items:center;justify-content:center;">
                  <i class="fas fa-users" style="color:#ec4899;font-size:11px;"></i>
                </div>
                <span style="color:#94a3b8;font-size:12px;line-height:1.3;" data-translate="coming_soon_feature_3">Сообщество и чаты</span>
              </div>
              <div style="padding:12px 14px;border-radius:12px;
                          background:rgba(251,191,36,0.04);border:1px solid rgba(251,191,36,0.1);
                          display:flex;align-items:center;gap:10px;">
                <div style="width:28px;height:28px;border-radius:8px;flex-shrink:0;
                            background:rgba(251,191,36,0.12);display:flex;align-items:center;justify-content:center;">
                  <i class="fas fa-star" style="color:#fbbf24;font-size:11px;"></i>
                </div>
                <span style="color:#94a3b8;font-size:12px;line-height:1.3;" data-translate="coming_soon_feature_4">Ранний доступ</span>
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
              data-translate="coming_soon_close">
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
          border:1px solid rgba(34,211,238,0.35);
          border-radius:50%;
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
          cursor: pointer; border-radius: 8px; transition: all 0.15s;
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
    window.renderNotifyBtn = function() {
      var area = document.getElementById('csNotifyArea');
      if (!area) return;
      var subscribed = localStorage.getItem('al_cs_notify') === '1';
      var currentLang = localStorage.getItem('airdropLabLang') || 'ru';
      
      if (subscribed) {
        var subscribedText = currentLang === 'en' 
          ? 'You are subscribed — we will notify you at launch!'
          : 'Вы подписаны — уведомим при запуске!';
        area.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;gap:8px;'
          + 'padding:12px;border-radius:12px;background:rgba(52,211,153,0.08);'
          + 'border:1px solid rgba(52,211,153,0.2);">'
          + '<i class="fas fa-check-circle" style="color:#34d399;font-size:16px;"></i>'
          + '<span style="color:#34d399;font-size:13px;font-weight:600;">' + subscribedText + '</span>'
          + '</div>';
      } else {
        var notifyText = currentLang === 'en' 
          ? 'Notify me on launch'
          : 'Уведомить меня о запуске';
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
          + '<span>' + notifyText + '</span>'
          + '</button>';
      }
    }

    window.csRequestNotify = function() {
      var btn = document.getElementById('csNotifyBtn');
      if (btn) {
        var currentLang = localStorage.getItem('airdropLabLang') || 'ru';
        var connectingText = currentLang === 'en' ? 'Connecting...' : 'Подключаемся...';
        btn.innerHTML = '<i class="fas fa-spinner fa-spin" style="color:#22d3ee;"></i><span>' + connectingText + '</span>';
        btn.disabled = true;
      }
      function markSubscribed() {
        localStorage.setItem('al_cs_notify', '1');
        setTimeout(window.renderNotifyBtn, 400);
      }
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then(function(p) {
          if (p === 'granted') {
            var currentLang = localStorage.getItem('airdropLabLang') || 'ru';
            var notificationTitle = 'AirdropLab';
            var notificationBody = currentLang === 'en' 
              ? 'You are subscribed! We will notify you when the section launches 🚀'
              : 'Вы подписаны! Уведомим при запуске раздела 🚀';
            new Notification(notificationTitle, {
              body: notificationBody,
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

      window.syncAuth = function() {
        // Проверяем состояние авторизации через глобальные переменные или localStorage
        var isLoggedIn = false;
        
        // Способ 1: проверить через глобальную переменную currentUser
        if (typeof window.currentUser !== 'undefined' && window.currentUser) {
          isLoggedIn = true;
        }
        // Способ 2: проверить через localStorage
        else if (localStorage.getItem('firebaseUser') || localStorage.getItem('authToken')) {
          isLoggedIn = true;
        }
        // Способ 3: проверить через десктопный элемент (если есть)
        else if (deskIn && !deskIn.classList.contains('hidden')) {
          isLoggedIn = true;
        }
        
        // Применяем состояние к мобильным элементам
        if (mobIn)  mobIn.style.display  = isLoggedIn ? 'flex' : 'none';
        if (mobOut) mobOut.style.display = isLoggedIn ? 'none' : 'block';
        if (deskAva && mobAva && deskAva.src) mobAva.src = deskAva.src;
        
        // Обновляем мобильные админские кнопки при изменении авторизации
        if (typeof window.updateMobileAdminButtons === 'function') {
          window.updateMobileAdminButtons();
        }
        
        // Синхронизация имени пользователя в мобильной версии
        if (isLoggedIn && window.currentUser) {
          var userName = window.currentUser.displayName || window.currentUser.email || 'User';
          var mobUserNameEl = document.getElementById('mobUserName');
          if (mobUserNameEl) {
            mobUserNameEl.textContent = userName;
          }
        }
      }
      
      // Дополнительный вызов для гарантии отображения кнопок
      setTimeout(function() {
        if (typeof window.updateMobileAdminButtons === 'function') {
          window.updateMobileAdminButtons();
        }
      }, 200);
      if (deskIn)  new MutationObserver(window.syncAuth).observe(deskIn,  { attributes:true, attributeFilter:['class','style'] });
      if (deskAva) new MutationObserver(function(){ if (mobAva) mobAva.src = deskAva.src; })
                     .observe(deskAva, { attributes:true, attributeFilter:['src'] });
      window.syncAuth();
         
      // Дополнительная проверка каждые 1000мс для надежной синхронизации мобильной авторизации
      setInterval(window.syncAuth, 1000);
      
      // Обновляем мобильные админские кнопки в зависимости от страницы
      updateMobileAdminButtons();
      
      // Дополнительное обновление через небольшую задержку для гарантии
      setTimeout(function() {
        if (typeof window.updateMobileAdminButtons === 'function') {
          window.updateMobileAdminButtons();
        }
      }, 500);

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
      function syncAdmin() {
        var vis = deskAdmin && deskAdmin.style.display !== 'none' && deskAdmin.style.display !== '';
        if (mobAdd) mobAdd.style.display = vis ? 'flex' : 'none';
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
      window.renderNotifyBtn();
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
    document.addEventListener('DOMContentLoaded', function() {
      injectHeader();
      // Вызываем обновление мобильных кнопок после инъекции хедера
      setTimeout(function() {
        if (typeof window.updateMobileAdminButtons === 'function') {
          window.updateMobileAdminButtons();
        }
      }, 100);
    });
  } else {
    injectHeader();
    // Вызываем обновление мобильных кнопок после инъекции хедера
    setTimeout(function() {
      if (typeof window.updateMobileAdminButtons === 'function') {
        window.updateMobileAdminButtons();
      }
    }, 100);
  }

})();

// ════════════════════════════════════════════════════
// Функции для работы с мобильными админскими кнопками
// ════════════════════════════════════════════════════
window.updateMobileAdminButtons = function() {
  var mobAdminBtns = document.getElementById('mobAdminBtns');
  var deskAdminBtns = document.getElementById('desktopAdminButtons');
  var deskAddBtn = document.getElementById('deskAddBtn');
  var mobAddBtn = document.getElementById('mobAddBtn');

  if (!mobAdminBtns || !deskAdminBtns) return;

  var isAdmin = window.currentUser && window.currentUser.uid === ADMIN_UID;
  if (!isAdmin) {
    mobAdminBtns.style.display = 'none';
    deskAdminBtns.innerHTML = '';
    if (deskAddBtn) deskAddBtn.style.display = 'none';
    if (mobAddBtn) mobAddBtn.style.display = 'none';
    return;
  }
  mobAdminBtns.style.display = 'flex';

  var isMainPage = window.location.pathname.endsWith('/') ||
                   window.location.pathname.endsWith('index.html') ||
                   window.location.pathname === '' ||
                   window.location.pathname === '/';

  var isFaucetPage = window.location.pathname.includes('faucet');

  var buttonsHTML = '';
  var mobButtonsHTML = '';
  var btnStyle = 'style="padding:5px 8px;font-size:11px;"';

  function addDesktopButton(html) { buttonsHTML += html; }
  function addMobileButton(html) { mobButtonsHTML += html; }

  if (isMainPage) {
    if (deskAddBtn) deskAddBtn.style.display = 'flex';
    if (mobAddBtn) mobAddBtn.style.display = 'flex';

    addDesktopButton("<button onclick=\"typeof openStats==='function'&&openStats()\" class=\"admin-action-btn admin-btn-orange\"><i class=\"fas fa-chart-pie text-base\"></i></button>");
    addDesktopButton("<button onclick=\"typeof migrateToFirestore==='function'&&migrateToFirestore()\" class=\"admin-action-btn admin-btn-purple\"><i class=\"fas fa-cloud-upload-alt text-base\"></i></button>");
    addDesktopButton("<button onclick=\"typeof exportAllData==='function'&&exportAllData()\" class=\"admin-action-btn admin-btn-emerald\"><i class=\"fas fa-file-export text-base\"></i></button>");
    addDesktopButton("<button onclick=\"typeof openDeletedProjects==='function'&&openDeletedProjects()\" class=\"admin-action-btn admin-btn-red\"><i class=\"fas fa-trash-restore text-base\"></i></button>");
    addDesktopButton("<button onclick=\"typeof importAllData==='function'&&importAllData()\" class=\"admin-action-btn admin-btn-purple\"><i class=\"fas fa-file-import text-base\"></i></button>");
    
    addMobileButton("<button onclick=\"typeof openStats==='function'&&openStats()\" class=\"admin-action-btn admin-btn-orange\" " + btnStyle + " title=\"" + t('statistics_title') + "\"><i class=\"fas fa-chart-pie\"></i></button>");
    addMobileButton("<button onclick=\"typeof migrateToFirestore==='function'&&migrateToFirestore()\" class=\"admin-action-btn admin-btn-purple\" " + btnStyle + " title=\"" + t('upload_title') + "\"><i class=\"fas fa-cloud-upload-alt\"></i></button>");
    addMobileButton("<button onclick=\"typeof exportAllData==='function'&&exportAllData()\" class=\"admin-action-btn admin-btn-emerald\" " + btnStyle + " title=\"" + t('export_title') + "\"><i class=\"fas fa-file-export\"></i></button>");
    addMobileButton("<button onclick=\"typeof openDeletedProjects==='function'&&openDeletedProjects()\" class=\"admin-action-btn admin-btn-red\" " + btnStyle + " title=\"" + t('deleted_title') + "\"><i class=\"fas fa-trash-restore\"></i></button>");

  } else if (isFaucetPage) {
    if (deskAddBtn) deskAddBtn.style.display = 'flex';
    if (mobAddBtn) mobAddBtn.style.display = 'flex';

    // Кнопки для кранов
    addDesktopButton("<button onclick=\"typeof toggleEditMode==='function'&&toggleEditMode()\" class=\"admin-action-btn admin-btn-purple\" title=\"" + t('edit_mode') + "\"><i id=\"editModeIcon\" class=\"fas fa-pen text-base\"></i></button>");
    addDesktopButton("<button onclick=\"typeof showAllHiddenFaucets==='function'&&showAllHiddenFaucets()\" class=\"admin-action-btn admin-btn-red\" title=\"" + t('show_hidden_title') + "\"><i class=\"fas fa-eye-slash text-base\"></i></button>");
    addDesktopButton("<button onclick=\"typeof openStats==='function'&&openStats()\" class=\"admin-action-btn admin-btn-orange\" title=\"" + t('statistics_title') + "\"><i class=\"fas fa-chart-pie text-base\"></i></button>");
    addDesktopButton("<button onclick=\"window.exportFaucetData()\" class=\"admin-action-btn admin-btn-emerald\" title=\"" + t('export_faucets_title') + "\"><i class=\"fas fa-file-export text-base\"></i></button>");
    addDesktopButton("<button onclick=\"window.importFaucetData()\" class=\"admin-action-btn admin-btn-purple\" title=\"" + t('import_faucets_title') + "\"><i class=\"fas fa-file-import text-base\"></i></button>");

    addMobileButton("<button onclick=\"typeof toggleEditMode==='function'&&toggleEditMode()\" class=\"admin-action-btn admin-btn-purple\" " + btnStyle + " title=\"" + t('edit_mode') + "\"><i class=\"fas fa-pen\"></i></button>");
    addMobileButton("<button onclick=\"typeof openStats==='function'&&openStats()\" class=\"admin-action-btn admin-btn-orange\" " + btnStyle + " title=\"" + t('statistics_title') + "\"><i class=\"fas fa-chart-pie\"></i></button>");
    addMobileButton("<button onclick=\"window.exportFaucetData()\" class=\"admin-action-btn admin-btn-emerald\" " + btnStyle + " title=\"" + t('export_faucets_title') + "\"><i class=\"fas fa-file-export\"></i></button>");
    addMobileButton("<button onclick=\"window.importFaucetData()\" class=\"admin-action-btn admin-btn-purple\" " + btnStyle + " title=\"" + t('import_faucets_title') + "\"><i class=\"fas fa-file-import\"></i></button>");

  deskAdminBtns.innerHTML = buttonsHTML;
  mobAdminBtns.innerHTML = mobButtonsHTML;
};

// Функции для экспорта/импорта данных
window.exportFaucetData = function() {
  if (!currentUser || currentUser.uid !== ADMIN_UID) {
    if (typeof showToast === 'function') showToast('Нет доступа'); else alert('Нет доступа');
    return;
  }
  
  console.log('Starting faucet data export...');
  
  try {
    // Функция для экспорта данных
    const exportData = (faucetsData) => {
      console.log('Exporting faucets data:', faucetsData.length, 'items');
      
      // Создаем JSON файл для скачивания
      const dataStr = JSON.stringify(faucetsData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `faucets_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      if (typeof showToast === 'function') {
        showToast(`Экспортировано ${faucetsData.length} кранов!`);
      } else {
        alert(`Экспортировано ${faucetsData.length} кранов!`);
      }
    };
    
    // Проверяем находимся ли мы на странице faucet.html
    if (window.location.pathname.includes('faucet')) {
      // На странице faucet.html используем локальную переменную faucets
      if (typeof faucets !== 'undefined' && faucets.length > 0) {
        console.log('Using local faucets variable from faucet.html');
        exportData(faucets);
        return;
      }
    }
    
    // Пробуем получить данные из глобальной переменной (для других страниц)
    if (typeof window.faucets !== 'undefined' && window.faucets.length > 0) {
      console.log('Using window.faucets data');
      exportData(window.faucets);
      return;
    }
    
    // Пробуем получить данные из Firebase
    if (window.db && typeof window.__firestoreExports !== 'undefined') {
      const { collection, getDocs, query, orderBy } = window.__firestoreExports;
      if (collection && getDocs && query && orderBy) {
        console.log('Loading data from Firebase...');
        getDocs(query(collection(window.db, 'faucets'), orderBy('name')))
          .then(snap => {
            const faucetsData = [];
            for (const d of snap.docs) {
              faucetsData.push({ id: d.id, ...d.data() });
            }
            console.log('Loaded from Firebase:', faucetsData.length, 'items');
            exportData(faucetsData);
          })
          .catch(error => {
            console.error('Ошибка загрузки из Firebase:', error);
            // Fallback на localStorage
            const storedData = localStorage.getItem('faucets_backup') || localStorage.getItem('faucets');
            if (storedData) {
              console.log('Using localStorage fallback');
              exportData(JSON.parse(storedData));
            } else {
              throw new Error('Нет данных для экспорта ни в Firebase, ни в localStorage');
            }
          });
        return;
      }
    }
    
    // Fallback на localStorage
    const storedData = localStorage.getItem('faucets_backup') || localStorage.getItem('faucets');
    if (storedData) {
      console.log('Using localStorage data');
      exportData(JSON.parse(storedData));
    } else {
      throw new Error('Нет данных для экспорта');
    }
    
  } catch (error) {
    console.error('Ошибка экспорта кранов:', error);
    if (typeof showToast === 'function') {
      showToast('Ошибка экспорта: ' + error.message);
    } else {
      alert('Ошибка экспорта: ' + error.message);
    }
  }
};

window.importFaucetData = function() {
  if (!currentUser || currentUser.uid !== ADMIN_UID) {
    if (typeof showToast === 'function') showToast('Нет доступа'); else alert('Нет доступа');
    return;
  }
  
  console.log('Starting faucet data import...');
  
  // Создаем файловый инпут
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    console.log('File selected:', file.name);
    
    const reader = new FileReader();
    reader.onload = function(event) {
      try {
        const faucetsData = JSON.parse(event.target.result);
        console.log('Parsed faucets data:', faucetsData.length, 'items');
        
        // Проверяем структуру данных
        if (!Array.isArray(faucetsData)) {
          throw new Error('Некорректный формат данных - ожидается массив кранов');
        }
        
        // Сохраняем в localStorage как бэкап
        localStorage.setItem('faucets_backup', JSON.stringify(faucetsData));
        console.log('Saved to localStorage backup');
        
        // Обновляем глобальную переменную если есть
        if (typeof window !== 'undefined') {
          window.faucets = faucetsData;
          console.log('Updated window.faucets');
        }
        
        // Если находимся на странице faucet.html, обновляем локальную переменную
        if (window.location.pathname.includes('faucet') && typeof faucets !== 'undefined') {
          faucets.length = 0; // Очищаем массив
          faucets.push(...faucetsData); // Добавляем новые данные
          console.log('Updated local faucets variable in faucet.html');
          
          // Перерисовываем интерфейс если есть функция renderAll
          if (typeof renderAll === 'function') {
            renderAll();
            console.log('Called renderAll() to refresh UI');
          }
        }
        
        // Сохраняем в Firebase если доступно
        if (window.db && typeof window.__firestoreExports !== 'undefined') {
          const { collection, doc, setDoc, writeBatch, serverTimestamp } = window.__firestoreExports;
          if (collection && doc && setDoc && writeBatch) {
            console.log('Saving to Firebase...');
            const faucetsCollection = collection(window.db, 'faucets');
            const batch = writeBatch(window.db);
            
            faucetsData.forEach(faucet => {
              const faucetData = {
                ...faucet,
                updatedAt: serverTimestamp(),
                updatedBy: currentUser.uid
              };
              
              if (faucet.id) {
                // Обновляем существующий
                batch.set(doc(window.db, 'faucets', faucet.id), faucetData, { merge: true });
              } else {
                // Создаем новый с ID
                const newId = 'faucet_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                batch.set(doc(window.db, 'faucets', newId), {
                  ...faucetData,
                  id: newId,
                  createdAt: serverTimestamp(),
                  createdBy: currentUser.uid
                });
              }
            });
            
            batch.commit().then(() => {
              console.log(`✅ Сохранено ${faucetsData.length} кранов в Firebase`);
              
              if (typeof showToast === 'function') {
                showToast(`Импортировано ${faucetsData.length} кранов в Firebase!`);
              } else {
                alert(`Импортировано ${faucetsData.length} кранов в Firebase!`);
              }
              
              // Если на faucet.html, перезагружаем данные
              if (window.location.pathname.includes('faucet') && typeof loadFaucetsFromFirestore === 'function') {
                setTimeout(() => {
                  loadFaucetsFromFirestore();
                }, 500);
              }
            }).catch(error => {
              console.error('Ошибка сохранения в Firebase:', error);
              if (typeof showToast === 'function') {
                showToast(`Сохранено локально ${faucetsData.length} кранов. Ошибка Firebase: ${error.message}`);
              } else {
                alert(`Сохранено локально ${faucetsData.length} кранов. Ошибка Firebase: ${error.message}`);
              }
            });
          } else {
            // Firebase доступен но функции не готовы
            console.log('Firebase available but functions not ready');
            if (typeof showToast === 'function') {
              showToast(`Импортировано ${faucetsData.length} кранов локально`);
            } else {
              alert(`Импортировано ${faucetsData.length} кранов локально`);
            }
          }
        } else {
          // Firebase недоступен
          console.log('Firebase not available, using localStorage only');
          if (typeof showToast === 'function') {
            showToast(`Импортировано ${faucetsData.length} кранов в localStorage`);
          } else {
            alert(`Импортировано ${faucetsData.length} кранов в localStorage`);
          }
        }
        
      } catch (error) {
        console.error('Ошибка импорта кранов:', error);
        if (typeof showToast === 'function') {
          showToast('Ошибка импорта: ' + error.message);
        } else {
          alert('Ошибка импорта: ' + error.message);
        }
      }
    };
    
    reader.readAsText(file);
  };
  
  input.click();
};

// Функция для сохранения кранов в Firebase
async function saveFaucetsToFirebase(faucetsData) {
  if (!window.db) {
    throw new Error('Firebase недоступен');
  }
  
  const { collection, doc, setDoc, serverTimestamp } = window.__firestoreExports || {};
  if (!collection || !doc || !setDoc) {
    throw new Error('Firebase функции недоступны');
  }
  
  const COL_FAUCETS = 'faucets';
  const batch = [];
  
  for (const faucet of faucetsData) {
    const faucetData = {
      ...faucet,
      updatedAt: serverTimestamp(),
      updatedBy: currentUser.uid
    };
    
    if (faucet.id) {
      // Обновляем существующий
      batch.push(setDoc(doc(window.db, COL_FAUCETS, faucet.id), faucetData, { merge: true }));
    } else {
      // Создаем новый с ID
      const newId = 'faucet_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      batch.push(setDoc(doc(window.db, COL_FAUCETS, newId), {
        ...faucetData,
        id: newId,
        createdAt: serverTimestamp(),
        createdby: currentUser.uid
      }));
    }
  }
  
  await Promise.all(batch);
  console.log(`✅ Сохранено ${batch.length} кранов в Firebase`);
}

window.exportGuidesData = function() {
  if (!currentUser || currentUser.uid !== ADMIN_UID) {
    if (typeof showToast === 'function') showToast('Нет доступа'); else alert('Нет доступа');
    return;
  }
  // Здесь будет логика экспорта данных по гайдам
  if (typeof showToast === 'function') {
    showToast('Экспорт данных гайдов...');
  } else {
    alert('Экспорт данных гайдов...');
  }
};

window.importGuidesData = function() {
  if (!currentUser || currentUser.uid !== ADMIN_UID) {
    if (typeof showToast === 'function') showToast('Нет доступа'); else alert('Нет доступа');
    return;
  }
  // Здесь будет логика импорта данных по гайдам
  if (typeof showToast === 'function') {
    showToast('Импорт данных гайдов...');
  } else {
    alert('Импорт данных гайдов...');
  }
};

// ================================================
// ИМПОРТ ИЗ JSON — ИСПРАВЛЕННАЯ ВЕРСИЯ
// ================================================

// ================================================
// ИСПРАВЛЕННЫЙ ИМПОРТ JSON (без writeBatch)
// ================================================
window.importAllData = function() {
  if (!currentUser || currentUser.uid !== ADMIN_UID) {
    if (typeof showToast === 'function') showToast('Нет доступа'); 
    else alert('Нет доступа');
    return;
  }
  
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async function(event) {
      try {
        let raw = JSON.parse(event.target.result);
        
        let projectsToImport = [];
        if (Array.isArray(raw)) {
          projectsToImport = raw;
        } else if (raw.projects && Array.isArray(raw.projects)) {
          projectsToImport = raw.projects;
        } else if (raw.data && Array.isArray(raw.data)) {
          projectsToImport = raw.data;
        } else {
          throw new Error('Неверный формат JSON. Ожидается массив проектов или объект с полем "projects"');
        }

        if (projectsToImport.length === 0) {
          throw new Error('В файле нет проектов');
        }

        if (!window.db || !window.__firestoreExports) {
          throw new Error('Firebase не инициализирован');
        }

        const { collection, doc, setDoc, serverTimestamp } = window.__firestoreExports;
        
        showToast(`Загрузка ${projectsToImport.length} проектов...`);

        for (const p of projectsToImport) {
          const id = p.id || ('project_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9));
          const { id: _, ...cleanData } = p;
          
          await setDoc(doc(collection(window.db, 'projects'), id), {
            ...cleanData,
            updatedAt: serverTimestamp(),
            updatedBy: currentUser.uid
          }, { merge: true });
        }

        showToast(`✅ Успешно импортировано ${projectsToImport.length} проектов!`);
        setTimeout(() => location.reload(), 1500);

      } catch (error) {
        console.error('Ошибка импорта проектов:', error);
        if (typeof showToast === 'function') {
          showToast('Ошибка: ' + error.message);
        } else {
          alert('Ошибка: ' + error.message);
        }
      }
    };
    
    reader.readAsText(file);
  };
  
  input.click();
};

// Миграция теперь тоже использует улучшенную функцию импорта
window.migrateToFirestore = function() {
  if (!currentUser || currentUser.uid !== ADMIN_UID) {
    showToast('Нет доступа');
    return;
  }
  importAllData();   // теперь просто вызывает тот же импорт
};

// Экспорт оставляем как был (можно улучшить позже)
if (typeof window.exportData === 'undefined') {
  window.exportData = function() {
    if (!currentUser || currentUser.uid !== ADMIN_UID) {
      showToast('Нет доступа');
      return;
    }
    const projectsData = localStorage.getItem('projects_backup');
    if (!projectsData) {
      showToast('Нет данных для экспорта');
      return;
    }
    try {
      const projects = JSON.parse(projectsData);
      const dataStr = JSON.stringify({ projects: projects }, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `projects_backup_${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      showToast(`Экспортировано ${projects.length} проектов`);
    } catch (e) {
      showToast('Ошибка экспорта');
    }
  };
}

// ════════════════════════════════════════════════════
// Глобальные переменные
// ════════════════════════════════════════════════════
const ADMIN_UID = globalThis.ADMIN_UID || "SAkz4mdW9reDaIsvqigCNZhEKJR2";
let isAdminMode = false;

// Проверяем режим админа при доступности currentUser
function checkAdminMode() {
  isAdminMode = currentUser && currentUser.uid === ADMIN_UID;
}

// Обновляем режим при изменении авторизации
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'currentUser', {
    get: function() { return window._currentUser; },
    set: function(value) { 
      window._currentUser = value; 
      checkAdminMode();
    }
  });
}

// ════════════════════════════════════════════════════
// Глобальные функции для работы на всех страницах
// ════════════════════════════════════════════════════
window.openStats = function() { 
  if (!currentUser) { 
    if (typeof showToast === 'function') {
      showToast('Войдите'); 
    } else {
      alert('Войдите');
    }
    return; 
  } 
  if (currentUser.uid !== ADMIN_UID) { 
    if (typeof showToast === 'function') {
      showToast('Нет доступа'); 
    } else {
      alert('Нет доступа');
    }
    return; 
  } 
  window.open('admin/stats.html', '_blank'); 
};

window.openDeletedProjects = function() { 
  if (!isAdminMode) { 
    if (typeof showToast === 'function') {
      showToast('Только для админа'); 
    } else {
      alert('Только для админа');
    }
    return; 
  }
  if (typeof loadDeletedProjects === 'function') {
    loadDeletedProjects(); 
    var modal = document.getElementById('deletedProjectsModal');
    if (modal) modal.classList.add('active');
  } else {
    window.open('index.html#deleted-projects', '_blank');
  }
};

window.migrateToFirestore = function() { 
  if (!currentUser) { 
    if (typeof showToast === 'function') {
      showToast('Войдите'); 
    } else {
      alert('Войдите');
    }
    return; 
  }
  if (currentUser.uid !== ADMIN_UID) { 
    if (typeof showToast === 'function') {
      showToast('Нет доступа'); 
    } else {
      alert('Нет доступа');
    }
    return; 
  }
  // Прямая миграция данных без рекурсии
  const projectsData = localStorage.getItem('projects_backup');
  if (projectsData) {
    try {
      const projects = JSON.parse(projectsData);
      console.log('Migrating', projects.length, 'projects to Firebase');
      
      if (window.db && typeof window.__firestoreExports !== 'undefined') {
        const { collection, doc, setDoc, writeBatch, serverTimestamp } = window.__firestoreExports;
        if (collection && doc && setDoc && writeBatch) {
          const batch = writeBatch(window.db);
          
          projects.forEach(project => {
            const projectData = {
              ...project,
              migratedAt: serverTimestamp(),
              migratedBy: currentUser.uid
            };
            
            if (project.id) {
              batch.set(doc(window.db, 'projects', project.id), projectData, { merge: true });
            } else {
              const newId = 'project_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
              batch.set(doc(window.db, 'projects', newId), {
                ...projectData,
                id: newId,
                createdAt: serverTimestamp(),
                createdBy: currentUser.uid
              });
            }
          });
          
          batch.commit().then(() => {
            console.log(`✅ Мигрировано ${projects.length} проектов в Firebase`);
            if (typeof showToast === 'function') {
              showToast(`Мигрировано ${projects.length} проектов в Firebase!`);
            }
          }).catch(error => {
            console.error('Migration error:', error);
            if (typeof showToast === 'function') {
              showToast('Ошибка миграции: ' + error.message);
            }
          });
        } else {
          if (typeof showToast === 'function') {
            showToast('Firebase функции недоступны');
          }
        }
      } else {
        if (typeof showToast === 'function') {
          showToast(`Миграция ${projects.length} проектов...`);
        }
      }
    } catch (error) {
      console.error('Migration error:', error);
      if (typeof showToast === 'function') {
        showToast('Ошибка миграции: ' + error.message);
      }
    }
  } else {
    if (typeof showToast === 'function') {
      showToast('Нет данных для миграции');
    }
  }
};

window.exportAllData = function() { 
  if (!currentUser) { 
    if (typeof showToast === 'function') {
      showToast('Войдите'); 
    } else {
      alert('Войдите');
    }
    return; 
  }
  if (currentUser.uid !== ADMIN_UID) { 
    if (typeof showToast === 'function') {
      showToast('Нет доступа'); 
    } else {
      alert('Нет доступа');
    }
    return; 
  }
  // Прямой экспорт данных без рекурсии
  const projectsData = localStorage.getItem('projects_backup');
  if (projectsData) {
    try {
      const projects = JSON.parse(projectsData);
      const dataStr = JSON.stringify(projects, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `projects_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      if (typeof showToast === 'function') {
        showToast(`Экспортировано ${projects.length} проектов`);
      }
    } catch (error) {
      console.error('Export error:', error);
      if (typeof showToast === 'function') {
        showToast('Ошибка экспорта: ' + error.message);
      }
    }
  } else {
    if (typeof showToast === 'function') {
      showToast('Нет данных для экспорта');
    }
  }
};

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
  // Перерисовываем кнопку уведомлений при каждом открытии
  if (typeof window.renderNotifyBtn === 'function') {
    window.renderNotifyBtn();
  }
  modal.style.display = 'flex';
};

window.closeComingSoon = function(event) {
  if (event && event.target !== event.currentTarget) return;
  var modal = document.getElementById('comingSoonModal');
  if (modal) modal.style.display = 'none';
};

// Update dynamic elements when language changes
window.updateComingSoonTranslations = function() {
  // Просто перерисовываем кнопку уведомлений с новым языком
  if (typeof window.renderNotifyBtn === 'function') {
    window.renderNotifyBtn();
  }
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

// ← ДОБАВЬ СЮДА, ПОСЛЕ ОПРЕДЕЛЕНИЯ ФУНКЦИИ
document.addEventListener('keydown', function(e) {
  if (e.key !== 'Escape') return;
  var m = document.getElementById('feedbackListModal');
  if (m && m.classList.contains('active')) window.closeFeedbackListModal();
});
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
  
  const esc = (typeof window.safeText === 'function')
    ? window.safeText
    : function(s) {
        return String(s || '').replace(/[&<>"']/g, function(ch) {
          return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
        });
      };

  const list = Array.isArray(window.adminFeedbacks) ? window.adminFeedbacks : [];
  const filtered = isAdmin
    ? adminFeedbacks
    : adminFeedbacks.filter(item => item.userId === currentUser.uid);

  if (filtered.length === 0) {
    container.innerHTML = `<div class="text-center py-8 text-slate-400">
      <i class="fas fa-inbox text-4xl mb-3 opacity-50"></i>
      <p class="text-sm">${isAdmin ? 'Нет сообщений' : 'У вас пока нет сообщений'}</p>
    </div>`;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const isSupport = item.projectId === '__support__' || item.type === 'support';
    const isUnread = isAdmin ? !item.read : !item.userRead;
    const date = item.createdAt?.toDate ? item.createdAt.toDate() : new Date(item.createdAt || 0);
    const lastMsg = (item.messages && item.messages.length > 0)
      ? item.messages[item.messages.length - 1]
      : { text: 'Без текста', timestamp: date };
    
    let projectName = isSupport ? 'Support' : item.projectName;
    let projectLogo = '';
    if (!isSupport) {
      const project = typeof projects !== 'undefined' && Array.isArray(projects)
        ? projects.find(p => p.id === item.projectId)
        : null;
      if (project) {
        projectName = project.name || projectName;
        projectLogo = project.image || project.logoUrl || '';
      }
      projectLogo = projectLogo || item.projectLogo || '';
    }

    const categoryLabels = {
      suggestion: '💡 Предложение',
      bug: '🐛 Ошибка',
      question: '❓ Вопрос',
      other: '💬 Другое',
      technical: '🔧 Техническая проблема',
      account: '👤 Проблема с аккаунтом',
      partnership: '🤝 Партнёрство'
    };
    const categoryLabel = item.category ? (categoryLabels[item.category] || item.category) : '';

    const clickFn = isAdmin
      ? `openAdminFeedbackChat('${String(item.id || '').replace(/'/g, "\\'")}')`
      : `openFeedbackFromList('${String(item.id || '').replace(/'/g, "\\'")}', '${String(item.projectId || '').replace(/'/g, "\\'")}', '${String(projectName || '').replace(/'/g, "\\'")}')`;

    let titleHtml = '';
    if (isAdmin) {
      titleHtml = `
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2 flex-wrap">
            ${isSupport
              ? `<span style="background:linear-gradient(135deg,rgba(124,58,237,0.25),rgba(139,92,246,0.1));
                            border:1px solid rgba(139,92,246,0.35);
                            padding:2px 8px;border-radius:12px;
                            color:#c084fc;font-size:11px;font-weight:700;letter-spacing:0.5px;">
                  🛡️ SUPPORT
                 </span>`
              : `${projectLogo
                  ? `<img src="${projectLogo}" class="w-5 h-5 rounded object-cover" onerror="this.style.display='none'">`
                  : ''}
                 <span class="text-blue-400 font-medium text-sm">${esc(projectName)}</span>`
            }
            ${categoryLabel
              ? `<span class="text-xs px-2 py-0.5 rounded-full ${
                  isSupport
                    ? 'bg-purple-900/40 text-purple-300 border border-purple-700/40'
                    : 'bg-slate-700/80 text-slate-300'
                }">${esc(categoryLabel)}</span>`
              : ''}
          </div>
          <div class="text-xs text-slate-400">
            от <span class="text-white font-medium">${esc(item.userName || 'Пользователь')}</span>
          </div>
        </div>`;
    } else {
      titleHtml = `
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            ${isSupport
              ? `<span style="background:linear-gradient(135deg,rgba(124,58,237,0.25),rgba(139,92,246,0.1));
                            border:1px solid rgba(139,92,246,0.35);
                            padding:2px 8px;border-radius:12px;
                            color:#c084fc;font-size:11px;font-weight:700;letter-spacing:0.5px;">
                  🛡️ SUPPORT
                 </span>`
              : `${projectLogo ? `<img src="${projectLogo}" class="w-6 h-6 rounded object-cover">` : ''}
                 <span class="font-bold text-white">${esc(projectName)}</span>`
            }
          </div>
          ${categoryLabel
            ? `<span class="text-xs ${isSupport ? 'text-purple-400' : 'text-slate-400'}">${esc(categoryLabel)}</span>`
            : ''}
        </div>`;
    }

    return `
      <div onclick="${clickFn}"
           class="cursor-pointer group relative rounded-xl p-4 transition-all"
           style="${isSupport
             ? 'background:rgba(88,28,135,0.08);border:1px solid rgba(139,92,246,0.25);'
             : 'background:rgba(30,41,59,0.4);border:1px solid rgba(71,85,105,0.5);'}"
           onmouseover="this.style.${isSupport
             ? 'background=\'rgba(88,28,135,0.15)\';this.style.borderColor=\'rgba(139,92,246,0.5)\''
             : 'background=\'rgba(30,41,59,0.8)\';this.style.borderColor=\'rgba(100,116,139,0.6)\''}"
           onmouseout="this.style.${isSupport
             ? 'background=\'rgba(88,28,135,0.08)\';this.style.borderColor=\'rgba(139,92,246,0.25)\''
             : 'background=\'rgba(30,41,59,0.4)\';this.style.borderColor=\'rgba(71,85,105,0.5)\''}">
        ${isUnread
          ? '<div class="absolute top-3 right-3 w-2.5 h-2.5 bg-purple-500 rounded-full animate-pulse"></div>'
          : ''}
        <div class="flex justify-between items-start mb-2">
          <div class="flex-1 min-w-0 pr-6">${titleHtml}</div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <span class="text-xs text-slate-500">${formatTimeAgo(date)}</span>
            ${isUnread
              ? '<span class="bg-purple-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">NEW</span>'
              : ''}
          </div>
        </div>
        <div class="text-sm text-slate-400 line-clamp-2 mt-1 pl-0">${esc(lastMsg.text)}</div>
      </div>`;
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

  if (!document.getElementById('feedbackListModal')) {
    console.log('🔧 Adding feedback modal to DOM...');
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    var _fbModalMdDown = false;
    var _fbModal = document.getElementById('feedbackListModal');

    if (_fbModal) {
      _fbModal.addEventListener('mousedown', function(e) {
        _fbModalMdDown = (e.target === _fbModal);
      });

      _fbModal.addEventListener('mouseup', function(e) {
        if (_fbModalMdDown && e.target === _fbModal) {
          window.closeFeedbackListModal();
        }
        _fbModalMdDown = false;
      });
    }

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

// Создаем модальное окно чата после загрузки DOM
function createFeedbackChatModal() {
  const chatHTML = `
    <div id="feedbackModal" class="modal">
      <div class="modal-content modal-lg relative overflow-hidden">
        <div class="modal-header">
          <div class="flex justify-between items-center w-full">
            <h2 class="text-xl font-bold flex items-center gap-2"><i class="fas fa-comments text-purple-400"></i><span id="feedbackModalTitle" data-translate="feedback">Обратная связь</span></h2>
            <button onclick="closeFeedbackModal()" class="text-slate-400 hover:text-white"><i class="fas fa-times text-xl"></i></button>
          </div>
        </div>
        <div class="modal-body bg-[#151b2b]">
          <input type="hidden" id="feedbackProjectId">
          <input type="hidden" id="feedbackDocId">
          <div class="mb-3 pb-3 border-b border-slate-700"><span class="text-sm text-slate-400" id="feedbackProjectLabel">Проект: </span><span id="feedbackProjectName" class="text-sm font-bold text-blue-400">...</span></div>
          <div id="feedbackChatHistory" class="h-80 overflow-y-auto pr-3 custom-scrollbar bg-slate-900/30 rounded-xl p-4"><div class="flex flex-col items-center justify-center h-full text-slate-500"><i class="fas fa-comments text-4xl mb-3 opacity-50"></i><p class="text-sm" data-translate="loading_chat">Загрузка переписки...</p></div></div>
          <div id="feedbackFormNew" class="space-y-4"></div>
          <div id="feedbackFormReply" class="hidden">
            <label class="block text-sm font-medium text-slate-300 mb-2" data-translate="your_answer">Ваш ответ</label>
            <div class="flex gap-2">
              <input type="text" id="feedbackUserReplyText" placeholder="Напишите ответ..." data-translate="reply_placeholder" class="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white">
              <button onclick="sendUserFeedbackReply()" class="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-bold"><i class="fas fa-paper-plane"></i></button>
              <button id="adminChatDeleteBtn" class="hidden text-red-400 hover:text-red-300" title="Удалить"><i class="fas fa-trash text-xl"></i></button>
            </div>
          </div>
        </div>
        <div class="modal-footer bg-[#1e2538] border-t border-slate-700 p-4 shrink-0">
          <div class="flex gap-3 w-full justify-end" id="feedbackModalFooter">
            <button onclick="closeFeedbackModal()" class="flex-1 bg-slate-700 hover:bg-slate-600 py-2.5 rounded-lg text-sm" data-translate="close">Закрыть</button>
            <button id="feedbackSendBtn" onclick="window.sendUserFeedback && window.sendUserFeedback()" class="flex-1 bg-blue-600 hover:bg-blue-500 py-2.5 rounded-lg text-sm font-bold" data-translate="send">Отправить</button>
          </div>
        </div>
      </div>
    </div>
  `;

  if (!document.getElementById('feedbackModal')) {
    document.body.insertAdjacentHTML('beforeend', chatHTML);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createFeedbackChatModal);
} else {
  createFeedbackChatModal();
}

// Feedback chat API (ported from index.html)
window.closeFeedbackModal = function() {
  const modal = document.getElementById('feedbackModal');
  if (modal) modal.classList.remove('active');
};

window.closeFeedbackChat = function() {
  const modal = document.getElementById('feedbackModal');
  if (modal) modal.classList.remove('active');
  if (window.currentFeedbackUnsub) {
    window.currentFeedbackUnsub();
    window.currentFeedbackUnsub = null;
  }
  if (typeof window.openFeedbackListModal === 'function') window.openFeedbackListModal();
};

window.backToFeedbackList = function() {
  const modal = document.getElementById('feedbackModal');
  if (modal) modal.classList.remove('active');
  if (window.currentFeedbackUnsub) {
    window.currentFeedbackUnsub();
    window.currentFeedbackUnsub = null;
  }
  if (typeof window.openFeedbackListModal === 'function') window.openFeedbackListModal();
};

window.openFeedbackFromList = function(docId, projectId, projectName) {
  const isSupport = projectId === '__support__' || projectName === 'Support';

  // Закрываем список
  const listModal = document.getElementById('feedbackListModal');
  if (listModal) listModal.classList.remove('active');

  const modal = document.getElementById('feedbackModal');
  if (!modal) return;
  document.getElementById('feedbackProjectId').value = projectId;
  document.getElementById('feedbackDocId').value = docId;
  document.getElementById('adminChatDeleteBtn').classList.add('hidden');

  // Находим данные фидбека для темы
  const fb = adminFeedbacks.find(f => f.id === docId);
  const categoryLabels = {
    suggestion: '💡 Предложение',
    bug: '🐛 Ошибка',
    question: '❓ Вопрос',
    other: '💬 Другое',
    technical: '🔧 Техническая проблема',
    account: '👤 Проблема с аккаунтом',
    partnership: '🤝 Партнёрство'
  };
  const categoryLabel = fb?.category ? (categoryLabels[fb.category] || fb.category) : '';

  // ---- Метка проекта ----
  let projectDisplayHtml = `
    <button onclick="closeFeedbackChat()"
            class="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-700
                   hover:bg-slate-600 text-white mr-2 transition-colors flex-shrink-0">
      <i class="fas fa-arrow-left text-sm"></i>
    </button>`;

  if (isSupport) {
    projectDisplayHtml += `
      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-2">
          <span style="background:linear-gradient(135deg,rgba(124,58,237,0.3),rgba(139,92,246,0.1));
                       border:1px solid rgba(139,92,246,0.4);
                       padding:3px 10px;border-radius:20px;
                       color:#c084fc;font-size:12px;font-weight:700;letter-spacing:1px;">
            🛡️ SUPPORT
          </span>
          ${categoryLabel
            ? `<span style="background:rgba(88,28,135,0.3);border:1px solid rgba(139,92,246,0.3);
                            padding:2px 8px;border-radius:10px;color:#a78bfa;font-size:11px;">
                ${categoryLabel}
               </span>`
            : ''}
        </div>
      </div>`;
  } else {
    const project = typeof projects !== 'undefined'
      ? projects.find(p => p.id === projectId)
      : null;
    const logo = project?.image || '';
    projectDisplayHtml += `
      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-2">
          ${logo ? `<img src="${logo}" class="w-6 h-6 rounded object-cover" onerror="this.style.display='none'">` : ''}
          <span class="font-bold text-white">${projectName}</span>
          ${categoryLabel
            ? `<span class="text-xs bg-slate-700 px-2 py-0.5 rounded-full text-slate-300">
                ${categoryLabel}
               </span>`
            : ''}
        </div>
      </div>`;
  }

  document.getElementById('feedbackProjectName').innerHTML = projectDisplayHtml;

  // ---- Заголовок модалки ----
  document.getElementById('feedbackModalTitle').innerHTML = isSupport
    ? '<i class="fas fa-shield-alt text-purple-400 mr-2"></i>Поддержка'
    : '<button onclick="closeFeedbackChat()" class="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-600 text-white mr-2 transition-colors"><i class="fas fa-arrow-left text-sm"></i></button>' + t('chat_with_support');

  // ---- Визуальный акцент ----
  const modalBody = document.querySelector('#feedbackModal .modal-body');
  if (modalBody) {
    modalBody.style.borderTop = isSupport
      ? '2px solid rgba(139,92,246,0.4)'
      : '';
  }

  // Показываем форму ответа
  document.getElementById('feedbackFormNew').classList.add('hidden');
  document.getElementById('feedbackFormReply').classList.remove('hidden');
  document.getElementById('feedbackSendBtn').classList.add('hidden');

  // Загружаем чат
  loadFeedbackChat(docId);
  modal.classList.add('active');
};

function loadFeedbackChat(feedbackId) {
  const fx = window.__firestoreExports;
  if (!fx || !fx.onSnapshot || !fx.doc) {
    console.error('Firestore functions not available');
    return;
  }

  if (window.currentFeedbackUnsub) {
    window.currentFeedbackUnsub();
    window.currentFeedbackUnsub = null;
  }

  const unsub = fx.onSnapshot(fx.doc(window.db, "feedbacks", feedbackId), function(snap) {
    if (!snap.exists()) return;
    const d = snap.data();

    const messages = (d.messages || []).slice().sort(function(a, b) {
      const timeA = a.timestamp?.toDate ? a.timestamp.toDate() : new Date(a.timestamp || 0);
      const timeB = b.timestamp?.toDate ? b.timestamp.toDate() : new Date(b.timestamp || 0);
      return timeA - timeB;
    });

    const html = messages.map(function(msg) {
      const isAdmin = window.currentUser && window.currentUser.uid === "SAkz4mdW9reDaIsvqigCNZhEKJR2";
      
      // Определяем сторону сообщения на основе senderId или sender для старых сообщений
      let isCurrentUserSender = false;
      if (msg.senderId) {
        // Новые сообщения с senderId
        isCurrentUserSender = msg.senderId === window.currentUser.uid;
      } else {
        // Старые сообщения без senderId
        if (msg.sender === 'user') {
          // Сообщения от пользователя - проверяем по userId документа
          isCurrentUserSender = d.userId === window.currentUser.uid;
        } else {
          // Сообщения от админа - только админы видят как свои
          isCurrentUserSender = isAdmin;
        }
      }
      const bubbleSide = isCurrentUserSender ? 'user' : 'admin';
      
      // Отладка только для новых сообщений
      if (msg.senderId) {
        console.log('🔍 New message debug:', {
          sender: msg.sender,
          senderId: msg.senderId,
          currentUserId: window.currentUser?.uid,
          isCurrentUserSender: isCurrentUserSender,
          bubbleSide: bubbleSide
        });
      }
      
      // Определяем имя отправителя
      let senderName;
      if (isCurrentUserSender) {
        // Свои сообщения всегда показываем как "Вы"
        senderName = (typeof t === 'function') ? t('you') : 'Вы';
      } else {
        // Чужие сообщения - строго по типу отправителя
        if (msg.sender === 'admin') {
          // Сообщения админов всегда как "Support" или "Admin"
          const isSupport = d.projectId === '__support__' || d.type === 'support';
          senderName = isSupport ? 'Support' : 'Admin';
        } else {
          // Сообщения пользователей всегда с их именем
          senderName = d.userName || ((typeof t === 'function') ? t('user') : 'Пользователь');
        }
      }
      
      // Определяем аватар
      let avatar;
      if (isCurrentUserSender) {
        // Свои сообщения
        if (isAdmin) {
          // Админ видит свои сообщения со щитом
          avatar = `<div class="chat-avatar"><i class="fas fa-user-shield"></i></div>`;
        } else {
          // Пользователь видит свои сообщения со своим аватаром
          avatar = `<img src="${window.currentUser?.photoURL || d.userPhoto || 'https://ui-avatars.com/api/?name=U'}" class="chat-avatar" alt="">`;
        }
      } else {
        // Чужие сообщения - строго по типу отправителя
        if (msg.sender === 'admin') {
          // Сообщения админов - наушники для support, щит для admin
          const isSupport = d.projectId === '__support__' || d.type === 'support';
          if (isSupport) {
            avatar = `<div class="chat-avatar"><i class="fas fa-headset"></i></div>`;
          } else {
            avatar = `<div class="chat-avatar"><i class="fas fa-user-shield"></i></div>`;
          }
        } else {
          // Сообщения пользователей всегда с их аватаром
          avatar = `<img src="${d.userPhoto || 'https://ui-avatars.com/api/?name=P'}" class="chat-avatar" alt="">`;
        }
      }
      
      const msgTime = msg.timestamp
        ? formatTimeAgo(msg.timestamp.toDate ? msg.timestamp.toDate() : new Date(msg.timestamp))
        : '';

      return `
        <div class="chat-bubble ${bubbleSide}">
          ${avatar}
          <div class="chat-bubble-wrapper">
            <span class="chat-sender">${senderName}</span>
            <div class="chat-content">${msg.text}</div>
            <span class="chat-time">${msgTime}</span>
          </div>
        </div>`;
    }).join('');

    const hist = document.getElementById('feedbackChatHistory');
    if (hist) {
      hist.innerHTML = html || `<p class="text-center text-slate-500 py-4">${(typeof t === 'function' ? t('no_messages') : 'Нет сообщений')}</p>`;
      setTimeout(function() { hist.scrollTop = hist.scrollHeight; }, 50);
    }

    const inp = document.getElementById('feedbackUserReplyText');
    const sendBtn = inp?.nextElementSibling; // Кнопка отправки
    const isAdmin = window.currentUser && window.currentUser.uid === "SAkz4mdW9reDaIsvqigCNZhEKJR2";
    
    if (inp) {
      inp.value = '';
      inp.placeholder = (typeof t === 'function') ? t('reply_placeholder') : 'Напишите ответ...';
      inp.onkeypress = function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          if (isAdmin) {
            sendAdminReply(feedbackId);
          } else {
            sendUserFeedbackReply();
          }
        }
      };
    }
    
    // Настраиваем кнопку отправки
    if (sendBtn) {
      sendBtn.onclick = function() {
        if (isAdmin) {
          sendAdminReply(feedbackId);
        } else {
          sendUserFeedbackReply();
        }
      };
    }
  });

  window.currentFeedbackUnsub = unsub;
}

window.openAdminFeedbackChat = function(feedbackId) {
  const fb = adminFeedbacks.find(f => f.id === feedbackId);
  if (!fb) return;

  // Определяем тип: support или project
  const isSupport = fb.projectId === '__support__' || fb.type === 'support';

  // Словарь тем
  const categoryLabels = {
    suggestion: '💡 Предложение',
    bug: '🐛 Ошибка',
    question: '❓ Вопрос',
    other: '💬 Другое',
    technical: '🔧 Техническая проблема',
    account: '👤 Проблема с аккаунтом',
    partnership: '🤝 Партнёрство'
  };
  const categoryLabel = fb.category ? (categoryLabels[fb.category] || fb.category) : '';

  let projectName, projectLogo;
  if (isSupport) {
    projectName = 'Support';
    projectLogo = '';
  } else {
    const project = window.projects && Array.isArray(window.projects)
      ? window.projects.find(p => p.id === fb.projectId)
      : null;
    projectName = project?.name || fb.projectName || fb.projectId || 'Неизвестный проект';
    projectLogo = project?.image || project?.logoUrl || fb.projectLogo || '';
  }

  // Закрываем список, открываем чат
  const listModal = document.getElementById('feedbackListModal');
  if (listModal) listModal.classList.remove('active');
  const chatModal = document.getElementById('feedbackModal');

  // Устанавливаем projectId
  document.getElementById('feedbackProjectId').value = fb.projectId;
  document.getElementById('feedbackDocId').value = fb.id;

  // ---- Строим HTML метки проекта над чатом ----
  let projectDisplayHtml = '';

  // Кнопка "назад"
  projectDisplayHtml += `
    <button onclick="backToFeedbackList()"
            class="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-600
                   text-white mr-2 transition-colors flex-shrink-0">
      <i class="fas fa-arrow-left text-sm"></i>
    </button>`;

  if (isSupport) {
    // Фиолетовый бейдж Support + тема
    projectDisplayHtml += `
      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-2">
          <span style="background:linear-gradient(135deg,rgba(124,58,237,0.3),rgba(139,92,246,0.1));
                       border:1px solid rgba(139,92,246,0.4);
                       padding:3px 10px;border-radius:20px;
                       color:#c084fc;font-size:12px;font-weight:700;letter-spacing:1px;">
            🛡️ SUPPORT
          </span>
          ${categoryLabel
            ? `<span style="background:rgba(88,28,135,0.3);border:1px solid rgba(139,92,246,0.3);
                            padding:2px 8px;border-radius:10px;
                            color:#a78bfa;font-size:11px;">
                ${categoryLabel}
               </span>`
            : ''}
        </div>
        <div class="text-xs text-slate-400">
          от <span class="text-white font-medium">${fb.userName || 'Пользователь'}</span>
        </div>
      </div>`;
  } else {
    // Стандартный вид для проекта
    projectDisplayHtml += `
      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-2 flex-wrap">
          ${projectLogo
            ? `<img src="${projectLogo}" class="w-6 h-6 rounded object-cover"
                    alt="${projectName}" onerror="this.style.display='none'">`
            : ''}
          <span class="font-bold text-white">${projectName}</span>
          ${categoryLabel
            ? `<span class="text-xs bg-slate-700 px-2 py-0.5 rounded-full text-slate-300">
                ${categoryLabel}
               </span>`
            : ''}
        </div>
        <div class="text-xs text-slate-400">
          от <span class="text-white font-medium">${fb.userName || 'Пользователь'}</span>
        </div>
      </div>`;
  }

  // Вставляем в элемент метки
  document.getElementById('feedbackProjectName').innerHTML = projectDisplayHtml;

  // ---- Заголовок модалки ----
  document.getElementById('feedbackModalTitle').innerHTML = isSupport
    ? '<i class="fas fa-shield-alt text-purple-400 mr-2"></i>Чат с пользователем (Support)'
    : '<i class="fas fa-user-shield text-purple-400 mr-2"></i>' + t('chat_with_user');

  // ---- Визуальный акцент для Support ----
  const modalBody = document.querySelector('#feedbackModal .modal-body');
  if (modalBody) {
    modalBody.style.borderTop = isSupport
      ? '2px solid rgba(139,92,246,0.4)'
      : '';
  }

  // Скрываем форму нового сообщения, показываем форму ответа
  document.getElementById('feedbackFormNew').classList.add('hidden');
  document.getElementById('feedbackFormReply').classList.remove('hidden');
  document.getElementById('feedbackSendBtn').classList.add('hidden');

  // Загружаем чат
  loadFeedbackChat(feedbackId);

  // Кнопка удаления — только для админа
  document.getElementById('adminChatDeleteBtn').classList.remove('hidden');
  document.getElementById('adminChatDeleteBtn').onclick = function() {
    if (confirm('Удалить переписку?')) deleteAdminFeedback(feedbackId);
  };

  // Открываем модалку и помечаем как прочитанное
  chatModal.classList.add('active');
  markFeedbackRead(feedbackId);
};
  
window.sendAdminReply = async function(feedbackId) {
  const fx = window.__firestoreExports;
  if (!fx || !fx.updateDoc || !fx.doc || !fx.arrayUnion) {
    // Если Firestore еще не готов, пробуем через 100мс еще раз
    setTimeout(() => {
      if (window.__firestoreExports && window.__firestoreExports.updateDoc) {
        sendAdminReply(feedbackId);
      } else {
        console.error('Firestore functions still not available');
        if (typeof showToast === 'function') showToast('Сервис временно недоступен');
      }
    }, 100);
    return;
  }
  
  const inp = document.getElementById('feedbackUserReplyText');
  const text = inp.value.trim();
  if (!text) {
    if (typeof showToast === 'function') showToast('Введите ответ');
    return;
  }
  
  try {
    await fx.updateDoc(fx.doc(window.db, "feedbacks", feedbackId), {
      messages: fx.arrayUnion({ 
        sender: 'admin', 
        senderId: window.currentUser.uid,
        text, 
        timestamp: new Date() 
      }),
      read: true, userRead: false
    });
    inp.value = '';
    if (typeof showToast === 'function') showToast('Ответ отправлен!');
  } catch (e) { 
    console.error(e); 
    if (typeof showToast === 'function') showToast('Ошибка: ' + e.message); 
  }
};

window.sendUserFeedbackReply = async function() {
  const fx = window.__firestoreExports;
  if (!fx || !fx.updateDoc || !fx.doc || !fx.arrayUnion) {
    // Если Firestore еще не готов, пробуем через 100мс еще раз
    setTimeout(() => {
      if (window.__firestoreExports && window.__firestoreExports.updateDoc) {
        sendUserFeedbackReply();
      } else {
        console.error('Firestore functions still not available');
        if (typeof showToast === 'function') showToast('Сервис временно недоступен');
      }
    }, 100);
    return;
  }
  
  const docId = document.getElementById('feedbackDocId').value;
  const text = document.getElementById('feedbackUserReplyText').value.trim();
  if (!text || !docId) return;
  
  try {
    await fx.updateDoc(fx.doc(window.db, "feedbacks", docId), {
      messages: fx.arrayUnion({ 
        sender: 'user', 
        senderId: window.currentUser.uid,
        text, 
        timestamp: new Date() 
      }),
      userRead: true, read: false
    });
    document.getElementById('feedbackUserReplyText').value = '';
    if (typeof showToast === 'function') showToast('Отправлено!');
  } catch (e) { 
    console.error(e); 
    if (typeof showToast === 'function') showToast('Ошибка'); 
  }
};

window.markFeedbackRead = async function(id) { 
  const fx = window.__firestoreExports;
  if (!fx || !fx.updateDoc || !fx.doc) {
    setTimeout(() => {
      if (window.__firestoreExports && window.__firestoreExports.updateDoc) {
        markFeedbackRead(id);
      }
    }, 100);
    return;
  }
  try { 
    await fx.updateDoc(fx.doc(window.db, "feedbacks", id), { read: true }); 
  } catch (e) { 
    console.error(e); 
  } 
};

window.deleteAdminFeedback = async function(id) { 
  const fx = window.__firestoreExports;
  if (!fx || !fx.deleteDoc || !fx.doc) {
    setTimeout(() => {
      if (window.__firestoreExports && window.__firestoreExports.deleteDoc) {
        deleteAdminFeedback(id);
      }
    }, 100);
    return;
  }
  if (!confirm('Удалить?')) return; 
  try { 
    await fx.deleteDoc(fx.doc(window.db, "feedbacks", id)); 
    if (typeof showToast === 'function') showToast('Удалено'); 
    if (typeof window.renderFeedbackList === 'function') window.renderFeedbackList(); 
  } catch (e) { 
    if (typeof showToast === 'function') showToast('Ошибка'); 
  } 
};

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
        
        // Отписываемся от слушателя уведомлений при выходе
        if (window.notificationsUnsubscribe) {
          window.notificationsUnsubscribe();
          window.notificationsUnsubscribe = null;
        }
        window.allNotifications = [];
        if (typeof window.updateNotificationBadge === 'function') {
          window.updateNotificationBadge();
        }
      } else {
        if (deskFP) deskFP.classList.remove('hidden');
        initFeedbacksListener(user.uid);
      }
      
      // Обновляем бейдж уведомлений при изменении авторизации
      if (typeof window.updateNotificationBadge === 'function') {
        window.updateNotificationBadge();
      }
      
      // Обновляем мобильную авторизацию при изменении состояния
      if (typeof window.syncAuth === 'function') {
        window.syncAuth();
      }
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

  // ═══════════════════════════════════════════════════════════
  // COMMON FUNCTIONS - Общие функции для всех страниц
  // ═══════════════════════════════════════════════════════════

  // Импортируем Firebase функции (если еще не импортированы)
  if (typeof window.collection === 'undefined') {
    // Firebase функции будут доступны после инициализации в основном файле
    console.log('🔧 Waiting for Firebase initialization...');
  }

  // Глобальные переменные для Firebase (будут установлены в основном файле)
  let collection, query, where, orderBy, limit, doc, getDoc, getDocs, addDoc, updateDoc, writeBatch, runTransaction, serverTimestamp, onSnapshot;

  // Функция инициализации Firebase экспортов
  window.initFirebaseExports = function(firebaseExports) {
    collection = firebaseExports.collection;
    query = firebaseExports.query;
    where = firebaseExports.where;
    orderBy = firebaseExports.orderBy;
    limit = firebaseExports.limit;
    doc = firebaseExports.doc;
    getDoc = firebaseExports.getDoc;
    getDocs = firebaseExports.getDocs;
    addDoc = firebaseExports.addDoc;
    updateDoc = firebaseExports.updateDoc;
    writeBatch = firebaseExports.writeBatch;
    runTransaction = firebaseExports.runTransaction;
    serverTimestamp = firebaseExports.serverTimestamp;
    onSnapshot = firebaseExports.onSnapshot;
    
    console.log('✅ Firebase exports initialized in header.js');
  };

  // Функция закрытия модального окна джекпота (как в wheel-of-fortune.html)
  window.closeJackpotWinner = function() {
    document.getElementById('jackpotWinnerOverlay').classList.remove('show');
  };

  // Функция закрытия модального окна уведомлений
  window.closeNotificationsModal = function() {
    const modal = document.getElementById('notificationsModalOverlay');
    if (modal) {
      modal.remove();
    }
  };

  // Функция отображения модального окна уведомлений (улучшенная версия)
  window.showNotifications = function() {
    if (!window.currentUser) { 
      if (typeof showToast === 'function') {
        showToast('Войдите'); 
      } else {
        alert('Войдите');
      }
      return; 
    }
    
    // Удаляем существующее модальное окно если есть
    const existingModal = document.getElementById('notificationsModalOverlay');
    if (existingModal) {
      existingModal.remove();
    }
    
    // Создаем модальное окно уведомлений
    const modal = document.createElement('div');
    modal.id = 'notificationsModalOverlay';
    modal.style.cssText = `
      position: fixed; 
      top: 0; 
      left: 0; 
      width: 100%; 
      height: 100%; 
      background: rgba(15,23,42,0.95); 
      z-index: 10000; 
      display: flex; 
      align-items: center; 
      justify-content: center;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
      background: linear-gradient(135deg, #1e293b, #0f172a);
      border: 2px solid rgba(34,211,238,0.3);
      border-radius: 20px;
      box-shadow: 0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(34,211,238,0.2);
      max-width: 600px; 
      width: 90%; 
      max-height: 80vh; 
      overflow-y: auto;
      padding: 24px;
    `;
    
    content.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h3 style="color: #22d3ee; font-size: 18px; font-weight: bold; display: flex; align-items: center; gap: 8px;">
          <i class="fas fa-bell"></i> ' + t('notifications') + '
        </h3>
        <button onclick="window.closeNotificationsModal()" style="background: none; border: none; color: #64748b; font-size: 24px; cursor: pointer; padding: 4px;">&times;</button>
      </div>
      
      <!-- Фильтры и кнопки управления -->
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid rgba(34,211,238,0.2);">
        <!-- Все -->
        <div style="position: relative;">
          <span id="unreadBadge-all" class="unread-filter-badge" style="position: absolute; top: -8px; right: -8px; background: #ef4444; color: white; border-radius: 50%; width: 18px; height: 18px; font-size: 10px; font-weight: bold; display: flex; align-items: center; justify-content: center; z-index: 10; border: 2px solid rgba(15,23,42,0.8);">0</span>
          <button onclick="filterNotifications('all')" class="filter-btn active" data-filter="all" style="background: rgba(34,211,238,0.2); border: 1px solid #22d3ee; color: #e2e8f0; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 500; cursor: pointer;">
            📋 Все <span id="filterCount-all" class="filter-count" style="background: rgba(255,255,255,0.15); color: #e2e8f0; padding: 1px 4px; border-radius: 3px; font-size: 10px; margin-left: 2px;">0</span>
          </button>
        </div>
        
        <!-- Игры -->
        <div style="position: relative;">
          <span id="unreadBadge-games" class="unread-filter-badge" style="position: absolute; top: -8px; right: -8px; background: #ef4444; color: white; border-radius: 50%; width: 18px; height: 18px; font-size: 10px; font-weight: bold; display: flex; align-items: center; justify-content: center; z-index: 10; border: 2px solid rgba(15,23,42,0.8);">0</span>
          <button onclick="filterNotifications('games')" class="filter-btn" data-filter="games" style="background: rgba(34,211,238,0.1); border: 1px solid rgba(34,211,238,0.3); color: #94a3b8; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 500; cursor: pointer;">
            🎮 ' + t('games') + ' <span id="filterCount-games" class="filter-count" style="background: rgba(255,255,255,0.1); color: #94a3b8; padding: 1px 4px; border-radius: 3px; font-size: 10px; margin-left: 2px;">0</span>
          </button>
        </div>
        
        <!-- Джекпот -->
        <div style="position: relative;">
          <span id="unreadBadge-jackpot_win" class="unread-filter-badge" style="position: absolute; top: -8px; right: -8px; background: #ef4444; color: white; border-radius: 50%; width: 18px; height: 18px; font-size: 10px; font-weight: bold; display: flex; align-items: center; justify-content: center; z-index: 10; border: 2px solid rgba(15,23,42,0.8);">0</span>
          <button onclick="filterNotifications('jackpot_win')" class="filter-btn" data-filter="jackpot_win" style="background: rgba(34,211,238,0.1); border: 1px solid rgba(34,211,238,0.3); color: #94a3b8; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 500; cursor: pointer;">
            🏆 ' + t('jackpot') + ' <span id="filterCount-jackpot_win" class="filter-count" style="background: rgba(255,255,255,0.1); color: #94a3b8; padding: 1px 4px; border-radius: 3px; font-size: 10px; margin-left: 2px;">0</span>
          </button>
        </div>
        
        <!-- Админ -->
        <div style="position: relative;">
          <span id="unreadBadge-admin" class="unread-filter-badge" style="position: absolute; top: -8px; right: -8px; background: #ef4444; color: white; border-radius: 50%; width: 18px; height: 18px; font-size: 10px; font-weight: bold; display: flex; align-items: center; justify-content: center; z-index: 10; border: 2px solid rgba(15,23,42,0.8);">0</span>
          <button onclick="filterNotifications('admin')" class="filter-btn" data-filter="admin" style="background: rgba(34,211,238,0.1); border: 1px solid rgba(34,211,238,0.3); color: #94a3b8; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 500; cursor: pointer;">
            🛡️ Админ <span id="filterCount-admin" class="filter-count" style="background: rgba(255,255,255,0.1); color: #94a3b8; padding: 1px 4px; border-radius: 3px; font-size: 10px; margin-left: 2px;">0</span>
          </button>
        </div>
        
        <!-- Кнопки управления -->
        <div style="margin-left: auto; display: flex; gap: 8px;">
          <button onclick="markFilteredNotificationsAsRead()" style="background: rgba(34,197,94,0.2); border: 1px solid rgba(34,197,94,0.3); color: #22c55e; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 500; cursor: pointer;">
            ✓ ' + t('notif_mark_all_read') + '
          </button>
          <button onclick="clearFilteredNotifications()" style="background: rgba(239,68,68,0.2); border: 1px solid rgba(239,68,68,0.3); color: #ef4444; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 500; cursor: pointer;">
            🗑️ ' + t('notif_clear_all') + '
          </button>
        </div>
      </div>
      
      <!-- Список уведомлений -->
      <div id="notificationsList" style="max-height: 400px; overflow-y: auto;">
        <div style="text-align: center; padding: 40px; color: #94a3b8;">
          <i class="fas fa-bell" style="font-size: 36px; opacity: 0.3; display: block; margin-bottom: 12px;"></i>
          ' + t('notif_loading') + '
        </div>
      </div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Добавляем обработчик закрытия по клику на фон
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        window.closeNotificationsModal();
      }
    });
    
    // Добавляем обработчик закрытия по ESC
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        const modal = document.getElementById('notificationsModalOverlay');
        if (modal) {
          window.closeNotificationsModal();
        }
      }
    };
    document.addEventListener('keydown', handleEscape);
    
    // Загружаем уведомления
    window.loadNotifications();
  };

  // Функция инициализации слушателя уведомлений в реальном времени
  window.initNotificationsListener = function(uid) {
    if (!window.db) return;
    
    // Используем window.__firestoreExports как в других функциях
    const fx = window.__firestoreExports;
    if (!fx || !fx.collection || !fx.query || !fx.where || !fx.orderBy || !fx.limit || !fx.onSnapshot) {
      console.error('Firestore functions not available for notifications listener');
      return;
    }
    
    // Отписываемся от предыдущего слушателя если есть
    if (window.notificationsUnsubscribe) {
      window.notificationsUnsubscribe();
      window.notificationsUnsubscribe = null;
    }
    
    const isAdmin = uid === "SAkz4mdW9reDaIsvqigCNZhEKJR2";
    
    try {
      let q;
      if (isAdmin) {
        q = fx.query(fx.collection(window.db, "notifications"), 
                     fx.orderBy('createdAt', 'desc'),
                     fx.limit(50));
      } else {
        q = fx.query(fx.collection(window.db, "notifications"), 
                     fx.where('userId', '==', uid),
                     fx.orderBy('createdAt', 'desc'),
                     fx.limit(50));
      }

      window.notificationsUnsubscribe = fx.onSnapshot(q, (snapshot) => {
        const items = [];
        snapshot.forEach((d) => {
          items.push({ id: d.id, ...d.data() });
        });

        items.sort((a, b) => (b.createdAt?.toDate() || new Date(b.createdAt || 0)) - (a.createdAt?.toDate() || new Date(a.createdAt || 0)));
        window.allNotifications = items;

        // Обновляем бейдж в реальном времени
        if (typeof window.updateNotificationBadge === 'function') {
          window.updateNotificationBadge();
        }

        // Обновляем рендер если модалка открыта
        if (typeof window.renderNotificationsInWheel === 'function') {
          window.renderNotificationsInWheel(items);
        }
      }, (err) => {
        console.error('Notifications listener error:', err);
        window.allNotifications = [];
        if (typeof window.updateNotificationBadge === 'function') {
          window.updateNotificationBadge();
        }
      });
    } catch(e) {
      console.error('Error init notifications listener:', e);
    }
  };

  // Функция загрузки уведомлений
  window.loadNotifications = async function() {
    if (!window.db || !window.currentUser) return;
    
    // Используем window.__firestoreExports как в других функциях
    const fx = window.__firestoreExports;
    if (!fx || !fx.collection || !fx.query || !fx.where || !fx.orderBy || !fx.limit || !fx.getDocs) {
      console.error('Firestore functions not available for notifications');
      return;
    }
    
    try {
      const notificationsCol = fx.collection(window.db, 'notifications');
      const q = fx.query(notificationsCol, 
                     fx.where('userId', '==', window.currentUser.uid),
                     fx.orderBy('createdAt', 'desc'),
                     fx.limit(50));
      
      const querySnapshot = await fx.getDocs(q);
      const notifications = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      window.allNotifications = notifications;
      if (typeof window.renderNotificationsInWheel === 'function') {
        window.renderNotificationsInWheel(notifications);
      }
      if (typeof window.updateNotificationBadge === 'function') {
        window.updateNotificationBadge();
      }
      
      // Дополнительное обновление бейджа через небольшую задержку
      setTimeout(() => {
        if (typeof window.updateNotificationBadge === 'function') {
          window.updateNotificationBadge();
        }
      }, 100);
      
    } catch (error) {
      console.error('Error loading notifications:', error);
      const listEl = document.getElementById('notificationsList');
      if (listEl) {
        listEl.innerHTML = `
          <div style="text-align: center; color: #ef4444; padding: 40px;">
            <i class="fas fa-exclamation-triangle" style="font-size: 24px; margin-bottom: 10px;"></i>
            <div>Ошибка загрузки уведомлений</div>
          </div>
        `;
      }
    }
  };

  // Функция форматирования времени
  window.formatNotificationDate = function(date) {
    if (!date) return '';
    
    const now = new Date();
    const notifDate = date.toDate ? date.toDate() : new Date(date);
    const diffMs = now - notifDate;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffSecs < 60) return 'только что';
    if (diffMins < 60) return diffMins + ' мин. назад';
    if (diffHours < 24) return diffHours + ' ч. назад';
    if (diffDays < 7) return diffDays + ' д. назад';
    
    return notifDate.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'short', 
      year: notifDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
    });
  };

  // Функция обновления бейджа уведомлений
  window.updateNotificationBadge = function() {
    // Ищем кнопку уведомлений
    const notificationBtn = document.querySelector('[onclick*="showNotifications"], button[onclick*="showNotifications"]');
    if (!notificationBtn) return;
    
    // Ищем существующий бейдж
    let badge = document.getElementById('notificationBadge');
    
    // Создаем бейдж если его нет
    if (!badge) {
      badge = document.createElement('span');
      badge.id = 'notificationBadge';
      badge.style.cssText = `
        position: absolute;
        top: -8px;
        right: -8px;
        background: #ef4444;
        color: white;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        font-size: 10px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        border: 2px solid rgba(15,23,42,0.8);
      `;
      
      // Добавляем бейдж к кнопке
      notificationBtn.style.position = 'relative';
      notificationBtn.appendChild(badge);
    }
    
    const unreadCount = (window.allNotifications || []).filter(n => !n.read).length;
    
    if (unreadCount > 0) {
      badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
      badge.classList.remove('hidden');
      badge.style.display = 'flex';
    } else {
      badge.classList.add('hidden');
      badge.style.display = 'none';
      badge.textContent = '0';
    }
  };

  // Функция рендеринга уведомлений с улучшенным отображением для разных типов
  window.renderNotificationsInWheel = function(notifications) {
    const listEl = document.getElementById('notificationsList');
    if (!listEl) return;

    if (notifications.length === 0) {
      listEl.innerHTML = `
        <div style="text-align: center; color: #94a3b8; padding: 40px;">
          <i class="fas fa-bell-slash" style="font-size: 24px; margin-bottom: 10px;"></i>
          <div>' + t('no_notifications') + '</div>
        </div>
      `;
      return;
    }

    listEl.innerHTML = notifications.map(notif => {
      const isUnread = !notif.read;
      let typeIcon = '📢';
      let typeLabel = t('notifications');
      let filterType = 'all';
      
      // Улучшенная логика отображения с конкретными названиями для разных типов
      if (notif.type === 'jackpot_win') {
        typeIcon = '🏆';
        typeLabel = t('jackpot');
        filterType = 'jackpot_win';
      } else if (notif.type === 'wheel_spin') {
        typeIcon = '🎡';
        typeLabel = t('wheel_fortune_type');
        filterType = 'games';
      } else if (notif.type === 'faucet_claim') {
        typeIcon = '💰';
        typeLabel = t('faucet_type');
        filterType = 'games';
      } else if (notif.type === 'game_reward' || (notif.type && notif.type.includes('game'))) {
        typeIcon = '🎰';
        typeLabel = t('game_type');
        filterType = 'games';
      } else if (notif.type === 'info') {
        typeIcon = 'ℹ️';
        typeLabel = t('info_type');
        filterType = 'admin';
      } else if (notif.type === 'success') {
        typeIcon = '✅';
        typeLabel = t('success_type');
        filterType = 'admin';
      } else if (notif.type === 'warning') {
        typeIcon = '⚠️';
        typeLabel = t('warning_type');
        filterType = 'admin';
      } else if (notif.type === 'promo') {
        typeIcon = '🎁';
        typeLabel = t('promo_type');
        filterType = 'admin';
      } else if (notif.type === 'referral') {
        typeIcon = '🔗';
        typeLabel = t('referral_type');
        filterType = 'admin';
      } else if (notif.type !== 'wheel_spin' && notif.type !== 'faucet_claim' && notif.type !== 'game_reward' && notif.type !== 'jackpot_win' && (!notif.type || !notif.type.includes('game'))) {
        typeIcon = '📢';
        typeLabel = t('system');
        filterType = 'admin';
      } else if (!notif.type) {
        typeIcon = '📢';
        typeLabel = t('notifications');
        filterType = 'all';
      } else {
        typeIcon = '📢';
        typeLabel = notif.type.charAt(0).toUpperCase() + notif.type.slice(1);
        filterType = 'all';
      }
      
      // Определяем цвет заголовка с исправленным синтаксисом
      let headerColor = '#22d3ee'; // синий по умолчанию
      if (notif.type === 'jackpot_win') {
        headerColor = '#22c55e'; // зеленый
      } else if (notif.type === 'warning') {
        headerColor = '#f59e0b'; // оранжевый
      } else if (notif.type === 'success') {
        headerColor = '#22c55e'; // зеленый
      }
      
      return `
        <div style="background: rgba(30,37,56,0.6); border: 1px solid ${isUnread ? 'rgba(34,211,238,0.4)' : 'rgba(34,211,238,0.2)'}; 
                  border-radius: 12px; padding: 16px; margin-bottom: 12px; 
                  ${isUnread ? 'border-left: 3px solid #22d3ee;' : ''} 
                  ${notif.type === 'jackpot_win' ? 'cursor: pointer; transition: all 0.3s;' : ''}" 
                  data-notif-id="${notif.id}" 
                  data-filter-type="${filterType}"
                  ${notif.type === 'jackpot_win' ? `onclick="window.showJackpotWinnerFromNotification({id: '${notif.id}', userId: '${notif.userId || ''}', winnerName: '${notif.winnerName || ''}', amount: '${notif.amount || '0'}', message: '${notif.message || ''}'})"` : ''}>
          
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
            <h4 style="color: ${headerColor}; font-size: 14px; font-weight: 600; margin: 0;">
              ${typeIcon} ${typeLabel} ${notif.type === 'info' || notif.type === 'success' || notif.type === 'warning' || notif.type === 'promo' || notif.type === 'referral' ? '<span style="color: #64748b; font-size: 12px;">(📢 Система)</span>' : ''}
              ${notif.type === 'jackpot_win' ? '<span style="margin-left: 8px; font-size: 12px; color: #22c55e;">🎉 Нажмите для подробностей</span>' : ''}
            </h4>
            ${isUnread ? '<span style="background: #22d3ee; color: #0f172a; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold;">NEW</span>' : ''}
          </div>
          
          <p style="color: #f1f5f9; font-size: 13px; line-height: 1.4; margin: 0 0 8px 0;">${notif.message}</p>
          <p style="color: #64748b; font-size: 11px; margin: 0;">${window.formatNotificationDate(notif.createdAt)}</p>
          
          ${isUnread && notif.type !== 'jackpot_win' ? 
            `<button onclick="event.stopPropagation(); window.markNotificationAsReadWheel('${notif.id}')" 
                     style="background: rgba(34,211,238,0.2); border: 1px solid #22d3ee; color: #22d3ee; 
                            cursor: pointer; font-size: 11px; padding: 4px 8px; border-radius: 4px; margin-top: 8px;">
              Отметить как прочитанное
            </button>` : ''}
        </div>
      `;
    }).join('');
    
    window.updateNotificationBadge();
    window.updateFilterCounts();
  };

  // Функция обновления счетчиков фильтров (100% как в wheel-of-fortune.html)
  window.updateFilterCounts = function(notifications) {
    const notifs = notifications || window.allNotifications || [];
    const counts = {
      all: notifs.length,
      games: notifs.filter(n => n.type === 'wheel_spin' || n.type === 'faucet_claim' || n.type === 'game_reward' || (n.type && n.type.includes('game'))).length,
      jackpot_win: notifs.filter(n => n.type === 'jackpot_win').length,
      admin: notifs.filter(n => n.type !== 'wheel_spin' && n.type !== 'faucet_claim' && n.type !== 'game_reward' && n.type !== 'jackpot_win' && (!n.type || !n.type.includes('game'))).length
    };
    
    const unreadCounts = {
      all: notifs.filter(n => !n.read).length,
      games: notifs.filter(n => (n.type === 'wheel_spin' || n.type === 'faucet_claim' || n.type === 'game_reward' || (n.type && n.type.includes('game'))) && !n.read).length,
      jackpot_win: notifs.filter(n => n.type === 'jackpot_win' && !n.read).length,
      admin: notifs.filter(n => n.type !== 'wheel_spin' && n.type !== 'faucet_claim' && n.type !== 'game_reward' && n.type !== 'jackpot_win' && (!n.type || !n.type.includes('game')) && !n.read).length
    };
    
    // Обновляем счетчики на кнопках
    Object.keys(counts).forEach(filter => {
      const countEl = document.getElementById(`filterCount-${filter}`);
      if (countEl) {
        countEl.textContent = counts[filter];
      }
    });
    
    // Обновляем бейджи непрочитанных
    Object.keys(unreadCounts).forEach(filter => {
      const badgeEl = document.getElementById(`unreadBadge-${filter}`);
      if (badgeEl) {
        badgeEl.textContent = unreadCounts[filter];
        badgeEl.style.display = unreadCounts[filter] > 0 ? 'flex' : 'none';
      }
    });
  };

  // Функция фильтрации уведомлений (100% как в wheel-of-fortune.html)
  window.filterNotifications = function(type) {
    const notifications = window.allNotifications || window.notifications || [];
    console.log('🔍 Filter notifications:', type, 'Total notifications:', notifications.length);
    console.log('🔍 All notifications types:', notifications.map(n => ({ id: n.id, type: n.type, message: n.message?.substring(0, 30) })));
    
    let filtered = notifications;
    
    if (type !== 'all') {
      if (type === 'games') {
        // Все игровые уведомления (колесо, краны, будущие игры)
        filtered = notifications.filter(n => {
          const isGame = n.type === 'wheel_spin' || 
                        n.type === 'faucet_claim' || 
                        n.type === 'game_reward' ||
                        (n.type && n.type.includes('game'));
          console.log('🎮 Game check for', n.id, n.type, '=>', isGame);
          return isGame;
        });
      } else if (type === 'admin') {
        // Все админские уведомления (рассылки, поощрения, ответы, и все что не игры и не джекпот)
        filtered = notifications.filter(n => {
          const isNotGame = n.type !== 'wheel_spin' && 
                           n.type !== 'faucet_claim' && 
                           n.type !== 'game_reward' &&
                           n.type !== 'jackpot_win' &&
                           (!n.type || !n.type.includes('game'));
          console.log('🛡️ Admin check for', n.id, n.type, '=>', isNotGame);
          return isNotGame;
        });
      } else {
        // Конкретный тип
        filtered = notifications.filter(n => n.type === type);
        console.log('🎯 Specific type check for', type, '=>', filtered.length);
      }
    }
    
    console.log('🔍 Filtered result:', filtered.length, 'items');
    
    // Сохраняем текущий фильтр и отфильтрованные данные
    window.currentFilter = type;
    window.filteredNotifications = filtered;
    
    // Обновляем стили кнопок
    document.querySelectorAll('.filter-btn').forEach(btn => {
      if (btn.dataset.filter === type) {
        btn.style.background = 'rgba(34,211,238,0.2)';
        btn.style.borderColor = '#22d3ee';
        btn.style.color = '#e2e8f0';
        // Обновляем цвет счетчика
        const countEl = btn.querySelector('.filter-count');
        if (countEl) {
          countEl.style.background = 'rgba(255,255,255,0.15)';
          countEl.style.color = '#e2e8f0';
        }
      } else {
        btn.style.background = 'rgba(34,211,238,0.1)';
        btn.style.borderColor = 'rgba(34,211,238,0.3)';
        btn.style.color = '#94a3b8';
        // Обновляем цвет счетчика
        const countEl = btn.querySelector('.filter-count');
        if (countEl) {
          countEl.style.background = 'rgba(255,255,255,0.1)';
          countEl.style.color = '#94a3b8';
        }
      }
    });
    
    // Обновляем счетчики
    window.updateFilterCounts(notifications);
    
    // Мгновенно перерисовываем уведомления (не перезаписывая оригинальный массив)
    window.renderNotificationsInWheel(filtered);
  };

  // Функция отметки уведомления как прочитанного
  window.markNotificationAsReadWheel = async function(notificationId) {
    if (!window.db) return;
    
    // Используем window.__firestoreExports как в других функциях
    const fx = window.__firestoreExports;
    if (!fx || !fx.updateDoc || !fx.doc || !fx.serverTimestamp || !fx.increment) {
      console.error('Firestore functions not available for marking as read');
      return;
    }
    
    try {
      // Находим уведомление для получения broadcastId
      const notif = window.allNotifications ? window.allNotifications.find(n => n.id === notificationId) : null;
      
      // Обновляем уведомление как прочитанное
      await fx.updateDoc(fx.doc(window.db, 'notifications', notificationId), {
        read: true,
        readAt: fx.serverTimestamp()
      });
      
      // Если уведомление связано с рассылкой, обновляем счетчик просмотров
      if (notif && notif.broadcastId) {
        await fx.updateDoc(fx.doc(window.db, 'broadcasts', notif.broadcastId), {
          viewCount: fx.increment(1)
        });
      }
      
      // Обновляем локальные данные
      if (window.allNotifications) {
        const localNotif = window.allNotifications.find(n => n.id === notificationId);
        if (localNotif) localNotif.read = true;
      }
      
      // Обновляем UI
      if (typeof window.updateNotificationBadge === 'function') {
        window.updateNotificationBadge();
      }
      if (typeof window.updateFilterCounts === 'function') {
        window.updateFilterCounts();
      }
      
      const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
      if (typeof window.filterNotifications === 'function') {
        window.filterNotifications(activeFilter);
      }
      
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Функция отметки отфильтрованных уведомлений как прочитанных
  window.markFilteredNotificationsAsRead = async function() {
    if (!window.db || !window.allNotifications || !window.currentUser) return;
    
    const currentFilter = window.currentFilter || 'all';
    let notifications = window.allNotifications;
    
    if (currentFilter === 'all') {
      // Обычный пользователь может отмечать только свои уведомления
      if (window.currentUser.uid !== ADMIN_UID) {
        notifications = window.allNotifications.filter(n => n.userId === window.currentUser.uid && !n.read);
      } else {
        notifications = window.allNotifications.filter(n => !n.read);
      }
    } else if (currentFilter === 'games') {
      notifications = window.allNotifications.filter(n => n.type === 'wheel_spin' || n.type === 'faucet_claim' || n.type === 'game_reward' || (n.type && n.type.includes('game')));
    } else if (currentFilter === 'jackpot_win') {
      notifications = window.allNotifications.filter(n => n.type === 'jackpot_win');
    } else if (currentFilter === 'admin') {
      notifications = window.allNotifications.filter(n => n.type !== 'wheel_spin' && n.type !== 'faucet_claim' && n.type !== 'game_reward' && n.type !== 'jackpot_win' && (!n.type || !n.type.includes('game')));
    }
    
    // Дополнительная фильтрация для обычного пользователя - только свои уведомления
    if (window.currentUser.uid !== ADMIN_UID) {
      notifications = notifications.filter(n => n.userId === window.currentUser.uid);
    }
    
    if (notifications.length === 0) {
      if (typeof showToast === 'function') {
        showToast('Нет уведомлений для отметки');
      }
      return;
    }
    
    try {
      const batch = writeBatch(window.db);
      
      notifications.forEach(notif => {
        batch.update(doc(window.db, 'notifications', notif.id), {
          read: true,
          readAt: serverTimestamp()
        });
      });
      
      await batch.commit();
      
      notifications.forEach(notif => {
        const localNotif = window.allNotifications.find(n => n.id === notif.id);
        if (localNotif) localNotif.read = true;
      });
      
      window.updateNotificationBadge();
      window.updateFilterCounts();
      
      // Обновляем текущий фильтр
      window.filterNotifications(currentFilter);
      
      if (typeof showToast === 'function') {
        showToast(`Отмечено как прочитанные: ${notifications.length} уведомлений`);
      }
      
    } catch (error) {
      console.error('Error marking filtered notifications as read:', error);
      if (typeof showToast === 'function') {
        showToast('Ошибка при отметке уведомлений');
      }
    }
  };

  // Функция очистки отфильтрованных уведомлений
  window.clearFilteredNotifications = async function() {
    if (!window.db || !window.allNotifications || !window.currentUser) return;
    
    const currentFilter = window.currentFilter || 'all';
    let notifications = window.allNotifications;
    
    if (currentFilter === 'all') {
      // Обычный пользователь может удалять только свои уведомления
      if (window.currentUser.uid !== ADMIN_UID) {
        notifications = window.allNotifications.filter(n => n.userId === window.currentUser.uid);
      } else {
        notifications = window.allNotifications;
      }
    } else if (currentFilter === 'games') {
      notifications = window.allNotifications.filter(n => n.type === 'wheel_spin' || n.type === 'faucet_claim' || n.type === 'game_reward' || (n.type && n.type.includes('game')));
    } else if (currentFilter === 'jackpot_win') {
      notifications = window.allNotifications.filter(n => n.type === 'jackpot_win');
    } else if (currentFilter === 'admin') {
      notifications = window.allNotifications.filter(n => n.type !== 'wheel_spin' && n.type !== 'faucet_claim' && n.type !== 'game_reward' && n.type !== 'jackpot_win' && (!n.type || !n.type.includes('game')));
    }
    
    // Дополнительная фильтрация для обычного пользователя - только свои уведомления
    if (window.currentUser.uid !== ADMIN_UID) {
      notifications = notifications.filter(n => n.userId === window.currentUser.uid);
    }
    
    if (notifications.length === 0) {
      if (typeof showToast === 'function') {
        showToast('Нет уведомлений для очистки');
      }
      return;
    }
    
    if (!confirm(`Удалить ${notifications.length} уведомлений?`)) {
      return;
    }
    
    try {
      const batch = writeBatch(window.db);
      
      notifications.forEach(notif => {
        batch.delete(doc(window.db, 'notifications', notif.id));
      });
      
      await batch.commit();
      
      // Удаляем из локального массива
      notifications.forEach(notif => {
        const index = window.allNotifications.findIndex(n => n.id === notif.id);
        if (index > -1) {
          window.allNotifications.splice(index, 1);
        }
      });
      
      window.updateNotificationBadge();
      window.updateFilterCounts();
      
      // Мгновенно обновляем текущий фильтр
      window.filterNotifications(currentFilter);
      
      if (typeof showToast === 'function') {
        showToast(`Удалено: ${notifications.length} уведомлений`);
      }
      
    } catch (error) {
      console.error('Error clearing notifications:', error);
      if (typeof showToast === 'function') {
        showToast('Ошибка при удалении уведомлений');
      }
    }
  };

  // Функция для отображения модального окна выигрыша джекпота из уведомлений (100% как в wheel-of-fortune.html)
  window.showJackpotWinnerFromNotification = async function(notification) {
    try {
      // Сначала закрываем модальное окно уведомлений
      const notificationsModal = document.getElementById('notificationsModalOverlay');
      if (notificationsModal) {
        notificationsModal.remove();
      }
      
      // Получаем данные пользователя
      let winnerName = notification.winnerName || t('jackpot_default_user');
      let winnerAvatar = '';
      
      if (notification.userId) {
        try {
          const userSnap = await getDoc(doc(window.db, 'users', notification.userId));
          if (userSnap.exists()) {
            const userData = userSnap.data();
            winnerName = userData.displayName || userData.email || notification.userId.substring(0, 8) + '...';
            winnerAvatar = userData.photoURL || userData.avatarUrl || '';
            
            console.log('👤 User data loaded:', { winnerName, winnerAvatar: winnerAvatar ? 'exists' : 'none' });
          }
        } catch (userError) {
          console.warn('Error loading user data:', userError);
        }
      }
      
      // Проверяем есть ли элемент jackpotWinnerOverlay на странице
      let overlay = document.getElementById('jackpotWinnerOverlay');
      
      // Если нет оверлея, создаем его как в wheel-of-fortune.html
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'jackpotWinnerOverlay';
        overlay.className = 'jackpot-winner-overlay';
        overlay.setAttribute('onclick', 'if(event.target===this)closeJackpotWinner()');
        
        // Добавляем CSS стили как в wheel-of-fortune.html
        const style = document.createElement('style');
        style.textContent = `
          .jackpot-winner-overlay {
            display: none; 
            position: fixed; 
            inset: 0; 
            z-index: 9000;
            background: rgba(0,0,0,.92); 
            backdrop-filter: blur(14px);
            align-items: center; 
            justify-content: center; 
            padding: 20px;
          }
          .jackpot-winner-overlay.show { 
            display: flex; 
            animation: fadeIn .5s; 
          }
          @keyframes fadeIn { 
            from { opacity: 0; } 
            to { opacity: 1; } 
          }
          .jackpot-winner-card {
            width: 100%; 
            max-width: 500px; 
            border-radius: 28px; 
            padding: 40px 32px; 
            text-align: center;
            background: linear-gradient(145deg, rgba(236,72,153,.2), rgba(139,92,246,.2));
            border: 2px solid rgba(236,72,153,.7);
            animation: jackpotPopIn .6s cubic-bezier(.34,1.56,.64,1);
          }
          @keyframes jackpotPopIn { 
            from { 
              transform: scale(.6) rotate(-5deg); 
              opacity: 0; 
            } 
            to { 
              transform: scale(1) rotate(0deg); 
              opacity: 1; 
            } 
          }
        `;
        document.head.appendChild(style);
        
        // HTML как в wheel-of-fortune.html
        overlay.innerHTML = `
          <div class="jackpot-winner-card">
            <div style="font-size:60px;margin-bottom:10px;">🏆</div>
            <div style="font-size:13px;color:#ec4899;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-bottom:12px;">' + t('jackpot_winner_title') + '</div>
            <img id="jwAvatar" src="" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid #ec4899;margin:0 auto 12px;display:block;" onerror="this.style.display='none'">
            <div style="font-size:22px;font-weight:900;color:white;margin-bottom:6px;" id="jwName">—</div>
            <div style="font-size:38px;font-weight:900;background:linear-gradient(135deg,#ec4899,#8b5cf6);background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:16px;" id="jwAmount">0 RGT</div>
            <p style="font-size:12px;color:var(--text-secondary);margin:0 0 20px;">' + t('jackpot_congratulations') + '</p>
            <button onclick="closeJackpotWinner()" style="padding:10px 28px;background:linear-gradient(135deg,#ec4899,#8b5cf6);border:none;border-radius:12px;color:white;font-weight:700;font-size:13px;cursor:pointer;">' + t('jackpot_close_button') + '</button>
          </div>
        `;
        
        document.body.appendChild(overlay);
      }
      
      // Обновляем элементы
      const nameElement = document.getElementById('jwName');
      const amountElement = document.getElementById('jwAmount');
      const avatarElement = document.getElementById('jwAvatar');
      
      if (nameElement) nameElement.textContent = winnerName;
      if (amountElement) amountElement.textContent = (notification.amount || '0') + ' RGT';
      
      if (avatarElement) {
        if (winnerAvatar) {
          avatarElement.src = winnerAvatar;
          avatarElement.style.display = 'block';
          avatarElement.onerror = function() {
            this.style.display = 'none';
            console.log('🖼️ Avatar failed to load, hiding');
          };
          console.log('🖼️ Avatar set to:', winnerAvatar);
        } else {
          avatarElement.style.display = 'none';
          console.log('🖼️ No avatar, hiding element');
        }
      }
      
      // Показываем оверлей с z-index как в wheel-of-fortune.html
      overlay.classList.add('show');
      console.log('🎯 Jackpot overlay shown with z-index: 9000');
      
      // Запускаем конфетти
      if (typeof launchConfetti === 'function') {
        setTimeout(() => launchConfetti(80), 300);
      }
      
      // Автоматически помечаем уведомление как прочитанное
      if (notification.id && typeof window.markNotificationAsReadWheel === 'function') {
        window.markNotificationAsReadWheel(notification.id);
      }
      
    } catch (error) {
      console.error('Error showing jackpot winner from notification:', error);
    }
  };

  // Функция инициализации слушателя уведомлений
  window.initNotificationsListener = function(userId) {
    if (!window.db) return;
    
    try {
      const notificationsCol = collection(window.db, 'notifications');
      const q = query(notificationsCol, 
                     where('userId', '==', userId),
                     orderBy('createdAt', 'desc'),
                     limit(50));
      
      return onSnapshot(q, (snapshot) => {
        const notifications = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        window.allNotifications = notifications;
        window.updateNotificationBadge();
        window.updateFilterCounts();
        
        // Если модальное окно открыто, обновляем его
        if (document.getElementById('notificationsModalOverlay')) {
          const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
          window.filterNotifications(activeFilter);
        } else {
          window.renderNotificationsInWheel(notifications);
        }
        
        // Проверяем есть ли непрочитанные уведомления
        const unreadCount = notifications.filter(n => !n.read).length;
        if (unreadCount > 0) {
          console.log(`🔔 У вас ${unreadCount} непрочитанных уведомлений`);
        }
      }, (error) => {
        console.error('Error listening to notifications:', error);
      });
    } catch (error) {
      console.error('Error initializing notifications listener:', error);
      return null;
    }
  };

  // Функция обновления пользовательского интерфейса
  window.updateUserUI = function(user) {
    const ava = document.getElementById('userAvatar');
    const name = document.getElementById('userName');
    const mobAva = document.getElementById('mobUserAvatar');
    const mobOut = document.getElementById('mobLoggedOutView');
    const mobInn = document.getElementById('mobLoggedInView');
    
    if (user) {
      if (ava) ava.src = user.photoURL || 'https://www.gravatar.com/avatar/?d=mp';
      if (name) name.textContent = user.displayName || (user.email ? user.email.split('@')[0] : 'Researcher');
      if (mobAva) mobAva.src = user.photoURL || 'https://www.gravatar.com/avatar/?d=mp';
      if (mobOut) mobOut.style.display = 'none';
      if (mobInn) mobInn.style.display = 'flex';
    } else {
      if (ava) ava.src = 'https://www.gravatar.com/avatar/?d=mp';
      if (name) name.textContent = 'Guest';
      if (mobAva) mobAva.src = 'https://www.gravatar.com/avatar/?d=mp';
      if (mobOut) mobOut.style.display = 'flex';
      if (mobInn) mobInn.style.display = 'none';
    }
  };

  // Функция показа toast уведомления
  window.showToast = function(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed; bottom: 20px; right: 20px; z-index: 30000;
      padding: 12px 20px; border-radius: 8px; color: white;
      font-weight: 500; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      transform: translateX(100%); transition: transform 0.3s ease;
      max-width: 300px; word-wrap: break-word;
    `;
    
    // Цвета в зависимости от типа
    const colors = {
      success: 'linear-gradient(135deg, #22c55e, #16a34a)',
      error: 'linear-gradient(135deg, #ef4444, #dc2626)',
      warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
      info: 'linear-gradient(135deg, #22d3ee, #06b6d4)'
    };
    
    toast.style.background = colors[type] || colors.info;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Анимация появления
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Автоматическое скрытие
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  };

  // Автоматическая инициализация при загрузке страницы
  document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем слушатель уведомлений если пользователь уже авторизован
    if (window.currentUser && window.db) {
      window.initNotificationsListener(window.currentUser.uid);
    }
  });

  // Алиасы для совместимости с index.html
  window.showNotificationsFromHeader = window.showNotifications;
  window.closeNotificationsModalFromHeader = window.closeNotificationsModal;

  console.log('🔧 Common functions loaded in header.js!');
})();
