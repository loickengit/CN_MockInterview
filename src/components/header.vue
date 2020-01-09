<template>
	<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#fff" text-color="#545c64" active-text-color="#ffd04b">
        <el-menu-item index="1">Home</el-menu-item>
        <el-submenu index="2">
            <template slot="title">Favorite</template>
            <el-menu-item index="2-1">Font-end</el-menu-item>
            <el-menu-item index="2-2">Back-end</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">Contact Us</el-menu-item>
    </el-menu>
</template>

<script>
	export default {
		 data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
	}
</script>

<style>

</style>
