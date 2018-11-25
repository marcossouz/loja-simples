$(function () {

  function Compra() {
    this.cliente = {};
    this.produtos = [];

    this.setCliente = function (cliente) {
      this.cliente = cliente;
    }
    this.addProduto = function (produto) {
      this.produtos.push(produto);
    }
  };

  function Cliente(id, nome) {
    this.id = id;
    this.nome = nome;
  };

  function Produto(id, nome, preco) {
    this.id = id;
    this.name = nome = nome;
    this.preco = preco;
    this.quantidade = 1;
  };



  var compra = new Compra();

  c = JSON.parse($("#dadosCompra").val());
  c.produtos.forEach(function (value) {
    compra.addProduto(value);
  });

  $(".btnMenos").click(function () {
    if (parseFloat($("#" + $(this).attr("name") + "label").text()) > 0) {
      $("#" + $(this).attr("name") + "label").text(parseFloat($("#" + $(this).attr("name") + "label").text()) - 1);
      $("#" + $(this).attr("name") + "labelpreco").text(
        ($("#" + $(this).attr("name") + "preco").val() * parseFloat(
          $("#" + $(this).attr("name") + "label").text())).toFixed(2)
      );

      var id = $(this).attr("name");

      compra.produtos.forEach(function (produto) {
        if (id == produto.id) {
          produto.quantidade--;
        }
      });

      $("#precototal").text((parseFloat($("#precototal").text()) - parseFloat($("#" + $(this).attr("name") + "preco").val())).toFixed(2));
    };
  });

  $(".btnMais").click(function () {
    if (parseFloat($("#" + $(this).attr("name") + "label").text()) < 20) {
      $("#" + $(this).attr("name") + "label").text(parseFloat($("#" + $(this).attr("name") + "label").text()) + 1);
      $("#" + $(this).attr("name") + "labelpreco").text(
        ($("#" + $(this).attr("name") + "preco").val() * parseFloat(
          $("#" + $(this).attr("name") + "label").text())).toFixed(2)
      );

      var id = $(this).attr("name");

      compra.produtos.forEach(function (produto) {
        if (id == produto.id) {
          produto.quantidade++;
        }
      });

      $("#precototal").text((parseFloat($("#precototal").text()) + parseFloat($("#" + $(this).attr("name") + "preco").val())).toFixed(2));
    };
  });

  $("#concluircompra").click(function () {

      if ($("#clienteSelect option:selected").val() == "Selecione o cliente...") {
        $("#validacaoSelect").removeClass("d-none");
      } else {

        compra.setCliente(JSON.parse($("#clienteSelect option:selected").val()));


        $('#dadosCompra').val(JSON.stringify(compra));

        $("#concluirCompra").submit();
      }
    });

  $("#clienteSelect").change(function () {
    if ($("#clienteSelect option:selected").val() == "Selecione o cliente...") {
      $("#validacaoSelect").removeClass("d-none");
    } else {
      $("#validacaoSelect").addClass("d-none");
    }
  });
});