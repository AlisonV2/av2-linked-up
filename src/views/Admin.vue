<template>
<div class="container-fluid">
    <div class="row flex-nowrap">
        <Sidenav />
        <div class="col py-3">
            Content area...
        </div>
    </div>
</div>
</template>

<script>
import Sidenav from '@/components/admin/Sidenav';

export default {
  name: 'Admin',
  components: {
    Sidenav
  }
}
</script>