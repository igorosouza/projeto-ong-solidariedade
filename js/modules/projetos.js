// Módulo de Projetos (Model e Templates)
export const projetosData = [
    {
        titulo: "Projeto Educação para Todos",
        imagem: "imagens/projeto-educacao.jpg",
        alt: "Crianças em aula de reforço escolar",
        descricao: "Oferecemos reforço escolar, oficinas de leitura e cursos de informática básica para crianças e jovens em situação de vulnerabilidade social."
    },
    {
        titulo: "Projeto Cozinha Comunitária",
        imagem: "imagens/impacto-pessoas.jpg",
        alt: "Famílias sendo atendidas pela ONG",
        descricao: "Distribuição diária de refeições nutritivas e oficinas de capacitação profissional na área de culinária e panificação."
    },
    {
        titulo: "Projeto Futuro Verde",
        imagem: "imagens/projeto-verde.jpg",
        alt: "Voluntários em horta comunitária",
        descricao: "Hortas comunitárias e conscientização ambiental, promovendo a sustentabilidade e a integração de moradores urbanos."
    }
];

export function gerarCardsProjetos() {
    return projetosData.map(p => `
        <article class="projeto-card">
            <h3>${p.titulo}</h3>
            <img src="${p.imagem}" alt="${p.alt}">
            <p>${p.descricao}</p>
        </article>
    `).join('');
}