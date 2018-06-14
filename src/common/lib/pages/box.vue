<template>
  <transition name="modal">
    <div class="modal-warp">
      <div class="modal-header">
        <div class="modal-header-div" >
          <slot name="header-main">
            default header
          </slot>
        </div>
        <div class="modal-header-div"  @click="$emit('close')">
          <slot name="header-close">
            <i class="modal-icon">&#xe607;</i>
          </slot>
        </div>
      </div>
      <div class="modal-body">
        <slot name="body">
          default body
        </slot>
      </div>
      <div class="modal-footer">
        <slot name="foot">
          <div class="modal-footer-buttons">
            <button type="button" name="button" @click="$emit('subimt')">确定</button>
            <button type="button" name="button" @click="$emit('close')">取消</button>
          </div>
        </slot>
      </div>
      <div class="modal-footer">
        <slot name="footNotice"></slot>
      </div>
    </div>
  </transition>
</template>

<script>

</script>

<style lang="less">
  @import "../css/box.less";
</style>
