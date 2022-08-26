const namesCache = {};

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function widgetName({ component, vertical }) {
  if (!namesCache[vertical]) {
    namesCache[vertical] = {};
  }

  if (!namesCache[vertical][component]) {
    namesCache[vertical][component] = `${capitalize(vertical)}${capitalize(component)}`;
  }

  return namesCache[vertical][component];
}

/**
 * Get flat widgets array from layout structure
 * @param {Array<any>} layout
 * @param {Array<any>} resultArr
 */

export const getFlatWidgetArray = (layout = [], resultArr = []) => {
  layout.forEach((widget) => {
    const isGallery = widget.component.indexOf('webGallery') >= 0 || widget.component.indexOf('webMobGallery') >= 0;

    const info = {
      name: widgetName(widget),
      component: widget.component,
      vertical: widget.vertical,
      version: widget.version,
      stateId: widget.stateId,
      critical: isGallery,
      replaced: widget.replaced
    };

    resultArr.push(info);

    if (widget.placeholders && widget.placeholders.length) {
      widget.placeholders.forEach((placeholder) => {
        resultArr = getFlatWidgetArray(placeholder.widgets, resultArr);
      });
    }
  });

  return resultArr;
};
