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
            },

            /**
             * Provide additional slot properties. Can be extended by child.
             *
             * @return {{}}
             */
            getRepeatedSlotProps () {
                return {};
            },

            /**
             * Additional repeater root options. Can be extended by child.
             *
             * @return {{}}
             */
            getRepeaterRootOptions () {
                return {};
            }
        },

        render (createElement) {
            return createElement(this.wrap, this.getRepeaterRootOptions(), this.collectionItems.map((item) => {
                let slotProps = Object.assign({
                    'remove': this.removeItem,
                    'item': item
                }, this.getRepeatedSlotProps());

                return this.$scopedSlots.default(slotProps)
            }))
        }
    })
}
