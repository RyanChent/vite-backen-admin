import { computed, defineComponent } from "vue";
import ElTable from 'element-plus/lib/el-table'
import './style.less'
import _ from 'lodash'
import { isFunction } from "@/utils/types.ts";

const PCTable = defineComponent({
    name: 'Table',
    componentName: 'ManageTable',
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
        }
    }),
    setup(props, { emit }: any) {
        const tableProps = computed(() =>
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
        )

        const paginationProps = computed<any>({
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
        return {
            tableProps,
            paginationProps
        }
    },
    render() {
        const slots = this.$slots as any
        return <section class="manage-pc-table">
            <ElTable {...this.tableProps}>
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
                    onSizeChange={(pageSize: number) => { this.paginationProps.pageSize = pageSize }}
                    onCurrentChange={(currentPage: number) => { this.paginationProps.current = currentPage }}
                />
            }
        </section>
    }
})

export default PCTable