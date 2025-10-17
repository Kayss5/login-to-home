  (function () {
    'use strict';

    // ---------- Cache de seletores ----------
    const SELECTORS = {
      toggleBtn: '#toggleSidebar',
      sidebar: '.sidebar',
      plusBtn: '.fa-plus',
      modal: '#modal',
      closeModal: '#closeModal',
      addFuncBtn: '#addFuncBtn',
      funcNameInput: '#funcName',
      itemList: '.item-list',
      menuItems: '.menu-item',
      menuLinks: '.menu a[data-target]',
      sections: '.content-section',
      pageTitle: '#page-title',
      loader: '#loader'
    };

    // Elementos (populados na inicialização)
    const el = {};

    // ---------- Funções utilitárias ----------
    /** Seleciona e retorna um elemento, com fallback para null */
    function $(selector) {
      return document.querySelector(selector);
    }

    /** Seleciona e retorna NodeList */
    function $all(selector) {
      return document.querySelectorAll(selector);
    }

    // ---------- Handlers e lógica ----------
    function toggleSidebar() {
      if (!el.toggleBtn || !el.sidebar) return;
      el.toggleBtn.addEventListener('click', () => {
        el.sidebar.classList.toggle('active');
      });
    }

    function setupMenuNavigation() {
      const menuItems = el.menuItems;
      const menuLinks = el.menuLinks;
      const sections = el.sections;
      const pageTitle = el.pageTitle;

      if (!menuItems || !menuLinks || !sections || !pageTitle) return;

      // Principal: clique em item para abrir submenu e alternar seção
      menuItems.forEach(item => {
        const anchor = item.querySelector('a');
        if (!anchor) return;

        // Ao clicar no anchor, alterna o estado do menu. Se já estiver aberto, fecha.
        anchor.addEventListener('click', (e) => {
          e.preventDefault();

          // Se já estiver aberto, fecha; caso contrário, abre e fecha os outros
          const isOpen = item.classList.contains('open');
          if (isOpen) {
            item.classList.remove('open');
            return; // já estava aberto: fecha e não altera seção
          }

          // Abre este e fecha os demais
          menuItems.forEach(i => i.classList.remove('open'));
          if (menuItems) {}
          item.classList.add('open');

          // Se houver target, atualiza título e exibe seção
          const target = anchor.getAttribute('data-target');
          if (target) {
            pageTitle.textContent = anchor.textContent.trim();
            menuLinks.forEach(l => l.classList.remove('active'));
            anchor.classList.add('active');

            sections.forEach(section => section.style.display = 'none');
            const targetSection = document.getElementById(target);
            if (targetSection) targetSection.style.display = 'flex';
          }
        });

        // Para permitir fechar o menu clicando em qualquer parte do item (não só no anchor),
        // escutamos clicks no próprio .menu-item e ignoramos clicks que já vieram do anchor
        item.addEventListener('click', (e) => {
          // Se o clique foi no <a> ou em um de seus filhos, deixamos o handler do anchor tratar
          if (e.target.closest('a')) return;

          // Toggle: se estiver aberto fecha, se fechado abre (fechando os outros)
          const isOpen = item.classList.contains('open');
          if (isOpen) {
            item.classList.remove('open');
          } else {
            menuItems.forEach(i => i.classList.remove('open'));
            item.classList.add('open');
          }
        });
      });

      // Garante que qualquer link com data-target faça navegação
      menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = link.getAttribute('data-target');
          if (!target) return;

          // Atualiza título e ativa o link
          pageTitle.textContent = link.textContent.trim();
          menuLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');

          // Abre o menu pai correspondente
          const parentItem = link.closest('.menu-item');
          if (parentItem) {
            menuItems.forEach(i => i.classList.remove('open'));
            parentItem.classList.add('open');
          }

          // Mostra a seção alvo e esconde as outras
          sections.forEach(section => section.style.display = 'none');
          const targetSection = document.getElementById(target);
          if (targetSection) {
            targetSection.style.display = 'flex';
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });

      // Fecha menus se clicar fora
      document.addEventListener('click', (e) => {
        const isClickInside = e.target.closest('.menu-item');
        if (!isClickInside) {
          menuItems.forEach(item => item.classList.remove('open'));
        }
      });
    }

    function setupLoader() {
      const loader = el.loader;
      if (!loader) return;
      window.addEventListener('load', () => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
      });
    }

    function setupModal() {
      const plusBtn = el.plusBtn;
      const modal = el.modal;
      const closeModal = el.closeModal;
      const addFuncBtn = el.addFuncBtn;
      const funcNameInput = el.funcNameInput;
      const itemList = el.itemList;

      if (plusBtn && modal && funcNameInput) {
        plusBtn.addEventListener('click', () => {
          modal.style.display = 'flex';
          funcNameInput.value = '';
          funcNameInput.focus();
        });
      }

      if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
          modal.style.display = 'none';
        });
      }

      // Adicionar nova função à lista
      if (addFuncBtn && funcNameInput && itemList && modal) {
        addFuncBtn.addEventListener('click', () => {
          const name = funcNameInput.value.trim();
          if (!name) return;

          const newItem = document.createElement('div');
          newItem.className = 'item';
          newItem.innerHTML = `\n          <div class="circle pink"></div>\n          <div class="item-info">\n            <strong>${escapeHtml(name)}</strong>\n            <p>Classe dos dados: <span>Personalizado</span></p>\n          </div>\n        `;
          itemList.appendChild(newItem);
          modal.style.display = 'none';
        });
      }
    }

    // Pequena função para escapar texto inserido pelo usuário (evita XSS simples)
    function escapeHtml(str) {
      return str.replace(/[&<>"']/g, (c) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[c]));
    }

    // ---------- Inicialização ----------
    function init() {
      // Popula elementos no objeto el (cache)
      Object.keys(SELECTORS).forEach((key) => {
        const sel = SELECTORS[key];
        // para NodeList usamos $all quando apropriado
        if (key === 'menuItems' || key === 'menuLinks' || key === 'sections') {
          el[key] = $all(sel);
        } else {
          el[key] = $(sel);
        }
      });

      // Executa configurações
      toggleSidebar();
      setupMenuNavigation();
      setupLoader();
      setupModal();
    }

    // Executa init quando DOM pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }

  })();
