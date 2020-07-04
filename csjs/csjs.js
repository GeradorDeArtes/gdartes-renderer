export class Csjs {

	scale = (element, options) => {
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

	fillSpace = (element, width, height, horizontal_alignment, letter_spacing) => {
		let text = element.children().first();
		let lines = text.get(0).getClientRects().length;
		
		if(lines == 1) {
			let ratioContainer = width/height;
			let ratioText =  text.width()/text.height();

			if(ratioText < ratioContainer) {
				let scale = height / text.height();
				element.css('transform-origin', horizontal_alignment);
				let translateX = this.getTranslateX(letter_spacing, horizontal_alignment);
				element.css('transform', 'scale(' + scale + ') translateX(' + translateX + 'px)');
				return;
			}
		}
		
		let scale = width / (text.width() - letter_spacing);
		element.css('transform-origin', horizontal_alignment);
		let translateX = this.getTranslateX(letter_spacing, horizontal_alignment);
		element.css('transform', 'scale(' + scale + ') translateX(' + translateX + 'px)');

		if(element.height() * scale > height ) {
			let fontSize = parseInt(element.css('font-size'));
			element.css('fontSize', fontSize-1);
			this.fillSpace(element, width, height, horizontal_alignment, letter_spacing);
		}
	}

	getTranslateX(letter_spacing, horizontal_alignment) {
		let differenceBecauseLetterSpacing = letter_spacing;

		switch(horizontal_alignment){
			case "left":
				return 0;
			case "center":
				return differenceBecauseLetterSpacing / 2.0;
			case "right":
				return differenceBecauseLetterSpacing;
		}
	}

}
