<!-- TODO: проверить возможность обернуть в transition -->
<template>
    <div
        v-if="isShow"
        ref="layer"
        class="modal-layer"
        tabindex="-1"
    >
        <transition :name="transitionName" appear>
            <div ref="modal" class="modal" :class="modalClassesNormalized">
                <template v-if="$slots.default">
                    <slot></slot>
                </template>
                <div v-else ref="container" class="modal__container">
                    <template v-if="$slots.close || isCloseButton">
                        <button class="modal__close" @click.prevent="$modalize.close()">
                            <BaseIcon name="cross" :is-box="true" />
                        </button>
                    </template>
                    <div v-if="$slots.header || title" class="modal__header">
                        <slot name="header">
                            <div v-if="title" class="title-h3">
                                {{ title }}
                            </div>
                        </slot>
                    </div>
                    <div v-if="$slots.body || description" class="modal__body">
                        <slot name="body">
                            <div v-if="description">
                                {{ description }}
                            </div>
                        </slot>
                    </div>
                    <div v-if="$slots.footer" class="modal__footer">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import './modal.scss';
import classModificator from '~/helpers/classModificator';

// TODO: Не выпускать фокус из модального окна
export default {
    name: 'BaseModal',
    props: {
        title: {
            type: String,
            required: false,
            default: ''
        },
        description: {
            type: String,
            required: false,
            default: ''
        },
        modalClasses: {
            type: [String, Array, Object],
            default: null,
            required: false
        },
        transitionName: {
            type: String,
            default: 'modal'
        },
        isShow: { // Пока используется только для применения transition. TODO: Найти способ менять значение в случае, если является дочерним компонентом (не дублируя пропы для родителя)
            type: Boolean,
            default: true
        },
        isCloseButton: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        modalClassesNormalized() {
            return classModificator('modal', this.modalClasses);
        }
    },
    mounted() {
        this.$refs.layer.focus();
    }
};
</script>
