# 📄 JS-PDF Library (Canvas Based)

Uma biblioteca leve para geração de documentos e etiquetas de alta fidelidade, focada em precisão milimétrica e alta resolução (300 DPI).

## 🖋️ Métodos de Desenho (Principais)

A biblioteca converte milímetros em pixels automaticamente, permitindo que você desenhe com medidas reais de papel.

### `text(content, x, y, font, color)`

Desenha um texto no documento.

* **content**: Texto a ser exibido.
* **x / y**: Posição inicial em milímetros.
* **font**: Definição de estilo (ex: `'bold 14pt Arial'`).

### `rect(x, y, width, height, line_width, color)`

Cria um retângulo com cantos vivos (90°).

### `roundedRect(x, y, width, height, radius, line_width, color)`

Cria um retângulo com cantos arredondados. Este método permite definir um raio de curvatura para suavizar as bordas.

* **radius**: O raio do arredondamento em milímetros. Se definido como 0, comporta-se como um `rect` comum.
* **line_width**: Espessura da borda.
* **color**: Cor do traço.

---

## 🔍 Visualização e Performance

### `setZoom(value)`

Ajusta a escala visual do documento no navegador. Devido à alta densidade de pixels (300 DPI), mesmo com zoom elevado, os cantos arredondados e textos permanecem perfeitamente nítidos.

### `optimizedPrint(title)`

Gera o documento final para a impressora. O uso de **Blobs** garante que todas as formas geométricas e curvas complexas sejam enviadas ao spooler de impressão de forma eficiente e sem perda de qualidade.

---

## 📐 Especificações Técnicas

| Recurso | Detalhe |
| --- | --- |
| **Resolução** | 300 DPI (Escala 11.811) |
| **Coordenadas** | Baseadas em Milímetros (mm) |
| **Interface** | Flexbox com suporte a Zoom e Centralização |
| **Impressão** | Assíncrona via Iframe Oculto |
