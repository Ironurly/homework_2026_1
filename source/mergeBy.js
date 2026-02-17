'use strict';

/**
 * Объединяет два массива объектов по указанному ключу.
 * @param {Array<Object>} array1 - первый массив объектов
 * @param {Array<Object>} array2 - второй массив объектов
 * @param {String} key - ключ для объединения
 *
 * @example
 * // returns [{ id: 1, name: "NAME", tags: ["A", "B"], age: 30 }]
 * mergeBy(
 *   [{ id: 1, name: "NAME", tags: ["A"] }],
 *   [{ id: 1, age: 30, tags: ["B"] }],
 *   "id"
 * );
 *
 * @returns {Array<Object>}
 */
const mergeBy = (array1, array2, key) => {
    const merged = new Map();
    /**
     * Функция проверки id и добавления объектов в коллекцию
     * @param {Object} item - объект
     *
     * @example
     * addItem(
     *   [{ id: 1 }]
     * );
     */
    const addItem = item => {
        const identifier = item[key];
        if (identifier === undefined) {
            return;
        }

        if (!merged.has(identifier)) {
            merged.set(identifier, { ...item });
            return;
        }

        const target = merged.get(identifier);
        Object.keys(item).forEach(prop => {
            if (prop === key || !(prop in target)) {
                target[prop] = item[prop];
                return;
            }

            target[prop] = Array.from(
                new Set([...normalize(target[prop]), ...normalize(item[prop])])
            );
        });
    };

    array1.forEach(addItem);
    array2.forEach(addItem);

    return Array.from(merged.values());
};
/**
 * Функция приведения объекта к типу данных массива, если это необходимо
 * @param {Object} value - объект
 *
 * @example
 * normalize([1, 2, 3]); // returns [1, 2, 3]
 * normalize(1); // returns [1]
 * normalize(undefined); // returns []
 */
const normalize = value => (Array.isArray(value) ? value : value === undefined ? [] : [value]);
