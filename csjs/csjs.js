export class Csjs {

	scale(element, options) {
		let width = options.width !== undefined ? options.width : options.maxWidth
	
		let child = element.children().first()
		let scale = width / child.width()
		if(options.width === undefined){
			scale = Math.min(1, scale)
		}
	
		child.css('transform', 'scale(' + scale + ')')
		element.css('width', scale * child.width())
		element.css('height', scale * child.height())
	}

	fillWidth(element, width, height, horizontal_alignment, letter_spacing, font_size) {
		let text = element.children().first();
		let lines = text.get(0).getClientRects().length;
		
		/*
			Se a frase tiver apenas uma linha e for impossível ajustar ela à width desejada,
			apenas usa-se a height máxima para ajustar ao container
		*/
		if(lines == 1) {
			let ratioContainer = width/height;
			let ratioText =  text.width()/text.height();

			if(ratioText < ratioContainer) {
				let scale = height / text.height();
				element.css('transform-origin', horizontal_alignment);
				let translateX = this.getTranslateX(letter_spacing, horizontal_alignment, font_size);
				element.css('transform', 'scale(' + scale + ') translateX(' + translateX + 'px)');
				return;
			}
		}
		
		let scale = width / (text.width() - this.getLetterSpacing(letter_spacing, font_size));
		element.css('transform-origin', horizontal_alignment);
		let translateX = this.getTranslateX(letter_spacing, horizontal_alignment, font_size);
		element.css('transform', 'scale(' + scale + ') translateX(' + translateX + 'px)');

		if(element.height() * scale > height) {
			let fontSize = parseInt(element.css('font-size'));
			element.css('fontSize', fontSize-1);
			this.fillWidth(element, width, height, horizontal_alignment, letter_spacing, font_size);
		}
	}

	fillNone(element, width, height, horizontal_alignment, letter_spacing, font_size) {
		element.css('transform-origin', horizontal_alignment);
		let translateX = this.getTranslateX(letter_spacing, horizontal_alignment, font_size);
		element.css('transform', 'translateX(' + translateX + 'px)');

		if(element.height() > height || element.width() > width) {
			let fontSize = parseInt(element.css('font-size'));
			if(fontSize > 2){
				element.css('fontSize', fontSize-1);
				this.fillNone(element, width, height, horizontal_alignment, letter_spacing, font_size);
			}
		}
	}

	getTranslateX(letter_spacing, horizontal_alignment, font_size) {
		let differenceBecauseLetterSpacing = this.getLetterSpacing(letter_spacing, font_size);

		switch(horizontal_alignment){
			case "left":
				return 0;
			case "center":
				return differenceBecauseLetterSpacing / 2.0;
			case "right":
				return differenceBecauseLetterSpacing;
		}
	}

	getLetterSpacing(letter_spacing, font_size) {
		return letter_spacing / 100 * font_size;
	}

}
