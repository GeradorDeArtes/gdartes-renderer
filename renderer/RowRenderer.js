class RowRenderer {

    render(component, state) {
        let row = this.buildRow(component);
        this.populateComponents(row, component, state);
        let widthOfFixedChildren = this.getWidthOfAllChidren(component);
        this.shrinkComponentsUntilFit(row, component, widthOfFixedChildren);

        return row;
    }

    getWidthOfAllChidren(component) {
        let totalHeight = 0;

        component.components.forEach((component) => {
            if(component.size.width != 0 && component.size.width != '' && component.size.width != 'auto') {
                totalHeight += component.size.width + (component.margin_right ? component.margin_right : 0);
            }
        });

        totalHeight += (component.components.length - 1) * component.inbetween_margin;
        return totalHeight;
    }

    /*
        Caso a width de todos os elementos seja maior que a a da row, diminui de todos os filhos pra encaixar
    */
    shrinkComponentsUntilFit(column, component, widthOfFixedChildren) {
        if(widthOfFixedChildren > component.size.width) {
            let scale = component.size.width / widthOfFixedChildren;
            component.components.forEach((childComponent) => {
                childComponent.size.width *= scale;
            });
        }
    }

    populateComponents(columnElement, columnComponent, state, shrink = 0) {
        let imageRenderer = new ImageRenderer();
        let textRenderer = new TextRenderer();

        columnComponent.components.forEach(async (component, index) => {
            component.size.height = Math.min(columnElement.height(), component.size.height);
            let value = this.getValueByType(component, state);

            // Adicionando margem
            if(index != 0 && shrink == 0) {
                let margin = this.buildMargin(columnComponent)
                columnElement.append(margin);
            }

            if (component.type === 'image') {
                let elementAlreadyInFrame = Util.getElementInFrameByComponentId(component.id);
                let img = imageRenderer.render(component, value, elementAlreadyInFrame);
                
                img.attr('component-id', component.id)
                img.css('z-index', 100 - index);
                img.css('position', 'relative');
                img.css('flex-grow', '0');

                if(shrink == 0) {
                    columnElement.append(img);
                }

                requestAnimationFrame(() => {
                    component.document_position = {};
                    let imageOffset = img.offset();
                    let frameOffset = $('#frame').offset();
                    component.document_position.x = imageOffset.left - frameOffset.left;
                    component.document_position.y = imageOffset.top - frameOffset.top;
    
                    component.document_size = {};
                    component.document_size.width = img.width();
                    component.document_size.height = img.height();
                })

            } else if (component.type === 'text') {

                let componentClone = Util.cloneComponent(component);
                //Diminui a fonte do component em relação ao shrink
                componentClone.font_size = component.font_size * (100-shrink)/100;

                let elementAlreadyInFrame = Util.getElementInFrameByComponentId(componentClone.id);
                
                let text = textRenderer.render(componentClone, value, elementAlreadyInFrame);

                text.attr('component-id', componentClone.id)
                text.css('z-index', 100 + index);
                text.css('position', 'relative');
                text.css('flex-grow', '0');

                if(shrink == 0) {
                    columnElement.append(text);
                }

                requestAnimationFrame(() => {
                    component.document_position = {};
                    let textOffset = text.offset();
                    let frameOffset = $('#frame').offset();
                    component.document_position.x = textOffset.left - frameOffset.left;
                    component.document_position.y = textOffset.top - frameOffset.top;
    
                    component.document_size = {};
                    component.document_size.width = text.width();
                    component.document_size.height = text.height();
                })
            }
        });
    }

    getValueByType(component, state) {
        switch(component.input_type) {
            case "static":
                return component.value;
            case "dynamic":
                if(state[component.input]) {
                    return state[component.input].value;
                }
                return "";
            default:
                throw "InputType inválido";
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

    buildRow(component) {
        let column = $('<div>');
    
        column.width(component.size.width);
        column.height(component.size.height);
    
        column.css({
            left: this.getLeft(component),
            top: this.getTop(component),
            position: "absolute",
            display: "flex",
            flexDirection: "row",
            justifyContent: component.horizontal_alignment,
            alignItems: component.vertical_alignment,
        });

        return column;
    }

    buildMargin(columnComponent) {
        let margin = $('<div>');
        margin.css({
            height: '100%',
            width: columnComponent.inbetween_margin,
            'flex-shrink': 0,
            'flex-grow': 0,

        });
        return margin;
    }

}

