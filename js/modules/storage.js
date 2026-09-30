// Módulo de Gerenciamento do Web Storage (localStorage)
export function salvarVoluntario(dados) {
    localStorage.setItem('voluntario_cadastro', JSON.stringify(dados));
}

export function obterVoluntario() {
    const dados = localStorage.getItem('voluntario_cadastro');
    return dados ? JSON.parse(dados) : null;
}

export function restaurarHistoricoVoluntario() {
    const voluntario = obterVoluntario();
    if (voluntario) {
        const containerFeedback = document.getElementById('mensagem-feedback');
        if (containerFeedback) {
            containerFeedback.innerHTML = `
                <div class="alert alert-success">
                    <p><strong>Cadastro ativo encontrado:</strong> Olá, ${voluntario.nome}! Seu registro já consta em nosso sistema local.</p>
                </div>
            `;
        }
    }
}