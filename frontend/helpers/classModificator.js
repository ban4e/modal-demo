const MODIFICATOR_SYMBOL = '_';

export default function (defaultClass, additionalClasses) {
    let resultClasses = additionalClasses;

    if (typeof additionalClasses === 'string') {
        const classes = additionalClasses.split(' ');
        resultClasses = classes.reduce((acc, className) => {
            return `${acc} ${className.charAt(0) === MODIFICATOR_SYMBOL ? defaultClass.concat(className) : className} `;
        }, '');

        return resultClasses.trim();
    }

    return resultClasses;
}
