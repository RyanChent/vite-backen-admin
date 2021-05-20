import { computed, defineComponent, ref, watch } from "vue";
import ElTable from 'element-plus/lib/el-table'
import './style.less'
import _ from 'lodash'
import { isFunction } from "@/utils/types.ts";

const useProps = (props: any, emit: Function) => {
    return {
        tableProps: computed<any>(() =>
            Object.assign({},
                _.pick(props, Object.keys(ElTable.props)),
                ElTable.emits?.reduce((self: any, item) => {
                    const key = `on${item.split('-').map(str => str[0].toUpperCase() + str.slice(1)).join('')}`
                    self[key] = function () {
                        return emit(item, arguments)
                    }
                    return self
                }, {})
            )
        ),
        paginationProps: computed<any>({
            get() {
                return Object.assign({
                    pageSize: 10,
                    currentPage: 1,
                    prevText: '上一页',
                    nextText: '下一页',
                    layout: 'sizes, prev, pager, next, jumper, total,'
                }, _.isObject(props.pagination) && props.pagination)
            },
            set(value) {
                emit('update:pagination', value)
            }
        })
    }
}

const PCTable = defineComponent({
    name: 'Table',
    componentName: 'ManageTable',
    __file: '@PC/Table/index.tsx',
    props: Object.assign({}, ElTable.props, {
        pagination: {
            type: [Boolean, Object],
            default: true
        },
        columns: {
            type: Array,
            default: () => []
        },
        paginationAlign: {
            type: String,
            default: 'right'
        },
        draggable: {
            type: Boolean,
            default: false
        }
    }),
    setup(props, { emit }: any) {
        const table = ref<any>(null)
        const { tableProps, paginationProps } = useProps(props, emit)
        watch(() => [table.value, props.draggable], () => {
            emit('get-table', table.value)
            if (!props.draggable) {
            }
        })
        return {
            tableProps,
            paginationProps,
            table,
        }
    },
    render() {
        const slots = this.$slots as any
        return <section class="manage-pc-table">
            <ElTable
                {...this.tableProps}
                ref={(el: any) => el && (this.table = el)}
                v-draggable={[this.draggable && {
                    dom: '.el-table__body-wrapper tbody',
                    target: '.el-table__row',
                    callback: ({ newIndex, oldIndex }: any) => {
                        [this.data[newIndex], this.data[oldIndex]] = [this.data[oldIndex], this.data[newIndex]]
                    }
                },
                ].filter(Boolean)}
            >
                {this.columns.map((column: any, index: number) => <el-table-column {...column} key={index} >
                    {Object.assign({}, isFunction(slots[column.header]) && {
                        header: (props: any) => slots[column.header](props)
                    }, isFunction(slots[column.content]) && {
                        default: (props: any) => slots[column.content](props)
                    })}
                </el-table-column>)
                }
                {isFunction(slots.append) && {
                    append: () => slots.append(this.data)
                }}
            </ElTable>
            {this.pagination
                && <el-pagination
                    style={{
                        textAlign: this.paginationAlign
                    }}
                    {...this.paginationProps}
                    onSizeChange={(pageSize: number) => { this.paginationProps = Object.assign({}, this.paginationProps, { pageSize }) }}
                    onCurrentChange={(currentPage: number) => { this.paginationProps = Object.assign({}, this.paginationProps, { currentPage }) }}
                />
            }
        </section>
    }
})

export default PCTable