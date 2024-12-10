<template>
  <div class="w-wrapper">
    <div :class="['w-textarea', disabled ? 'disabled' : '']" ref="wTextarea">
      <div
        class="w-textarea_input"
        ref="wTextareaContent"
        :id="contentId"
        @click="inputClick($event)"
        @focus="isLocked = true"
        @blur="isLocked = false"
        @keydown.delete="handleDelete($event)"
        @input="handleInput($event.target)"
      ></div>
      <span :class="['word-count', wordCount > wordLimit ? 'outrange' : '']" v-if="showWordLimit && !disabled">{{
        wordCount + '/' + wordLimit
      }}</span>
    </div>
    <div class="w-textarea_tools" v-if="!disabled">
      <el-tag @click="openMoreSeesion()">标签参数选择</el-tag>
      <!-- <template v-for="(item, index) in tags">
        <el-tag v-if="index < 4" @click="addTag(item)">{{ item.labelName }}</el-tag>
        <el-tag v-if="index === 4" @click="openMoreSeesion()">更多</el-tag>
      </template> -->
    </div>
    <el-dialog
      :visible.sync="moreDialogVisible"
      title="场景标签或参数选择"
      :before-close="() => resetMoreDialog(false)"
      :append-to-body="dialogAppendToBody"
      :close-on-click-modal="false"
      width="680px"
      custom-class="noPaddingModal"
    >
      <div class="dialog-wrapper">
        <el-form :model="selectFormState" ref="selectForm" label-width="50px" inline>
          <el-form-item :required="false" label="类型" prop="labelSource">
            <el-select v-model="selectFormState.labelSource" class="form-input" clearable>
              <el-option key="all" label="全部" value=""></el-option>
              <el-option
                v-for="option in labelTypeOptions"
                :key="option.dictValue"
                :label="option.dictLabel"
                :value="option.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :required="false" label="名称" prop="labelName">
            <el-input v-model="selectFormState.labelName" class="form-input" />
          </el-form-item>
          <el-form-item class="operate-btn">
            <el-button @click="getTableList">查询</el-button>
            <el-button @click="resetMoreDialog(true)" type="primary">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table
          v-loading="tableObj.loading"
          :data="tableObj.data"
          ref="selectTable"
          @selection-change="handleSelectionChange"
          height="380px"
          stripe
          border
          size="small"
        >
          <el-table-column type="selection" width="40" />
          <el-table-column label="参数列表" prop="labelSource">
            <template slot-scope="scope">
              {{ typeMap[scope.row.labelSource] }}
            </template>
          </el-table-column>
          <el-table-column label="标签" prop="labelName" />
        </el-table>
        <el-pagination
          :current-page="selectFormState.pageNum"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="selectFormState.pageSize"
          :total="tableObj.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          class="right tag-select-pagination"
          layout="total, prev, pager, next"
        />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetMoreDialog(false)">取消</el-button>
        <el-button @click="handleSelectContent" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Form as ElForm, Table as ElTable } from 'element-ui/types/element-ui'
import { selectedLabelType, labelItemType, dictType, dicItemType } from '../types'
import { getLabelList } from '@/api/callingCloudPlatform/script'
import { uniqBy } from 'lodash'
@Component({
  // 操作
  name: 'TagInput'
})
export default class extends Vue {
  @Prop() value: string
  @Prop() isVisible: boolean
  @Prop() isEdit: boolean
  @Prop({ default: '' }) maxlength: string | number
  @Prop({ default: 'wise' }) tag: string
  @Prop({ default: false }) disabled: boolean
  @Prop() selectedTags: Array<selectedLabelType>
  @Prop({ default: [] }) labelTypeOptions: Array<dictType>
  @Prop({ default: false }) showWordLimit: boolean
  @Prop({ default: 500 }) wordLimit: number
  @Prop({ default: true }) dialogAppendToBody: boolean

  public typeMap: any = {}

  public isLocked: boolean = false // 输入的时候锁定，禁止更新innerHTML

