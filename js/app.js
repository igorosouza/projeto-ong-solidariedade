// Importação dos Módulos ES6
import { gerarCardsProjetos } from './modules/projetos.js';
import { salvarVoluntario, restaurarHistoricoVoluntario } from './modules/storage.js';
import { aplicarMascaras } from './modules/mascaras.js';

// Controller Principal de Roteamento SPA
function rotear() {
    const container = document.getElementById('app-main');
    if (!container) return;

    const hash = window.location.hash || '#inicio';

    if (hash === '#projetos') {
        container.innerHTML = `
            <section id="projetos-lista">
                <h2>Nossas Iniciativas Sociais</h2>
                <p>Conheça os projetos ativos que transformam comunidades diariamente.</p>
                ${gerarCardsProjetos()}
            </section>
        `;
    } else if (hash === '#cadastro') {
        container.innerHTML = `
            <section id="cadastro-container">
                <h2>Seja um Voluntário</h2>
                <p>Preencha o formulário abaixo para fazer parte da nossa equipe de transformação social.</p>

                <div id="mensagem-feedback"></div>

                <form id="form-cadastro">
                    <fieldset>
                        <legend>Dados Pessoais</legend>
                        <p>
                            <label for="nome">Nome Completo:</label><br>
                            <input type="text" id="nome" name="nome" required minlength="3" placeholder="Digite seu nome completo">
                        </p>
                        <p>
                            <label for="email">E-mail:</label><br>
                            <input type="email" id="email" name="email" required placeholder="seuemail@exemplo.com">
                        </p>
                        <p>
                            <label for="data-nascimento">Data de Nascimento:</label><br>
                            <input type="date" id="data-nascimento" name="data-nascimento" required>
                        </p>
                        <p>
                            <label for="cpf">CPF:</label><br>
                            <input type="text" id="cpf" name="cpf" required pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" maxlength="14" placeholder="000.000.000-00">
                        </p>
                        <p>
                            <label for="telefone">Telefone / Celular:</label><br>
                            <input type="tel" id="telefone" name="telefone" required pattern="\\(\\d{2}\\) \\d{4,5}-\\d{4}" maxlength="15" placeholder="(11) 98765-4321">
                        </p>
                    </fieldset>

                    <fieldset>
                        <legend>Endereço de Residência</legend>
                        <p>
                            <label for="cep">CEP:</label><br>
                            <input type="text" id="cep" name="cep" required pattern="\\d{5}-\\d{3}" maxlength="9" placeholder="00000-000">
                        </p>
                        <p>
                            <label for="logradouro">Logradouro / Endereço:</label><br>
                            <input type="text" id="logradouro" name="logradouro" required placeholder="Rua, Avenida, Número">
                        </p>
                        <p>
                            <label for="cidade">Cidade:</label><br>
                            <input type="text" id="cidade" name="cidade" required placeholder="Sua cidade">
                        </p>
                        <p>
                            <label for="estado">Estado:</label><br>
                            <input type="text" id="estado" name="estado" required maxlength="2" placeholder="SP">
                        </p>
                    </fieldset>

                    <fieldset>
                        <legend>Perfil de Voluntariado</legend>
                        <p>
                            <label for="area-interesse">Área de Interesse:</label><br>
                            <select id="area-interesse" name="area-interesse" required>
                                <option value="">Selecione uma área</option>
                                <option value="educacao">Educação e Reforço Escolar</option>
                                <option value="cozinha">Cozinha Comunitária</option>
                                <option value="meio-ambiente">Meio Ambiente e Hortas</option>
                                <option value="administrativo">Apoio Administrativo</option>
                            </select>
                        </p>
                        <p>
                            <button type="submit">Enviar Cadastro</button>
                        </p>
                    </fieldset>
                </form>
            </section>
        `;

        restaurarHistoricoVoluntario();

    } else {
        container.innerHTML = `
            <section id="hero" class="hero-section">
                <h2>Bem-vindo(a) à ONG Solidariedade</h2>
                <img src="imagens/hero-banner.jpg" alt="Voluntários e crianças">
                <p>Desde 2010, trabalhamos para transformar vidas e comunidades através de projetos solidários.</p>
            </section>
            <section id="sobre">
                <h2>Sobre Nossa Organização</h2>
                <img src="imagens/fundadores-ong.jpg" alt="Fundadores da ONG">
                <p>Nossa missão é promover a inclusão social e o desenvolvimento sustentável em comunidades vulneráveis.</p>
            </section>
        `;
    }
}

// Event Delegation para Máscaras
document.addEventListener('input', function (e) {
    aplicarMascaras(e.target);
});

// Event Delegation para Submissão
document.addEventListener('submit', function (e) {
    if (e.target && e.target.id === 'form-cadastro') {
        e.preventDefault();

        const dadosVoluntario = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            cpf: document.getElementById('cpf').value,
            telefone: document.getElementById('telefone').value,
            area: document.getElementById('area-interesse').value,
            dataEnvio: new Date().toISOString()
        };

        salvarVoluntario(dadosVoluntario);

        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Cadastro Realizado!',
                text: `Obrigado pelo apoio, ${dadosVoluntario.nome}! Seu registro foi salvo com sucesso.`,
                icon: 'success',
                confirmButtonText: 'Excelente!',
                confirmButtonColor: '#2e5b47'
            });
        }

        restaurarHistoricoVoluntario();
        e.target.reset();
    }
});

// Eventos Globais de Navegação
window.addEventListener('hashchange', rotear);
window.addEventListener('DOMContentLoaded', rotear);