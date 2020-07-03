import { Csjs } from "../csjs/csjs.js";

export class TextRenderer {

    render = (component, value) => {
        let container = $('<div>');
        container.addClass('csjs-scale-container');
        
        container.css({
            width: component.size.width,
            height: component.size.height,
            left: component.position.x,
            top: component.position.y,
            backgroundColor: 'blue',
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
            letterSpacing: component.letter_spacing,
            textAlign: component.horizontal_alignment,
            position: 'relative'
        });

        let p = $('<p>');
        p.html(value.value);

        p.css({
            display: 'inline',
        });

        text.append(p);
        container.append(text);

        setTimeout(() => {
            let csjs = new Csjs();
            csjs.fillSpace(text, container.width(), container.height(), component.horizontal_alignment);
        });        
    
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
}

