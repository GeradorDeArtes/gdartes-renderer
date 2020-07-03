import { ImageRenderer } from "./ImageRenderer.js";
import { TextRenderer } from "./TextRenderer.js";

export class MainRenderer {
    constructor(frame) {
        this.frame = frame;
        frame.empty();
    }

    render = (template, state) => {
        this.frame.width(template.width);
        this.frame.height(template.height);

        let imageRenderer = new ImageRenderer();
        let textRenderer = new TextRenderer();

        template.components.forEach(component => {
            let value = state[component.id];
            if (component.type === 'static-image') {
                let img = imageRenderer.render(component, value);
                this.frame.append(img);
            } else if (component.type === 'dinamic-text') {
                let text = textRenderer.render(component, value);
                this.frame.append(text);
            }
        });
    }

}