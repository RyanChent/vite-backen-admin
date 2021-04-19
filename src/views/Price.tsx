import { ref, defineComponent, reactive, h } from 'vue'
const Price = defineComponent({
    name: 'Price',
    setup(props, { slots }) {
        return () => (
            <div>Price</div>
        )
    }
})

export default Price