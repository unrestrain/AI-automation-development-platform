<template>
    <div class="content">
        <el-descriptions
            border
            :labelStyle="bgcStyle"
            :contentStyle="bgcStyle"
            class="margin-top"
            title="创建信息"
            :column="2"
            :size="size"
        >
            <el-descriptions-item label="数据集名称">{{ datasetInfo.name }}</el-descriptions-item>
            <el-descriptions-item label="数据集ID">{{ datasetInfo.id }}</el-descriptions-item>
            <el-descriptions-item label="数据集类型">{{ datasetInfo.type }}</el-descriptions-item>
            <el-descriptions-item label="数据总量">{{ datasetInfo.num }}</el-descriptions-item>
            <el-descriptions-item label="标签个数">{{ datasetInfo.class_num }}</el-descriptions-item>
        </el-descriptions>

        <h4>导入数据</h4>
        <div class="my-style">
            <el-upload
                class="upload-demo"
                drag
                ref="upload"
                action="http://127.0.0.1:5000/post"
                multiple
                :file-list="fileList"
                :auto-upload="false"
                :limit="3"
                :on-exceed="handleExceed"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传zip文件，且不超过1GB</div>
            </el-upload>

            <el-button class="upload-button" size="small" type="success" @click="submitUpload">确定并返回</el-button>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
export default {
    data() {
        return {
            bgcStyle: {
                'background-color': 'rgb(240,240,240)',
                'font-size': '14px',
                border: '0'
            },
            datasetInfo: {},
            size: '',
            fileList: []
        };
    },
    methods: {
        getParams() {
            this.datasetInfo = this.$route.query.info;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        submitUpload() {
            let info = this.$refs.upload.submit();
            axios.get('http://127.0.0.1:5000/post',{params:{'dataset_id':this.datasetInfo.id}}).then((res) => {
                alert(res.data);
            });
            
            this.$router.push('/dataImport');
        }
    },
    created() {
        this.getParams();
    }
};
</script>

<style scoped>
/* .my-style {
    background-color: #fff;
} */
.my-style {
    width: 400px;
    margin: 0 auto;
    text-align: center;
}

h4 {
    margin: 20px 0;
}
.content {
    width: 500px;
    float: left;
}

.upload-button {
    margin-top: 30px;
    background-color: blue;
}
</style>