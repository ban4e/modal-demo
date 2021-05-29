<template>
    <div v-if="isResponsive" class="icon-container" :style="{ paddingTop: `${(size.height / size.width) * 100}%` }">
        <svg class="icon-figure" :viewbox="viewBox" preserveAspectRatio="none">
            <use :xlink:href="url" />
        </svg>
    </div>
    <div v-else-if="isBox" class="icon-box">
        <div class="icon-container" :style="{ maxWidth: `${size.width}px` }">
            <div class="icon-container__height" :style="{ paddingTop: `${(size.height / size.width) * 100}%` }"></div>
            <svg
                class="icon-figure"
                :viewbox="viewBox"
                preserveAspectRatio="none"
                :width="size.width"
                :height="size.height"
            >
                <use :xlink:href="url" />
            </svg>
        </div>
    </div>
    <svg
        v-else
        class="icon-figure"
        :viewbox="viewBox"
        preserveAspectRatio="none"
        :width="size.width"
        :height="size.height"
    >
        <use :xlink:href="url" />
    </svg>
</template>

<script>
import './icon.scss';

export default {
    name: 'BaseIcon',
    props: {
        name: {
            type: String,
            required: true
        },
        width: {
            type: Number,
            default: null
        },
        height: {
            type: Number,
            default: null
        },
        isResponsive: {
            type: Boolean,
            default: false
        },
        isBox: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            icon: require(`@/assets/svg/${this.name}.svg`).default
        };
    },
    computed: {
        viewBox() {
            return this.icon.viewBox;
        },
        url() {
            return this.icon.url;
        },
        size() {
            let resultWidth = this.icon.width;
            let resultHeight = this.icon.height;
            if (this.width && !this.height) {
                resultWidth = this.width;
                resultHeight = this.icon.height * this.width / this.icon.width;
            } else if (!this.width && this.height) {
                resultWidth = this.icon.width * this.height / this.icon.height;
                resultHeight = this.height;
            } else if (this.width && this.height) {
                resultWidth = this.width;
                resultHeight = this.height;
            }
            return { width: resultWidth, height: resultHeight };
        }
    }
};
</script>
