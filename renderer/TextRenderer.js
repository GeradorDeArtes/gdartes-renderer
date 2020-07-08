import { Csjs } from "../csjs/csjs.js";

export class TextRenderer {

    render(component, value) {
        let container = $('<div>');
        container.addClass('csjs-scale-container');
        
        container.css({
            width: component.size.width,
            height: component.size.height,
            left: this.getLeft(component),
            top: this.getTop(component),
            border: '2px solid black',
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
            fontFamily: component.font_family,
            fontSize: component.font_size,
            fontWeight: component.weight,
            color: component.color,
            letterSpacing: this.getLetterSpacing(component),
            lineHeight: component.line_height,
            textAlign: component.horizontal_alignment,
            position: 'relative',
            direction: 'ltr'
        });

        let p = $('<p>');
        p.html(value.value);

        p.css({
            display: 'inline',
        });

        text.append(p);
        container.append(text);

        let csjs = new Csjs();
        switch(component.fill) {
            case "none":
                window.requestAnimationFrame(() => {
                    csjs.fillNone(text, container.width(), container.height(), component.horizontal_alignment, component.letter_spacing, component.font_size);
                });
                break;
            case "width":
                window.requestAnimationFrame(() => {
                    csjs.fillWidth(text, container.width(), container.height(), component.horizontal_alignment, component.letter_spacing, component.font_size);
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
}

