'use strict';

/**
 * Represents a WhatsApp data structure
 */
class Base {
    constructor(client) {
        /**
         * The client that instantiated this
         * @readonly
         */
        Object.defineProperty(this, 'client', { value: client });
    }

    _clone() {
        return Object.assign(Object.create(this), this);
    }

    _patch(data) {
        return data;
    }

    /**
     * Normalizes a WhatsApp ID object so that `_serialized` is always defined.
     * WhatsApp Web renamed `id._serialized` to `id.$1`, so `$1` is copied over
     * when `_serialized` is missing, keeping all downstream code compatible.
     * @param {object|string} id
     * @returns {object|string}
     */
    static _normalizeId(id) {
        if (!id || typeof id !== 'object') return id;
        if (id._serialized !== undefined) return id;
        if (typeof id.$1 !== 'string') return id;
        return { ...id, _serialized: id.$1 };
    }

    /**
     * Returns the serialized string of a WhatsApp ID, tolerating both the
     * `_serialized` and the newer `$1` property names.
     * @param {object|string} id
     * @returns {string|undefined}
     */
    static _serializedId(id) {
        if (typeof id === 'string') return id;
        return id?._serialized ?? id?.$1;
    }
}

module.exports = Base;
