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
            let labelElement = null;

            if (inputItem.type === 'string') {
                labelElement = this.textPropertyField('value', this.state[inputItemIndex]);
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

    textPropertyField(property, parentObject) {
        let labelElement = $('<label></label>');
        let spanElement = $('<span></span>').text(property);
        let inputElement = $('<input>').attr('type', 'text');

        inputElement.val(parentObject[property]);
        inputElement.on('input', () => {
            parentObject[property] = inputElement.val();
            this.onchangeCallback();
        });

        labelElement.append(spanElement, $('<br>'), inputElement);

        return labelElement;
    }

    selectPropertyField(property, parentObject, options) {
        let labelElement = $('<label></label>').css({display: 'block', margin: '5px'});
        let spanElement = $('<span></span>').text(property);
        let selectElement = $('<select></select>');

        options.forEach(option => {
            selectElement.append($('<option>').text(option).val(option));
        });
        selectElement.val(parentObject[property]);

        selectElement.on('change', () => {
            parentObject[property] = selectElement.val();
            this.onchangeCallback();
        });

        labelElement.append(spanElement, selectElement);
        
        return labelElement;
    }

    numericPropertyField(property, parentObject) {
        let labelElement = $('<label></label>').css({display: 'block', margin: '5px'});
        let spanElement = $('<span></span>').text(property);
        let inputElement = $('<input>').attr({type: 'number'});

        if (typeof parentObject[property] === 'string') {
            parentObject[property] = parentObject[property].replace(/\D/g,'');
        }

        inputElement.val(parentObject[property]);
        inputElement.on('change', () => {
            parentObject[property] = inputElement.val();
            this.onchangeCallback();
        });

        labelElement.append(spanElement, inputElement);

        return labelElement;
    }

    openTextProperties(component) {
        let positionOptionsElement = $('<div></div>').append($('<h3></h3>').text('Position'));
        let xAnchorLabelElement = this.selectPropertyField('xAnchor', component.position, ['left', 'center', 'right']);
        let yAnchorLabelElement = this.selectPropertyField('yAnchor', component.position, ['top', 'center', 'bottom']);
        let xLabelElement = this.numericPropertyField('x', component.position);
        let yLabelElement = this.numericPropertyField('y', component.position);
        positionOptionsElement.append(xAnchorLabelElement, yAnchorLabelElement, xLabelElement, yLabelElement);

        let sizeOptionsElement = $('<div></div>').append($('<h3></h3>').text('Size'));
        let widthLabelElement = this.numericPropertyField('width', component.size);
        let heightLabelElement = this.numericPropertyField('height', component.size);
        sizeOptionsElement.append(widthLabelElement, heightLabelElement);

        let otherOptionsElement = $('<div></div>').append($('<h3></h3>').text('Other'));
        let verticalAlignmentLabelElement = this.selectPropertyField('vertical_alignment', component, ['top', 'center', 'bottom']);
        let horizontalAlignmentLabelElement = this.selectPropertyField('horizontal_alignment', component, ['left', 'center', 'right']);
        let fontFamilyLabelElement = this.selectPropertyField('font_family', component, ['Roboto', 'serif', 'sans-serif']);
        let fontSizeLabelElement = this.numericPropertyField('font_size', component);
        let weightLabelElement = this.selectPropertyField('weight', component, ['normal', 'bold']);
        let colorLabelElement = this.textPropertyField('color', component);
        let letterSpacingLabelElement = this.numericPropertyField('letter_spacing', component);
        let fillLabelElement = this.selectPropertyField('fill', component, ['none', 'width']);
        otherOptionsElement.append(
            verticalAlignmentLabelElement,
            horizontalAlignmentLabelElement,
            fontFamilyLabelElement,
            fontSizeLabelElement,
            weightLabelElement,
            colorLabelElement,
            letterSpacingLabelElement,
            fillLabelElement
        );

        this.propertiesElement.append(positionOptionsElement, sizeOptionsElement, otherOptionsElement);
    }

}