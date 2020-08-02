class Csjs {

	_fillLargestFont(element, width, height, horizontal_alignment, vertical_alignment, letter_spacing, max_font_size) {
		let base_font_size = 1, font_size, abs_letter_spacing;
		max_font_size += 1;

		for (let i = 0; i < 12; i++) {
			font_size = parseInt((base_font_size + max_font_size) / 2);
			abs_letter_spacing = this.getAbsLetterSpacing(letter_spacing, font_size);
			element.css({
				'fontSize': font_size,
				'letterSpacing': abs_letter_spacing
			});
			if (element.height() > height || element.width() > width) {
				max_font_size = font_size;
			} else {
				base_font_size = font_size;
			}
		}

		if (element.height() > height || element.width() > width) {
			font_size -= 1;
			abs_letter_spacing = this.getAbsLetterSpacing(letter_spacing, font_size);
		}
		element.css({
			'fontSize': font_size,
			'letterSpacing': abs_letter_spacing
		});

		element.css('transform-origin', `${horizontal_alignment} ${vertical_alignment}`);
		let translateX = this.getTranslateX(abs_letter_spacing, horizontal_alignment);
		element.css('transform', 'translateX(' + translateX + 'px)');
	}

	fillLargestFont(element, width, height, horizontal_alignment, vertical_alignment, letter_spacing) {
		this._fillLargestFont(element, width, height, horizontal_alignment, vertical_alignment, letter_spacing, 3000);
	}

	fillNone(element, width, height, horizontal_alignment, vertical_alignment, letter_spacing, font_size) {
		this._fillLargestFont(element, width, height, horizontal_alignment, vertical_alignment, letter_spacing, font_size);
	}

	getTranslateX(abs_letter_spacing, horizontal_alignment) {
		let differenceBecauseLetterSpacing = abs_letter_spacing;

		switch(horizontal_alignment){
			case "left":
				return 0;
			case "center":
				return differenceBecauseLetterSpacing / 2.0;
			case "right":
				return differenceBecauseLetterSpacing;
		}
	}

	getAbsLetterSpacing(letter_spacing, font_size) {
		return letter_spacing / 100 * font_size;
	}

}
