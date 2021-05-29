<template>
    <component
        :is="rootComponent"
        ref="button"
        :class="['button', { 'is-loading': isLoading }, additionalClasses]"
        :type="type"
        @click="onClick"
    >
        <span class="button__content">
            <span v-if="$slots.prefix" class="button__prefix">
                <slot name="prefix"></slot>
            </span>
            <span v-if="$slots.default" class="button__text">
                <slot></slot>
            </span>
            <span v-if="$slots.suffix" class="button__suffix">
                <slot name="suffix"></slot>
            </span>
        </span>
        <span v-show="isPulse" ref="pulsy" class="button-pulsy">
            <transition name="pulsy" @before-enter="pulsyBeforeEnter" @after-enter="pulsyAfterEnter">
                <span v-if="isPulsyActivated" ref="pulsyTarget" class="button-pulsy__target"></span>
            </transition>
        </span>
        <span v-if="isLoading" class="button__progress" role="progressbar">
            <CircleLoader class="button__progress-icon" />
        </span>
    </component>
</template>

<script>
import './button.scss';
import classModificator from '~/helpers/classModificator';

export default {
    props: {
        type: {
            type: String,
            default: 'button'
        },
        theme: {
            type: String,
            default: ''
        },
        mod: {
            // Add class modificator by BEM notation. Example '_icon'
            type: String,
            default: ''
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        isPulse: {
            type: Boolean,
            default: true
        }
    },
    data: () => ({
        isPulsyActivated: false,
        clickY: null,
        clickX: null
    }),
    computed: {
        rootComponent() {
            return this.$attrs.href ? 'a' : this.$attrs.to ? 'nuxt-link' : 'button';
        },
        additionalClasses() {
            const basic = 'button';
            const result = [];

            if (this.theme) {
                result.push(classModificator(basic, this.theme.startsWith('_') ? `_theme${this.theme}` : `_theme_${this.theme}`));
            }

            if (this.mod) {
                result.push(classModificator(basic, this.mod));
            }

            return result;
        }
    },
    methods: {
        onClick(e) {
            if (this.isPulse && !this.isPulsyActivated) {
                this.isPulsyActivated = true;
                this.clickY = e.clientY;
                this.clickX = e.clientX;
            }
        },
        pulsyBeforeEnter(el) {
            const buttonElem = this.$refs.button;
            const buttonRect = buttonElem.getBoundingClientRect();
            const sideWidth = Math.max(buttonElem.offsetWidth, buttonElem.offsetHeight);

            el.style.width = el.style.height = `${sideWidth}px`;
            el.style.top = `${this.clickY - buttonRect.top - sideWidth / 2}px`;
            el.style.left = `${this.clickX - buttonRect.left - sideWidth / 2}px`;
        },
        pulsyAfterEnter(el) {
            this.isPulsyActivated = false;
        }
    }
};
</script>
