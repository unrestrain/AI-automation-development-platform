<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-emoji"></i> 数据展示</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <hr />
        <div class="my-content">
            <div class="data-and-label">
                <div class="data">
                    <img :src="image_url" alt="" />
                </div>
                <div class="label">
                    <p class="bold">标签</p>
                    <p>{{ image_label }}</p>
                </div>
            </div>
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="1"
                    layout="total, prev, pager, next, jumper"
                    :total="datasetInfo.num"
                >
                </el-pagination>
            </div>
        </div>
        <!-- <el-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000"> </el-pagination> -->
    </div>
</template>




<script>
import axios from 'axios';
export default {
    methods: {
        getParams() {
            this.datasetInfo = this.$route.query.info;
            console.log(this.datasetInfo);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            axios.get(`http://127.0.0.1:5000/get_image/`,{params:{'dataset':this.datasetInfo.id,'number':val}}).then((res) => {
                console.log(res);
                console.log(res.data);
                this.image_url = res.data['url'];
                this.image_label = res.data['label'];
                console.log(this.image_url);
            });
        }
    },
    data() {
        return {
            image_url: '',
            image_label: '',
            image_num: 0,
            currentPage: 1,
            datasetInfo: {},
        };
    },
    created() {
        this.getParams();
        axios.get(`http://127.0.0.1:5000/get_image/`,{params:{'dataset':this.datasetInfo.id,'number':this.currentPage}}).then((res) => {
                this.image_url = res.data['url'];
                this.image_label = res.data['label'];
            });
    }
};
</script>

<style scoped>
.my-content {
    text-align: center;
    margin-top: 100px;
}
.show_title p {
    margin-left: 20px;
    font-size: 18px;
}

.data-and-label {
    width: 800px;
    height: 500px;
    background-color: #eaeaea;
    margin: 30px auto;
}

.data {
    width: 700px;
    height: 500px;
    background-color: #eaeaea;
    float: left;
}

.data img {
    width: 700px;
    height: 500px;
}

.label {
    width: 100px;
    height: 500px;
    background-color: #eaeaea;
    float: left;
}
.label p {
    margin-left: 5px;
    margin-top: 5px;
    font-size: 16px;
}
.block {
    margin: 0 auto;
}
</style>