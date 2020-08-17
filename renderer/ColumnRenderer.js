class ColumnRenderer {

    render(component, state) {
        let column = this.buildColumn(component);
        this.populateComponents(column, component, state);
        let heightOfFixedChildren = this.getFixedHeightOfAllChidren(component);

        window.requestAnimationFrame(() => {
            this.shrinkFontUntilFit(column, component, heightOfFixedChildren, state, 1);
        })

        return column;
    }

    getFixedHeightOfAllChidren(component) {
        let totalHeight = 0;

        component.components.forEach((component) => {
            if(component.size.height != 0 && component.size.height != '' && component.size.height != 'auto') {
                totalHeight += component.size.height;
            }
        });

        totalHeight += (component.components.length - 1) * component.inbetween_margin;
        return totalHeight;
    }

    shrinkFontUntilFit(column, component, heightOfFixedChildren, state, shrinkFactor) {
        if(shrinkFactor > 20) {
            return;
        }

        let finalHeightOfChildren = this.getHeightOfAllChidren(column);

        if(finalHeightOfChildren > component.size.height) {
            this.populateComponents(column, component, state, shrinkFactor * 5);
            this.shrinkFontUntilFit(column, component, heightOfFixedChildren, state, shrinkFactor + 1)
        }
    }

    getHeightOfAllChidren(column) {
        let children = column.children();
        let totalHeight = 0;

        children.each(function(index) {
            totalHeight += $(this).outerHeight(true);
        });
        
        return totalHeight;
    }

    populateComponents(columnElement, columnComponent, state, shrink = 0) {
        let imageRenderer = new ImageRenderer();
        let textRenderer = new TextRenderer();

        columnComponent.components.forEach(async (component, index) => {
            component.size.width = Math.min(columnElement.width(), component.size.width);
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
                
                if(columnComponent.inbetween_margin < 0) {
                    textRenderer.setNegativeMargin(columnComponent.inbetween_margin);
                }

                let text = textRenderer.render(componentClone, value, elementAlreadyInFrame);

                text.attr('component-id', componentClone.id)
                text.css('z-index', 100 - index);
                text.css('position', 'relative');

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

    buildColumn(component) {
        let column = $('<div>');
    
        column.width(component.size.width);
        column.height(component.size.height);
    
        column.css({
            left: this.getLeft(component),
            top: this.getTop(component),
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            justifyContent: component.vertical_alignment,
            alignItems: component.horizontal_alignment,
        });

        return column;
    }

    buildMargin(columnComponent) {
        let margin = $('<div>');
        margin.css({
            height: columnComponent.inbetween_margin,
            width: '100%',
            'flex-shrink': 0,
            'flex-grow': 0,

        });
        return margin;
    }

}

