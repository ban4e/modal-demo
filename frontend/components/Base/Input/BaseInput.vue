<template>
    <div ref="field" class="field" :class="[fieldTypeClasses, stateClasses, { 'is-error': error }]">
        <div class="field__container">
            <fieldset v-if="fieldType === fieldTypes.TYPE_OUTLINED" class="field__fieldset">
                <legend
                    v-if="label"
                    ref="legend"
                    class="field__legend"
                    :style="legendStyles"
                ></legend>
            </fieldset>
            <div class="field__entry">
                <input
                    ref="input"
                    v-model="localValue"
                    :type="type"
                    class="field__input"
                    v-bind="$attrs"
                    v-on="inputListeners"
                    @focus="onFocus"
                    @blur="onBlur"
                    @input="onInput"
                >
                <label
                    v-if="!$attrs.placeholder && label"
                    ref="label"
                    class="field__label"
                    :style="labelStyles"
                >
                    {{ label }}
                </label>
                <div v-if="$slots.append" class="field__append">
                    <slot name="append"></slot>
                </div>
            </div>
        </div>
        <transition name="field-error">
            <div v-if="error" class="field__error">
                <div ref="error" class="field__error-figure">
                    <BaseIcon
                        :width="4"
                        :height="16"
                        name="warning"
                        class="field__error-icon"
                    />
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import tippy from 'tippy.js';
import inputMaskBehaviour from '~/mixins/inputMaskBehaviour';
import './field.scss';
import '~/assets/scss/blocks/tippy.scss';
import 'tippy.js/dist/tippy.css';

const FIELD_TYPES = {
    TYPE_FILLED: 'filled',
    TYPE_OUTLINED: 'outlined',
    TYPE_LIGHT: 'light'
};

export default {
    mixins: [inputMaskBehaviour],
    inheritAttrs: false,
    props: {
        value: { type: String, default: '' },
        label: { type: String, default: '' },
        type: { type: String, default: 'text' },
        fieldType: {
            type: String,
            default: 'outlined',
            validator: value => {
                return Object.values(FIELD_TYPES).includes(value) !== -1;
            }
        },
        inputListeners: { type: Object, default: () => ({}) },
        error: { type: String, default: null }
    },
    data() {
        return {
            labelScale: 0.7,
            isActivated: Boolean(this.localValue),
            labelTranslateY: false,
            isFocus: false,
            fieldTypes: FIELD_TYPES
        };
    },
    computed: {
        localValue: {
            get() {
                return this.value;
            },
            set(newValue) {
                this.$emit('input', newValue);
            }
        },
        isFill() {
            return Boolean(this.localValue);
        },
        stateClasses() {
            return {
                'is-fill': this.isFill,
                'is-focus': this.isFocus
            };
        },
        fieldTypeClasses() {
            return {
                field_filled: this.fieldType === this.fieldTypes.TYPE_FILLED,
                field_outlined: this.fieldType === this.fieldTypes.TYPE_OUTLINED,
                field_light: this.fieldType === this.fieldTypes.TYPE_LIGHT
            };
        },
        labelStyles() {
            let styles = {};

            if ((this.isFocus || this.isFill) && this.$refs.label) {
                styles = { transform: `translateY(${this.labelTranslateY}px) scale(${this.labelScale})` };
            }

            return styles;
        },
        legendStyles() {
            let styles = {};

            if ((this.isFocus || this.isFill) && this.$refs.label && this.$refs.legend) {
                styles = { width: `${this.$refs.label.offsetWidth * this.labelScale}px` };
            }

            return styles;
        }
    },
    watch: {
        error(newValue) {
            if (newValue) {
                this.$nextTick(() => {
                    this.applyError(newValue);
                });
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            // browser paint
            this.labelTranslateY = this.calcLabelTranslate();
            if (this.error) {
                this.applyError(this.error);
            }
        });
    },
    methods: {
        onFocus(e) {
            this.isFocus = true;
        },
        onBlur(e) {
            this.isFocus = false;
        },
        onInput(e) {
            this.isActivated = true;
        },
        calcLabelTranslate() {
            const labelElem = this.$refs.label;
            if (!labelElem) { return }

            const labelRect = labelElem.getBoundingClientRect();
            const labelTop = labelElem.offsetTop;
            const translateY =
                this.fieldType === this.fieldTypes.TYPE_FILLED
                    ? (labelTop / 2 + labelRect.height * this.labelScale * 0.5) * -1
                    : (labelTop + labelRect.height * this.labelScale * 0.5) * -1;

            return translateY;
        },
        applyError(errorText) {
            tippy(this.$refs.error, {
                content: errorText,
                theme: 'error',
                arrow: tippy.roundArrow,
                delay: [150, 0]
            });
        }
    }
};
</script>
