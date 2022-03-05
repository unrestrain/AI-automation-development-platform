<template>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column label="数据集名称" width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
        </el-table-column>
        <el-table-column label="数据集ID" width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
        </el-table-column>
        <el-table-column label="数据量" width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.num }}</span>
            </template>
        </el-table-column>
        <el-table-column label="数据类型" width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.type }}</span>
            </template>
        </el-table-column>
        <el-table-column label="类别数量" width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.class_num }}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">导入</el-button>
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    data() {
        return {
            
            tableData: []
        };
    },
    methods: {
        getDatasetInfo() {
            //   这里的数据从后台获得
            this.tableData = [
                {
                    id: '1',
                    name: 'MNIST',
                    type: '图像分类',
                    num: 50000,
                    class_num: 10
                },
                {
                    id: '1',
                    name: 'MNIST',
                    type: '图像分类',
                    num: 50000,
                    class_num: 10
                },
                {
                    id: '1',
                    name: 'MNIST',
                    type: '图像分类',
                    num: 50000,
                    class_num: 10
                },
                {
                    id: '1',
                    name: 'MNIST',
                    type: '图像分类',
                    num: 50000,
                    class_num: 10
                },
                {
                    id: '1',
                    name: 'MNIST',
                    type: '图像分类',
                    num: 50000,
                    class_num: 10
                },
            ]
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        }
    },

    created(){
        this.getDatasetInfo();
    }
};
</script>