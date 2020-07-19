class TextRenderer {

    render(component, value) {
        let container = $('<div>');
        container.addClass('csjs-scale-container');
        
        container.css({
            width: component.size.width,
            height: component.size.height,
            left: this.getLeft(component),
            top: this.getTop(component),
            display: 'flex',
            justifyContent: component.horizontal_alignment,
            alignItems: this.getAlignItemsByVerticalAlignment(component.vertical_alignment),
            direction: this.getDirectionFromHorizontalAlignment(component.horizontal_alignment),
            position: 'absolute'
        })

        let text = $('<div>');
    
        text.addClass('text');
        text.addClass('csjs-scale-content');
    
        text.css({
            fontSize: component.font_size,
            fontWeight: component.weight,
            letterSpacing: this.getLetterSpacing(component),
            lineHeight: component.line_height,
            textAlign: component.horizontal_alignment,
            position: 'relative',
            direction: 'ltr'
        });

        let p = $('<p>');
        value = value.trim();
        value = value.split('\n').join('<br>');
        p.html(value);

        p.css({
            display: 'inline',
            fontFamily: component.font_family,
            color: component.color,
        });

        if (component.text_border !== undefined) {
            p.css({
                textShadow: this.generateTextBorder(component.text_border.thickness, component.text_border.color),
            }); 
        }

        text.append(p);
        container.append(text);

        let csjs = new Csjs();
        switch(component.fill) {
            case "none":
                window.requestAnimationFrame(() => {
                    csjs.fillNone(text, container.width(), container.height(), component.horizontal_alignment,
                        component.vertical_alignment, component.letter_spacing, component.font_size);
                });
                break;
            case "width":
                window.requestAnimationFrame(() => {
                    csjs.fillWidth(text, container.width(), container.height(), component.horizontal_alignment, 
                        component.vertical_alignment, component.letter_spacing, component.font_size);
                });
                break;
            default:
                throw "Fill " + component.fill + " não existe";

        }
        return container;
    }

    getAlignItemsByVerticalAlignment(verticalAlignment) {
        switch(verticalAlignment){
            case "top":
                return "flex-start";
            case "center":
                return "center";
            case "bottom":
                return "flex-end";
            default:
                throw "Vertical alignment " +  verticalAlignment + " not found";
        }
    }

    getDirectionFromHorizontalAlignment(horizontalAlignment) {
        switch(horizontalAlignment){
            case "left":
                return "ltr";
            case "center":
                return "ltr";
            case "right":
                return "rtl";
            default:
                throw "Horizontal alignment " +  horizontalAlignment + " not found";
        }
    }

    getLeft(component) {
        switch(component.position.xAnchor) {
            case "left":
                return component.position.x;
            case "center":
                return component.position.x - component.size.width / 2;
            case "right":
                return component.position.x - component.size.width;
        }
    }

    getTop(component) {
        switch(component.position.yAnchor) {
            case "top":
                return component.position.y;
            case "center":
                return component.position.y - component.size.height / 2;
            case "bottom":
                return component.position.y - component.size.height;
        }
    }

    getLetterSpacing(component) {
        return component.letter_spacing / 100 * component.font_size;
    }

    generateTextBorder(thickness, color) {
        let pairHashes = {};
        let pairs = [];
        for (let x = -thickness; x <= thickness; x += 0.125) {
            let yP = Math.round(Math.sqrt(thickness * thickness - x * x));
            let yN = Math.round(-Math.sqrt(thickness * thickness - x * x));

            let pairHash = Math.round(x) + ':' + yP;
            if (pairHashes[pairHash] === undefined) {
                pairHashes[pairHash] = 1;
                pairs.push([Math.round(x), yP]);
                pairs.push([Math.round(x), yN]);
            }
        }

        let shadows = [];
        for (let i in pairs) {
            let pair = pairs[i];
            shadows.push(`${pair[0]}px ${pair[1]}px 1px ${color}`);
        }

        return shadows.join(', ');
    }

}

