const favicon = document.createElement('link');
favicon.rel = 'icon';
favicon.type = 'image/png';
favicon.href = 'assets/favicon.png';
document.head.appendChild(favicon);

// Privacy-first tag loading: GTM is not requested until optional cookies are accepted.
window.dataLayer = window.dataLayer || [];
const consentKey = 'bk_nexus_cookie_consent_v1';
function loadGtm() {
  if (window.__bkGtmLoaded) return;
  window.__bkGtmLoaded = true;
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-TMPS857Z';
  document.head.appendChild(script);
}
function setCookieConsent(choice) {
  localStorage.setItem(consentKey, choice);
  window.dataLayer.push({ event: 'cookie_consent_update', cookie_consent: choice });
  if (choice === 'accepted') loadGtm();
  document.querySelector('[data-cookie-banner]')?.remove();
}
function showCookieBanner() {
  if (document.querySelector('[data-cookie-banner]')) return;
  document.body.insertAdjacentHTML('afterbegin', `<aside class="cookie-banner" data-cookie-banner role="dialog" aria-labelledby="cookie-title"><div><h2 id="cookie-title">Privacy settings</h2><p>With your permission, we use optional analytics and marketing technologies. <a href="cookie-policy.html">Learn more</a> or change your choice anytime.</p></div><div class="cookie-actions"><button type="button" class="button secondary" data-cookie-reject>Reject optional</button><button type="button" class="button" data-cookie-accept>Accept optional</button></div></aside>`);
  document.querySelector('[data-cookie-reject]').addEventListener('click', () => setCookieConsent('rejected'));
  document.querySelector('[data-cookie-accept]').addEventListener('click', () => setCookieConsent('accepted'));
}
const savedConsent = localStorage.getItem(consentKey);
if (savedConsent === 'accepted') loadGtm();
else if (!savedConsent) showCookieBanner();
document.addEventListener('click', (event) => {
  if (event.target.closest('[data-cookie-settings]')) {
    event.preventDefault();
    localStorage.removeItem(consentKey);
    showCookieBanner();
  }
});

const menuButton = document.querySelector('[data-menu-button]');
const nav = document.querySelector('[data-nav]');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}

const productData = {
  knitwear: { title: 'Knitwear', intro: 'Everyday essentials and elevated knit styles developed for comfort, fit, and repeatable quality.', items: ['T-Shirts', 'Polo Shirts', 'Sweatshirts', 'Hoodies', 'Joggers', 'Loungewear', 'Tank Tops', 'Knit Dresses', 'Leggings', 'Fashion Knits'] },
  woven: { title: 'Woven Apparel', intro: 'Structured and lightweight woven categories for casual, formal, and fashion collections.', items: ['Casual Shirts', 'Formal Shirts', 'Blouses', 'Dresses', 'Trousers', 'Shorts', 'Skirts', 'Jumpsuits', 'Uniforms', 'Workwear'] },
  sweaters: { title: 'Sweaters', intro: 'Fine- and heavy-gauge knitwear with considered yarn, stitch, silhouette, and finishing choices.', items: ['Pullovers', 'Cardigans', 'Turtlenecks', 'Crewnecks', 'Vests', 'Fine-Gauge Sweaters', 'Chunky Knits', 'Jacquard Sweaters'] },
  denim: { title: 'Denim', intro: 'Core and fashion denim supported by the right construction, wash, and finishing capability.', items: ['Jeans', 'Denim Jackets', 'Denim Shirts', 'Denim Dresses', 'Denim Skirts', 'Denim Shorts', 'Dungarees', 'Fashion Denim'] },
  outerwear: { title: 'Outerwear', intro: 'Purposeful seasonal layers, from lightweight shells to padded and performance-led jackets.', items: ['Lightweight Jackets', 'Puffer Jackets', 'Parkas', 'Vests', 'Windbreakers', 'Bomber Jackets', 'Rain Jackets', 'Quilted Outerwear'] },
  kidswear: { title: 'Kidswear', intro: 'Comfort-focused clothing for babies, toddlers, and children across knit, woven, and outerwear.', items: ['Baby Sets', 'T-Shirts', 'Sweatshirts', 'Hoodies', 'Dresses', 'Joggers', 'Schoolwear', 'Jackets', 'Sleepwear', 'Seasonal Sets'] },
  workwear: { title: 'Workwear', intro: 'Durable, functional apparel developed for demanding workplaces, professional teams, and uniform programs.', items: ['Work Shirts', 'Cargo Trousers', 'Coveralls', 'Safety Vests', 'Utility Jackets', 'Medical Scrubs', 'Chef Uniforms', 'Corporate Uniforms'] },
  nightwear: { title: 'Nightwear', intro: 'Comfort-led sleep and lounge styles developed with soft materials, relaxed fits, and considered finishing.', items: ['Pajama Sets', 'Nightshirts', 'Robes', 'Lounge Sets', 'Sleep Dresses', 'Shorts Sets', 'Kids Pajamas', 'Thermal Sleepwear'] },
  sportswear: { title: 'Sportswear', intro: 'Performance and athleisure products designed around movement, comfort, function, and modern styling.', items: ['Performance T-Shirts', 'Training Shorts', 'Tracksuits', 'Leggings', 'Sports Bras', 'Jerseys', 'Running Jackets', 'Gym Hoodies'] }
};

