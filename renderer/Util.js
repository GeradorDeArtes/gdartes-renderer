class Util {
    static getElementInFrameByComponentId(componentId) {
        let elementAlreadyInFrame = $('[component-id=' + componentId + ']');

        if(elementAlreadyInFrame && elementAlreadyInFrame.length != 0){
            return elementAlreadyInFrame;
        }

        return null;
    }

    static cloneComponent(component) {
        return JSON.parse(JSON.stringify(component));
    }
}