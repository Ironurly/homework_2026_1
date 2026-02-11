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

    const addItem = item => {
        const identifier = item[key];
        if (identifier === undefined) {
            return;
        }

        if (!merged.has(identifier)) {
            const copy = {};
            Object.keys(item).forEach(prop => {
                copy[prop] = item[prop];
            });
            merged.set(identifier, copy);
            return;
        }

        const target = merged.get(identifier);
        Object.keys(item).forEach(prop => {

            if (Array.isArray(target[prop]) || Array.isArray(item[prop])) {
                target[prop] = Array.from(new Set([...target[prop], ...item[prop]]));
            } else {
                target[prop] = item[prop];
            }
        });
    };

    array1.forEach(addItem);
    array2.forEach(addItem);

    return Array.from(merged.values());
};
