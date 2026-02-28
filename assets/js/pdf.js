class Pdf {
	constructor(element, props={}) {
		this.scl = typeof props.scale == 'undefined' ? 2.42 : props.scale;
		this.paper_width = typeof props.paper_width == 'undefined' ? this.scale(210) : this.scale(props.paper_width);
		this.paper_height = typeof props.paper_height == 'undefined' ? this.scale(297) : this.scale(props.paper_height);
		this.add_class = typeof props.add_class == 'undefined' ? '' : props.add_class;
		this.html = `<div class="box ${this.add_class}" id="box">
						<canvas class="canvas" id="canvas" width="${this.paper_width}px" height="${this.paper_height}px">
							<h3>Seu navegador não tem suporte ao canvas</h3>
						</canvas>
					</div>`;

  		document.getElementById(element).innerHTML = this.html;

		this.element = document.getElementById(element);
		this.element.innerHTML = this.html;
		this.box = document.getElementById('box');
		this.box.style = `height: 66vh; 
						  overflow-y: auto !important; 
						  overflow-x: auto !important;
						  border: solid #363636 2px;
						  background-color: #696969;
						`;

		this.canvas = document.getElementById('canvas');
		this.canvas.style = `background-color: #FFFAFA; 
							 border: solid #4F4F4F 1px;`
    	this.ctx = this.canvas.getContext('2d');
	}

	/**
	 * Método que desenha uma texto
	 * @param {string} text 
	 * @param {float} x 
	 * @param {float} y 
	 * @param {object} props
	 * - font_size: Determina determina o tamanho da fonte do texto, float
	 * - font_text: Determina o tipo de fonte do texto, float
	 * - font_color: Determina a cor do texto, default preto, string
	 * - font_style: Determina o estilo do texto, se tera negrito, string
	 * - font_weight: Determina se o texto sará italico, default preto, string
	 * - rotation: Determina a rotação do texto, a rotação será feita pelo eixo central da figura, integer
	 */
	text(text='', x, y, props={}) {
		let font_size = typeof props.font_size == 'undefined' ? this.scale(10)/2.416 : this.scale(props.font_size)/2.416;
		let font_text = typeof props.font_text == 'undefined' ? 'Arial' : props.font_text;
		let font_color = typeof props.font_color == 'undefined' ? '#000000' : props.font_color;
		let font_style = typeof props.font_style == 'undefined' ? 'normal' : props.font_style;
		let font_weight = typeof props.font_weight == 'undefined' ? 'normal' : props.font_weight;
		let font_stroke = typeof props.font_stroke == 'undefined' ? false : props.font_stroke;
		let rotation = typeof props.rotation == 'undefined' ? 0 : props.rotation;
		let info_text = this.ctx.measureText("foo");  // Busca informações da largura do texto
		let width_text = info_text.width;  // (0.13*font_size)*text.length;
		let height_text = font_size*0.2;
		let translate_x = this.scale(x + width_text/2);
		let translate_y = this.scale(y + height_text/2);
		
		this.ctx.font = `${font_style} ${font_weight} ${font_size}px ${font_text}`;
		this.ctx.fillStyle = font_color;
		this.ctx.save();
		this.ctx.translate(translate_x, translate_y);
		this.ctx.rotate(rotation * Math.PI / 180);
		this.ctx.translate(-translate_x, -translate_y);

		x = this.scale(x);
		y = this.scale(y);
		
		if(font_stroke) {
			this.ctx.strokeText(text, x, y);
			this.ctx.restore();
		} else {
			this.ctx.fillText(text, x, y);
			this.ctx.restore();
		}
	}

	/**
	 * Método que desenha uma figura quadrilátera
	 * @param {float} x - Posição x da figura
	 * @param {float} y - Posição y da figura
	 * @param {float} width - Largura da figura
	 * @param {float} height - Altura d afigura
	 * @param {object} props - Objeto que especifica as propriedades da figura: 
	 * - radius: Determina a curvatura dos cantos, float
	 * - esp: Determina a espessura das linha da figura, float
	 * - color: Determina a cor das linhas, default preto, string
	 * - fill: Determina se a figura vai ter preenchimento, bolean
	 * - fill_color: Determina a cor de preenchimento da figura, default preto, string
	 * - rotation: Determina a rotação da figura, a rotação será feita pelo eixo central da figura
	 */
	roundedRect(x, y, width, height, props={}) {
		let radius = typeof props.radius == 'undefined' ? 0 : this.scale(props.radius);
		let esp = typeof props.esp == 'undefined' ? this.scale(0.5) : this.scale(props.esp);
		let color = typeof props.color == 'undefined' ? '#000000' : props.color;  // rgba(0, 0, 0, 1)
		let fill = typeof props.fill == 'undefined' ? false : props.fill;
  		let fill_color = typeof props.fill_color == 'undefined' ? '#000000' : props.fill_color;
  		let rotation = typeof props.rotation == 'undefined' ? 0 : props.rotation;
		let translate_x = 0;
		let translate_y = 0;

		x = this.scale(x);
		y = this.scale(y);
		width = this.scale(width);
		height = this.scale(height);
		translate_x = x + width/2;
		translate_y = y + height/2;

		this.ctx.save();
		this.ctx.translate(translate_x, translate_y);
		this.ctx.rotate(rotation * Math.PI / 180);
		this.ctx.translate(-translate_x, -translate_y);

		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = esp;
		this.ctx.fillStyle = fill_color;
		this.ctx.beginPath();
		this.ctx.moveTo(x, y + radius);
		this.ctx.lineTo(x, y + height - radius);
		this.ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
		this.ctx.lineTo(x + width - radius, y + height);
		this.ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
		this.ctx.lineTo(x + width, y + radius);
		this.ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
		this.ctx.lineTo(x + radius, y);
		this.ctx.quadraticCurveTo(x, y, x, y + radius);
		this.ctx.stroke();
		if(fill) this.ctx.fill();
		this.ctx.restore();
	}

	/**
	 * Método que desenha um círculo
	 * @param {float} x - Posição x da figura
	 * @param {float} y - Posição y da figura
	 * @param {float} diameter - Diâmetro do círculo
	 * @param {float} props - Objeto que especifica as propriedades do círculo: 
	 * - color: Determina a cor das linhas, default preto, string;
	 * - esp: Determina a espessura das linha da figura, float;
	 * - fill: Determina se a figura vai ter preenchimento, bolean;
	 * - fill_color: Determina a cor de preenchimento da figura, default preto, string
	 */
  	circle(x=5, y=5, diameter=15, props={}) {
  		let color = typeof props.color == 'undefined' ? '#000000' : props.color;
  		let esp = typeof props.esp == 'undefined' ? this.scale(0.5) : this.scale(props.esp);
  		let fill = typeof props.fill == 'undefined' ? false : props.fill;
  		let fill_color = typeof props.fill_color == 'undefined' ? '#000000' : props.fill_color;

		x = this.scale(x);
		y = this.scale(y);
		diameter = this.scale(diameter);

  		this.ctx.beginPath();
    	this.ctx.arc(x, y, diameter, 0, Math.PI * 2, true);
    	this.ctx.lineWidth = esp;
    	this.ctx.strokeStyle = color;
    	this.ctx.fillStyle = fill_color;
    	this.ctx.stroke();
    	if(fill) this.ctx.fill();
  	}

	/**
	 * Método que desenha uma linha
	 * @param {float} x - Posição x da linha
	 * @param {float} y - Posição y da linha
	 * @param {float} width - Largura de comprimento da linha
	 * @param {float} height - Altura de comprimento da linha
	 * @param {object} props - Objeto que especifica as propriedades da figura: 
	 * - color: Determina a cor das linhas, default preto, string;
	 * - esp: Determina a espessura das linha da figura, float;
	 * - fill: Determina se a figura vai ter preenchimento, bolean;
	 * - fill_color: Determina a cor de preenchimento da figura, default preto, string
	 */	
  	line(x=10, y=10, width=50, height=10, props={}) {
  		let color = typeof props.color == 'undefined' ? '#000000' : props.color;
  		let esp = typeof props.esp == 'undefined' ? this.scale(0.5) : this.scale(props.esp);
  		let fill = typeof props.fill == 'undefined' ? false : props.fill;
  		let fill_color = typeof props.fill_color == 'undefined' ? '#000000' : props.fill_color;
		let rotation = typeof props.rotation == 'undefined' ? 0 : props.rotation;
		let translate_x = 0;
		let translate_y = 0;

		x = this.scale(x);
		y = this.scale(y);
		width = this.scale(width);
		height = this.scale(height);
		translate_x = x + width/2;
		translate_y = y + height/2;

		this.ctx.save();
		this.ctx.translate(translate_x, translate_y);
		this.ctx.rotate(rotation * Math.PI / 180);
		this.ctx.translate(-translate_x, -translate_y);

  		this.ctx.lineWidth = esp;
    	this.ctx.strokeStyle = color;
    	this.ctx.fillStyle = fill_color;
  		this.ctx.beginPath();
	    this.ctx.moveTo(width, height);
	    this.ctx.lineTo(x, y);
	    this.ctx.stroke();
	    if(fill) this.ctx.fill();
		  this.ctx.restore();
  	}

	/**
	 * Método que desenha uma figura quadrilátera
	 * @param {float} x - Posição x da linha
	 * @param {float} y - Posição y da linha
	 * @param {float} width - Largura da figura
	 * @param {float} height - Altura d afigura
	 * @param {float} esp - Determina a espessura das linha da figura
	 * @param {string} color - Determina a cor da figura, default preto
	 */
  	rect(x=5, y=5, width=20, height=20, props={}) {
		let color = typeof props.color == 'undefined' ? '#000000' : props.color;
  		let esp = typeof props.esp == 'undefined' ? false : this.scale(props.esp);
  		let rotation = typeof props.rotation == 'undefined' ? 0 : props.rotation;
		let translate_x = 0;
		let translate_y = 0;

		x = this.scale(x);
		y = this.scale(y);
		width = this.scale(width);
		height = this.scale(height);
		esp = this.scale(esp);
		translate_x = x + width/2;
		translate_y = y + height/2;

		this.ctx.save();
		this.ctx.translate(translate_x, translate_y);
		this.ctx.rotate(rotation * Math.PI / 180);
		this.ctx.translate(-translate_x, -translate_y);

	    this.ctx.fillStyle = color;
	    this.ctx.fillRect(x, y, width, height);
	    if(esp) this.ctx.clearRect(x+esp/2, y+esp/2, width-esp, height-esp);
		this.ctx.restore();
  	}

	triangle(x=5, y=5, width=50, height=50, props={}) {
		let color = typeof props.color == 'undefined' ? '#000000' : props.color;
		let fill_color = typeof props.fill_color == 'undefined' ? '#000000' : props.fill_color;
		let fill = typeof props.fill == 'undefined' ? false : props.fill;
  		let esp = typeof props.esp == 'undefined' ? false : this.scale(props.esp);
  		let rotation = typeof props.rotation == 'undefined' ? 0 : props.rotation;
		let translate_x = 0;
		let translate_y = 0;

		x = this.scale(x);
		y = this.scale(y);
		width = this.scale(width);
		height = this.scale(height);
		translate_x = x + width/2;
		translate_y = y + height/2;

		this.ctx.save();
		this.ctx.translate(translate_x, translate_y);
		this.ctx.rotate(rotation * Math.PI / 180);
		this.ctx.translate(-translate_x, -translate_y);

		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = esp;
		this.ctx.fillStyle = fill_color;
		this.ctx.beginPath();
		// Base do triângulo
		this.ctx.moveTo(width+x, height+y);
    this.ctx.lineTo(x, y+height);
    // Lateral direita
    this.ctx.moveTo(width+x, height+y);
    this.ctx.lineTo(x+(width/2), y);
    // Lateral esquerda
    this.ctx.lineTo(x, y+height);
    
		this.ctx.stroke();
		if(fill) this.ctx.fill();
		this.ctx.restore();
	}

	arrow(x=5, y=5, width=10, height=20, props={}) {
		let color = typeof props.color == 'undefined' ? '#000000' : props.color;
		let fill_color = typeof props.fill_color == 'undefined' ? '#000000' : props.fill_color;
		let fill = typeof props.fill == 'undefined' ? false : props.fill;
  		let esp = typeof props.esp == 'undefined' ? false : this.scale(props.esp);
  		let rotation = typeof props.rotation == 'undefined' ? 0 : props.rotation;
		let translate_x = 0;
		let translate_y = 0;
		let width_rect = this.scale(width)
		let height_rect = this.scale(height)
		let x_rect = this.scale(x)
		let y_rect = this.scale(y)

		x = this.scale(x);
		y = this.scale(y);
		width = this.scale(width);
		height = this.scale(height/3);
		translate_x = x_rect + width_rect/2;
		translate_y = y_rect + height_rect/2;

		this.ctx.save();
		this.ctx.translate(translate_x, translate_y);
		this.ctx.rotate(rotation * Math.PI / 180);
		this.ctx.translate(-translate_x, -translate_y);

		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = esp;
		this.ctx.fillStyle = fill_color;
		this.ctx.beginPath();
		// Base do triângulo
		this.ctx.moveTo(width+x, height+y);
    this.ctx.lineTo(x, y+height);
    // Lateral direita
    this.ctx.moveTo(width+x, height+y);
    this.ctx.lineTo(x+(width/2), y);
    // Lateral esquerda
    this.ctx.lineTo(x, height+y);
    
		this.ctx.stroke();
		if(fill) this.ctx.fill();
		
		// Retângulo
		this.ctx.fillRect(x_rect+width_rect*0.15, y_rect+height_rect/3, width_rect*0.7, height_rect*0.666666);
		this.ctx.restore();
	}
	
	arrowTriangle(x=5, y=5, width=10, height=20, props={}) {
		let color = typeof props.color == 'undefined' ? '#000000' : props.color;
		let fill_color = typeof props.fill_color == 'undefined' ? '#000000' : props.fill_color;
		let fill = typeof props.fill == 'undefined' ? false : props.fill;
  		let esp = typeof props.esp == 'undefined' ? false : this.scale(props.esp);
  		let rotation = typeof props.rotation == 'undefined' ? 0 : props.rotation;
		let translate_x = 0;
		let translate_y = 0;
		let width_rect = this.scale(width)
		let height_rect = this.scale(height)
		let x_rect = this.scale(x)
		let y_rect = this.scale(y)

		x = this.scale(x);
		y = this.scale(y);
		width = this.scale(width);
		height = this.scale(height/3);
		translate_x = x_rect + width_rect/2;
		translate_y = y_rect + height_rect/2;

		this.ctx.save();
		this.ctx.translate(translate_x, translate_y);
		this.ctx.rotate(rotation * Math.PI / 180);
		this.ctx.translate(-translate_x, -translate_y);

		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = esp;
		this.ctx.fillStyle = fill_color;
		this.ctx.beginPath();
		// Base do triângulo
		this.ctx.moveTo(width+x, height+y);
    this.ctx.lineTo(x, y+height);
    // Lateral direita
    this.ctx.moveTo(width+x, height+y);
    this.ctx.lineTo(x+(width/2), y);
    // Lateral esquerda
    this.ctx.lineTo(x, height+y);
    
		this.ctx.stroke();
		if(fill) this.ctx.fill();
		
		this.ctx.beginPath();
		// Lateral inversa direita
    this.ctx.moveTo(x+width*0.75, y+height);
    this.ctx.lineTo(x+width*0.5, y+height*3);
    // Lateral inversa esquerda
    this.ctx.lineTo(x+width*0.25, y+height);
    this.ctx.stroke();
		if(fill) this.ctx.fill();
    
		this.ctx.restore();
	}
	
	arrowTriRect(x=5, y=5, width=10, height=20, props={}) {
		let color = typeof props.color == 'undefined' ? '#000000' : props.color;
		let fill_color = typeof props.fill_color == 'undefined' ? '#000000' : props.fill_color;
		let fill = typeof props.fill == 'undefined' ? false : props.fill;
  		let esp = typeof props.esp == 'undefined' ? false : this.scale(props.esp);
  		let rotation = typeof props.rotation == 'undefined' ? 0 : props.rotation;
		let translate_x = 0;
		let translate_y = 0;
		let width_rect = this.scale(width)
		let height_rect = this.scale(height)
		let x_rect = this.scale(x)
		let y_rect = this.scale(y)

		x = this.scale(x);
		y = this.scale(y);
		width = this.scale(width);
		height = this.scale(height/3);
		translate_x = x_rect + width_rect/2;
		translate_y = y_rect + height_rect/2;

		this.ctx.save();
		this.ctx.translate(translate_x, translate_y);
		this.ctx.rotate(rotation * Math.PI / 180);
		this.ctx.translate(-translate_x, -translate_y);

		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = esp;
		this.ctx.fillStyle = fill_color;
		this.ctx.beginPath();
		// Base do triângulo
    this.ctx.moveTo(width+x, height+y);
    this.ctx.lineTo(x, y+height);
    // Lateral direita
    this.ctx.moveTo(width+x, height+y);
    this.ctx.lineTo(x+width/2, y);
    // Lateral esquerda
    this.ctx.lineTo(x, height+y);
    
		this.ctx.stroke();
		if(fill) this.ctx.fill();
		
		// Segundo triângulo
		this.ctx.beginPath();
		// Base do segundo triângulo
    this.ctx.moveTo(0.8*width+x, 3*height+y);
    this.ctx.lineTo(x+width*0.2, y+height*3);
		// Lateral direita segundo triângulo
    this.ctx.moveTo(0.8*width+x, 3*height+y);
    this.ctx.lineTo(x+(width/2), y);
    // Lateral esquerda segundo triângulo
    this.ctx.lineTo(x+width*0.2, 3*height+y);
    
    this.ctx.stroke();
		if(fill) this.ctx.fill();
    
		this.ctx.restore();
	}

	/**
	 * Método que desenha uma imagem
	 * @param {ImageData} img 
	 * @param {float} x 
	 * @param {float} y 
	 * @param {float} width 
	 * @param {float} height 
	 * @param {integer} rotation 
	 */
	addImage(img, x=5, y=5, width=20, height=20, rotation=0) {
		let translate_x = 0;
		let translate_y = 0;

		x = this.scale(x);
		y = this.scale(y);
		width = this.scale(width);
		height = this.scale(height);
		translate_x = x + width/2;
		translate_y = y + height/2;

		this.ctx.save();
		this.ctx.translate(translate_x, translate_y);
		this.ctx.rotate(rotation * Math.PI / 180);
		this.ctx.translate(-translate_x, -translate_y);

		this.ctx.drawImage(img, x, y, width, height);
		this.ctx.restore();
	}

	/**
	 * Método que define a escala no qual será renderizado no canvas
	 * @param {float} mm 
	 * @returns
	 */
	scale(mm) {
		return mm * this.scl;
	}

	/**
	 * Método que imprime o conteúdo do canvas
	 * @param {string} title - Define o título da página de impressão
	 */
	print(title='') {
		let canvas = this.canvas.toDataURL('image/png');
		let windowContent = '<!DOCTYPE html>';
		let printWin = window.open('', '', 340, 260);

		windowContent += `<head><title>${title}</title></head>`;
		windowContent += '<body>';
		windowContent += `<img src="${canvas}"/>`;
		windowContent += '</body>';
		windowContent += '</html>';

		printWin.document.open();
		printWin.document.write(windowContent);
		printWin.document.close();
		printWin.focus();

		setTimeout(() => {printWin.print()}, 300)
	}

	/**
	 * Método que limpa a área do canvas
	 */
	clear() {
  		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  	}
}