const tabsContainer = document.querySelector('.product-tabs');
if (tabsContainer) {
  tabsContainer.innerHTML = Object.entries(productData).map(([key, value]) => `<button class="product-tab" type="button" role="tab" data-product-tab="${key}">${value.title}</button>`).join('');
}
const tabs = document.querySelectorAll('[data-product-tab]');
const title = document.querySelector('[data-product-title]');
const intro = document.querySelector('[data-product-intro]');
const grid = document.querySelector('[data-product-grid]');
const categoryImages = {
  knitwear: 'https://irp.cdn-website.com/b15302b4/dms3rep/multi/16.jpg',
  woven: 'https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?fm=jpg&ixlib=rb-4.1.0&q=85&w=1600',
  sweaters: 'https://www.peregrineclothing.co.uk/cdn/shop/files/Peregrine_A_W_Products_19_09_24_0139.jpg?v=1730456853&width=1600',
  denim: 'https://jamtrading.jp/blogs/wp-content/uploads/jam/horie/2020/05/95569670_1443835379122290_210496264943265614_n.jpg',
  outerwear: 'https://boutiqueengland.com/cdn/shop/articles/pexels-mart-production-7679725_1.jpg?v=1685555091',
  kidswear: 'https://cdn.prod.website-files.com/641eada4b0bfffd36ddfe298/646df332a3703e451bc5ed24_priwinkle-about-mission.jpg',
  workwear: 'https://healthandsafetyshopping.co.za/cdn/shop/files/Dromexutility-jacket-carbon_800x1026_crop_center%402x.jpg?v=1735660567',
  nightwear: 'https://cdn.dsmcdn.com/ty1603/prod/QC/20241115/16/2b09a321-ec25-38f6-bd31-297e4a9c032b/1_org_zoom.jpg',
  sportswear: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1600&q=85'
};
const itemImages = {
  knitwear: {
    'T-Shirts': 'https://cdn.clothbase.com/uploads/2240e7c5-0b21-49e7-b6a7-755fbbaee36b/211798F009023_3.jpg',
    'Polo Shirts': 'https://www.carolinamade.com/prodimg/zoom/437FJNA.png',
    'Sweatshirts': 'https://files.bcart.jp/sloth-ethical/uploads/product_img/DF1401/DF4101_8.jpg',
    'Hoodies': 'https://chebtf.ru/upload/iblock/ef9/ef963509cea84352b873a8ade744b2be.jpg',
    'Joggers': 'https://dfcdn.defacto.com.tr/6/T5987AZ_24SP_BK81_03_01.jpg',
    'Loungewear': 'https://mediahub.debenhams.com/m5056747461531_light%20beige_xl.jpeg',
    'Tank Tops': 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1715736915-.jpg?crop=0.833xw%3A1xh%3Bcenter%2Ctop&resize=980%3A%2A',
    'Knit Dresses': 'https://www.yellowsubtrading.co.za/cdn/shop/files/ad37890f-3520-4933-b931-ba2fcf6a0ca9_555d002d-0cf6-46d2-96fc-c2e727f689ec.jpg?v=1775135965',
    'Leggings': 'https://www.yellowsubtrading.co.za/cdn/shop/files/WhatsAppImage2025-04-24at13.14.09_d0707804.jpg?v=1761389842',
    'Fashion Knits': 'https://www.meshki.com.au/cdn/shop/files/250324_MESHKI_HertiageFinal_13_651.jpg?v=1776378146&width=1946'
  },
  woven: {
    'Casual Shirts': 'https://www.toadandco.com/cdn/shop/files/T2002204-Oatmeal-1.jpg?crop=center&height=2430&v=1735947643&width=1620',
    'Formal Shirts': 'https://twelvebd.com/cdn/shop/products/MT-FOS-TM23-04F-192_18_600x600.jpg?v=1679900494',
    'Blouses': 'https://www.mschcopenhagen.de/shared/68/51/msch-copenhagen-mschibina-romina-shirt_1190x1488c.jpg',
    'Dresses': 'https://www.lookegarment.com/cdn/shop/files/DRESSES_f3fce8c2-02b8-4e60-b85d-ee262f43d373_800x.jpg?v=1685073988',
    'Trousers': 'https://www.yellowsubtrading.co.za/cdn/shop/files/67e96ef8-ad81-4544-90f8-94c18bd50b4f_2b93c986-7e91-458b-90ce-df5f5092dbfc.jpg?v=1773911672',
    'Shorts': 'https://www.nobodyschild.com/cdn/shop/files/NC_WEB_B251809BLK_11.jpg?v=1745848815&width=800',
    'Skirts': 'https://cdn.dsmcdn.com/ty1498/product/media/images/prod/QC/20240822/14/18a10f9d-0487-3f9c-bb61-d628d65a857f/1_org_zoom.jpg',
    'Jumpsuits': 'https://i.pinimg.com/originals/0b/06/ac/0b06ac8c2a8b90eb174bf46fc019ab75.jpg',
    'Uniforms': 'https://www.companyfits.nl/assets/uploads/images/_seo/Service_Apotheek_-1.png',
    'Workwear': 'https://imogeneandwillie.com/cdn/shop/collections/greenClarke_01.jpg?v=1740676820'
  },
  sweaters: {
    'Pullovers': 'https://i8.amplience.net/i/manor/10002416978_01',
    'Cardigans': 'https://www.oliver-charles.com/cdn/shop/files/NAVY-BLUE-ASS-CSP-Female-Front-1.jpg?v=1773942109&width=4000',
    'Turtlenecks': 'https://me.zegna.com/media/catalog/product/2/2/22504681-2.jpg',
    'Crewnecks': 'https://www.bellacanvas.com/img/3345_ff_lp.jpg',
    'Vests': 'https://lsco.scene7.com/is/image/lsco/A85060000-front-pdp?fit=crop%2C1&fmt=jpeg&hei=2500&op_usm=0.6%2C0.6%2C8&qlt=70&resMode=sharp2&wid=2000',
    'Fine-Gauge Sweaters': 'https://cdn.shoplightspeed.com/shops/613211/files/66432356/xirena-crewe-sweater-cream.jpg',
    'Chunky Knits': 'https://nesha.com.ua/photos/SW_OKWG_.jpg',
    'Jacquard Sweaters': 'https://cdn-m2.essentiel-antwerp.com/IRELANDO__I1OW__002.jpg?format=webp'
  },
  denim: {
    'Jeans': 'https://media.glamour.es/photos/66979766aaa5a923429ca62d/master/pass/GettyImages-1976118219.jpg',
    'Denim Jackets': 'https://wildfloras.in/storage/denim-guide-720x720.png',
    'Denim Shirts': 'https://www.urbanofashion.com/cdn/shop/files/shirtdentowl-02-lblue.jpg?v=1783522862',
    'Denim Dresses': 'https://imagescdn.simons.ca/images/17022-244873-40-A1_2/la-robe-sans-manches-denim-delave.jpg?__=6',
    'Denim Skirts': 'https://img01.ztat.net/article/spp-media-p1/857c32365c1e4e64911cb01a8a531716/d48755bbf81d4d15b6674f568dd5c36c.jpg?imwidth=762',
    'Denim Shorts': 'https://mediahub.prettylittlething.com/cnm3436_mid%20blue%20wash_xl?dpr=1&fit=cvr&h=720&qlt=70&w=480',
    'Dungarees': 'https://blackhorselane.com/cdn/shop/files/DSC03034.jpg',
    'Fashion Denim': 'https://cutelycovered.com/cdn/shop/files/preview_images/6N3A9293_620x.jpg?v=1756627868'
  },
  outerwear: {
    'Lightweight Jackets': 'https://images.quince.com/9xmoHs6zrpdElABiHxEiE/b1ad961054f4fcf085b6ea979b2c33ae/W-JKT-163-HTGOLV-12246_EDITED_1.jpg?h=2000&q=50&reqOrigin=website-ssg&w=1600',
    'Puffer Jackets': 'https://cdn.shopify.com/s/files/1/1326/1029/files/T6FM4074PRT_BLACK_8082.jpg?v=1777986128',
    'Parkas': 'https://www.mysport.lv/media/catalog/product/cache/cea34a15ae510fa90cbd425588142f9d/4/8/48.png',
    'Vests': 'https://imgproxy.frackend.net/cdn-cgi/image/format%3Dauto%2Cwidth%3D1000/https%3A/tshirtstore.centracdn.net/client/dynamic/images/9816_680b88d0c1-aw24_dag3-0894-ded-zoom.jpg',
    'Windbreakers': 'https://static.feber.se/article_images/47/09/66/470966_1280.jpg',
    'Bomber Jackets': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=85',
    'Rain Jackets': 'https://images.unsplash.com/photo-1525457136159-8878648a7ad0?auto=format&fit=crop&w=1000&q=85',
    'Quilted Outerwear': 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=1000&q=85'
  },
  kidswear: {
    'Baby Sets': 'https://shop.cozynursery.com/cdn/shop/products/product-image-1561947002_480x480.jpg?v=1607441268',
    'T-Shirts': 'https://img01.ztat.net/article/spp-media-p1/e47a54c0b30d4cbe9c7df5c6db563cfc/356456b516a4402995141e7a7675eabb.jpg?imwidth=762',
    'Sweatshirts': 'https://www.vertbaudet.com/fstrz/r/s/media.vertbaudet.com/Pictures/vertbaudet/1116713/basics-sweatshirt-with-motif-for-girls.jpg?width=457',
    'Hoodies': 'https://stockfamily.it/wp-content/uploads/2021/11/colorato-e-stiloso.jpg',
    'Dresses': 'https://www.loveshackfancy.com/cdn/shop/files/DECKERDRESS-CONFETTIBLOOM-GD084-2414_0007.jpg?v=1738101996&width=700',
    'Joggers': 'https://www.playgroundoriginals.com/cdn/shop/articles/streetwearxplaywear3-07.png?v=1756144874',
    'Schoolwear': 'https://s.alicdn.com/%40sc04/kf/U9dd50d5701e445c5918a789f22e88eecS.png',
    'Jackets': 'https://static.sinsay.com/media/catalog/product/cache/850/a4e40ebdc3e371adff845072e1c73f37/7/7/7773C-59X-008-1-845316.jpg',
    'Sleepwear': 'https://turquaz.co.uk/cdn/shop/files/Pink_and_white_striped_pure_cotton_pyjamas_for_kids_by_TurQuaz.jpg?v=1723845115&width=1946',
    'Seasonal Sets': 'https://roarsome.com/cdn/shop/files/OliverGodboldPhoto2025_48A1671.jpg?v=1764345641'
  },
  workwear: {
    'Work Shirts': 'https://everythingaustralian.com.au/media/catalog/product/cache/858b93d0975243b3121adbe566b9856f/y/0/y07590-1.jpg',
    'Cargo Trousers': 'https://media.rueducommerce.fr/mktp/product/productImage/11/67/8f42945fe254435eb4f427cd1c1be0d4.webp',
    'Coveralls': 'https://www.safetyplus.co.uk/cdn/shop/collections/pw452.jpg?v=1681472370',
    'Safety Vests': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=85',
    'Utility Jackets': 'https://healthandsafetyshopping.co.za/cdn/shop/files/Dromexutility-jacket-carbon_800x1026_crop_center%402x.jpg?v=1735660567',
    'Medical Scrubs': 'https://barcomade.com/cdn/shop/files/GRST011_905_001_2048x.jpg?v=1702588671',
    'Chef Uniforms': 'https://www.radyum.com.tr/images/demoImg/asci-demo-3.jpg',
    'Corporate Uniforms': 'https://products.trangvangvietnam.com/395714482/dp%20vest%201.jpg'
  },
  nightwear: {
    'Pajama Sets': 'https://cdn.dsmcdn.com/ty1603/prod/QC/20241115/16/2b09a321-ec25-38f6-bd31-297e4a9c032b/1_org_zoom.jpg',
    'Nightshirts': 'https://oliviavonhalle.com/cdn/shop/files/Olivia-von-Halle-Poppy-Navy-Nightshirt-in-Silk-Satin-CT0040-1.jpg?v=1717600317&width=2000',
    'Robes': 'https://bio-textiles.ru/upload/iblock/bc0/831a2kprz6mynpi5xe4h8n1xr78vfpo2/c95a54fe_cde2_11ea_8686_00259033748b_ba0c2d88_2e7e_11ed_bf7e_00259033748b.resize1.jpg',
    'Lounge Sets': 'https://mediahub.debenhams.com/m5056747461531_light%20beige_xl.jpeg',
    'Sleep Dresses': 'https://fishersfinery.com/cdn/shop/files/Womens_Short_Sleeve_Nightgown-042_Sea_Glass-Main_1200x1800.jpg?v=1717610359',
    'Shorts Sets': 'https://i5.walmartimages.com/asr/617c4671-3dfc-4db6-a88b-156633b33b2f.03080bb29c010507c9b0c45921807087.jpeg?odnBg=FFFFFF&odnHeight=612&odnWidth=612',
    'Kids Pajamas': 'https://www.homebodii.com/cdn/shop/products/S71-PetraModalKids-NavyWhitePiping-21118-Homebodii-0524.jpg?v=1625884778',
    'Thermal Sleepwear': 'https://i5.walmartimages.com/seo/LAVRA-Girl-s-Cotton-Thermal-Sets-Fleece-Lined-Insulated-Long-John-Pajama-Underwear-for-Girls-2-Piece-Waffle-Knit-Thermal-Top-and-Botton-Set_3cb38777-79bf-44f1-b9b8-3bcc072cc490.d040cb453a52f95265d8ceab0c23381e.jpeg'
  },
  sportswear: {
    'Performance T-Shirts': 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1000&q=85',
    'Training Shorts': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=85',
    'Tracksuits': 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85',
    'Leggings': 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1000&q=85',
    'Sports Bras': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=85',
    'Jerseys': 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1000&q=85',
    'Running Jackets': 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1000&q=85',
    'Gym Hoodies': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=85'
  }
};
const localFallback = {
  kidswear: 'assets/outerwear-kidswear.png',
  outerwear: 'assets/outerwear-kidswear.png',
  nightwear: 'assets/outerwear-kidswear.png',
  default: 'assets/product-range.png'
};
function photoFor(key, item, index) {
  return itemImages[key]?.[item] || categoryImages[key] || localFallback.default;
}
function showProduct(key) {
  const data = productData[key];
  if (!data || !grid) return;
  tabs.forEach(tab => {
    const active = tab.dataset.productTab === key;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
  });
  title.textContent = data.title;
  intro.textContent = data.intro;
  const heroPhoto = document.querySelector('[data-product-hero]');
  if (heroPhoto) {
    heroPhoto.src = categoryImages[key];
    heroPhoto.alt = `${data.title} apparel collection`;
    heroPhoto.onerror = () => { heroPhoto.onerror = null; heroPhoto.src = localFallback[key] || localFallback.default; };
  }
  const fallback = localFallback[key] || localFallback.default;
  grid.innerHTML = data.items.map((item, index) => `<article class="product-item"><img src="${photoFor(key, item, index)}" data-fallback="${fallback}" onerror="this.onerror=null;this.src=this.dataset.fallback" alt="Model wearing ${item}" loading="lazy" referrerpolicy="no-referrer"><div class="product-item-copy"><span>${String(index + 1).padStart(2, '0')}</span><h3>${item}</h3><p>Development, material, production, and quality support.</p></div></article>`).join('');
  history.replaceState(null, '', `#${key}`);
}
tabs.forEach(tab => tab.addEventListener('click', () => showProduct(tab.dataset.productTab)));
if (grid) showProduct(location.hash.slice(1) in productData ? location.hash.slice(1) : 'knitwear');

