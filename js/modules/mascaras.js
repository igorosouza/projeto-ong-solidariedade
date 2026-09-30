// Módulo de Formatação e Máscaras de Entrada
export function aplicarMascaras(input) {
    if (input.id === 'cpf') {
        let v = input.value.replace(/\D/g, '');
        v = v.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        input.value = v;
    }
    if (input.id === 'telefone') {
        let v = input.value.replace(/\D/g, '');
        v = v.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
        input.value = v;
    }
    if (input.id === 'cep') {
        let v = input.value.replace(/\D/g, '');
        v = v.replace(/^(\d{5})(\d)/, '$1-$2');
        input.value = v;
    }
}