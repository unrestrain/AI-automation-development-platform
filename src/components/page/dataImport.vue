<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-emoji"></i> 数据导入与概览</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <hr />

        <div class="dialog">
            <!-- Form -->
            <el-button class="create-dataset" type="primary" @click="dialogFormVisible = true">创建数据集</el-button>

            <el-dialog title="创建数据集" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="数据集名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="数据类型" :label-width="formLabelWidth">
                        <el-select v-model="form.datasetType" placeholder="请选择数据类型">
                            <el-option label="图像分类" value="图像分类"></el-option>
                            <el-option label="文本分类" value="文本分类"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addDataset()">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <div class="drop-down">
            <el-dropdown trigger="click" @command="handleCommand">
                <el-button type="primary"> {{ current_owner }}<i class="el-icon-arrow-down el-icon--right"></i> </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="open">公开数据集</el-dropdown-item>
                    <el-dropdown-item command="my">我的数据集</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <el-table :data="tableData" style="width: 100%" class="dataset-table">
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
                    <router-link :to="{ path: '/import_dataset', query: { info: scope.row } }"
                        ><el-button v-if="display" size="mini" @click="handleEdit(scope.$index, scope.row)"> 导入 </el-button></router-link
                    >
                    <router-link :to="{ path: '/show', query: { info: scope.row } }"
                        ><el-button size="mini" @click="handleEdit(scope.$index, scope.row)"> 查看 </el-button></router-link
                    >
                    <el-button v-if="display" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- <vCreateDataDialog class="dialog"></vCreateDataDialog>
        <vDropDownDatasetType class="drop-down"></vDropDownDatasetType>

        <vDatasetTable class="dataset-table"></vDatasetTable> -->
    </div>
</template>


<script>
import { defineComponent } from '@vue/composition-api';
import vCreateDataDialog from '../common/createDataDialog.vue';
import vDropDownDatasetType from '../common/dropDownDatasetType.vue';
import vDatasetTable from '../common/datasetTable.vue';
import axios from 'axios';

export default defineComponent({
    data() {
        return {
            dialogFormVisible: false,
            form: {
                name: '',
                datasetType: ''
            },
            formLabelWidth: '120px',
            tableData: [],
            current_owner: '我的数据集',
            display: true
        };
    },
    components: {
        vCreateDataDialog,
        vDropDownDatasetType,
        vDatasetTable
    },
    methods: {
        handleCommand(command) {
            if (command == 'my') {
                this.getDatasetInfoMy();
                this.current_owner = '我的数据集';
                this.display = true;

            } else {
                this.getDatasetInfoOpen();
                this.current_owner = '公开数据集';
                this.display = false;

            }
        },
        addDataset() {
            // 提交表单form
            // 重新加载数据
            // this.getDatasetInfo();
            axios.get('http://127.0.0.1:5000/add', { params: { name: this.form.name, datasetType: this.form.datasetType } }).then((res) => {
                this.tableData = res.data['tableData'];
            });
            // this.tableData[this.tableData.length] = {
            //     id: 2,
            //     name: this.form.name,
            //     type: this.form.datasetType,
            //     num: 0,
            //     class_num: 0
            // };
            // this.getDatasetInfoMy();
            console.log(this.tableData);
            this.dialogFormVisible = false;
        },
        handleClick() {
            alert('button click');
        },
        getDatasetInfoOpen() {
            //   这里的数据从后台获得
            axios.get(`http://127.0.0.1:5000/totalInfo`, { params: { owner: 'open' } }).then((res) => {
                this.tableData = res.data['tableData'];
       
            });
        },
        getDatasetInfoMy() {
            //   这里的数据从后台获得
            axios.get(`http://127.0.0.1:5000/totalInfo`, { params: { owner: 'my' } }).then((res) => {
                this.tableData = res.data['tableData'];
    
            });
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
                    // this.tableData.splice(index, 1);
                    axios.get('http://127.0.0.1:5000/delete', { params: { dataset_id: row.id } });
                    this.getDatasetInfoMy();
                    // 在后端删除该数据
                })
                .catch(() => {});
        }
    },
    setup() {
        console.log(vCreateDataDialog);
    },
    created() {
        this.getDatasetInfoMy();
    }
});
</script>


<style scoped>
.drop-down {
    float: right;
    margin-top: 10px;
}

.dialog {
    float: left;
}

.dataset-table {
    margin-top: 65px;
}

.create-dataset {
    margin-top: 10px;
}

/* drop down 样式 */
.el-dropdown {
    vertical-align: top;
}
.el-dropdown {
    margin-left: 15px;
}
.el-icon-arrow-down {
    font-size: 12px;
}

/* 表格样式 */
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>