const homeCategoryGrid = [...document.querySelectorAll('.category-grid')].find(element => element.querySelector('a[href^="products.html#"]'));
if (homeCategoryGrid) {
  [
    ['workwear', 'W', 'Workwear', 'Work shirts, uniforms, utility layers, and professional apparel.'],
    ['nightwear', 'N', 'Nightwear', 'Pajamas, robes, lounge sets, and sleep essentials.'],
    ['sportswear', 'S', 'Sportswear', 'Performance, training, team, and athleisure products.']
  ].forEach(([key, letter, name, description]) => {
    homeCategoryGrid.insertAdjacentHTML('beforeend', `<a class="category-card" href="products.html#${key}" data-letter="${letter}"><h3>${name}</h3><p>${description}</p><span class="link">Explore category →</span></a>`);
  });
}

const partnerVisual = document.querySelector('.visual-panel img[alt="BK Nexus brand mark"]');
if (partnerVisual) {
  partnerVisual.src = 'assets/apparel-production.png';
  partnerVisual.alt = 'Apparel production team in Bangladesh';
  partnerVisual.parentElement.classList.add('production-visual');
}

document.querySelectorAll('.footer').forEach(footer => {
  const brandCopy = footer.querySelector('.footer-grid > div:first-child p');
  if (brandCopy) brandCopy.innerHTML = `Your Apparel Business Partner.<span class="footer-contact"><span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2a8 8 0 0 0-8 8c0 5.7 8 12 8 12s8-6.3 8-12a8 8 0 0 0-8-8Zm0 11.2A3.2 3.2 0 1 1 12 6.8a3.2 3.2 0 0 1 0 6.4Z"/></svg><span class="footer-address">House 983 (3B), I Block, Road No. 15, Bashundhara R/A, Dhaka-1229, Bangladesh</span></span><a href="tel:+8801302331199"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6.6 10.8a15.7 15.7 0 0 0 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.2 1.3.4 2.7.7 4.2.7.7 0 1.2.5 1.2 1.2v3.9c0 .7-.5 1.2-1.2 1.2C10.4 22 2 13.6 2 3.2 2 2.5 2.5 2 3.2 2h4c.6 0 1.1.5 1.1 1.2 0 1.5.3 2.9.7 4.2.1.4 0 .9-.3 1.2l-2.1 2.2Z"/></svg>+880 1302-331199</a><a href="mailto:info@bknexusbd.com"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13Zm2.2-.5L12 11.1 19.8 5H4.2ZM20 7.1l-7.4 5.8a1 1 0 0 1-1.2 0L4 7.1v11.4c0 .3.2.5.5.5h15c.3 0 .5-.2.5-.5V7.1Z"/></svg>info@bknexusbd.com</a></span>`;
  const columns = footer.querySelectorAll('.footer-grid > div');
  const companyColumn = columns[1];
  const productsColumn = columns[2];
  const connectColumn = columns[3];
  if (companyColumn) companyColumn.innerHTML = `<h3>Company</h3><div class="footer-links"><a href="about.html">About</a><a href="capabilities.html">Capabilities</a><a href="quality.html">Quality &amp; Compliance</a><a href="contact.html">Contact</a></div>`;
  if (productsColumn) productsColumn.innerHTML = `<h3>Products</h3><div class="footer-links footer-products"><a href="products.html#knitwear">Knitwear</a><a href="products.html#woven">Woven</a><a href="products.html#sweaters">Sweaters</a><a href="products.html#denim">Denim</a><a href="products.html#outerwear">Outerwear</a><a href="products.html#kidswear">Kidswear</a><a href="products.html#workwear">Workwear</a><a href="products.html#nightwear">Nightwear</a><a href="products.html#sportswear">Sportswear</a></div>`;
  if (connectColumn) connectColumn.innerHTML = `<h3>Social Channels</h3><div class="social-icons"><a href="https://wa.me/8801302331199" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><svg viewBox="0 0 24 24"><path d="M12.04 2a9.84 9.84 0 0 0-8.47 14.82L2 22l5.32-1.52A9.97 9.97 0 1 0 12.04 2Zm0 17.85a8 8 0 0 1-4.08-1.12l-.3-.18-3.16.9.91-3.08-.2-.31a7.84 7.84 0 1 1 6.83 3.79Zm4.4-5.89c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2a7.25 7.25 0 0 1-1.35-1.68c-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z"/></svg></a><a href="https://www.linkedin.com/company/bk-nexus/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M5.2 7.1A2.1 2.1 0 1 0 5.2 3a2.1 2.1 0 0 0 0 4.1ZM3.4 21h3.7V9H3.4v12Zm5.9 0H13v-5.9c0-1.55.3-3.05 2.22-3.05 1.9 0 1.93 1.78 1.93 3.15V21h3.7v-6.55c0-3.22-.7-5.7-4.46-5.7-1.8 0-3.01.99-3.5 1.93h-.05V9H9.3v12Z"/></svg></a><a href="https://web.facebook.com/BKNexusBD" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.03 4.39 11.03 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.79-4.7 4.53-4.7 1.31 0 2.69.24 2.69.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07Z"/></svg></a><a href="https://www.instagram.com/bk_nexus" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm10.5 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg></a></div>`;
  const bottom = footer.querySelector('.footer-bottom');
  if (bottom) bottom.innerHTML = `<span>Copyright © 2026 BK Nexus, a concern of BK Nexus Limited. All rights reserved.</span><span class="legal-links"><a href="privacy-policy.html">Privacy</a><a href="cookie-policy.html">Cookies</a><a href="legal-notice.html">Legal Notice</a><a href="terms.html">Terms</a><a href="#" data-cookie-settings>Cookie Settings</a></span>`;
});