  public currentTagId: string | null = null

  public savedRange: any = {}

  public firstSetData: boolean = false
  public moreDialogVisible: boolean = false
  public selectFormState: any = { pageSize: 10, pageNum: 1, labelSource: '', labelName: '' }
  public tableObj: { loading: boolean; total: number; data: Array<labelItemType> } = {
    loading: false,
    total: 0,
    data: []
  }
  public selectedLabels: Array<selectedLabelType> = []
  public tags: Array<selectedLabelType> = []
  public hasFirstInput: boolean = false
  public wordCount: number = 0
  scope: any

  public get visibleContent(): string {
    if (this.isVisible && this.value) return this.value
    else return ''
  }

  @Watch('labelTypeOptions', { immediate: true })
  handleOptionsChange(newV: Array<dictType>) {
    if (newV) {
      newV.map((item: dictType) => {
        this.typeMap[item.dictValue] = item.dictLabel
      })
    }
  }

  @Watch('visibleContent', { immediate: true })
  onVisibleContentChange(val: string) {
    if (val && !this.firstSetData) {
      const renderHtml = this.handleFirstMountedText(val)
      if (renderHtml && this.$refs.wTextareaContent) {
        ;(this.$refs.wTextareaContent as HTMLElement).innerHTML = renderHtml
        this.wordCount = (this.$refs.wTextareaContent as HTMLElement).innerText.length
        this.firstSetData = true
      }
    }
  }

  // 记录currentText以计算长度
  public get currentText(): string {
    return this.value
  }

  public set currentText(v: string) {
    this.$emit('change', v) // 触发父组件表单校验
    this.$emit('update:value', v)
  }
  public get contentId(): string {
    // 为input区域生成随机id，当在页面上有多个组件时，用于监听光标的变化
    return `content${this.getGuid()}`
  }

  public mounted() {
    this.getTableList(true)
    // 创建模版标签的style
    this.createStyle()
    // 每次光标变化的时候，保存 range
    document.addEventListener('selectionchange', this.selectHandler)
  }

  public beforeDestroy() {
    this.firstSetData = false
    // 卸载事件
    document.removeEventListener('selectionchange', this.selectHandler)
  }

  public async getTableList(mounted = false) {
    const params = Object.assign({}, this.selectFormState)
    this.tableObj.loading = true
    const res: any = await getLabelList(params)
    this.tableObj.loading = false
    const { code, rows, total } = res
    if (code === 200) {
      this.tableObj.total = total
      this.tableObj.data = rows
      if (mounted && typeof mounted === 'boolean') this.tags = rows.slice()
    }
  }

  public handleFirstMountedText(value: string) {
    const reg = /#{#[a-zA-Z_\d]+}/g
    const replacedValue = value.replaceAll(reg, (str: string) => {
      let replaceStr = str
      this.selectedTags.forEach((tag) => {
        const tagCode = tag.labelCode.startsWith('#') ? tag.labelCode : `#{#${tag.labelCode}}`
        if (tagCode === str) {
          const node = this.genNewNode({ labelCode: tagCode, labelName: tag.labelName || tag.labelCode })
          replaceStr = node.outerHTML
        }
      })
      return replaceStr
    })
    return replacedValue
  }

  public updateData(text: string) {
    const frag = document.createElement('div')
    frag.innerHTML = text
    const tags = frag.getElementsByTagName(this.tag)
    while (tags.length > 0) {
      const element = tags[0] as HTMLElement
      element.outerHTML = `${element.dataset.code || ''}`
    }
    this.$emit('input', frag.innerText)
  }

  private createStyle() {
    // 为自定义的模版标签添加样式，使之不可编辑
    let style = document.createElement('style')
    style.innerHTML = `.w-textarea ${this.tag} {
          cursor: default;
          -webkit-user-modify: read-only !important;
        }`
    ;(this.$refs.wTextarea as HTMLElement).appendChild(style)
  }

