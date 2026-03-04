# 📄 JS-PDF Library (Canvas Based)

Uma biblioteca leve e poderosa em JavaScript para criação de documentos e etiquetas de alta resolução utilizando a API Canvas do HTML5. Ideal para projetos que exigem precisão de layout, como etiquetas térmicas, relatórios técnicos e documentos prontos para impressão.

## 🚀 Principais Recursos

* **Resolução Profissional:** Escala padrão de 300 DPI (escala 11.811), garantindo nitidez absoluta em impressões físicas.
* **Impressão de Múltiplas Páginas:** Suporte nativo para gerar um documento único a partir de vários canvases.
* **Sistema de Zoom Inteligente:** Zoom visual via CSS que preserva a qualidade dos pixels internos.
* **Performance Otimizada:** Método de impressão via `Blob` e `Async/Await` para lidar com documentos extensos sem travar o navegador.
* **Layout Centralizado:** Visualizador estilo "PDF Reader" com centralização automática e sombras para profundidade.

---

## 🛠️ Como Usar

### Instalação e Inicialização

Basta incluir o arquivo `pdf.js` no seu projeto e inicializar a classe apontando para um elemento de container:

```javascript
const doc = new Pdf('meu-container', {
    scale: 11.811,         // Otimizado para 300 DPI
    paper_width: 210,      // Largura em mm (A4)
    paper_height: 297,     // Altura em mm (A4)
    overflow_y: 'auto'     // Scroll vertical
});

```

### Comandos de Desenho

A biblioteca utiliza coordenadas em milímetros, facilitando o design de documentos reais:

```javascript
// Adicionar um texto
doc.text('Relatório de Vendas', 10, 20, '20px Arial', '#000');

// Desenhar um retângulo (ex: borda de etiqueta)
doc.rect(5, 5, 200, 287, 1, '#333');

// Limpar o canvas atual
doc.clear();

```

---

## 🔍 Gerenciamento de Zoom

O zoom foi projetado para ser fluido. Ele altera a escala de visualização sem a necessidade de redesenhar os elementos, mantendo a performance alta.

```javascript
// Aumentar o zoom para 150%
doc.setZoom(1.5);

// Retornar para o tamanho original (100%)
doc.setZoom(1.0);

```

---

## 🖨️ Métodos de Impressão

A biblioteca oferece dois caminhos para impressão, permitindo flexibilidade total:

### 1. `print(title)`

Método clássico baseado em DataURL. Excelente para documentos curtos e compatibilidade máxima.

```javascript
doc.print('Meu Documento');

```

### 2. `optimizedPrint(title)` **(Recomendado)**

Utiliza tecnologia de `Blobs` binários e processamento assíncrono. Ideal para relatórios com muitas páginas (60+ páginas) por economizar memória RAM e abrir a janela de impressão mais rapidamente.

```javascript
doc.optimizedPrint('Relatório Pesado');

```

---

## 📐 Especificações Técnicas

| Propriedade | Valor Padrão | Descrição |
| --- | --- | --- |
| **Escala** | 11.811 | Converte 1mm para pixels reais (300 DPI). |
| **Container** | Flexbox | O `box` centraliza automaticamente as páginas. |
| **Unidade** | Milímetros | Todos os métodos (`text`, `rect`, etc) aceitam mm. |
| **Memória** | Blobs | Gerenciamento automático de memória no `optimizedPrint`. |

---

## 📝 Contribuição

1. Faça o Fork do projeto ([https://github.com/marcosptz/xadrez1](https://github.com/marcosptz/xadrez1))
2. Crie uma Branch para sua Feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Add NovaFeature'`)
4. Push para a Branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

---

*Desenvolvido com foco em precisão e performance para aplicações web modernas.*


