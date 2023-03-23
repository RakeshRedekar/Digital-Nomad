<template>
  <div class="post">
    <div class="post_heading">
      <el-avatar :size="50" :fit="fit" src="src/images/Screenshot.png" />
      <div class="title_left">
        <p><b>Rakesh Redekar&nbsp;</b>is at &nbsp;<b>Malaysia </b></p>
        <p>Mar 11 2022</p>
      </div>
      <el-button class="follow_btn" type="success" plain
        ><el-icon><Plus /></el-icon>&nbsp; Follow</el-button
      >
    </div>
    <div class="post_body">
      <p>
        {{ postData.postDiscrip }}
      </p>
      <img class="post_body_img" :srcset="postData.postImg" />
    </div>
    <div class="post_footer">
      <div class="footer_top">
        <p>872 likes</p>
        <p>24 comments</p>
      </div>
      <div class="footer_bottom">
        <div class="footer_action">
          <img
            src="../../public/icons/reshot-icon-heart.svg
          "
          />
          <p>Like</p>
        </div>
        <div class="footer_action">
          <el-icon size="25"><ChatLineSquare /></el-icon>
          <p>Comment</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "post",
  props: ["postData"],
  setup(props) {
    console.log(props);
  },
};
</script>

<style scoped>
.post {
  width: 600px;
  margin-top: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px grey;
  box-sizing: border-box;
  padding: 20px;
}
.post_heading {
  display: flex;
}
.title_left {
  width: 350px;
  margin: 0px 20px;
}
.title_left > p:first-child {
  margin-top: 0px;
  padding-top: 0px;
  font-size: large;
}
.title_left > p:nth-child(2) {
  margin-top: 0px;
  padding-top: 0px;
  font-size: small;
  color: rgb(74, 74, 74);
}
.follow_btn {
  float: right;
}
.post_body_img {
  width: 100%;
  max-height: 800px;
}
.footer_top {
  display: flex;
  width: 100%;
  justify-content: space-between;
  /* font-size: small; */
  color: gray;
  border-bottom: 1px solid gray;
}
.footer_bottom {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.footer_bottom img {
  height: 30px;
}
.footer_action {
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 10px;
  width: 200px;
  justify-content: center;
  margin-top: 5px;
}
.footer_action:hover {
  background-color: aliceblue;
}
.footer_action p {
  margin: 0px;
}
</style>
