<template>
    <div class="body__fallback">
        <div class="body__wrapper">
            <div class="body__header"></div>
            <div class="body__container">
                <Nuxt />
            </div>
            <div class="body__footer"></div>
        </div>
    </div>
</template>

<script>
export default {
    head() {
        return {
            bodyAttrs: {
                class: 'body'
            }
        };
    }
};
</script>