document.querySelectorAll('.topbar').forEach(topbar => topbar.remove());

document.querySelectorAll('.feature p').forEach(paragraph => {
  if (paragraph.textContent.trim().startsWith('House 983')) paragraph.textContent = 'House 983 (3B), I Block, Road No. 15, Bashundhara R/A, Dhaka-1229, Bangladesh';
});

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

const projectForm = document.querySelector('[data-project-form]');
if (projectForm) {
  projectForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!projectForm.reportValidity()) return;
    const data = new FormData(projectForm);
    if (data.get('_honey')) return;
    const submittedAt = projectForm.querySelector('[data-submitted-at]');
    if (submittedAt) {
      submittedAt.value = new Date().toISOString();
      data.set('submitted_at', submittedAt.value);
    }
    if (!data.has('marketing_consent')) data.set('marketing_consent', 'No, not granted');
    const enquiryType = projectForm.classList.contains('contact-enquiry-form') ? 'Contact Enquiry' : 'Project Enquiry';
    const subjectParts = [`New BK Nexus ${enquiryType}`, data.get('company') || data.get('name'), data.get('country')].filter(Boolean);
    data.set('_subject', subjectParts.join(' — '));
    const button = projectForm.querySelector('[data-submit-button]');
    const status = projectForm.querySelector('[data-form-status]');
    const originalLabel = button.textContent;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    button.disabled = true;
    button.textContent = 'Submitting…';
    status.className = 'form-status';
    status.textContent = '';
    try {
      const response = await fetch('https://formsubmit.co/ajax/info@bknexusbd.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
        signal: controller.signal
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === false) throw new Error('Submission failed');
      projectForm.reset();
      status.className = 'form-status is-visible is-success';
      status.textContent = 'Thank you. Your enquiry has been submitted successfully. Our team will contact you soon.';
    } catch (error) {
      status.className = 'form-status is-visible is-error';
      status.textContent = error.name === 'AbortError'
        ? 'The request took too long. Please check your connection and try again.'
        : 'We could not submit your enquiry right now. Please try again or email info@bknexusbd.com.';
    } finally {
      clearTimeout(timeout);
      button.disabled = false;
      button.textContent = originalLabel;
    }
  });
}