  public genNewNode(item: selectedLabelType) {
    // 创建模版标签
    let node = document.createElement(this.tag)
    node.innerText = item.labelName
    // 添加id便于删除
    node.id = this.getGuid()
    node.dataset.code = item.labelCode
    return node
  }

  public addTag(item: selectedLabelType) {
    const node = this.genNewNode(item)
    this.insertNode(node, () => {
      this.$emit('labelSelected', [{ labelCode: item.labelCode, labelName: item.labelName }])
    })
  }

  private insertNode(node: HTMLElement, success?: Function) {
    if (!this.savedRange.deleteContents || !this.savedRange.insertNode) return
    // 在内容中插入标签
    // 删掉选中的内容（如有）
    this.savedRange.deleteContents()
    // 插入链接
    this.savedRange.insertNode(node)
    // 更新双向绑定数据
    let target = this.$refs.wTextareaContent as HTMLElement
    this.wordCount = target.innerText.length
    if ((this.showWordLimit && this.wordCount <= this.wordLimit) || !this.showWordLimit) {
      this.updateData(target.innerHTML)
      this.currentText = target.innerText
      if (typeof success === 'function') success(node)
    }
  }

  private handleFirstInputCursor(target: HTMLElement) {
    // 处理第一次输入时光标位置前移问题
    if (this.hasFirstInput || this.isEdit) return
    setTimeout(() => {
      const range = document.createRange()
      range.selectNodeContents(target)
      range.setStart(target, 1)
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)
      this.hasFirstInput = true
    })
  }

  public handleInput(target: HTMLElement) {
    this.handleFirstInputCursor(target)
    // 即时更新数据
    this.wordCount = target.innerText.length
    if ((this.showWordLimit && this.wordCount <= this.wordLimit) || !this.showWordLimit) {
      this.updateData(target.innerHTML)
      this.currentText = target.innerText
    }
  }

  public updateSelectedLabels(dom: HTMLElement) {
    const tags = dom.getElementsByTagName(this.tag)
    let labels = []
    for (let index = 0; index < tags.length; index++) {
      const element = tags[index] as HTMLElement
      labels.push({
        labelCode: element.dataset.code,
        labelName: element.innerText
      })
    }
    this.$emit('labelSelected', uniqBy(labels, 'labelCode'), true)
  }

  public handleDelete(e: Event) {
    setTimeout(() => {
      this.updateSelectedLabels(e.target as HTMLElement)
    })
    // 监听“删除”事件
    if (this.currentTagId) {
      // 若已选中模版标签，直接删除dom节点
      let t = document.getElementById(this.currentTagId)
      if (t) (this.$refs.wTextareaContent as HTMLElement).removeChild(t)
      this.currentTagId = null
      // 阻止浏览器默认的删除事件，并手动更新数据
      e.preventDefault()
      if (e.target) this.handleInput(e.target as HTMLElement)
    }
  }

  public inputClick(e: Event) {
    // 监听点击事件
    this.isLocked = true
    const ele = e?.target as HTMLElement
    const TAG_NAME = ele.nodeName
    if (TAG_NAME === this.tag.toUpperCase()) {
      // 点击模版标签时，记录id
      this.currentTagId = ele.id
      if (ele) ele.className = 'active'
    } else if (this.currentTagId) {
      // 清空active样式
      let target = document.getElementById(this.currentTagId)
      if (target) target.className = ''
      this.currentTagId = null
    } else {
      this.currentTagId = null
    }
  }

  private getGuid() {
    // 生成随机ID
    return `r${new Date().getTime()}d${Math.ceil(Math.random() * 1000)}`
  }

  private selectHandler() {
    // 监听选定文本的变动
    let sel = window.getSelection()

    if (!sel) return
    let range = sel.rangeCount > 0 ? sel.getRangeAt(0) : null
    if (range && range?.commonAncestorContainer?.ownerDocument?.activeElement?.id === this.contentId) {
      this.savedRange = range
    }
  }

  // 打开更多话术类容dialog
  public openMoreSeesion() {
    this.moreDialogVisible = true
  }
  /**
   * 重置更多标签弹窗中的表单项及表格选中状态
   */
  public resetMoreDialog(visible: boolean = false) {
    this.selectFormState = { pageSize: 10, pageNum: 1, labelSource: '', labelName: '' }
    ;(this.$refs.selectTable as ElTable).clearSelection()
    this.moreDialogVisible = visible
    this.getTableList()
  }
  /**
   * 页码更改事件
   * @param size
   */
  public handleSizeChange(size: number) {
    // 更改每页显示条数
    this.selectFormState.pageSize = size
    // 当前页重置为第一页
    this.selectFormState.pageNum = 1
    this.getTableList()
  }

  /**
   * 页数更改事件
   * @param pageNum 当前页数
   */
  public handleCurrentChange(pageNum: number) {
    // 设置当前页数
    this.selectFormState.pageNum = pageNum
    this.getTableList()
  }
  /**
   * table选中change事件
   * @param selection
   */
  public handleSelectionChange(selection: Array<labelItemType>) {
    if (!selection.length) {
      this.selectedLabels = []
      return
    }
    this.selectedLabels = selection.map((label) => {
      const { labelCode, labelName } = label
      return {
        labelCode,
        labelName
      }
    })
  }
  // 添加多个tag
  public handleMultiAddTags(selectedLabels: any) {
    let frag = document.createDocumentFragment()
    selectedLabels.forEach((item: labelItemType) => {
      this.$emit('labelSelected', [{ labelCode: item.labelCode, labelName: item.labelName }])
      const node = this.genNewNode(item)
      frag.appendChild(node)
    })
    // @ts-ignore
    this.insertNode(frag)
  }
  // 确定话术table选中事件
  public handleSelectContent() {
    this.handleMultiAddTags(this.selectedLabels)
    this.resetMoreDialog(false)
  }

  public isOutRange() {
    if (this.showWordLimit && this.wordCount > this.wordLimit) {
      return true
    }
    return false
  }
}
</script>

