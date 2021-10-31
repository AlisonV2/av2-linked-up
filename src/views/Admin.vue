<template>
<div class="container-fluid">
    <div class="row flex-nowrap">
        <Sidenav />
        <div class="col py-3">
          <div class="container">
            <router-view></router-view>
          </div>
        </div>
    </div>
</div>
</template>

<script>
import Sidenav from '@/components/admin/Sidenav';
/**
 * @exports Admin
 * @requires Sidenav
 * @type {Page}
 */
export default {
  name: 'Admin',
  components: {
    Sidenav
  }
}
</script>