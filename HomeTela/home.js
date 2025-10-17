
  const toggleBtn = document.getElementById('toggleSidebar');
  const sidebar = document.querySelector('.sidebar');
  const plusBtn = document.querySelector('.fa-plus');
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('closeModal');
  const addFuncBtn = document.getElementById('addFuncBtn');
  const funcNameInput = document.getElementById('funcName');
  const itemList = document.querySelector('.item-list');

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });

document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.menu-item');
  const menuLinks = document.querySelectorAll('.menu a[data-target]');
  const sections = document.querySelectorAll('.content-section');
  const pageTitle = document.getElementById('page-title');

  // Clique em item principal para abrir submenu e alternar seção
  menuItems.forEach(item => {
    const anchor = item.querySelector('a');

    anchor.addEventListener('click', (e) => {
      e.preventDefault(); // impedir comportamento padrão do link

      // Alternar submenu
      const isOpen = item.classList.contains('open');
      menuItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');

      // Atualiza título e seção apenas se tiver data-target
      const target = anchor.getAttribute('data-target');
      if (target) {
        pageTitle.textContent = anchor.textContent.trim();

        menuLinks.forEach(l => l.classList.remove('active'));
        anchor.classList.add('active');

        sections.forEach(section => section.style.display = 'none');
        const targetSection = document.getElementById(target);
        if (targetSection) {
          targetSection.style.display = 'flex';
        }
      }
    });
  });

// Adicionado: garante que qualquer link com data-target faça a navegação real
menuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('data-target');
    if (!target) return;

    //Atualiza título e marca ativo
    pageTitle.textContent = link.textContent.trim();
    menuLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    //Abre o menu pai correspondente
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


document.addEventListener('click', (e) => {
  const isClickInside = e.target.closest('.menu-item');
  if (!isClickInside) {
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('open'));
  }
});

window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 500);
  }
});

// Abrir modal
plusBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
  funcNameInput.value = '';
  funcNameInput.focus();
});

// Fechar modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Adicionar nova função
  addFuncBtn.addEventListener('click', () => {
    const name = funcNameInput.value.trim();
    if (!name) return;

    const newItem = document.createElement('div');
    newItem.className = 'item';
    newItem.innerHTML = `
      <div class="circle pink"></div>
      <div class="item-info">
        <strong>${name}</strong>
        <p>Classe dos dados: <span>Personalizado</span></p>
      </div>
    `;
    itemList.appendChild(newItem);
    modal.style.display = 'none';
  });
});
