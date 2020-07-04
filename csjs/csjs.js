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

	fillSpace = (element, width, height, horizontal_alignment) => {
		let text = element.children().first();
		let lines = text.get(0).getClientRects().length;
		
		if(lines == 1) {
			let ratioContainer = width/height;
			let ratioText =  text.width()/text.height();

			if(ratioText < ratioContainer) {
				let scale = height / text.height();
				element.css('transform-origin', horizontal_alignment);
				element.css('transform', 'scale(' + scale + ')');
				return;
			}
		}
		
		let scale = width / text.width();
		element.css('transform-origin', horizontal_alignment);
		element.css('transform', 'scale(' + scale + ')');

		if(element.height() * scale > height ) {
			let fontSize = parseInt(element.css('font-size'));
			element.css('fontSize', fontSize-1);
			this.fillSpace(element, width, height, horizontal_alignment);
		}
	}

}
