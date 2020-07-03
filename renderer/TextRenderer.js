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
            justifyContent: 'center',
            alignItems: 'center'
        })

        let text = $('<div>');
    
        text.addClass('text');
        text.addClass('csjs-scale-content');
    
        text.css({
            fontFamily: component.font_family,
            fontSize: component.font_size,
            fontWeight: component.weight,
            color: component.color,
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
            csjs.fillSpaceCenter(text, container.width(), container.height());
        });        
    
        return container;
    }

}

