class ImageRenderer {

    /*
        elementAlreadyInFrame é o elemento em jQuery do componente que já está no frame. Se passado, ele será reutilizado.
    */
    render(component, value, elementAlreadyInFrame = null) {
        let img = elementAlreadyInFrame ? elementAlreadyInFrame : $('<img>');
    
        img.attr('src', this.getSrcAttribute(value));
        img.width(component.size.width);
        img.height(component.size.height);
        img.addClass('image');
    
        img.css({
            objectFit: component.fit,
            left: this.getLeft(component),
            top: this.getTop(component),
            position: "absolute",
            marginBottom: component.margin_bottom,
            marginRight: component.margin_right,
            marginTop: component.margin_top,
            marginLeft: component.margin_left,
        });
    
        return img;
    }

    getSrcAttribute(src) {
        if(src == null) {
            return;
        }
        return src.split(/:(.+)/)[1];
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

}

