$(document).ready(function () {
    var $form = $('#userForm');
    var $cepInput = $('#cep');
    var $consultarCepButton = $('#consultarCep');

    function clearAddressFields() {
        $('#endereco').val('');
        $('#bairro').val('');
        $('#cidade').val('');
        $('#estado').val('');
    }

    $consultarCepButton.on('click', function () {
        var cep = $cepInput.val().replace(/\D/g, ''); // Remover caracteres não numéricos
        if (cep.length === 8) {
            $.ajax({
                url: `https://viacep.com.br/ws/${cep}/json/`,
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    if (!data.erro) {
                        $('#endereco').val(data.logradouro);
                        $('#bairro').val(data.bairro);
                        $('#cidade').val(data.localidade);
                        $('#estado').val(data.uf);
                    } else {
                        alert('CEP não encontrado');
                        clearAddressFields();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error('Erro ao consultar o CEP:', errorThrown);
                    alert('Erro ao consultar o CEP: ' + errorThrown);
                    clearAddressFields();
                }
            });
        } else {
            alert('CEP inválido. O CEP deve ter 8 dígitos.');
            clearAddressFields();
        }
    });
});
