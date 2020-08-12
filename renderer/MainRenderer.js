class MainRenderer {
    
    constructor(frame) {
        this.frame = frame;
        this.queueTemplate = null;
        this.isRunning = false;
    }

    render(template, input, state) {

        if(this.isRunning) {
            this.queueTemplate = {};
            this.queueTemplate.template = template;
            this.queueTemplate.input = input;
            this.queueTemplate.state = state;
            return;
        }

        this.queueTemplate = null;
        this.isRunning = true;

        this.frame.find('*').not('.selection').remove();

        this.frame.width(template.width);
        this.frame.height(template.height);

        let imageRenderer = new ImageRenderer();
        let textRenderer = new TextRenderer();
        let columnRenderer = new ColumnRenderer();

        template.components.forEach(async (component, index) => {
            let value = this.getValueByType(component, state);
            if (component.type === 'image') {
                let img = imageRenderer.render(component, value);
                img.attr('component-id', component.id);
                img.css('z-index', 100 - index);
                this.frame.append(img);
            } else if (component.type === 'text') {
                let text = textRenderer.render(component, value);
                text.attr('component-id', component.id);
                text.css('z-index', 100 - index);
                this.frame.append(text);
            } else if (component.type === 'column') {
                let column = columnRenderer.render(component, state);
                column.attr('component-id', component.id);
                column.css('z-index', 100 - index);
                this.frame.append(column);
            }
        });
        
        setTimeout(() => {
            this.isRunning = false;
            if(this.queueTemplate) {
                this.render(this.queueTemplate.template, this.queueTemplate.input, this.queueTemplate.state);
            }
        }, 50)
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

}