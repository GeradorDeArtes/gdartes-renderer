export class MiniEditor {

    constructor(statesListElement, componentsListElement, propertiesElement) {
        this.statesListElement = statesListElement;
        this.componentsListElement = componentsListElement;
        this.propertiesElement = propertiesElement;
    }

    init(template, input, state, onchangeCallback) {
        this.template = template;
        this.input = input;
        this.state = state;
        this.onchangeCallback = onchangeCallback;

        for (let inputItemIndex in this.input) {
            let inputItem = this.input[inputItemIndex];
            let labelElement = $('<label></label>');

            if (inputItem.type === 'string') {
                let spanElement = $('<span></span>').text(inputItem.description);
                let inputElement = $('<input>').attr('type', 'text');

                inputElement.val(this.state[inputItemIndex].value);
                inputElement.on('input', () => {
                    this.state[inputItemIndex].value = inputElement.val();
                    this.onchangeCallback();
                });

                labelElement.append(spanElement, $('<br>'), inputElement);
            }

            this.statesListElement.append(labelElement);
        }

        template.components.forEach((component, componentIndex) => {
            let buttonElement = $('<button></button>');

            buttonElement.text(component.name).click(() => {
                this.openProperties(component);
            });

            this.componentsListElement.append(buttonElement);
        });

    }

    openProperties(component) {
        this.propertiesElement.empty();
        if (component.type === 'dinamic-text') {
            this.openTextProperties(component);
        }
    }

    openTextProperties(component) {
        let positionOptionsElement = $('<div></div>').append($('<h3></h3>').text('Position'));

        positionOptionsElement.append($('<p></p>').text('xAnchor'));
        let xAnchorOptions = ['left', 'center', 'right'];
        xAnchorOptions.forEach(xAnchorOption => {
            let labelElement = $('<label></label>');
            let inputElement = $('<input>').attr({type: 'radio', name: 'xAnchor'}).val(xAnchorOption);
            let spanElement = $('<span></span>').text(xAnchorOption);

            if (xAnchorOption === component.position.xAnchor) {
                inputElement.prop('checked', true);    
            }

            inputElement.on('change', () => {
                component.position.xAnchor = inputElement.val();
                this.onchangeCallback();
            });

            labelElement.append(inputElement, spanElement);
            positionOptionsElement.append(labelElement);
        });

        positionOptionsElement.append($('<p></p>').text('yAnchor'));
        let yAnchorOptions = ['top', 'center', 'bottom'];
        yAnchorOptions.forEach(yAnchorOption => {
            let labelElement = $('<label></label>');
            let inputElement = $('<input>').attr({type: 'radio', name: 'yAnchor'}).val(yAnchorOption);
            let spanElement = $('<span></span>').text(yAnchorOption);

            if (yAnchorOption === component.position.yAnchor) {
                inputElement.prop('checked', true);    
            }

            inputElement.on('change', () => {
                component.position.yAnchor = inputElement.val();
                this.onchangeCallback();
            });

            labelElement.append(inputElement, spanElement);
            positionOptionsElement.append(labelElement);
        });

        let numericLabel = (label, defaultValue, callback) => {
            let labelElement = $('<label></label>');
            let inputElement = $('<input>').attr({type: 'number'}).val(defaultValue);
            let spanElement = $('<p></p>').text(label);

            inputElement.val(defaultValue);
            inputElement.on('change', () => {
                callback(inputElement);
            });

            labelElement.append(spanElement, inputElement);

            return labelElement;
        };

        let xLabelElement = numericLabel('x', component.position.x, (inputElement) => {
            component.position.x = inputElement.val();
            this.onchangeCallback();
        })
        positionOptionsElement.append(xLabelElement);

        let yLabelElement = numericLabel('y', component.position.y, (inputElement) => {
            component.position.y = inputElement.val();
            this.onchangeCallback();
        })
        positionOptionsElement.append(yLabelElement);

        let sizeOptionsElement = $('<div></div>').append($('<h3></h3>').text('Size'));

        let widthLabelElement = numericLabel('width', component.size.width, (inputElement) => {
            component.size.width = inputElement.val();
            this.onchangeCallback();
        })
        sizeOptionsElement.append(widthLabelElement);

        let heightLabelElement = numericLabel('height', component.size.height, (inputElement) => {
            component.size.height = inputElement.val();
            this.onchangeCallback();
        })
        sizeOptionsElement.append(heightLabelElement);

        this.propertiesElement.append(positionOptionsElement, sizeOptionsElement);
    }

}