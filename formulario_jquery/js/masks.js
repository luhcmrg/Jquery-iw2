$(document).ready(function () {
    function applyMask($input, maskFunction) {
        $input.on('input', function () {
            let value = $(this).val().replace(/\D/g, ''); // Remove caracteres não numéricos
            let formattedValue = maskFunction(value);
            $(this).val(formattedValue);
        });
    }

    applyMask($('#telefone'), function (value) {
        return value
            .replace(/^(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
    });

    applyMask($('#cep'), function (value) {
        return value
            .replace(/^(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1');
    });

    applyMask($('#cpf'), function (value) {
        return value
            .replace(/^(\d{3})(\d)/, '$1.$2')
            .replace(/^(\d{3}\.\d{3})(\d)/, '$1.$2')
            .replace(/^(\d{3}\.\d{3}\.\d{3})(\d)/, '$1-$2');
    });

    applyMask($('#rg'), function (value) {
        return value
            .replace(/^(\d{2})(\d{2})/, '$1.$2')
            .replace(/^(\d{2}\.\d{3})(\d{2})/, '$1.$2')
            .replace(/^(\d{2}\.\d{3}\.\d{3})(\d{1,2})/, '$1-$2')
            .slice(0, 12);
    });
});
