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

	fillSpaceCenter = (element, width, height) => {
		let scale = width / element.children().first().width();
		element.css('transform', 'scale(' + scale + ')');
		element.css('transform-origin', 'center');
		console.log(element.width());
		console.log(element.width() * scale);

		if(element.height() > height ) {
			let fontSize = parseInt(element.css('font-size'));
			element.css('fontSize', fontSize-1);
			this.fillSpaceCenter(element, width, height);
		}
	}

}
