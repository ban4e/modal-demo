<template>
    <label :class="['toggle', additionalClasses]">
        <input
            ref="input"
            v-model="localValue"
            :value="toggleValue"
            class="toggle__input"
            :type="type"
            v-bind="$attrs"
            v-on="inputListeners"
        >
        <div class="toggle__content">
            <span class="toggle__mark">
                <BaseIcon name="check" class="toggle__mark-figure" :is-box="true" />
            </span>
            <span v-if="$slots.default" class="toggle__title">
                <slot></slot>
            </span>
        </div>
    </label>
</template>

<script>
import './toggle.scss';
import classModificator from '~/helpers/classModificator';

export default {
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: { type: String, default: '' },
        inputListeners: { type: Object, default: () => ({}) },
        error: { type: String, default: null },
        mod: {
            // Add class modificator by BEM notation. Example '_icon'
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'checkbox',
            validator: value => {
                return ['checkbox', 'radio'].includes(value);
            }
        },
        toggleValue: { type: [String, Number] }
    },
    computed: {
        localValue: {
            get() {
                return this.value;
            },
            set(newValue) {
                this.$emit('change', newValue);
            }
        },
        additionalClasses() {
            const basic = 'toggle';
            const result = [];

            result.push(classModificator(basic, `_${this.type}`));

            if (this.mod) {
                result.push(classModificator(basic, this.mod));
            }

            return result;
        }
    }
};
</script>
