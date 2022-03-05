<template>
    <div>
        <el-dropdown trigger="click">
            <el-button type="primary"> 我的数据集<i class="el-icon-arrow-down el-icon--right"></i> </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>公开数据集</el-dropdown-item>
                <el-dropdown-item>我的数据集</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<style>
.el-dropdown {
    vertical-align: top;
}
.el-dropdown {
    margin-left: 15px;
}
.el-icon-arrow-down {
    font-size: 12px;
}
</style>

<script>
export default {
    methods: {
        handleClick() {
            alert('button click');
        }
    }
};
</script>