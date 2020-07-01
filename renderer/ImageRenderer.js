export class ImageRenderer {

    render = (component, value) => {
        let img = $('<img>');
    
        img.attr('src', this.getSrcAttribute(component.src));
        img.width(component.size.width);
        img.height(component.size.height);
        img.addClass('image');
    
        img.css({
            objectFit: component.fit,
            left: component.position.x,
            top: component.position.y,
        });
    
        return img;
    }

    getSrcAttribute = (src) => {
        return src.split(/:(.+)/)[1];
    }

}

