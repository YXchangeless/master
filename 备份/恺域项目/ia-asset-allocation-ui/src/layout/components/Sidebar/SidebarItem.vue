<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
          !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import fixiOSBug from './fixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [fixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
<style lang="scss">
#app {
  .sidebar-container {
    .el-submenu {
      .el-menu-item:hover {
        color: #ffffff !important;
        background-color: #334f73 !important;
      }
    }

    .el-submenu {
      .el-menu-item {
        padding: 0 0 0 64px !important;
        background-color: #243b59 !important;
      }
    }

    .scrollbar-wrapper {
      overflow-x: hidden !important;
      background: #243b59;
    }

    .el-submenu .el-menu-item.is-active {
      display: block;
      height: 56px;
      color: #ffffff !important;
      background: #2a76cd !important;
    }

    .submenu-title-noDropdown:hover {
      background-color: #334f73 !important;
    }

    .submenu-title-noDropdown.is-active {
      background-color: #2a76cd !important;
      color: #ffffff !important;
    }
  }

  .sidebar-container .el-submenu__title:hover {
    background-color: #334f73 !important;
  }

  .el-submenu__title {
    background: #243b59 !important;
  }

  .el-menu-item {
    background: #243b59 !important;
  }

  .el-submenu .el-menu-item {
    height: 56px;
    line-height: 56px;
    padding: 0 45px;
    min-width: 200px;
  }

  .sidebar-container {
    overflow: overlay;
    height: auto;
  }

  .el-scrollbar__view > .el-menu > div:last-child li {
    margin-bottom: 50px;
    box-sizing: border-box;
  }

  .sidebar-container .el-menu {
    background: #243b59 !important;
  }
}
</style>
