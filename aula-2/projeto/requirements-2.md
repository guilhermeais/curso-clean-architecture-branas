## Testes

- [x] Não deve aplicar cupom de desconto expirado
- [x] Ao fazer um pedido, a quantidade de um item não pode ser negativa
- [x] Ao fazer um pedido, o mesmo item não pode ser informado mais de uma vez
- [x] Nenhuma dimensão do item pode ser negativa
- [x] O peso do item não pode ser negativo
- [x] Deve calcular o valor do frete com base nas dimensões (altura, largura e profundidade em cm) e o peso dos produtos (em kg)
- [x] Deve retornar o preço mínimo de frete caso ele seja superior ao valor calculado


## Considere


O valor mínimo é de R$10,00
<br/>
Por enquanto, como não temos uma forma de calcular a distância entre o CEP de origem e destino, será de 1000 km (fixo)
Utilize a fórmula abaixo para calcular o valor do frete
<br/>
**Fórmula de Cálculo do Frete**:
<br/>
```
Valor do Frete = distância (km) * volume (m3) * (densidade/100)
```
<br/>
Exemplos de volume ocupado (cubagem)
<br/>

```
Camera: 20cm x 15 cm x 10 cm = 0,003 m3
Guitarra: 100cm x 30cm x 10cm = 0,03 m3
Geladeira: 200cm x 100cm x 50cm = 1 m3
```

## Exemplos de densidade

```
Camera: 1kg / 0,003 m3 = 333kg/m3
Guitarra: 3kg / 0,03 m3 = 100kg/m3
Geladeira: 40kg / 1 m3 = 40kg/m3
```

## Exemplos
```
produto: Camera
distância: 1000 (fixo)
volume: 0,003
densidade: 333
preço: R$9,90 (1000 * 0,003 * (333/100))
preço mínimo: R$10,00
```
```
produto: Guitarra
distância: 1000 (fixo)
volume: 0,03
densidade: 100
preço: R$30,00 (1000 * 0,03 * (100/100))
```
```
produto: Geladeira
distância: 1000 (fixo)
volume: 1
densidade: 40
preço: R$400,00 (1000 * 1 * (40/100))
```
