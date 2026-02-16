'use strict';

QUnit.module("Тестируем функцию mergeBy", function() {
    QUnit.test("Работает правильно с одинаковыми значениями по ключу", function(assert) {
        const array1 = [
            { id: 1, name: "Alice", tags: ["friend"] },
            { id: 2, name: "Bob", tags: ["colleague"] }
        ];
        const array2 = [
            { id: 1, age: 30, tags: ["travel"] },
            { id: 3, name: "Charlie" }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice", tags: ["friend", "travel"], age: 30 },
            { id: 2, name: "Bob", tags: ["colleague"] },
            { id: 3, name: "Charlie" }
        ]);
    });

    QUnit.test("Работает правильно с отсутствующими ключами", function(assert) {
        const array1 = [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" }
        ];
        const array2 = [
            { age: 30 },
            { id: 2, age: 25 }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob", age: 25 }
        ]);
    });

    QUnit.test("Убирает дубликаты при объединении массивов", function(assert) {
        const array1 = [
            { id: 1, tags: ["a", "b"] }
        ];
        const array2 = [
            { id: 1, tags: ["b", "c"] }
        ];

        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, tags: ["a", "b", "c"] }
        ]);
    });

    QUnit.test("Объединяет элементы с одинаковым ключом в одном массиве", function(assert) {
        const result = mergeBy(
            [{ id: 1, tags: ["a"] }, { id: 1, tags: ["b", "a"] }],
            [],
            "id"
        );

        assert.deepEqual(result, [
            { id: 1, tags: ["a", "b"] }
        ]);
    });

    QUnit.test("Объединяет разные поля при совпадении ключа", function(assert) {
        const result = mergeBy(
            [{ id: 1, a: 1 }],
            [{ id: 1, b: [2] }],
            "id"
        );

        assert.deepEqual(result, [
            { id: 1, a: 1, b: [2] }
        ]);
    });

    QUnit.test("Объединяет скаляр и массив в единый массив", function(assert) {
        const result = mergeBy(
            [{ id: 1, a: 1 }],
            [{ id: 1, a: [2] }],
            "id"
        );

        assert.deepEqual(result, [
            { id: 1, a: [1, 2] }
        ]);
    });

    QUnit.test("Объединяет строку и массив в единый массив", function(assert) {
        const result = mergeBy(
            [{ id: 1, a: "asd" }],
            [{ id: 1, a: [2] }],
            "id"
        );

        assert.deepEqual(result, [
            { id: 1, a: ["asd", 2] }
        ]);
    });

    QUnit.test("Перезаписывает скалярное значение при совпадении ключа", function(assert) {
        const result = mergeBy(
            [{ id: 1, a: 1 }],
            [{ id: 1, a: 2 }],
            "id"
        );

        assert.deepEqual(result, [
            { id: 1, a: [1, 2] }
        ]);
    });
});
