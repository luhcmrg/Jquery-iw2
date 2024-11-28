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

    $form.on('submit', function (event) {
        event.preventDefault();

        // Verifica se o formulário é válido
        if (!this.checkValidity()) {
            $form.addClass('was-validated');
            return;
        }

        // Envio do formulário via AJAX
        $.ajax({
            url: $form.attr('action'), // URL do action do formulário
            method: 'POST',
            data: new FormData(this),
            processData: false,
            contentType: false,
            success: function (response) {
                // Tenta interpretar a resposta como JSON
                try {
                    if (typeof response === "string") {
                        response = JSON.parse(response);
                    }

                    alert(response.message);

                    if (response.message === 'Inscrição realizada com sucesso!') {
                        $form[0].reset();
                        var successModal = new bootstrap.Modal($('#successModal')[0]);
                        successModal.show();
                    }
                } catch (e) {
                    console.error("Erro ao parsear a resposta JSON:", e);
                    alert("Erro inesperado ao processar a resposta do servidor.");
                }
            },
            error: function (jqXHR) {
                console.error("Erro na requisição:", jqXHR.status, jqXHR.statusText);
                alert('Erro ao enviar o formulário: ' + jqXHR.statusText);
            }
        });
    });

    $consultarCepButton.on('click', function () {
        var cep = $cepInput.val().replace(/\D/g, ''); // Remove caracteres não numéricos
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
                    console.error("Erro ao consultar o CEP:", errorThrown);
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