<style lang="scss">
// 给标签默认样式，不可scoped
.w-textarea {
  wise {
    color: #26a2ff;
    padding: 0 1px;
    cursor: default;
    -webkit-user-modify: read-only !important;
    white-space: break-spaces;
  }
  .active {
    background: #dcdfe6;
  }
}
</style>

<style lang="scss" scoped>
$borderColor: #dcdfe6;
$bgColor: #f5f7fa;
$textColor: #606266;
.w-wrapper {
  width: 200px;
}
.el-tag {
  cursor: pointer;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.w-textarea_tools {
  width: 30vw;
}
.w-textarea {
  width: 300px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid $borderColor;
  margin-bottom: 15px;
  overflow: hidden;
  position: relative;
  color: $textColor;

  &.disabled {
    background-color: #f5f7fa;
    border-color: #dfe4ed;
    color: #c0c4cc;
    cursor: not-allowed;
    pointer-events: none;
  }
  &_input {
    width: 100%;
    min-height: 100px;
    box-sizing: border-box;
    padding: 10px 10px 25px 10px;
    line-height: 1.5;
    word-break: break-word;
    // 允许编辑，禁止富文本
    -webkit-user-modify: read-write-plaintext-only !important;
    &:focus {
      outline: none;
    }
  }
  .word-count {
    position: absolute;
    right: 5px;
    bottom: 0;
    color: #a8abb2;
    &.outrange {
      color: #ff4949;
    }
  }
}
.dialog-wrapper {
  padding: 16px;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
  ::v-deep .el-form--inline .el-form-item {
    margin-right: 0;
  }
  .form-input {
    width: 160px;
  }
  .operate-btn {
    margin-left: 24px;
  }
}
.tag-select-pagination {
  margin-top: 4px;
  &.el-pagination {
    ::v-deep .el-icon {
      display: inline-block;
    }
  }
}
</style>
