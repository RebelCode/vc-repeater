export function CfRepeater(Vue) {
    return Vue.extend({
        props: {
            collection: {
                required: true
            },
            wrap: {
                type: String,
                default: 'div'
            }
        },

        computed: {
            /*
             * Get items from *injected* collection. Reactive.
             *
             * @returns {*}
             */
            collectionItems () {
                return Object.values(this.collection.getItems())
            }
        },

        methods: {
            removeItem (item) {
                this.collection.removeItem(item)
            }
        },

        render (createElement) {
            let rootOptions = this.provideRootOptions ? this.provideRootOptions() : {};

            return createElement(this.wrap, rootOptions, this.collectionItems.map((item) => {
                let slotProps = {
                    'remove': this.removeItem
                };

                /*
                 * We can provide additional props from repeater's child
                 */
                if (this.provideSlotProps) {
                    slotProps = Object.assign(slotProps, this.provideSlotProps())
                }
                slotProps['item'] = item;
                return this.$scopedSlots.default(slotProps)
            }))
        }
    })
}
