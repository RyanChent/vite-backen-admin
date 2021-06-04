import { defineComponent, ref } from 'vue'
import { uuid } from '@/utils/tool'
import QRCode from 'qrcode'

const useHandleQRCode = (props: any) => {
    const url = ref<string>('')
    const generateQR = async (text = props.scan) => {
        const style = window.getComputedStyle(document.documentElement)
        url.value = await QRCode.toDataURL(text, {
            errorCorrectionLevel: 'H',
            color: {
                dark: style.getPropertyValue('--primary-color').trim(),
            }
        })
    }
    generateQR()
    return {
        url,
        generateQR
    }
}

const qrCode = defineComponent({
    name: 'QrCodeLogin',
    componentName: 'ManageQrCodeLogin',
    props: {
        scan: {
            type: String,
            default: uuid()
        }
    },
    setup(props) {
        const { url, generateQR } = useHandleQRCode(props)
        return {
            url,
            generateQR
        }
    },
    render() {
        return <div class="qrcode-login">
            <img src={this.url} onClick={() => this.generateQR(uuid())} />
        </div>
    }
})

export default qrCode