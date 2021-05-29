export default {
    props: {
        mask: {
            type: String,
            required: false
        },
        maskOptions: {
            type: Object,
            required: false
        }
    },

    data: () => ({
        _inputmask: null
    }),

    async mounted() {
        if (!this.mask) { return }

        let options = {
            clearMaskOnLostFocus: true,
            clearIncomplete: false,
            showMaskOnHover: false,
            showMaskOnFocus: false
        };

        switch (this.mask) {
            case 'money': {
                options = {
                    ...options,
                    digitsOptional: true,
                    digits: 0,
                    groupSeparator: ' ',
                    placeholder: '0',
                    numericInput: true,
                    autoGroup: true,
                    suffix: ' ₽',
                    alias: 'numeric',
                    radixPoint: '.',
                    rightAlign: false,
                    autoUnmask: true
                };
                break;
            }
            default: {
                options = {
                    ...options,
                    ...this.maskOptions
                };
            }
        }

        const { default: Inputmask } = await import('inputmask');
        this._inputmask = new Inputmask(options);
        this._inputmask.mask(this.$refs.input);
    },

    beforeDestroy() {
        if (this._inputmask) {
            this._inputmask.remove();
        }
    }
};
