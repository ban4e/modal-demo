<template>
    <div class="grid-container flex items-center justify-center h-full">
        <BaseButton theme="light" mod="_outline" @click.native.prevent="$modalize.open('TaxModal')">
            Налоговый вычет
        </BaseButton>
    </div>

    <!-- <div class="grid-container mt-32">
        <div class="grid-list">
            <div class="grid-item grid-item_4x">
                Иконка
                <BaseIcon name="angle-down" :is-box="true" />
            </div>
            <div class="grid-item grid-item_4x">
                <BaseButton>
                    Кнопка
                    <template #suffix>
                        <BaseIcon name="angle-down" :is-box="true" />
                    </template>
                </BaseButton>
            </div>
            <div class="grid-item grid-item_4x">
                <BaseInput error="Ошибка" />
            </div>
        </div>
    </div> -->
</template>

<script>
export default {};
</script>
