class ColumnRenderer {

    render(component, state) {
        let column = this.buildColumn(component);

        this.populateComponents(column, component, state);

        let heightOfFixedChildren = this.getFixedHeightOfAllChidren(component);
        /// console.log("heightOfFixedChildren: " + heightOfFixedChildren);

        window.requestAnimationFrame(() => {
            let finalHeightOfChildren = this.getHeightOfAllChidren(column, component);
            // console.log("finalHeightOfChildren: " + finalHeightOfChildren);

            if(finalHeightOfChildren > component.size.height) {
                let availableHeight = component.size.height - heightOfFixedChildren;
                let newHeights = this.getNewHeights(component.components, state, availableHeight);
                // console.log(newHeights);
                // console.log(availableHeight);
                this.populateComponents(column, component, state, newHeights);
            } else {
                // this.populateComponents(column, component.components, state, null);
            }
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

    getHeightOfAllChidren(column, component) {
        let children = column.children();
        let totalHeight = 0;

        children.each(function(index) {
            totalHeight += $(this).height();
        });

        return totalHeight;
    }

    getNewHeights(components, state, availableHeight) {
        console.log(availableHeight);
        let newHeights = {};
        let sum = this.getSumOfCharactersTimesFont(components, state);

        components.forEach((component) => {
            newHeights[component.id] = this.getValueByType(component, state).length * component.font_size / sum * availableHeight;
        });

        return newHeights;
    }

    getSumOfCharactersTimesFont(components, state) {
        let sum = 0;
        components.forEach((component) => {
            sum += this.getValueByType(component, state).length * component.font_size;
        });
        return sum;
    }

    populateComponents(columnElement, columnComponent, state, definedHeights = null) {
        let imageRenderer = new ImageRenderer();
        let textRenderer = new TextRenderer();

        columnComponent.components.forEach(async (component, index) => {
            component.size.width = Math.min(columnElement.width(), component.size.width);
            let value = this.getValueByType(component, state);

            // Adicionando margem
            if(index != 0 && !definedHeights) {
                let margin = this.buildMargin(columnComponent)
                columnElement.append(margin);
            }

            if (component.type === 'image') {
                let img = imageRenderer.render(component, value);
                img.css('z-index', 100 - index);
                columnElement.append(img);
            } else if (component.type === 'text') {

                if(definedHeights) {
                    let newHeight = definedHeights[component.id];

                    if(newHeight) {
                        component = this.cloneComponent(component);
                        component.size.height = newHeight;
                    }
                }

                let elementAlreadyInFrame = this.getElementInFrameByComponentId(component.id);
                let text = textRenderer.render(component, value, elementAlreadyInFrame);

                text.attr('component-id', component.id)
                text.css('z-index', 100 - index);
                text.css('position', 'relative');
                if(!definedHeights) {
                    columnElement.append(text);
                }

                text.css('height', 'auto');
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
            flexDirection: "column"
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

    populateForTest(column) {
        let t1 = $('<div>');
        t1.html("kkkkkkkkkk um teste doido aqui mano  agora em gfd sd sdg sdg?");

        let marginElement = $('<div>');

        let t2 = $('<div>');
        t2.html("kkkkkkkkkk um teste doido aqui mano  agora em gfd sd sdg sdg?");

        t1.css({
            fontSize: 50,
            color: '#000000',
        })

        marginElement.css({
            height: 50,
            width: 50,
            backgroundColor: 'red',
            flexShrink: 0
        });

        t2.css({
            fontSize: 50,
            color: '#000000',
        })

        column.append(t1);
        column.append(marginElement);
        column.append(t2);
    }

    getElementInFrameByComponentId(componentId) {
        let elementAlreadyInFrame = $('[component-id=' + componentId + ']');

        if(elementAlreadyInFrame && elementAlreadyInFrame.length != 0){
            return elementAlreadyInFrame;
        }

        return null;
    }

    cloneComponent(component) {
        return JSON.parse(JSON.stringify(component));
    }

}

