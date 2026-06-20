/**
 * Renders a list of project/tool card data objects into a grid container.
 *
 * Item shape:
 * {
 *   icon: 'fa-solid fa-layer-group',   // icon class for the card's folder icon
 *   title: 'Card Title',
 *   description: 'Card description text.',
 *   tags: ['Tag One', 'Tag Two'],
 *   links: [{ href, label, icon, external }],  // top-right icon links
 *   accent: false,    // true = use the teal accent color scheme (matches Tools cards)
 *   isTool: false,    // true = adds .tool-card styling
 *   onclick: null      // optional JS string for the whole card (e.g. window.open(...))
 * }
 */
function renderCards(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = items.map((item, index) => {
        const delay = (index % 6) + 1;
        const cardClasses = ['project-card', 'reveal', `reveal-delay-${delay}`];
        if (item.isTool) cardClasses.push('tool-card');

        const cardAttrs = [];
        if (item.onclick) {
            cardAttrs.push(`onclick="${item.onclick}"`);
            cardAttrs.push('style="cursor:pointer;"');
        }

        const iconStyle = item.accent
            ? ' style="background: linear-gradient(135deg, rgba(0,212,170,0.12), rgba(124,92,250,0.12)); border-color: rgba(0,212,170,0.2); color: var(--accent);"'
            : '';

        const links = (item.links || []).map(link => {
            const target = link.external ? ' target="_blank" rel="noopener noreferrer"' : '';
            const stop = item.onclick ? ' onclick="event.stopPropagation();"' : '';
            return `<a href="${link.href}"${target} aria-label="${link.label}"${stop}><i class="${link.icon}"></i></a>`;
        }).join('');

        const tags = (item.tags || []).map(tag => {
            const tagStyle = item.accent
                ? ' style="color:var(--accent); background:rgba(0,212,170,0.08); border-color:rgba(0,212,170,0.2);"'
                : '';
            return `<span class="tag"${tagStyle}>${tag}</span>`;
        }).join('');

        return `
            <div class="${cardClasses.join(' ')}" ${cardAttrs.join(' ')}>
                <div class="project-card-top-bar"></div>
                <div class="project-card-body">
                    <div class="project-card-icon-row">
                        <div class="project-folder-icon"${iconStyle}><i class="${item.icon}"></i></div>
                        <div class="project-card-links">${links}</div>
                    </div>
                    <h3 class="project-title">${item.title}</h3>
                    <p class="project-description">${item.description}</p>
                    <div class="project-tags">${tags}</div>
                </div>
            </div>
        `;
    }).join('');
}
