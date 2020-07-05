import { ImageRenderer } from "./ImageRenderer.js";
import { TextRenderer } from "./TextRenderer.js";

export class MainRenderer {
    constructor(frame) {
        this.frame = frame;
    }

    render(template, input, state) {
        this.frame.empty();

        this.frame.width(template.width);
        this.frame.height(template.height);

        let imageRenderer = new ImageRenderer();
        let textRenderer = new TextRenderer();

        template.components.forEach(component => {
            let value = state[component.input];
            if (component.type === 'static-image') {
                let img = imageRenderer.render(component, value);
                this.frame.append(img);
            } else if (component.type === 'dinamic-text') {
                let text = textRenderer.render(component, value);
                this.frame.append(text);
            }
        });

        this.frame.css('transform', 'scale(0.5)');
    }

}