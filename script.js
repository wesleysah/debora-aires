// E-mail que recebe as mensagens do formulário de contato.
const EMAIL_CONTATO = "contato@deboraaires.com.br";

const irParaContato = () => document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" });

// Menu mobile
const menuButton = document.querySelector(".mobile-menu-button");
const mobileNav = document.querySelector(".mobile-nav");

function setMenu(aberto) {
  mobileNav.hidden = !aberto;
  menuButton.setAttribute("aria-expanded", String(aberto));
  menuButton.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  menuButton.querySelector(".icon-menu").toggleAttribute("hidden", aberto);
  menuButton.querySelector(".icon-x").toggleAttribute("hidden", !aberto);
}

menuButton.addEventListener("click", () => setMenu(mobileNav.hidden));
mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

// Botões que levam ao contato
document.querySelectorAll("[data-contato]").forEach((botao) =>
  botao.addEventListener("click", () => {
    setMenu(false);
    irParaContato();
  })
);

// Perguntas frequentes: uma aberta por vez, a primeira começa aberta
const faqItems = [...document.querySelectorAll(".faq-item")];

function abrirFaq(indice) {
  faqItems.forEach((item, i) => {
    const aberto = i === indice;
    item.classList.toggle("is-open", aberto);
    item.querySelector("button").setAttribute("aria-expanded", String(aberto));
    item.querySelector("p").hidden = !aberto;
    item.querySelector("use").setAttribute("href", aberto ? "#i-minus" : "#i-plus");
  });
}

faqItems.forEach((item, i) =>
  item.querySelector("button").addEventListener("click", () => abrirFaq(item.classList.contains("is-open") ? -1 : i))
);
abrirFaq(0);

// Formulário: abre o e-mail com a mensagem pronta
const form = document.querySelector(".contact-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const dados = new FormData(form);
  const nome = String(dados.get("name") ?? "").trim();
  const mensagem = String(dados.get("message") ?? "").trim();
  const assunto = encodeURIComponent(`Conversa inicial — ${nome || "novo contato"}`);
  const corpo = encodeURIComponent(`${mensagem}\n\nNome: ${nome}`);
  window.location.href = `mailto:${EMAIL_CONTATO}?subject=${assunto}&body=${corpo}`;
  form.querySelector(".form-feedback").hidden = false;
});

document.querySelector("[data-ano]").textContent = new Date().getFullYear();
