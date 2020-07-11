export class ImageRenderer {

    render(component, value) {
        let img = $('<img>');
    
        img.attr('src', this.getSrcAttribute(value));
        img.width(component.size.width);
        img.height(component.size.height);
        img.addClass('image');
    
        img.css({
            objectFit: component.fit,
            left: this.getLeft(component),
            top: this.getTop(component),
            position: "absolute"
        });
    
        return img;
    }

    getSrcAttribute(src) {
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

