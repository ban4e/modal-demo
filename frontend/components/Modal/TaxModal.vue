<template>
    <BaseModal>
        <template #header>
            <h3 class="mb-16">
                Налоговый вычет
            </h3>
        </template>
        <template #body>
            <form action="#" class="tax-container" @submit.prevent="">
                <p class="font-normal mb-24">
                    Используйте налоговый вычет чтобы погасить ипотеку досрочно. <nobr>Размер налогового</nobr> вычета составляет не более 13% от своего официального годового дохода.
                </p>
                <div class="mb-8">
                    <div class="text-black mb-8">
                        Ваша зарплата в месяц
                    </div>
                    <BaseInput
                        v-model="formData.salary"
                        placeholder="Введите данные"
                        mask="money"
                        :input-listeners="{
                            'input': clearErrors
                        }"
                        :error="formErrors.salary"
                    />
                </div>
                <div class="mb-24">
                    <BaseButton type="button" mod="_link" @click.native.prevent="calculateTax">
                        Рассчитать
                    </BaseButton>
                </div>
                <div v-if="taxes" class="mb-24">
                    <div class="text-black mb-8">
                        Итого можете внести в качестве досрочных:
                    </div>
                    <div
                        v-for="(tax, i) in taxes"
                        :key="i"
                        class="tax-item"
                        :class="{'mb-16': i !== taxes.length - 1}"
                    >
                        <BaseToggle v-model="formData.taxesYears" :toggle-value="tax.year">
                            <span class="text-black" v-text="`${tax.amount} рублей`"></span> в {{ tax.year }}-ый год
                        </BaseToggle>
                    </div>
                </div>
                <div class="grid-list grid-list_align-center mb-40">
                    <div class="grid-item text-black sm:grid-item_12x sm:mb-24">
                        Что уменьшаем?
                    </div>
                    <div class="grid-item ml-32 sm:ml-0">
                        <BaseToggle
                            v-model="formData.type"
                            type="radio"
                            :toggle-value="1"
                            mod="_tag"
                        >
                            Платеж
                        </BaseToggle>
                    </div>
                    <div class="grid-item">
                        <BaseToggle
                            v-model="formData.type"
                            type="radio"
                            :toggle-value="2"
                            mod="_tag"
                        >
                            Срок
                        </BaseToggle>
                    </div>
                </div>
                <BaseButton type="submit" mod="_full" class="tax-submit">
                    Добавить
                </BaseButton>
            </form>
        </template>
    </BaseModal>
</template>

<script>
import './tax.scss';
const MAX_VALUE = 260000;
const TAX_PERCENT = 0.13;

export default {
    name: 'TaxModal',
    data: () => ({
        formData: {
            salary: '',
            type: 1
        },
        formErrors: {},
        taxes: null
    }),
    methods: {
        calculateTax() {
            const salary = this.formData?.salary && parseInt(this.formData.salary);
            if (!salary || salary < 12000) {
                this.formErrors = {
                    salary: !salary ? 'Укажите вашу зарплату' : 'Укажите корректную зарплату (> 12 000 руб)'
                };

                this.taxes = null;
                this.formData = Object.assign({}, this.formData, { taxesYears: null });

                return false;
            }

            const deductionAmount = salary * 12 * TAX_PERCENT;
            const deductionCount = Math.ceil(MAX_VALUE / deductionAmount);
            const result = new Array(deductionCount).fill(null).map((item, i) => {
                const restOfSum = MAX_VALUE - deductionAmount * (i + 1);
                const amount = restOfSum < 0
                    ? i > 0
                        ? MAX_VALUE - deductionAmount * i
                        : MAX_VALUE
                    : deductionAmount;

                return { year: i + 1, amount: Math.trunc(amount) };
            });

            this.taxes = result;
            this.formData = Object.assign({}, this.formData, { taxesYears: [] });
        },
        clearErrors() {
            this.formErrors = {};
        }
    }
};
</script>
