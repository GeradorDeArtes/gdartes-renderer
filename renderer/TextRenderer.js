import { Csjs } from "../csjs/csjs.js";

export class TextRenderer {

    render = (component, value) => {
        let container = $('<div>');
        container.addClass('csjs-scale-container');
        container.width(component.size.width);
        container.height(component.size.height);

        container.css({
            left: component.position.x,
            top: component.position.y,
            backgroundColor: 'blue'
        })

        let text = $('<div>');
    
        text.html(value.value);
        text.addClass('text');
        text.addClass('csjs-scale-content');
    
        text.css({
            fontFamily: component.font_family,
            fontSize: component.font_size,
            fontWeight: component.weight,
            color: component.color
        });

        container.append(text);

        setTimeout(() => {
            let csjs = new Csjs();
            csjs.scale(container, {
                width: container.width()
            });
        });        
    
        return container;
    }

}

